package com.yworks.js;

import org.mozilla.javascript.Node;
import org.mozilla.javascript.Token;
import org.mozilla.javascript.ast.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.SortedSet;

/**
 * This visitor performs the actual obfuscation.
 */
public class ObfuscationVisitor implements NodeVisitor {
  private Mapper mapper;

  public ObfuscationVisitor(Mapper mapper) {
    this.mapper = mapper;
  }
  

  public boolean visit(final AstNode node) {
    ObfuscationScopeInfo obfuscationInfo = ObfuscationScopeInfo.getObfuscationInfo(node);
    if(!obfuscationInfo.isObfuscatedScope()) {
      return true;
    }

    switch (node.getType()){
      case Token.STRING:{
        StringLiteral l = (StringLiteral) node;
        if (l.getParent() instanceof ObjectProperty && ((ObjectProperty)l.getParent()).getLeft() == l){
          final String identifier = l.getValue(false);
          if (!isBlackListed(l) && mapper.shouldObfuscate(identifier)) {
            l.setValue(mapper.getObfuscatedName(identifier));
          }
        }
        break;
      }
      case Token.GETPROP: {
        PropertyGet prop = (PropertyGet) node;
        if (!isBlackListed(prop.getTarget())) {
          if (!isBlackListed(prop.getProperty())) {
            final String identifier = prop.getProperty().getIdentifier();
            if (mapper.shouldObfuscate(identifier)) {
              prop.getProperty().setIdentifier(mapper.getObfuscatedName(identifier));
            }
          }
        }
      }
        break;
    }
    return true;
  }
  private boolean isBlackListed( final AstNode target) {
    if (target == null){
      return true;
    }
    final ObfuscationScopeInfo obfuscationInfo = ObfuscationScopeInfo.getObfuscationInfo(target);
    return obfuscationInfo == null || isBlackListed(target, obfuscationInfo);
  }

  private boolean isBlackListed( final AstNode target, final ObfuscationScopeInfo obfuscationInfo ) {
    if (target == null){
      return true; // top-level items are a no-no
    }
    switch(target.getType()){
      case Token.THIS:
        return obfuscationInfo.isBlacklisted("this");
      case Token.NAME:
        return obfuscationInfo.isBlacklisted(((Name)target).getIdentifier());
      case Token.GETPROP:
        return isBlackListed(((PropertyGet)target).getTarget());
      case Token.CALL:
        return isBlackListed(((FunctionCall)target).getTarget());
      case Token.GETELEM:
        return isBlackListed(((ElementGet)target).getTarget());
      case Token.LP:
        return isBlackListed(((ParenthesizedExpression)target).getExpression());
      case Token.HOOK:
        return isBlackListed(((ConditionalExpression)target).getFalseExpression()) ||
               isBlackListed(((ConditionalExpression)target).getTrueExpression());
    }
    return false;
  }
}
