package com.yworks.js;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.DirectoryScanner;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.types.FileSet;
import org.apache.tools.ant.types.Mapper;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

/**
 * @author muellese
 */
public class JSObfuscateTask extends Task {

  private File libDir;
  private File outLibDir;
  private File blackListFile;
  private String blackList;
  final ArrayList<SourceFileSet> sourceFileSets = new ArrayList<SourceFileSet>();

  public File getOutLibDir() {
    return outLibDir;
  }

  public File getBlackListFile() {
    return blackListFile;
  }

  public void setBlackListFile( final File blackListFile ) {
    this.blackListFile = blackListFile;
  }

  public String getBlackList() {
    return blackList;
  }

  public void setBlackList( final String blackList ) {
    this.blackList = blackList;
  }

  public void setOutLibDir( final File outLibDir ) {
    this.outLibDir = outLibDir;
  }

  public File getLibDir() {
    return libDir;
  }

  public void setLibDir( final File libDir ) {
    this.libDir = libDir;
  }

  public void addSources( SourceFileSet sourceFileSet ) {
    sourceFileSets.add(sourceFileSet);
  }

  @Override
  public void execute() throws BuildException {
    
    if (getLibDir() == null){
      throw new BuildException("Cannot obfuscate with unspecified 'libDir'");
    }
    if (getOutLibDir() == null){
      throw new BuildException("Cannot obfuscate with unspecified 'outLibDir'");
    }
    getProject().log("Beginning Obfuscation", Project.MSG_DEBUG);
    getProject().log("Library Dir: " + getLibDir(), Project.MSG_INFO);
    getProject().log("Output Library Dir: " + getOutLibDir(), Project.MSG_INFO);

    ArrayList<Obfuscator.Pair> pairs = new ArrayList<Obfuscator.Pair>();
    for (SourceFileSet sourceFileSet : sourceFileSets) {
      DirectoryScanner directoryScanner = sourceFileSet.getDirectoryScanner(getProject());
      File outputDir = sourceFileSet.getOutDir();
      if (outputDir == null){
        outputDir = sourceFileSet.getDir(getProject());
      }
      String[] includedFiles = directoryScanner.getIncludedFiles();
      for (String includedFile : includedFiles) {
        File inFile = new File(directoryScanner.getBasedir(), includedFile);
        getProject().log("File to process: " + includedFile, Project.MSG_DEBUG);
        String outFileName = includedFile;
        for (Mapper mapper : sourceFileSet.mappers) {
          String[] strings = mapper.getImplementation().mapFileName(includedFile);
          if (strings != null && strings.length > 0){
            outFileName = strings[0];
            break;
          }
        }
        File outFile = new File(outputDir, outFileName);
        Obfuscator.Pair e = new Obfuscator.Pair();
        e.setInFile(inFile);
        e.setOutFile(outFile);
        e.setObfuscate(sourceFileSet.isObfuscate());
        getProject().log("Registering " + inFile + " -> " + outFile + " for obfuscation.", Project.MSG_INFO);
        getProject().log(sourceFileSet.isObfuscate() ? "Obfuscate file." : "Don't obfuscate file.", Project.MSG_VERBOSE);
        pairs.add(e);
      }
    }

    Obfuscator.Arguments args = new Obfuscator.Arguments();
    String blackList1 = getBlackList();
    addBlackListStrings(args, blackList1);
    File file = getBlackListFile();
    if (file != null) {
      getProject().log("Adding black list from file " + file, Project.MSG_INFO);
      try {
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        String line;
        while ((line = bufferedReader.readLine()) != null) {
          addBlackListStrings(args, line);
        }
      } catch (FileNotFoundException e) {
        throw new BuildException(e);
      } catch (IOException e) {
        throw new BuildException(e);
      }
    }
    args.setLibraryDir(libDir);
    args.setLibraryOutDir(outLibDir);
    args.getPairs().addAll(pairs);
    try {
      getProject().log("Running obfuscator", Project.MSG_VERBOSE);
      new Obfuscator(args).obfuscate();
    } catch (IOException e) {
      throw new BuildException("I/O Error during obfuscation ", e);
    }
  }

  private void addBlackListStrings( final Obfuscator.Arguments args, final String blackList1 ) {
    if (blackList1 != null){
      getProject().log("Parsing blacklist string ´" + blackList1+"´", Project.MSG_DEBUG);
      String[] strings = blackList1.trim().split("\\s*,\\s*");
      for (String string : strings) {
        getProject().log("Adding to blacklist ´" + string+"´", Project.MSG_VERBOSE);
        args.getBlackList().add(string);
      }
    }
  }

  public static final class SourceFileSet extends FileSet {
    private boolean obfuscate;
    private File outDir;
    private ArrayList<Mapper> mappers = new ArrayList<Mapper>();

    public boolean isObfuscate() {
      return obfuscate;
    }

    public void setObfuscate( final boolean obfuscate ) {
      this.obfuscate = obfuscate;
    }

    public File getOutDir() {
      return outDir;
    }

    public void setOutDir( final File outDir ) {
      this.outDir = outDir;
    }

    public void addMapper( Mapper mapper){
      this.mappers.add(mapper);
    }
  }
}
