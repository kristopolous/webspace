package com.yworks.js;

import org.mozilla.javascript.Token;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.Name;
import org.mozilla.javascript.ast.NodeVisitor;
import org.mozilla.javascript.ast.StringLiteral;

import java.util.Collection;
import java.util.HashSet;

/**
 * @author muellese
 */
public class UsageVisitor implements NodeVisitor{
  
  private final HashSet<String> blackList = new HashSet<String>();

  public Collection<String> getBlackList() {
    return blackList;
  }

  public boolean visit( final AstNode node ) {
    switch (node.getType()){
      case Token.STRING: {
        ObfuscationScopeInfo obfuscationInfo = ObfuscationScopeInfo.getObfuscationInfo(node);
        String value = ((StringLiteral) node).getValue(false);
        if (!obfuscationInfo.isObfuscatedScope() || obfuscationInfo.isBlacklisted(value)) {
          blackList.add(value);
        }
      }
        break;
      case Token.NAME: {
        String identifier = ((Name) node).getIdentifier();
        ObfuscationScopeInfo obfuscationInfo = ObfuscationScopeInfo.getObfuscationInfo(node);
        if (!obfuscationInfo.isObfuscatedScope() || obfuscationInfo.isBlacklisted(identifier)) {
          blackList.add(identifier);
        }
      }
        break;
    }
    return true;
  }
}
