package com.yworks.js;

import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.Block;
import org.mozilla.javascript.ast.ObjectProperty;
import org.mozilla.javascript.ast.Scope;
import org.mozilla.javascript.ast.ScriptNode;

import java.util.HashSet;
import java.util.Set;

/**
* Contains obfuscation information for a given scope.
*/
public class ObfuscationScopeInfo {
  public static final ObfuscationScopeInfo DEFAULT = new ObfuscationScopeInfo(false);
  public static final int YJS_OBFUSCATION_INFO = 1024;

  private final boolean shouldObfuscate;
  private final Set<String> blacklist;
  private ObfuscationScopeInfo parent;

  public ObfuscationScopeInfo(final boolean shouldObfuscate) {
    this.shouldObfuscate = shouldObfuscate;
    blacklist = new HashSet<String>();
  }
  
  public void addBlacklisted(String name) {
    blacklist.add(name);
  }
  
  public boolean isBlacklisted(String name) {
    return !shouldObfuscate || isBlackListedCore(name);
  }

  private boolean isBlackListedCore( final String name ) {
    return blacklist.contains(name) || (parent != null && parent.isBlackListedCore(name));
  }

  public boolean isObfuscatedScope() {
    return shouldObfuscate;
  }

  public static ObfuscationScopeInfo getObfuscationInfo(AstNode node) {
    while(node != null) {
      ObfuscationScopeInfo localInfo = (ObfuscationScopeInfo)node.getProp(YJS_OBFUSCATION_INFO);
      if(localInfo != null) {
        if (localInfo.parent == null && localInfo != ObfuscationScopeInfo.DEFAULT && node.getParent() != null){
          localInfo.parent = getObfuscationInfo(node.getParent());
        }
        return localInfo;
      }
      node = node.getParent();
    }
    return ObfuscationScopeInfo.DEFAULT;
  }

  /**
   * Places the given ObfuscationScopeInfo at the nearest possible block or scope.
   * @param node
   * @param info
   */
  public static void setObfuscationInfo(AstNode node, ObfuscationScopeInfo info) {
    while(node != null) {
      if(node instanceof Scope || node instanceof Block || node instanceof ObjectProperty) {
        ObfuscationScopeInfo oldInfo = (ObfuscationScopeInfo) node.getProp(YJS_OBFUSCATION_INFO);
        if (oldInfo != null){
          throw new IllegalStateException();
        } else {
          node.putProp(YJS_OBFUSCATION_INFO, info);
        }
        return;
      }
      node = node.getParent();
    }
  }

  public static ObfuscationScopeInfo getScopeInfo( AstNode node ) {
    while (node != null){
      if (node instanceof ScriptNode){
        ObfuscationScopeInfo oldInfo = (ObfuscationScopeInfo) node.getProp(YJS_OBFUSCATION_INFO);
        if (oldInfo != null){
          return oldInfo;
        } else {
          AstNode walker = node.getParent();
          ObfuscationScopeInfo parentInfo = null;
          while (walker != null){
            parentInfo = (ObfuscationScopeInfo) walker.getProp(YJS_OBFUSCATION_INFO);
            if (parentInfo != null){
              break;
            }
            walker = walker.getParent();
          }
          ObfuscationScopeInfo newInfo;
          node.putProp(YJS_OBFUSCATION_INFO, newInfo = new ObfuscationScopeInfo(parentInfo != null && parentInfo.isObfuscatedScope()));
          return newInfo;
        }
      }
      node = node.getParent();
    }
    throw new IllegalStateException();
  }
}
