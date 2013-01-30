/****************************************************************************
 **
 ** This file is part of yFiles for HTML 1.0.
 ** 
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2013 by yWorks GmbH, Vor dem Kreuzberg 28, 
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
  {
    if(!yfiles.mappings)yfiles.mappings={};
    yfiles.lang.copyOwnTo({
      '_$_kvb':["createInstance","a"],
      '_$_lvb':["sort","a"],
      '_$_mvb':["reverse","b"],
      '_$_nvb':["getEnumerator","c"],
      '_$_ovb':["createintArray","d"],
      '_$_pvb':["createbyteArray","e"],
      '_$_qvb':["createcharArray","f"],
      '_$_rvb':["createlongArray","g"],
      '_$_svb':["createfloatArray","h"],
      '_$_tvb':["createMultiArray","i"],
      '_$_uvb':["createdoubleArray","j"],
      '_$_vvb':["createObjectArray","k"],
      '_$_wvb':["consumeSideEffects","l"],
      '_$_xvb':["createbooleanArray","m"],
      '_$_yvb':["getLength","n"],
      '_$_zvb':["sortTyped","o"],
      '_$_awb':["arrayTypeOf","p"],
      '_$_bwb':["sortComparer","q"],
      '_$_cwb':["getUpperBound","r"],
      '_$_dwb':["sortComparison","s"],
      '_$_ewb':["instanceOfArray","t"],
      '_$_fwb':["copy","u"],
      '_$_gwb':["copyTo","v"],
      '_$_hwb':["sortRange","w"],
      '_$_iwb':["arrayCopy","x"],
      '_$_jwb':["toByte","a"],
      '_$_kwb':["toInt16","b"],
      '_$_lwb':["objectToInt32","c"],
      '_$_mwb':["stringToInt32","d"],
      '_$_nwb':["stringToInt64","e"],
      '_$_owb':["toDouble","f"],
      '_$_pwb':["objectToDouble","g"],
      '_$_qwb':["stringToDouble","h"],
      '_$_rwb':["decimalToDouble","i"],
      '_$_swb':["doubleToString","j"],
      '_$_twb':["toUInt16","k"],
      '_$_uwb':["toUInt32","l"],
      '_$_vwb':["toUInt64","m"],
      '_$_wwb':["objectToBoolean","n"],
      '_$_xwb':["stringToBoolean","o"],
      '_$_ywb':["toDecimal","p"],
      '_$_zwb':["toBase64String","q"],
      '_$_axb':["stringToInt32WithRadix","r"],
      '_$_bxb':["stringToDoubleWithFormat","s"],
      '_$_cxb':["int64ToStringWithBase","t"],
      '_$_dxb':["toBase64StringWithOptions","u"],
      '_$_exb':["DictionaryEnumerator","a"],
      '_$_fxb':["DictionaryKeyCollection","b"],
      '_$_gxb':["DictionaryKeyEnumerator","c"],
      '_$_hxb':["DictionaryValueCollection","d"],
      '_$_ixb':["DictionaryValueEnumerator","e"],
      '_$_jxb':["WithCapacity","f"],
      '_$_kxb':["WithEqualityComparer","g"],
      '_$_lxb':["cast","a"],
      '_$_mxb':["last","b"],
      '_$_nxb':["count","c"],
      '_$_oxb':["first","d"],
      '_$_pxb':["ofType","e"],
      '_$_qxb':["toList","f"],
      '_$_rxb':["reverse","g"],
      '_$_sxb':["toArray","h"],
      '_$_txb':["lastOrDefault","i"],
      '_$_uxb':["firstOrDefault","j"],
      '_$_vxb':["any","k"],
      '_$_wxb':["sum","l"],
      '_$_xxb':["firstFiltered","m"],
      '_$_yxb':["where","n"],
      '_$_zxb':["selectWithSelector","o"],
      '_$_ayb':["select","p"],
      '_$_byb':["enumeratorContains","q"],
      '_$_cyb':["elementAt","r"],
      '_$_dyb':["takeWhile","s"],
      '_$_eyb':["selectMany","t"],
      '_$_fyb':["firstOrDefaultFiltered","u"],
      '_$_gyb':["aggregate","v"],
      '_$_hyb':["catchErrors","a"],
      '_$_iyb':["errorHandler","b"],
      '_$_jyb':["handleError","d"],
      '_$_kyb':["WithCancel","a"],
      '_$_lyb':["With","a"],
      '_$_myb':["WithKeyValueAndNext","b"],
      '_$_nyb':["Enumerator","a"],
      '_$_oyb':["WithCapacity","b"],
      '_$_pyb':["FromEnumerable","c"],
      '_$_qyb':["fromArray","d"],
      '_$_ryb':["WithSeed","a"],
      '_$_syb':["FromFloat","a"],
      '_$_tyb':["FromInt","b"],
      '_$_uyb':["truncate","c"],
      '_$_vyb':["equals","d"],
      '_$_wyb':["convertFrom","e"],
      '_$_xyb':["notEquals","f"],
      '_$_yyb':["sign","a"],
      '_$_zyb':["roundDecimal","b"],
      '_$_azb':["round","c"],
      '_$_bzb':["roundMidpoint","d"],
      '_$_czb':["wait","a"],
      '_$_dzb':["pulse","b"],
      '_$_ezb':["pulseAll","c"],
      '_$_fzb':["waitWithTimeout","d"],
      '_$_gzb':["FromAction","a"],
      '_$_hzb':["FromActionAndItem","b"],
      '_$_izb':["FromActionAndChangedItems","c"],
      '_$_jzb':["FromActionItemsAndIndex","d"],
      '_$_kzb':["FromActionAndItems","e"],
      '_$_lzb':["FromActionNewItemsAndOldItems","f"],
      '_$_mzb':["FromActionItemsAndIndices","g"],
      '_$_nzb':["FromActionNewItemOldItemAndIndex","h"],
      '_$_ozb':["FromActionNewItemsAndIndices","i"],
      '_$_pzb':["FromActionNewItemsOldItemsAndIndex","j"],
      '_$_qzb':["getInstance","a"],
      '_$_rzb':["Empty","a"],
      '_$_szb':["match","b"],
      '_$_tzb':["split","c"],
      '_$_uzb':["matches","d"],
      '_$_vzb':["replace","e"],
      '_$_wzb':["ForType","a"],
      '_$_xzb':["FromBaseNameAndAssembly","b"],
      '_$_yzb':["FromBaseNameAssemblyAndType","c"],
      '_$_zzb':["currentUICulture","a"],
      '_$_aac':["invariantCulture","b"],
      '_$_bac':["FromCultureId","c"],
      '_$_cac':["isNaN","a"],
      '_$_dac':["isDigit","b"],
      '_$_eac':["isLetter","c"],
      '_$_fac':["parseInt","d"],
      '_$_gac':["parseBool","e"],
      '_$_hac':["toBoolean","f"],
      '_$_iac':["isInfinity","g"],
      '_$_jac':["parseNumber","h"],
      '_$_kac':["charToString","i"],
      '_$_lac':["convertNumber","j"],
      '_$_mac':["numberToString","k"],
      '_$_nac':["isLetterOrDigit","l"],
      '_$_oac':["getHashCodeOfNumber","m"],
      '_$_pac':["equals","n"],
      '_$_qac':["boolEquals","o"],
      '_$_rac':["numberEquals","p"],
      '_$_sac':["tryParseBool","q"],
      '_$_tac':["compareNumbers","r"],
      '_$_uac':["parseStyledNumber","s"],
      '_$_vac':["parseFormattedNumber","t"],
      '_$_wac':["WithCapacity","a"],
      '_$_xac':["FromString","b"],
      '_$_yac':["FromStringAndCapacity","c"],
      '_$_zac':["FromStringStartIndexLengthAndCapacity","d"],
      '_$_abc':["newStringBuilder","e"],
      '_$_bbc':["newStringBuilderFromString","f"],
      '_$_cbc':["currentThread","a"],
      '_$_dbc':["FromParameterizedThreadStart","b"],
      '_$_ebc':["FromThreadStart","c"],
      '_$_fbc':["sleep","d"],
      '_$_gbc':["WithObject","a"],
      '_$_hbc':["WithTargetAndTrackResurrection","b"],
      '_$_ibc':["xmlns","a"],
      '_$_jbc':["get","b"],
      '_$_kbc':["add","d"],
      '_$_lbc':["equals","e"],
      '_$_mbc':["convertFrom","f"],
      '_$_nbc':["notEquals","g"],
      '_$_obc':["get","a"],
      '_$_pbc':["equals","c"],
      '_$_qbc':["convertFrom","d"],
      '_$_rbc':["notEquals","e"],
      '_$_sbc':["toInt32","a"],
      '_$_tbc':["toInt64","b"],
      '_$_ubc':["toDouble","c"],
      '_$_vbc':["toSingle","d"],
      '_$_wbc':["boolToString","e"],
      '_$_xbc':["doubleToString","f"],
      '_$_ybc':["singleToString","g"],
      '_$_zbc':["intToString","h"],
      '_$_acc':["longToString","i"],
      '_$_bcc':["toBoolean","j"],
      '_$_ccc':["createForStream","a"],
      '_$_dcc':["createForWriter","b"],
      '_$_ecc':["WithTable","a"],
      '_$_fcc':["uTF8","a"],
      '_$_gcc':["now","a"],
      '_$_hcc':["FromJsDate","b"],
      '_$_icc':["FromMillis","c"],
      '_$_jcc':["fromDate","d"],
      '_$_kcc':["parse","e"],
      '_$_lcc':["subtract","f"],
      '_$_mcc':["lessThanOrEqual","g"],
      '_$_ncc':["greaterThanOrEqual","h"],
      '_$_occ':["FromTotalMillis","a"],
      '_$_pcc':["FromDaysHoursMinutesSecondsAndMillis","b"],
      '_$_qcc':["fromDays","c"],
      '_$_rcc':["fromSeconds","d"],
      '_$_scc':["fromMilliseconds","e"],
      '_$_tcc':["equals","f"],
      '_$_ucc':["lessThan","g"],
      '_$_vcc':["notEquals","h"],
      '_$_wcc':["greaterThan","i"],
      '_$_xcc':["lessThanOrEqual","j"],
      '_$_ycc':["greaterThanOrEqual","k"],
      '_$_hec':["compareToObject","a"],
      '_$_iec':["toString","a"],
      '_$_jec':["key","a"],
      '_$_kec':["keys","a"],
      '_$_lec':["objectKeys","b"],
      '_$_nec':["value","b"],
      '_$_oec':["values","d"],
      '_$_pec':["objectValues","e"],
      '_$_qec':["current","c"],
      '_$_rec':["currentObject","d"],
      '_$_sec':["syncRoot","f"],
      '_$_tec':["isReadOnly","g"],
      '_$_uec':["isFixedSize","a"],
      '_$_vec':["isFixedSize","h"],
      '_$_wec':["isSynchronized","i"],
      '_$_yec':["clear","j"],
      '_$_zec':["reset","e"],
      '_$_afc':["dispose","f"],
      '_$_bfc':["endInit","a"],
      '_$_cfc':["moveNext","g"],
      '_$_dfc':["beginInit","b"],
      '_$_efc':["getObjectEnumerator","k"],
      '_$_ffc':["getEnumerator","l"],
      '_$_gfc':["getDictionaryEnumerator","m"],
      '_$_hfc':["addWithValue","b"],
      '_$_ifc':["add","n"],
      '_$_jfc':["removeValue","d"],
      '_$_kfc':["removeWithKey","o"],
      '_$_mfc':["remove","p"],
      '_$_nfc':["removeKey","q"],
      '_$_ofc':["indexOfItem","e"],
      '_$_qfc':["indexOf","h"],
      '_$_rfc':["containsValue","m"],
      '_$_sfc':["containsWithValue","r"],
      '_$_ufc':["contains","s"],
      '_$_vfc':["get","o"],
      '_$_wfc':["getObject","q"],
      '_$_xfc':["getObject","t"],
      '_$_yfc':["get","u"],
      '_$_zfc':["removeAt","r"],
      '_$_agc':["compareTo","b"],
      '_$_bgc':["containsKey","v"],
      '_$_cgc':["equalsTyped","a"],
      '_$_dgc':["getHashCode","a"],
      '_$_egc':["addPropertyChangedListener","a"],
      '_$_fgc':["removePropertyChangedListener","b"],
      '_$_ggc':["addWithKeyAndValue","w"],
      '_$_hgc':["addKeyValue","x"],
      '_$_igc':["copyTo","y"],
      '_$_jgc':["copyToArrayAt","z"],
      '_$_kgc':["itemsEqual","b"],
      '_$_lgc':["insertAt","t"],
      '_$_mgc':["insert","u"],
      '_$_ngc':["compare","a"],
      '_$_ogc':["setObject","v"],
      '_$_pgc':["set","w"],
      '_$_qgc':["putObject","A"],
      '_$_rgc':["put","B"],
      '_$_sgc':["tryGetValue","C"],
      '_$_tgc':["getCastedEnumerable","D"],
      '_$_ugc':["getLastElement","E"],
      '_$_vgc':["getElementCount","F"],
      '_$_wgc':["getFirstElement","G"],
      '_$_xgc':["getEnumerableOfType","H"],
      '_$_ygc':["getEnumerableAsList","I"],
      '_$_zgc':["getReversedEnumerable","J"],
      '_$_ahc':["getEnumerableAsArray","K"],
      '_$_bhc':["getLastElementOrDefault","L"],
      '_$_chc':["getFirstOrDefault","M"],
      '_$_dhc':["enumerableContainsMatch","N"],
      '_$_ehc':["getElementSum","O"],
      '_$_fhc':["getMatchingElements","P"],
      '_$_ghc':["getProjectionWithIndex","Q"],
      '_$_hhc':["getProjection","R"],
      '_$_ihc':["enumerableContains","S"],
      '_$_jhc':["getElementAt","T"],
      '_$_khc':["getTakeWhileEnumerable","U"],
      '_$_lhc':["getMultiProjection","V"],
      '_$_mhc':["getAggregation","W"],
      '_$_nhc':["days","c"],
      '_$_ohc':["name","a"],
      '_$_phc':["next","b"],
      '_$_qhc':["seed","a"],
      '_$_rhc':["count","a"],
      '_$_shc':["index","a"],
      '_$_thc':["ticks","a"],
      '_$_uhc':["value","c"],
      '_$_vhc':["cancel","a"],
      '_$_whc':["jsDate","b"],
      '_$_xhc':["length","a"],
      '_$_yhc':["parent","b"],
      '_$_zhc':["target","a"],
      '_$_aic':["isAlive","b"],
      '_$_bic':["success","c"],
      '_$_cic':["capacity","x"],
      '_$_dic':["encoding","a"],
      '_$_eic':["ignoreCase","a"],
      '_$_fic':["millisecond","c"],
      '_$_gic':["isBackground","a"],
      '_$_hic':["milliseconds","d"],
      '_$_iic':["numberFormat","c"],
      '_$_jic':["propertyName","a"],
      '_$_kic':["totalSeconds","e"],
      '_$_lic':["currentDictionaryObject","a"],
      '_$_mic':["typeArguments","k"],
      '_$_nic':["currentUICulture","b"],
      '_$_oic':["totalMilliseconds","f"],
      '_$_pic':["numberDecimalSeparator","a"],
      '_$_qic':["naturalSort","A"],
      '_$_ric':["flush","b"],
      '_$_sic':["start","c"],
      '_$_tic':["sample","c"],
      '_$_uic':["reverse","B"],
      '_$_vic':["toArray","C"],
      '_$_wic':["asReadOnly","X"],
      '_$_xic':["nextDouble","d"],
      '_$_yic':["nextBoolean","e"],
      '_$_zic':["writeNewLine","c"],
      '_$_ajc':["getKeyCollectionEnumerator","a"],
      '_$_bjc':["getValueCollectionEnumerator","a"],
      '_$_cjc':["getListEnumerator","Y"],
      '_$_djc':["toUniversalTime","d"],
      '_$_ejc':["getStringBuilder","d"],
      '_$_fjc':["find","Z"],
      '_$_gjc':["sort","ab"],
      '_$_hjc':["split","a"],
      '_$_ijc':["startWithParameter","d"],
      '_$_jjc':["write","e"],
      '_$_kjc':["appendObject","b"],
      '_$_ljc':["appendString","c"],
      '_$_mjc':["copyToArray","bb"],
      '_$_njc':["equalsDecimal","a"],
      '_$_ojc':["isMatch","b"],
      '_$_pjc':["nextInt","f"],
      '_$_qjc':["addRange","cb"],
      '_$_rjc':["charAt","d"],
      '_$_sjc':["subtractTimeSpan","e"],
      '_$_tjc':["findIndex","db"],
      '_$_ujc':["getObject","b"],
      '_$_vjc':["getString","c"],
      '_$_wjc':["nextBytes","g"],
      '_$_xjc':["removeAll","eb"],
      '_$_yjc':["writeLine","f"],
      '_$_zjc':["writeObject","g"],
      '_$_akc':["appendNumber","e"],
      '_$_bkc':["appendBoolean","f"],
      '_$_ckc':["containsValue","X"],
      '_$_dkc':["writeLineObject","h"],
      '_$_ekc':["sortWithComparison","fb"],
      '_$_fkc':["insertChars","g"],
      '_$_gkc':["insertAt","h"],
      '_$_hkc':["replace","c"],
      '_$_ikc':["setChar","i"],
      '_$_jkc':["getObjectForCulture","d"],
      '_$_kkc':["getStringForCulture","e"],
      '_$_lkc':["removeRange","gb"],
      '_$_mkc':["binarySearch","hb"],
      '_$_nkc':["rangeToString","j"],
      '_$_okc':["nextIntInRange","h"],
      '_$_pkc':["appendChars","k"],
      '_$_qkc':["appendFormat","l"],
      '_$_rkc':["insertCharsAt","m"],
      '_$_fhd':["addCollectionChangedListener","x"],
      '_$_tid':["removeCollectionChangedListener","A"],
      '_$_nle':["action","a"],
      '_$_pme':["indent","a"],
      '_$_pre':["encoding","b"],
      '_$_qse':["newItems","b"],
      '_$_tse':["oldItems","c"],
      '_$_yue':["localName","a"],
      '_$_dve':["xmlNamespace","b"],
      '_$_mze':["closeOutput","c"],
      '_$_maf':["indentChars","d"],
      '_$_aef':["newlineChars","e"],
      '_$_eef':["outputMethod","f"],
      '_$_rgf':["namespaceName","c"],
      '_$_sgf':["namespaceName","a"],
      '_$_qlf':["checkCharacters","g"],
      '_$_nnf':["newlineHandling","h"],
      '_$_xpf':["namespaceManager","a"],
      '_$_ypf':["newStartingIndex","d"],
      '_$_bqf':["oldStartingIndex","e"],
      '_$_jsf':["namespaceHandling","i"],
      '_$_lvf':["omitXmlDeclaration","j"],
      '_$_gyf':["newlineOnAttributes","k"],
      '_$_dqg':["popScope","a"],
      '_$_sqg':["pushScope","b"],
      '_$_kug':["writeEndElement","c"],
      '_$_uug':["writeEndDocument","d"],
      '_$_jvg':["writeStartDocument","e"],
      '_$_ech':["getBytes","a"],
      '_$_sgh':["writeCData","f"],
      '_$_lhh':["convertFrom","a"],
      '_$_zih':["writeString","g"],
      '_$_ujh':["canConvertTo","b"],
      '_$_lkh':["lookupPrefix","c"],
      '_$_glh':["writeComment","h"],
      '_$_lnh':["canConvertFrom","c"],
      '_$_oph':["convertToString","d"],
      '_$_lqh':["lookupNamespace","d"],
      '_$_rth':["convertFromString","e"],
      '_$_syh':["getNamespaceOfPrefix","e"],
      '_$_uyh':["getPrefixOfNamespace","f"],
      '_$_nai':["writeDocumentFragment","i"],
      '_$_tci':["convertToInvariantString","f"],
      '_$_dei':["convertFromInvariantString","g"],
      '_$_uji':["convertTo","h"],
      '_$_nli':["convertFrom1","i"],
      '_$_pmi':["addNamespace","g"],
      '_$_smi':["canConvertTo1","j"],
      '_$_goi':["canConvertFrom1","k"],
      '_$_oqi':["writeStartElement","j"],
      '_$_iri':["registerLocalMapping","h"],
      '_$_lri':["writeAttributeString","k"],
      '_$_ori':["redeclareLocalMapping","i"],
      '_$_csi':["convertToInvariantString1","l"],
      '_$_qsi':["convertFromInvariantString1","m"],
      '_$_tsi':["writeProcessingInstruction","l"],
      '_$_mui':["convertFrom2","n"],
      '_$_gvi':["writeNSStartElement","m"],
      '_$_lvi':["writeNSAttributeString","n"],
      '_$_jwi':["convertTo1","o"],
      '_$_hxi':["writePrefixedNSAttributeString","o"],
      '_$_tgj':["writeEndElementCore","p"],
      '_$_cij':["createNamespaceManager","q"],
      '_$_brj':["writeXmlNode","r"],
      '_$_awk':["writeStartElementCore","s"],
      '_$_yxk':["writeAttributeCore","t"],
      '_$_kal':["firstWithPredicate","Tb"],
      '_$_lal':["firstOrDefault","Ub"],
      '_$_iel':["conformanceLevel","l"],
      '_$_tbn':["Activator","FDD"],
      '_$_ubn':["ArrayExtensions","SDD"],
      '_$_vbn':["Convert","TDD"],
      '_$_wbn':["Base64FormattingOptions","UDD"],
      '_$_xbn':["Dictionary","VDD"],
      '_$_ybn':["EnumerableExtensions","WDD"],
      '_$_zbn':["ErrorHandling","XDD"],
      '_$_acn':["EventArgs","YDD"],
      '_$_bcn':["CancelEventArgs","ZDD"],
      '_$_ccn':["ICollection","XED"],
      '_$_dcn':["ICollection","YED"],
      '_$_ecn':["IDictionary","ZED"],
      '_$_fcn':["IDictionary","AFD"],
      '_$_gcn':["IDictionaryEnumerator","BFD"],
      '_$_hcn':["IEnumerable","CFD"],
      '_$_icn':["IEnumerable","DFD"],
      '_$_jcn':["IEnumerator","EFD"],
      '_$_kcn':["IEnumerator","FFD"],
      '_$_lcn':["IEqualityComparer","GFD"],
      '_$_mcn':["EqualityComparer","HFD"],
      '_$_ncn':["IList","IFD"],
      '_$_ocn':["IList","JFD"],
      '_$_pcn':["ISupportInitialize","KFD"],
      '_$_qcn':["KeyValuePair","LFD"],
      '_$_rcn':["List","MFD"],
      '_$_scn':["Random","NFD"],
      '_$_tcn':["Decimal","OFD"],
      '_$_ucn':["Math","PFD"],
      '_$_vcn':["MidpointRounding","QFD"],
      '_$_wcn':["Monitor","RFD"],
      '_$_xcn':["INotifyCollectionChanged","SFD"],
      '_$_ycn':["NotifyCollectionChangedEventHandler","TFD"],
      '_$_zcn':["NotifyCollectionChangedEventArgs","UFD"],
      '_$_adn':["NotifyCollectionChangedAction","VFD"],
      '_$_bdn':["NumberFormatInfo","WFD"],
      '_$_cdn':["NumberStyles","XFD"],
      '_$_ddn':["PropertyChangedEventArgs","YFD"],
      '_$_edn':["INotifyPropertyChanged","ZFD"],
      '_$_fdn':["PropertyChangedEventHandler","AGD"],
      '_$_gdn':["ReadOnlyCollection","BGD"],
      '_$_hdn':["TargetException","CGD"],
      '_$_idn':["GenericMethodInfo","OGD"],
      '_$_jdn':["Regex","SGD"],
      '_$_kdn':["Match","TGD"],
      '_$_ldn':["MatchCollection","UGD"],
      '_$_mdn':["ResourceManager","VGD"],
      '_$_ndn':["CultureInfo","WGD"],
      '_$_odn':["MissingManifestResourceException","XGD"],
      '_$_pdn':["IComparable","ZGD"],
      '_$_qdn':["IObjectComparable","AHD"],
      '_$_rdn':["IDisposable","BHD"],
      '_$_sdn':["IEquatable","CHD"],
      '_$_tdn':["IFormattable","DHD"],
      '_$_udn':["Attribute","EHD"],
      '_$_vdn':["PrimitiveExtensions","FHD"],
      '_$_wdn':["IComparer","GHD"],
      '_$_xdn':["IComparer","HHD"],
      '_$_ydn':["StringWriter","IHD"],
      '_$_zdn':["StringBuilder","JHD"],
      '_$_aen':["StringSplitOptions","LHD"],
      '_$_ben':["Thread","NHD"],
      '_$_cen':["ParameterizedThreadStart","OHD"],
      '_$_den':["ThreadStart","PHD"],
      '_$_een':["SleepDelegate","QHD"],
      '_$_fen':["TypeConverter","RHD"],
      '_$_gen':["WeakReference","SHD"],
      '_$_hen':["XmlNodeType","THD"],
      '_$_ien':["XmlNamespace","UHD"],
      '_$_jen':["XmlName","VHD"],
      '_$_ken':["XmlConvert","WHD"],
      '_$_len':["DomXmlWriter","XHD"],
      '_$_men':["XmlNamespaceManager","YHD"],
      '_$_nen':["NameTable","ZHD"],
      '_$_oen':["XmlWriterSettings","AID"],
      '_$_pen':["ConformanceLevel","BID"],
      '_$_qen':["NamespaceHandling","CID"],
      '_$_ren':["NewlineHandling","DID"],
      '_$_sen':["XmlOutputMethod","EID"],
      '_$_ten':["Encoding","FID"],
      '_$_uen':["YDateTime","GID"],
      '_$_ven':["TimeSpan","HID"],
      '_$$_lq':["WithName","a"],
      '_$$_mq':["WithDescription","a"],
      '_$$_nq':["With","a"],
      '_$$_oq':["ConvertedFrom","b"],
      '_$$_pq':["WithState","a"],
      '_$$_qq':["WithTypeName","a"],
      '_$$_rq':["WithType","b"],
      '_$$_sq':["FromMessage","a"],
      '_$$_tq':["FromMessageAndParameter","b"],
      '_$$_uq':["FromMessageAndException","c"],
      '_$$_vq':["WithMessage","a"],
      '_$$_wq':["FromMessageAndException","b"],
      '_$$_xq':["trim","a"],
      '_$$_yq':["toCharArray","b"],
      '_$$_zq':["toEnumerable","c"],
      '_$$_ar':["isNullOrEmpty","d"],
      '_$$_br':["toLowerInvariant","e"],
      '_$$_cr':["isNullOrWhiteSpace","f"],
      '_$$_dr':["createFromCharArray","g"],
      '_$$_er':["split","h"],
      '_$$_fr':["format","i"],
      '_$$_gr':["isEqual","j"],
      '_$$_hr':["toLower","k"],
      '_$$_ir':["toUpper","l"],
      '_$$_jr':["contains","m"],
      '_$$_kr':["endsWith","n"],
      '_$$_lr':["toString","o"],
      '_$$_mr':["trimChars","p"],
      '_$$_nr':["isNotEqual","q"],
      '_$$_or':["startsWith","r"],
      '_$$_pr':["lastIndexOf","s"],
      '_$$_qr':["stringEquals","t"],
      '_$$_rr':["wrapAndFormat","u"],
      '_$$_sr':["equals","v"],
      '_$$_tr':["insert","w"],
      '_$$_ur':["indexOf","x"],
      '_$$_vr':["replace","y"],
      '_$$_wr':["indexOfAny","z"],
      '_$$_xr':["wrapAndFormat2","A"],
      '_$$_yr':["splitWithOptions","B"],
      '_$$_zr':["formatWithProvider","C"],
      '_$$_as':["toStringWithFormat","D"],
      '_$$_bs':["createFromCharArrayRange","E"],
      '_$$_ds':["name","a"],
      '_$$_es':["type","b"],
      '_$$_fs':["type","a"],
      '_$$_gs':["member","b"],
      '_$$_hs':["canRead","b"],
      '_$$_js':["canWrite","c"],
      '_$$_ks':["isPublic","d"],
      '_$$_ls':["isStatic","b"],
      '_$$_ms':["position","c"],
      '_$$_ns':["fieldType","c"],
      '_$$_os':["isPrivate","e"],
      '_$$_ps':["attributes","c"],
      '_$$_qs':["isOptional","c"],
      '_$$_rs':["isOptional","d"],
      '_$$_ss':["memberType","f"],
      '_$$_ts':["returnType","g"],
      '_$$_us':["visibility","a"],
      '_$$_vs':["propertyType","g"],
      '_$$_ws':["declaringType","h"],
      '_$$_xs':["isConstructor","i"],
      '_$$_ys':["parameterType","e"],
      '_$$_zs':["reflectedType","j"],
      '_$$_ct':["getGetMethod","i"],
      '_$$_dt':["getSetMethod","k"],
      '_$$_et':["getParameters","l"],
      '_$$_ft':["getIndexParameters","l"],
      '_$$_gt':["getValue","g"],
      '_$$_ht':["invokeConstructor","g"],
      '_$$_it':["makeGenericMethod","m"],
      '_$$_jt':["getCustomAttributes","n"],
      '_$$_kt':["invoke","o"],
      '_$$_lt':["getValue","m"],
      '_$$_mt':["setValue","i"],
      '_$$_nt':["isDefined","p"],
      '_$$_ot':["toParameterInfo","d"],
      '_$$_pt':["getCustomAttributesOfType","q"],
      '_$$_qt':["setValue","o"],
      '_$$_ccb':["state","a"],
      '_$$_jcb':["value","a"],
      '_$$_meb':["category","a"],
      '_$$_jfb':["browsable","a"],
      '_$$_ygb':["description","a"],
      '_$$_zgb':["displayName","a"],
      '_$$_vkb':["converterTypeName","a"],
      '_$$_fsb':["descriptionValue","b"],
      '_$$_gsb':["displayNameValue","b"],
      '_$$_ysb':["setValue","b"],
      '_$$_kec':["yfiles.system","Root"],
      '_$$_lec':["CategoryAttribute","GDD"],
      '_$$_mec':["yfiles.support","Root"],
      '_$$_nec':["DescriptionAttribute","HDD"],
      '_$$_oec':["DisplayNameAttribute","IDD"],
      '_$$_pec':["DefaultValueAttribute","JDD"],
      '_$$_qec':["BrowsableAttribute","KDD"],
      '_$$_rec':["EditorBrowsableAttribute","LDD"],
      '_$$_sec':["EditorBrowsableState","MDD"],
      '_$$_tec':["DesignerSerializationVisibilityAttribute","NDD"],
      '_$$_uec':["DesignerSerializationVisibility","ODD"],
      '_$$_vec':["TypeConverterAttribute","PDD"],
      '_$$_wec':["ThreadStaticAttribute","QDD"],
      '_$$_xec':["FlagsAttribute","RDD"],
      '_$$_yec':["yfiles.collections","Root"],
      '_$$_zec':["yfiles.objectcollections","Root"],
      '_$$_afc':["ArgumentException","AED"],
      '_$$_bfc':["ArgumentNullException","BED"],
      '_$$_cfc':["ArgumentOutOfRangeException","CED"],
      '_$$_dfc':["InvalidOperationException","DED"],
      '_$$_efc':["IndexOutOfRangeException","EED"],
      '_$$_ffc':["ArithmeticException","FED"],
      '_$$_gfc':["FormatException","GED"],
      '_$$_hfc':["InvalidProgramException","HED"],
      '_$$_ifc':["IOException","IED"],
      '_$$_jfc':["NotImplementedException","JED"],
      '_$$_kfc':["NotSupportedException","KED"],
      '_$$_lfc':["KeyNotFoundException","LED"],
      '_$$_mfc':["NullReferenceException","MED"],
      '_$$_nfc':["ObjectDisposedException","NED"],
      '_$$_ofc':["ThreadAbortException","OED"],
      '_$$_pfc':["ThreadInterruptedException","PED"],
      '_$$_qfc':["SecurityException","QED"],
      '_$$_rfc':["ClassNotFoundException","RED"],
      '_$$_sfc':["XmlException","SED"],
      '_$$_tfc':["InvalidCastException","TED"],
      '_$$_ufc':["ArrayTypeMismatchException","UED"],
      '_$$_vfc':["OverflowException","VED"],
      '_$$_wfc':["ApplicationException","WED"],
      '_$$_xfc':["MethodAttributes","DGD"],
      '_$$_yfc':["TypeAttribute","EGD"],
      '_$$_zfc':["ParameterAttribute","FGD"],
      '_$$_agc':["Visibility","GGD"],
      '_$$_bgc':["VisibilityAttribute","HGD"],
      '_$$_cgc':["MemberTypes","IGD"],
      '_$$_dgc':["BindingFlags","JGD"],
      '_$$_egc':["MemberInfo","KGD"],
      '_$$_fgc':["MethodBase","LGD"],
      '_$$_ggc':["ConstructorInfo","MGD"],
      '_$$_hgc':["MethodInfo","NGD"],
      '_$$_igc':["ParameterInfo","PGD"],
      '_$$_jgc':["PropertyInfo","QGD"],
      '_$$_kgc':["FieldInfo","RGD"],
      '_$$_lgc':["ICloneable","YGD"],
      '_$$_mgc':["StringExtensions","KHD"],
      '_$$_ngc':["StringComparison","MHD"]
    },yfiles.mappings);
  }
  return undefined;
});