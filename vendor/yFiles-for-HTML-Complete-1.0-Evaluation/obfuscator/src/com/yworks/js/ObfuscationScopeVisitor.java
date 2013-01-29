package com.yworks.js;

import org.mozilla.javascript.Function;
import org.mozilla.javascript.Node;
import org.mozilla.javascript.Token;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.Comment;
import org.mozilla.javascript.ast.ExpressionStatement;
import org.mozilla.javascript.ast.FunctionNode;
import org.mozilla.javascript.ast.Name;
import org.mozilla.javascript.ast.NodeVisitor;
import org.mozilla.javascript.ast.ObjectProperty;
import org.mozilla.javascript.ast.PropertyGet;
import org.mozilla.javascript.ast.VariableDeclaration;
import org.mozilla.javascript.ast.VariableInitializer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.SortedSet;

/**
 * This Visitor prepares the scope by looking for @yjs annotation in JSDocs.
 *
 * In the future this class should also (somehow) annotate variables so that any property access on them is not obfuscated,
 * and instead of a simple yes/no answer to obfuscation it should also handle the case where we wish to exclude some
 * names from obfuscation.
 */
public class ObfuscationScopeVisitor implements NodeVisitor {
  private ArrayList<Comment> comments;

  public boolean visit(AstNode node) {
    String jsDoc = node.getJsDoc();
    Comment previousComment = null;
    if(jsDoc != null) {
      ObfuscationScopeInfo info = parseJsDoc(jsDoc);
      if(info != null) {
        if (node.getType() == Token.STRING){
          node = node.getParent();
        }
        ObfuscationScopeInfo.setObfuscationInfo(node, info);
      } else {
        previousComment = adjustComments(node);
      }
    } else {
      previousComment = adjustComments(node);
    }

    return true;
  }

  private static final int NEAREST_NODE_PROPERTY = 1025;

  private Comment adjustComments( AstNode node ){
    int absolutePosition = node.getAbsolutePosition();
    if (comments != null){
      int index = Collections.binarySearch(comments, new Comment(absolutePosition,0, Token.CommentType.BLOCK_COMMENT, "Dummy"));
      if (index < 0){
        index = -index - 2;
      }
      if (index >= 0){
        final Comment previousComment = comments.get(index);
        if (previousComment.getLineno() == node.getLineno() || previousComment.getLineno() + 1 == node.getLineno()){
          AstNode nearestNode = (AstNode) previousComment.getProp(NEAREST_NODE_PROPERTY);
          if (nearestNode != null){
            if (nearestNode.getAbsolutePosition() < absolutePosition){
              // we have one that is closer to the comment - so keep it
            } else {
              if (nearestNode.getAbsolutePosition() > absolutePosition || nearestNode.getAbsolutePosition() + nearestNode.getLength() > node.getLength() + absolutePosition){
                // we found a closer match...
                previousComment.putProp(NEAREST_NODE_PROPERTY, node);
              }
            }
          } else {
            // remember the node as a candidate...
            previousComment.putProp(NEAREST_NODE_PROPERTY, node);
          }
          return previousComment;
        }
      }
    }
    return null;
  }
  

  static ObfuscationScopeInfo parseJsDoc(String jsDoc) {
    Lexer lexer = new Lexer(jsDoc);
    // skip until we match a @yjs annotation
    while(lexer.LA(0) != Lexer.EOF) {
      if(lexer.LA(0) == '@') {
        if(lexer.match("@yjs:")) {
          if(lexer.match("unsafe")) {
            return new ObfuscationScopeInfo(false);
          }
          if(lexer.match("exclude")) {
            return new ObfuscationScopeInfo(false);
          }
          if(lexer.match("obfuscate")) {
            ObfuscationScopeInfo info = new ObfuscationScopeInfo(true);
            parseObfuscationInfo(info, lexer);
            return info;
          }
        }
      }
      lexer.consume();
    }
    return null;
  }
  
  private static void parseObfuscationInfo( ObfuscationScopeInfo info, Lexer lexer ) {
    // \s+
    if(!Character.isWhitespace(lexer.LA(0))) return;
    lexer.skipWS();

    if(lexer.match("exclude")) {
      lexer.skipWS();
      if(!lexer.match('=')) return;
      int start = lexer.marker();
      for(int c = lexer.LA(0); c != Lexer.EOF && !Character.isWhitespace(c) && c != '*'; c = lexer.LA(0)) {
        lexer.consume();
      }
      String blacklist = String.valueOf(lexer.subSequence(start, lexer.marker()));
      if(blacklist != null) {
        String[] names = blacklist.split(",");
        for(String name : names) {
          info.addBlacklisted(name);
        }
      }
    }
  }

  public void setComments( final SortedSet<Comment> comments ) {
    this.comments = new ArrayList<Comment>(comments);
    for (Iterator<Comment> iterator = this.comments.iterator(); iterator.hasNext(); ) {
      final Comment comment = iterator.next();
      final ObfuscationScopeInfo info = parseJsDoc(comment.getValue());
      if (info == null || info.isObfuscatedScope()) {
        iterator.remove();
      } else {
        comment.putProp(ObfuscationScopeInfo.YJS_OBFUSCATION_INFO, info);
      }
    }
  }

  public void storeComments() {
    if (comments != null){
      for (Comment comment : comments) {
        // store the information at the necessary scope info
        final AstNode node = (AstNode) comment.getProp(NEAREST_NODE_PROPERTY);
        if (node != null){
          if (node.getProp(ObfuscationScopeInfo.YJS_OBFUSCATION_INFO) == null){
              switch (node.getType()){
                case Token.STRING:
                  if (node.getParent().getType() == Token.COLON && ((ObjectProperty)node.getParent()).getLeft() == node){
                    node.putProp(ObfuscationScopeInfo.YJS_OBFUSCATION_INFO, ObfuscationScopeInfo.DEFAULT);
                  }
                  break;
                case Token.NAME:
                  if (node.getParent().getType() == Token.FUNCTION && ((FunctionNode)node.getParent()).getParams().contains(node)){
                    // exclude parameters from scope
                    ObfuscationScopeInfo.getScopeInfo(node).addBlacklisted(((Name)node).getIdentifier());
                    break;
                  }
                  if (node.getParent() instanceof VariableInitializer&& ((VariableInitializer)node.getParent()).getTarget() == node){
                    // exclude variables from scope
                    ObfuscationScopeInfo.getScopeInfo(node).addBlacklisted(((Name)node).getIdentifier());
                    break;
                  }
                  if (node.getParent().getType() == Token.GETPROP && ((PropertyGet)node.getParent()).getProperty() == node){
                    // exclude property access locally from obfuscation
                    node.putProp(ObfuscationScopeInfo.YJS_OBFUSCATION_INFO, ObfuscationScopeInfo.DEFAULT);
                  }
                  break;
                case Token.VAR:
                case Token.LET:
                case Token.CONST:
                  // exclude variable from scope
                  final ObfuscationScopeInfo scopeInfo = ObfuscationScopeInfo.getScopeInfo(node);
                  for (VariableInitializer var  : ((VariableDeclaration)node).getVariables()) {
                    scopeInfo.addBlacklisted(((Name) var.getTarget()).getIdentifier());
                  }
                  break;
                case Token.BLOCK:
                  node.putProp(ObfuscationScopeInfo.YJS_OBFUSCATION_INFO, comment.getProp(ObfuscationScopeInfo.YJS_OBFUSCATION_INFO));
                  break;
            }
          } else {
            throw new IllegalStateException();
          }
        }
      }
    }
  }

  private static class Lexer {
    private CharSequence input;
    private int index = 0;
    public static int EOF = -1;
    private int c;

    private Lexer(final CharSequence input) {
      this.input = input;
      index = 0;
      c = input.charAt(index);
    }
    
    public CharSequence subSequence(int start, int end) {
      return input.subSequence(start, end);
    }
    
    public int LA(int n) {
      if(index + n < input.length()) {
        return input.charAt(index + n);
      }
      return EOF;
    }
    
    public boolean match(char x) {
      if(x == c) {
        consume();
        return true;
      }
      return false;
    }
    
    public int marker() {
      return index;
    }
    
    public void release(int marker) {
      index = marker;
      c = LA(0);
    }
    
    public boolean match(CharSequence seq) {
      int marker = marker();
      for(int i = 0; i < seq.length(); i++) {
        if(!match(seq.charAt(i))) {
          release(marker);
          return false;
        }
      }
      return true;
    }

    public void consume() {
      index++;
      if(index >= input.length()) c = EOF;
      else c = input.charAt(index);
    }

    public void skipWS() {
      while(Character.isWhitespace(c)) {
        consume();
      }
    }
  }
}
