package com.yworks.js;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * The Mapper is responsible for storing and generating obfuscated names for a given property access or string.
 * It will only obfuscate names that it knows.
 */
public class Mapper {
  private Map<String, String> mapping;
  private int index = 0;
  private static final List<Character> firstChars;
  private HashSet<String> blackList;
  private HashMap<String, String> suggestedMapping;

  static {
    firstChars = new ArrayList<Character>();
    for(char c = 'a'; c <= 'z'; c++) {
      firstChars.add(c);
    }
    for(char c = 'A'; c <= 'Z'; c++) {
      firstChars.add(c);
    }
  }

  /**
   * Creates a new instance that will generate a new mapping for every entry within the provided iterable.
   * @param obfuscationWhitelist
   * @param blackList
   * @param suggestedMapping
   */
  public Mapper( final Iterable<String> obfuscationWhitelist, final HashSet<String> blackList, final HashMap<String, String> suggestedMapping ) {
    this(new HashMap<String, String>(), blackList);
    this.suggestedMapping = suggestedMapping;
    for(String key : obfuscationWhitelist) {
      mapping.put(key, null);
    }
  }

  private Mapper( final Map<String, String> obfuscationMap, final HashSet<String> blackList ) {
    mapping = obfuscationMap;
    this.blackList = blackList;
  }

  public Set<String> getBlackList() {
    return blackList;
  }

  public String getObfuscatedName(String name) {
    String mapped = mapping.get(name);
    if(mapped == null) {
      if (!isBlackListed(name)){
        if (suggestedMapping != null){
          String newName = suggestedMapping.get(name);
          if (newName != null){
            mapped = newName;
          }
        }
        if (mapped == null){
          mapped = generateObfuscatedName();
        }
      } else {
        mapped = name;
      }
      mapping.put(name, mapped);
    }
    return mapped;
  }
  
  private static final HashSet<String> _blackList = new HashSet<String>(Arrays.asList(new String[]{"children", "Error", "createDefault", "appendChild", "childNodes", "insertBefore", "replaceChild", "valueOf", "getName", "parse", "delegate","length","size","get","set","continue","window","document","Object","String","Number","Math","min","max","Array","createElement", "setProperty","getProperty","handleError", "addEventListener","removeEventListener"}));

  private boolean isBlackListed( final String name ) {
    return _blackList.contains(name) || this.blackList.contains(name);
  }

  private String generateObfuscatedName() {
    return generateShortName("__", index++);
  }

  private String generateShortName(String prefix, int idx) {
      if (idx < firstChars.size())
      {
        if (prefix == null || prefix.length() == 0) {
          return String.valueOf(firstChars.get(idx));
        } else {
          StringBuffer b = new StringBuffer(prefix.length()+1);
          b.append(prefix).append(firstChars.get(idx));
          return b.toString();
        }
      } else {
        StringBuilder b = new StringBuilder(prefix.length() + 4);
        if (prefix != null){
          b.append(prefix);
        }
        int remainder = idx;
        while (remainder > 0) {
          int mod = remainder % firstChars.size();
          b.append(firstChars.get(mod));
          remainder = remainder / firstChars.size();
        }
        return b.toString();
      }
  }

  public boolean shouldObfuscate(final String identifier) {
    return mapping.containsKey(identifier);
  }
}
