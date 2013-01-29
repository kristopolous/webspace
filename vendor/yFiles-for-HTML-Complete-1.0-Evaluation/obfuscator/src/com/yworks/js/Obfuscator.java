package com.yworks.js;

import org.mozilla.javascript.*;
import org.mozilla.javascript.ast.*;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Obfuscator {
  private Arguments args;
  private List<MappingFileInfo> mappingFileInformation = new ArrayList<MappingFileInfo>();
  private Mapper mapper;
  private CompilerEnvirons environment;
  private ErrorReporter testErrorReporter;
  HashMap<String,String> suggestedMapping;

  public Obfuscator(Arguments args) {
    this.args = args;

    environment = new CompilerEnvirons();

    testErrorReporter = new TestErrorReporter();
    environment.setErrorReporter(testErrorReporter);

    environment.setRecordingComments(true);
    environment.setRecordingLocalJsDocComments(true);
    environment.setIdeMode(true);
  }
  
  private void initMapping() throws IOException {
    suggestedMapping = new HashMap<String, String>();
    Map<String, String> obfuscationMap = new HashMap<String, String>();
    HashSet<String> blackList = new HashSet<String>();
    processLibraryDir(obfuscationMap, blackList, args.getLibraryDir(), "");

    for (Iterator<Map.Entry<String, String>> iterator = suggestedMapping.entrySet().iterator(); iterator.hasNext(); ) {
      final Map.Entry<String, String> entry = iterator.next();
      if (entry.getValue() == null) {
        iterator.remove();
      }
    }

    mapper = new Mapper(obfuscationMap.keySet(), blackList, suggestedMapping);
  }

  private void processLibraryDir( final Map<String, String> obfuscationMap, final HashSet<String> blackList, final File dir, String prefix ) throws IOException {
    for (File f : dir.listFiles()) {
      if (f.isDirectory()){
        processLibraryDir(obfuscationMap, blackList, f, prefix + f.getName() + File.separatorChar);
      } else if (f.isFile()) {
        if (f.getName().endsWith("mapping.js") || f.getName().endsWith("mappings.js")){
          MappingFileInfo e = parseMappingFile(f, obfuscationMap, blackList, suggestedMapping);
          e.fileName = prefix + e.fileName;
          mappingFileInformation.add(e);
        } else {
          // library file
          MappingFileInfo info = new MappingFileInfo();
          info.fileName = prefix + f.getName();
          info.mappings = null;
          mappingFileInformation.add(info);
        }
      }
    }
  }

  private AstRoot parseFile( File file ) throws IOException {
    Parser p = new Parser(environment, testErrorReporter);
    Reader r = null;
    AstRoot root = null;
    try {
      r = new FileReader(file);
      root = p.parse(r, null, 0);
      return root;
    } finally {
      if(r != null) {
        try {
          r.close();
        } catch (IOException e) {
        }
      }
    }
  }

  private void printMapping() throws IOException {
    for (MappingFileInfo mappingFileInfo : mappingFileInformation) {
      PrintWriter writer = null;
      try {
        File outFile = new File(args.getLibraryOutDir(), mappingFileInfo.fileName);
        if (!outFile.getParentFile().exists()){
          if (!outFile.getParentFile().mkdirs()){
            throw new IOException("Could not create directory " + outFile.getParentFile());
          }
        }
        if (mappingFileInfo.mappings == null){
          if (!args.getLibraryDir().equals(args.getLibraryOutDir())){
            // plain library file - copy
            copyFile(outFile, new File(args.getLibraryDir(), mappingFileInfo.fileName));
          }
        } else {
          writer = new PrintWriter(new FileWriter(outFile));
          writer.println(mappingFileInfo.prefix != null ? mappingFileInfo.prefix: "yfiles.mappings={");
          boolean first = true;
          for (Map.Entry<String, String[]> entry : mappingFileInfo.mappings.entrySet()) {
            String[] v = entry.getValue();
            {
              if (!first) {
                writer.print(",");
              } else {
                first = false;
              }
              String key = entry.getKey().toString();
              String obfuscatedName = keepUnobfuscated(key)
                                      ? v[0]
                                      : mapper.getObfuscatedName(v[0]);
              String bluntedName = v[1];
              if (obfuscatedName.equals(bluntedName)) {
                writer.printf("'%s':'%s'", key, obfuscatedName);
              } else {
                writer.printf("'%s':['%s','%s']", key, obfuscatedName, bluntedName);
              }
            }
          }
          writer.println();
          writer.println(mappingFileInfo.suffix != null ? mappingFileInfo.suffix : "};");
        }
      } catch (IOException e) {
        throw new IOException("Could not store mapping file " + mappingFileInfo.fileName, e);
      } finally {
        if (writer != null) {
          writer.flush();
          writer.close();
        }
      }
    }
  }

  private void copyFile( final File outFile, final File inFile ) throws IOException {
    FileInputStream fileInputStream = new FileInputStream(inFile);
    try {
      BufferedInputStream bis = new BufferedInputStream(fileInputStream);
      FileOutputStream fileOutputStream = null;
      BufferedOutputStream bos = null;
      try {
      fileOutputStream = new FileOutputStream(outFile);
      bos = new BufferedOutputStream(fileOutputStream);
      int length;
      final byte[] buffer = new byte[1024];
      while ((length = bis.read(buffer, 0, 1024)) >= 0){
        if (length > 0){
          bos.write(buffer, 0, length);
        }
      }
      } finally {
        if (bos != null){
          bos.close();
        }
        if (fileOutputStream != null){
          fileOutputStream.close();
        }
      }
    } finally {
      fileInputStream.close();
    }
  }

  public void obfuscate() throws IOException {
    
    if (args.getLibraryDir() == null || !args.getLibraryDir().isDirectory()){
      throw new IllegalStateException("Library directory not specified correctly.");
    }

    if (args.getLibraryOutDir() == null || !args.getLibraryOutDir().isDirectory()){
      throw new IllegalStateException("Library output directory not specified correctly.");
    }

    initMapping();
    try {
      final UsageVisitor usageVisitor = new UsageVisitor();
      usageVisitor.getBlackList().addAll(args.getBlackList());
      for(Pair pair: args.getPairs()) {
        pair.root = parseFile(pair.getInFile());
      }

      for (Pair pair: args.getPairs()) {
        if (pair.obfuscate){
          ObfuscationScopeInfo.setObfuscationInfo(pair.root, new ObfuscationScopeInfo(true));
        }
        preprocessObfuscationScopes(pair.root);
      }

      for (Pair tuple : args.getPairs()) {
        if (tuple.root != null){
          tuple.root.visit(usageVisitor);
        }
      }

      mapper.getBlackList().addAll(usageVisitor.getBlackList());

      for (Pair tuple : args.getPairs()  ) {
        AstRoot root = tuple.root;
        if (root != null){
          root.visit(new ObfuscationVisitor(mapper));
          PrintWriter out = new PrintWriter(new FileWriter(tuple.getOutFile(), tuple.append));
          try {
            out.println(root.toSource());
          } finally {
            out.flush();
            out.close();
            out = null;
          }
        }
      }
    } catch(IOException e) {
      throw new IOException("Could not write obfuscated code.", e);
    }
    printMapping();
  }

  private void preprocessObfuscationScopes( final AstRoot root ) {
    if(root != null) {
      final ObfuscationScopeVisitor scopeVisitor = new ObfuscationScopeVisitor();
      if (root.getComments() != null){
        scopeVisitor.setComments(root.getComments());
      }
      root.visit(scopeVisitor);
      scopeVisitor.storeComments();
    }
  }

  public static void main(String[] args) throws IOException {
    Obfuscator obfuscator = new Obfuscator(Arguments.parse(args));
    obfuscator.obfuscate();
  }
  
  public static class Arguments {
    private File libraryOutDir;
    private List<File> inputFiles;
    private List<String> blackList = new ArrayList<String>();
    private File libraryDir;
    private final List<Pair> pairs = new ArrayList<Pair>();

    public Arguments() {
      inputFiles = new LinkedList<File>();
    }

    public List<String> getBlackList() {
      return blackList;
    }

    public List<Pair> getPairs() {
      return pairs;
    }

    public File getLibraryOutDir() {
      return libraryOutDir;
    }

    public void setLibraryOutDir( final File libraryOutDir ) {
      this.libraryOutDir = libraryOutDir;
    }

    public File getLibraryDir() {
      return libraryDir;
    }

    public void setLibraryDir( final File libraryDir ) {
      this.libraryDir = libraryDir;
    }

    private void addInput(File cwd, String path) {
      File f = new File(path);
      if (!f.isAbsolute()) {
        f = new File(cwd, path);
      }
      if(f.exists()) {
        if(f.isFile()) {
          inputFiles.add(f);
        } else if(f.isDirectory()) {
          addDirectoryInput(f);
        }
      }
    }
    
    private void addDirectoryInput(File dir) {
      File[] files = dir.listFiles(new FileFilter() {
        public boolean accept(final File file) {
          return file.isDirectory() && !file.isHidden() || file.getName().endsWith(".js");
        }
      });
      for(File f: files) {
        if(f.isFile()) {
          inputFiles.add(f);
        } else if(f.isDirectory()) {
          addDirectoryInput(f);
        }
      }
    }
    
    public static Arguments parse(String[] args) {
      ParserState state = ParserState.UNKNOWN;
      Arguments arguments = new Arguments();
      File cwd = new File(System.getProperty("user.dir"));
      File f;
      for(String s: args) {
        switch (state) {
          case OUTPUT_FILE:
            f = new File(s);
            if(f.isAbsolute()) {
              arguments.addOutput(f);
            } else {
              arguments.addOutput(new File(cwd, s));
            }
            state = ParserState.UNKNOWN;
            break;
          case INPUT_FILE:
            arguments.addInput(cwd, s);
            state = ParserState.UNKNOWN;
            break;
          case KEEP_IDENTIFIER:
            arguments.getBlackList().add(s);
            state = ParserState.UNKNOWN;
            break;
          case LIB_DIR:
            f = new File(s);
            if(f.isAbsolute()) {
              arguments.setLibraryDir(f);
            } else {
              arguments.setLibraryDir(new File(cwd, s));
            }
            state = ParserState.UNKNOWN;
            break;
          case OUT_LIB_DIR:
            f = new File(s);
            if(f.isAbsolute()) {
              arguments.setLibraryOutDir(f);
            } else {
              arguments.setLibraryOutDir(new File(cwd, s));
            }
            state = ParserState.UNKNOWN;
            break;
          default:
            if("-in".equals(s)) {
              state = ParserState.INPUT_FILE;
            } else if("-out".equals(s)) {
              state = ParserState.OUTPUT_FILE;
            } else if("-keep".equals(s)) {
              state = ParserState.KEEP_IDENTIFIER;
            } else if("-lib".equals(s)) {
              state = ParserState.LIB_DIR;
            } else if("-libout".equals(s)) {
              state = ParserState.OUT_LIB_DIR;
            } else {
              throw new IllegalStateException("Could not parse " + s);
            }
            break;
        }
      }
      return arguments;
    }

    private void addOutput( final File f ) {
      int count = 0;
      for (File inputFile : inputFiles) {
        Pair e = new Pair();
        e.setOutFile(f);
        e.setInFile(inputFile);
        e.append = count > 0;
        count++;
        this.pairs.add(e);
      }
      inputFiles.clear();
    }

    private enum ParserState {
      LIB_DIR, OUT_LIB_DIR, INPUT_FILE, OUTPUT_FILE, KEEP_IDENTIFIER, UNKNOWN
    }
  }
  
  private static boolean keepUnobfuscated(String key) {
    return key.startsWith("_$$_");
  }
  
  public static final class Pair {
    private File inFile;
    private File outFile;
    private boolean obfuscate;
    AstRoot root;
    boolean append;

    public File getInFile() {
      return inFile;
    }

    public void setInFile( final File inFile ) {
      this.inFile = inFile;
    }

    public File getOutFile() {
      return outFile;
    }

    public void setOutFile( final File outFile ) {
      this.outFile = outFile;
    }

    public boolean isObfuscate() {
      return obfuscate;
    }

    public void setObfuscate( final boolean obfuscate ) {
      this.obfuscate = obfuscate;
    }
  }

  private static MappingFileInfo parseMappingFile( File fileName, Map<String, String> obfuscationMap, final HashSet<String> blackList, final Map<String, String> suggestedMapping ) throws IOException {
    FileReader fileReader = null;

    Map<String, String[]> mapping = new HashMap<String, String[]>();
    
    try {
      fileReader = new FileReader(fileName);
      StringBuffer mappings = new StringBuffer();
      char[] cbuf = new char[8000];
      int read;
      do {
        read = fileReader.read(cbuf);
        if (read > 0) {
          mappings.append(cbuf, 0, read);
        }
      } while (read > 0);
      Pattern pattern = Pattern.compile("'(.*)':\\[\"(.*)\",\"(.*)\"]");
      Matcher matcher = pattern.matcher(mappings);

      String prefix = "";
      if (matcher.find()) {
        prefix = mappings.substring(0, matcher.start());
        matcher.reset();
      }

      int end = 0;
      while (matcher.find()) {
        String key = matcher.group(1);
        String longName = matcher.group(2);
        String shortName = matcher.group(3);
        
        if (suggestedMapping.containsKey(longName)){
          suggestedMapping.put(longName, null); // mark as used more than once.. 
        } else {
          suggestedMapping.put(longName, shortName);
        }
        
        mapping.put(key, new String[]{longName, shortName});
        end = matcher.end();
      }

      String suffix = "";
      if (end >= 0){
        suffix = mappings.substring(end);
      }

      for(Map.Entry<String, String[]> entry : mapping.entrySet()) {
        final String key = entry.getKey();
        String[] v = entry.getValue();
        final String publicName = v[0];
        if(keepUnobfuscated(key)) {
          blackList.add(publicName);
          continue;
        }
        obfuscationMap.put(publicName, v[1]);
      }
      obfuscationMap.keySet().removeAll(blackList);

      MappingFileInfo mappingFileInfo = new MappingFileInfo();
      mappingFileInfo.fileName = fileName.getName();
      mappingFileInfo.mappings = mapping;
      mappingFileInfo.suffix = suffix;
      mappingFileInfo.prefix= prefix;
      return mappingFileInfo;
    } catch (IOException e) {
      throw new IOException("Error during parsing of mapping file " + fileName.getName(), e);
    } finally {
      if(fileReader != null) {
        try {
          fileReader.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
  }

  private static class TestErrorReporter implements ErrorReporter {
    public void warning(final String message, final String sourceName, final int line, final String lineSource, final int lineOffset) {
      System.err.printf("WARNING: %s (file: %s:%d:%d)\n", message, sourceName, line, lineOffset);
    }

    public void error(final String message, final String sourceName, final int line, final String lineSource, final int lineOffset) {
      System.err.printf("ERROR: %s (file: %s:%d:%d)\n", message, sourceName, line, lineOffset);
    }

    public EvaluatorException runtimeError(final String message, final String sourceName, final int line, final String lineSource, final int lineOffset) {
      System.err.printf("RUNTIME ERROR: %s (file: %s:%d:%d)\n", message, sourceName, line, lineOffset);
      return new EvaluatorException(message, sourceName, line, lineSource, lineOffset);
    }
  }

  private static final class MappingFileInfo {
    String fileName;
    Map<String, String[]> mappings;
    String prefix;
    String suffix;
  }
}
