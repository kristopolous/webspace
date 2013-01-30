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
'use strict';("undefined"!=typeof define?define:function(r,v){v()})([],function(){window.yfiles=window.yfiles||{};window.yfiles.util=yfiles.util||{};yfiles.productname="yFiles for HTML";yfiles.version="1.0";window.yfiles.util.getObjectNS=function(f,d){for(var h=f.split("."),e=window,b=0,j=h.length;b<j;b++)e="undefined"===typeof e[h[b]]?d&&b===j-1?e[h[b]]=d:e[h[b]]={}:e[h[b]];return e};var r="";window.yfiles.TypeDefinition=function(f,d){this.callback=f;this.creator=d;this.namespaceStack=r};window.yfiles.ClassDefinition=
function(f){window.yfiles.TypeDefinition.call(this,f,yfiles.lang.Class)};window.yfiles.ClassDefinition.prototype=new window.yfiles.TypeDefinition;window.yfiles.InterfaceDefinition=function(f){this.creator=yfiles.lang.Trait;window.yfiles.TypeDefinition.call(this,f,yfiles.lang.Trait)};window.yfiles.InterfaceDefinition.prototype=new window.yfiles.TypeDefinition;window.yfiles.StructDefinition=function(f){this.creator=yfiles.lang.Struct;window.yfiles.TypeDefinition.call(this,f,yfiles.lang.Struct)};window.yfiles.StructDefinition.prototype=
new window.yfiles.TypeDefinition;window.yfiles.EnumDefinition=function(f){this.creator=yfiles.lang.Enum;window.yfiles.TypeDefinition.call(this,f,yfiles.lang.Enum)};window.yfiles.EnumDefinition.prototype=new window.yfiles.TypeDefinition;window.yfiles.AttributeDefinition=function(f){window.yfiles.TypeDefinition.call(this,f,yfiles.lang.Attribute)};window.yfiles.AttributeDefinition.prototype=new window.yfiles.TypeDefinition;var v=[];window.yfiles.getLoadedClasses=function(){return v};window.yfiles.replaceTypeDefinition=
function(f,d,h,e){var b=f.value;if(b instanceof yfiles.TypeDefinition){var j=b.callback,p=b.creator,k=yfiles.util.browser.featuresupport.canReplacePropertyDescriptorOnTheFly,n=e||h;Object.defineProperty(d,h,{get:function(){var e=r;r=d.$class&&d.$class.fullName||b.namespaceStack;v.push(r+"."+n);Object.defineProperty(d,h,{get:function(){throw Error("Cyclic declaration!");},configurable:!0});var f=p(n,j());k?Object.defineProperty(d,h,{value:f,configurable:!1}):(setTimeout(function(){Object.defineProperty(d,
h,{value:f,configurable:!1})},0),Object.defineProperty(d,h,{get:function(){return f},configurable:!0}));if(f.$clinit)try{f.$clinit(),delete f.$clinit}catch(t){throw console.log(t),Error("Could not initialize "+f);}r=e;return f},configurable:!0})}else Object.defineProperty(d,h,f)};var F={};window.yfiles.module=function(f,d){var h=yfiles.mappings&&yfiles.mappings[f],e=h&&Array.isArray(h),b=f;h&&(e?(f=h[1],b=h[0]):f=b=h);r=b;var j=yfiles.util.getObjectNS(f),p;e&&(p=yfiles.util.getObjectNS(h[0]));var k=
{};d(k);if(k.$meta)h=k.$meta,delete k.$meta,F[f]?F[f].push(h):F[f]=[h];Object.getOwnPropertyNames(k).forEach(function(d){var e=Object.getOwnPropertyDescriptor(k,d),f=e.value,h;b=d;if(f instanceof yfiles.TypeDefinition&&(h=yfiles.mappings&&yfiles.mappings[d]))Array.isArray(h)?(d=h[1],b=h[0]):(b=d=h,h=void 0);window.yfiles.replaceTypeDefinition(e,j,d,b);p&&Object.defineProperty(p,h&&h[0]||d,{get:function(){return j[d]}})});r=""};yfiles.module("yfiles",function(){yfiles.register=function(f,d){yfiles.util.getObjectNS(f,
d)}});yfiles.module("yfiles.lang.fn",function(f){f.id=function(d){return d};f.join=function(d,h,e){return function(){return h(d.apply(e,arguments))}};f.combine=function(){var d=arguments;return function(){for(var h=0;h<d.length;h++)d[h].apply(this,arguments)}}});yfiles.module("yfiles.lang",function(f){function d(b){for(var e=[],h=1<b.length?b.splice(1):!1,f=0,b=b[0];f<b;f++)e.push(!1===h?[]:d(h));return e}f.defineInvisibleProperty=function(b,d,e){Object.defineProperty(b,d,{value:e,enumerable:!1,writable:!0,
configurable:!0})};f.isFunction=function(b){return"function"===typeof b};f.isArray=function(b){return b&&(Array.isArray(b)||b instanceof Array||"[object Array]"===Object.prototype.toString.call(b))};f.isNumber=function(b){return b instanceof Number};f.isObject=function(b){return b instanceof Object&&"object"===typeof b};f.isPrimitive=function(b){b=typeof b;return"number"===b||"boolean"===b||"string"===b||"undefined"===b};f.copyOwnTo=function(b,d,e){e=e||yfiles.lang.fn.id;Object.getOwnPropertyNames(b).forEach(function(h){var f=
Object.getOwnPropertyDescriptor(b,h),f=e(f,h)||f;window.yfiles.replaceTypeDefinition(f,d,h)});return d};f.newMultiArray=function(){return d(Array.prototype.slice.call(arguments))};var h=f.requestAnimationFrameCore=function(){return window.requestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||window.webkitRequestAnimationFrame||function(b){return setTimeout(b,16)}}();f.requestAnimationFrame=function(b){return h.call(window,b)};var e=
f.cancelRequestAnimationFrameCore=function(){return window.cancelAnimationFrame||window.cancelRequestAnimationFrame||window.mozCancelAnimationFrame||window.mozCancelRequestAnimationFrame||window.msCancelAnimationFrame||window.msCancelRequestAnimationFrame||window.oCancelAnimationFrame||window.oCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||function(b){clearTimeout(b)}}();f.cancelRequestAnimationFrame=function(b){e.call(window,b)};f.getType=
function(b){if(b.getClass)return b.getClass();b=typeof b;return"number"===b||"boolean"===b||"string"===b?yfiles.lang.Class.forName("yfiles.lang."+b.charAt(0).toUpperCase()+b.substr(1)):yfiles.lang.Object.$class}});yfiles.module("yfiles.util.browser.featuresupport",function(f){f.canDecompileFunction=function(){return/abc(.|\n)*xyz/.test(function(){})}();f.canReplacePropertyDescriptorOnTheFly=function(){var d=Object.create({},{test:{get:function(){Object.defineProperty(d,"test",{value:"hello"});return 42},
configurable:!0}});try{return 42===d.test&&"hello"===d.test}catch(h){return!1}}()});yfiles.module("yfiles.lang.HashCode",function(f){var d=0;f.newHashCode=function(){return d++};f.of=function(d){if("string"===typeof d){for(var e=0,b=0,f=d.length;b<f;b++)e+=d.charCodeAt(b)*(31^f-b-1);return e}if(d.hashCode)return d.hashCode()}});(function(){var f=Object.prototype.toString;Object.defineProperty(Object.prototype,"equals",{value:function(d){return f.call(this)===f.call(d)&&this==d},enumerable:!1,writable:!0,
configurable:!0});Object.defineProperty(Object.prototype,"hashCode",{value:function(){if(void 0!==this.$yfiles___hashcode)return this.$yfiles___hashcode;var d=yfiles.lang.HashCode.newHashCode();Object.defineProperty(this,"$yfiles___hashcode",{value:d,enumerable:!1,writable:!0,configurable:!0});return d},enumerable:!1,writable:!0,configurable:!0});Object.defineProperties(String.prototype,{hashCode:{value:function(){for(var d=0,f=0,e=this.length;f<e;f++)d+=this.charCodeAt(f)*(31^e-f-1);return d},enumerable:!1,
writable:!0,configurable:!0},equals:{value:function(d){return"[object String]"===f.call(d)&&d==this},writable:!0,configurable:!0}});Object.defineProperties(Number.prototype,{hashCode:{value:function(){return Math.round(this)}},equals:{value:function(d){return"[object Number]"===f.call(d)&&d==this}}});Object.defineProperties(Boolean.prototype,{hashCode:{value:function(){return this?1:0}},equals:{value:function(d){return"[object Boolean]"===f.call(d)&&this==d}}})})();yfiles.module("yfiles.lang",function(f){function d(a,
c,g){function D(){if(this instanceof c.constructor)"yfiles.lang.Object"!==$super.$class.name&&$super.apply(this,arguments);else throw Error('Missing "new" operator at object instantiation.');}g||(g={isAnonymous:!1});if("string"!==typeof a&&!c)c=a,a="AnonymousClass$"+P++,g.isAnonymous=!0;g.isFlagsEnum||(g.isFlagsEnum=!1);var l=0<r.length?r+"."+a:a,$super=yfiles.lang.Object||Object;if(c.$extends)$super=c.$extends,delete c.$extends;a=c.hasOwnProperty("$static")?c.$static:{};delete c.$static;var d=c.hasOwnProperty("$abstract")?
c.$abstract:!1;delete c.$abstract;g.$meta||(g.$meta={});if(c.$meta)g.$meta[l]=c.$meta,delete c.$meta;var b=null;if(c.hasOwnProperty("$with"))b=c.$with,delete c.$with,L.isTrait(b)||(b=L({$with:b}));yfiles.mappings&&(a=G(a),c=G(c,$super,b));null!==b&&n(l,c,b,d,$super.prototype,g);var f=null;if(c.constructor&&!s(c.constructor))if(c.constructor.$meta)g.$meta["ctor.constructor"]=c.constructor.$meta,c.constructor=c.constructor.value;else{if(f=c.constructor,c.constructor=f["default"]||D,c.constructor.$meta)delete f["default"],
g.$meta["ctor.constructor"]=c.constructor.$meta,c.constructor=c.constructor.value}else if(!c.hasOwnProperty("constructor"))c.constructor=D;var e=c.constructor,i=function(){var a=arguments;return function(c,g){for(var l=0,D=a.length;l<D;l++){var b=a[l](c,g);b&&(c=b)}return c}};e.prototype="yfiles.lang.Class"==l&&!yfiles.lang.Class?C(c,$super,i(x(g),y,z(l))):C(c,Object.create($super.prototype),i(x(g),y,Q($super.prototype),z(l)));$super&&$super.$class&&"Object"!=$super.$class.name&&$super.$class.isAbstract&&
!d&&h($super.prototype,c,l);C(a,e,i(x(g),y,z(l)));f&&Object.getOwnPropertyNames(f).forEach(function(a){var c=f[a];if(!s(c))g.$meta["ctor."+a]=c.$meta,c=c.value;c.displayName=a;c.prototype=e.prototype;Object.defineProperty(e,a,{value:c,writable:!1});yfiles.mappings&&(a=yfiles.mappings[a],"undefined"!==typeof a&&Object.defineProperty(e,a,{value:c}))});e.displayName=l;e.toString=function(){return l};B(l,e,$super,b,g);M=null;return e}function h($super,c,g,D){var l=Object.getPrototypeOf($super),b,d;d=
null!==l&&l.getClass&&(b=l.getClass())&&b.isAbstract&&b!==yfiles.lang.Object.$class?h(l,$super,g,!0):[];Object.getOwnPropertyNames($super).forEach(function(c){var g=Object.getOwnPropertyDescriptor($super,c)||yfiles.lang.Object.getPropertyDescriptor($super,c);o.isAbstract(g)&&d.push(c)});l=d.length;for(b=0;b<l;b++){var e=d[b];if(null!=e){var f=D?Object.getOwnPropertyDescriptor(c,e)||yfiles.lang.Object.getPropertyDescriptor(c,e):c[e];if(!f||o.isAbstract(f)){if(!D)throw Error("Class "+g+" does not implement abstract property/method "+
e);}else d[b]=null}}return d}function e(){i||(i="yfiles"in window&&yfiles.system);return i}function b(a,c,g,b,l,d){var e=l.getAttributesFor((g===i.MemberTypes.CONSTRUCTOR?"ctor.":"")+c);if(g===i.MemberTypes.FIELD)return new i.FieldInfo(c,b,l,e,d);if(g===i.MemberTypes.METHOD)return new i.MethodInfo(c,b,l,e,a[c],d);if(g===i.MemberTypes.CONSTRUCTOR)return new i.ConstructorInfo(c,b,l,e,a[c],d);if(g===i.MemberTypes.PROPERTY){var f=Object.getOwnPropertyDescriptor(a,c),g=f.get?new i.MethodInfo(c,b,l,e,d?
function(){return a[c]}:function(){return this[c]},d,!0):null,f=f.set?new i.MethodInfo(c,b,l,e,d?function(g){return a[c]=g}:function(a){return this[c]=a},d,!0):null;return new i.PropertyInfo(c,b,l,e,g,f,d)}return g===i.MemberTypes.TYPE_INFO?a[c].$class:null}function j(a,c,g){a=Object.getOwnPropertyDescriptor(c,a);if(a.get||a.set)return i.MemberTypes.PROPERTY;a=a.value;return s(a)?a.prototype&&a.prototype===g.Object.prototype?i.MemberTypes.CONSTRUCTOR:a.$class?i.MemberTypes.NESTED_TYPE:i.MemberTypes.METHOD:
i.MemberTypes.FIELD}function p(a,c){return function(){var g=arguments,b=function(){var b=c();if(!s(a))if(a.value)a=a.value;else throw Error("Cannot call attribute constructor "+a);a.apply(b,g);return b};if(this instanceof I)return b();b.init=function(a){return function(){for(var c=b(),g=Object.getOwnPropertyNames(a),d=0,e=g.length;d<e;d++){var f=g[d];c[f]=a[f]}return c}};return b}}function k(a,c){var g,b,d;for(g=2,b=arguments.length;g<b;g++){d=arguments[g];for(var e=2;e<b;e++)if(g!=e){var f=arguments[e];
f&&f.$class.types[d.$class.name]&&(arguments[g]=null)}}var h={};for(g=2,b=arguments.length;g<b;g++)(d=arguments[g])&&d.$members&&Object.getOwnPropertyNames(d.$members).forEach(function(a){var g=x(c)(Object.getOwnPropertyDescriptor(d.$members,a));if(!o.isAbstract(g)&&h.hasOwnProperty(a)){var b=Object.getOwnPropertyDescriptor(h,a);if("value"in g&&!o.isAbstract(h[a])&&h[a]!==g.value){if("value"in b)h[a]=o();else throw Error("Item "+a+" is already declared as a property and cannot be redefined as a method from "+
d);return}if(("get"in g||"set"in g)&&(b.get!==g.get||b.set!==g.set)){if("value"in g)throw Error("Item "+a+" is already declared as a method and cannot be redefined as a property from "+d);Object.defineProperty(h,a,{get:g.get!==b.get?o:g.get||b.get,set:g.set!==b.set?o:g.set||b.set,configurable:g.configurable});return}}a in h||Object.defineProperty(h,a,g)});Object.getOwnPropertyNames(h).forEach(function(c){var g=Object.getOwnPropertyDescriptor(h,c);(!a.hasOwnProperty(c)||o.isAbstract(Object.getOwnPropertyDescriptor(a,
c)))&&Object.defineProperty(a,c,g)});return a}function n(a,c,g,b,$super){b=void 0===b?!1:b;Object.getOwnPropertyNames(g.$members).forEach(function(d){var e=x({})(Object.getOwnPropertyDescriptor(g.$members,d));if(o.isAbstract(e))if(e.value&&!b&&!(d in c)&&!(d in $super)){if(!m(d,e.value,c,$super))throw Error("Class "+a+" does not implement abstract property/method "+d);}else{if(e.get||e.set){if(!b&&!(d in c)&&!(d in $super)&&!m(d,e.get?e.get:e.set,c,$super))throw Error("Class "+a+" does not implement abstract property "+
d);var f=Object.getOwnPropertyDescriptor(c,d)||yfiles.lang.Object.getPropertyDescriptor($super,d),f=f.value?f.value:f;if(e.get&&!f.get)throw Error("Class "+a+" does not implement accessor for property "+d);if(e.set&&!f.set)throw Error("Class "+a+" does not implement mutator for property "+d);}}else!(d in c)&&!(d in $super)&&Object.defineProperty(c,d,e)})}function m(a,c,g,$super){if(c.$altNames){var c=c.$altNames,b=c[0]==a?c[1]:c[0];if(b in g)return b=Object.getOwnPropertyDescriptor(g,b),v(b,c),Object.defineProperty(g,
a,b),!0;if(b in $super)return b=Object.getOwnPropertyDescriptor($super,b),v(b,c),Object.defineProperty($super,a,b),!0}return!1}function O(a,c,g){u=!0;g.name=a;g.types=c;g.type=A.TRAIT;g.isAbstract=!0;a=new q(g);u=!1;return a}function t(a){if(void 0===q)return N;u=!0;a=new q(a);u=!1;return a}function B(a,c,$super,b,d){c.getClass||Object.defineProperty(c.prototype,"getClass",{value:function(){return c.$class}});c.isInstance=function(a){return c.$class.isInstance(a)};c.$super=$super.prototype;var e=
{};e[a]=!0;null!==b&&C(b.$class.types,e);$super.$class&&$super.$class.types&&C($super.$class.types,e);d.name=a;d.constructor=c;d.$extends=$super;d.types=e;d.hasOwnProperty("type")||(d.type=A.CLASS);d.hasOwnProperty("isAbstract")||(d.isAbstract=!0);"yfiles.lang.Class"===a?J[a]=c.$class=t(d):c.$class=Object.freeze(t(d))}function y(a,c){if(s(a.value))a.enumerable=!1,a.configurable="$clinit"===c;return!1}function Q($super){var c=yfiles&&yfiles.lang&&yfiles.lang.Object&&yfiles.lang.Object.getPropertyDescriptor||
Object.getOwnPropertyDescriptor;return function(g,b){var d=c($super,b);if(d&&(s(g.get)||s(g.set))){if(!s(g.set)&&s(d.set))g.set=function(c){d.set.call(this,c)};if(!s(g.get)&&s(d.get))g.get=function(){return d.get.call(this)}}}}function z(){return function(a,c){if(s(a.value))try{a.value.displayName=c}catch(g){}return a}}function x(a){return function(c,g){if(c.value&&"[object Object]"===Object.prototype.toString.call(c.value)){if(c.value.hasOwnProperty("$meta")){var c=c.value,b=c.$meta;if(!a.hasOwnProperty("$meta"))a.$meta=
{};a.$meta[g]=b;if("undefined"!==typeof c.value)void 0===c.writable&&(c.writable=!0);void 0===c.configurable&&(c.configurable=!0);void 0===c.enumerable&&(c.enumerable=!0);return c}if(c.value.hasOwnProperty("get")||c.value.hasOwnProperty("set"))return void 0===c.value.configurable&&(c.value.configurable=!0),void 0===c.value.enumerable&&(c.value.enumerable=!0),c.value}return c}}function G(a,$super,g){var b={};Object.getOwnPropertyNames(a).forEach(function(d){var e=$super,f=Object.getOwnPropertyDescriptor(a,
d),h=yfiles.mappings.hasOwnProperty(d)&&yfiles.mappings[d];if(h&&!Array.isArray(h))Object.defineProperty(b,h,f);else{if(Array.isArray(h))v(f,h);else if((e||g)&&yfiles.lang&&yfiles.lang.Object)e=e&&yfiles.lang.Object.getPropertyDescriptor(e.prototype,d)||g&&yfiles.lang.Object.getPropertyDescriptor(g.$members,d),null!==e&&(h=e.value&&e.value.$altNames||e.get&&e.get.$altNames||e.set&&e.set.$altNames||void 0),"undefined"!==typeof h&&v(f,h);if(Array.isArray(h)){d=0;for(e=h.length;d<e;d++)Object.defineProperty(b,
h[d],f)}else Object.defineProperty(b,d,f)}});if(a.constructor&&"[object Object]"===Object.prototype.toString.call(a.constructor)&&"undefined"===typeof a.constructor.$meta)b.constructor=G(a.constructor);if(a.$static)b.$static=G(a.$static);return b}function v(a,c){if(1<c.length)if("undefined"!==typeof a.value)if("[object Object]"===Object.prototype.toString.call(a.value))if(a.value.hasOwnProperty("get")){if(o.isAbstract(a.value.get))a.value.get=function(){},a.value.get.abstract=yfiles.lang.AbstractProperty;
a.value.get.$altNames=c}else if(a.value.hasOwnProperty("set")){if(o.isAbstract(a.value.set))a.value.set=function(){},a.value.set.abstract=yfiles.lang.AbstractProperty;a.value.set.$altNames=c}else if(a.value.hasOwnProperty("$meta")){if(o.isAbstract(a.value.value))a.value.value=a.value.value();a.value.value.$altNames=c}else{if(o.isAbstract(a.value))a.value=a.value(),a.value.$altNames=c}else{if(o.isAbstract(a.value))a.value=a.value();a.value.$altNames=c}else if("undefined"!==typeof a.get)a.get.$altNames=
c;else if("undefined"!==typeof a.set)a.set.$altNames=c}var s=yfiles.lang.isFunction,C=yfiles.lang.copyOwnTo,K=yfiles.lang.defineInvisibleProperty,J={},P=1,R=1,u=!1,M,A=Object.freeze({TRAIT:"Trait",CLASS:"Class",ENUM:"Enum",STRUCT:"Struct",ATTRIBUTE:"Attribute"}),N={name:"yfiles.lang.Class",types:{"yfiles.lang.Class":!0}},i,E={},q=f.Class=d("Class",{$extends:N,constructor:function(a,c){var l;if(!(this instanceof q))return d(a,c,null);if(!u)throw Error("Cannot create a new instance of yfiles.lang.Class");
var g=a.name;this.fullName=g;var b=g.lastIndexOf(".");this.namespace=0<b?g.substr(0,b):"";this.name=g.substr(b+1);l=this.$$assemblyName$0=g.split(".")[0],g=l;E.hasOwnProperty(g)||(E[g]=null);this.types=a.types;this.isAnonymous=a.isAnonymous;this.isAbstract=a.isAbstract;this.isFlagsEnum=a.isFlagsEnum;this.isArray=!1;this._fields=[];this._valueTypeFields=[];this._membersCache={bindings:0,members:null};this._propertyCache={};this.type=a.type;K(this,"$yfiles___hashcode",yfiles.lang.HashCode.newHashCode());
this.$meta=a.$meta||{};if(this.isClass||this.isEnum)this.$extends=a.$extends,this.$$constructor$0=a.constructor},makeArrayType:function(a){"undefined"===typeof a&&(a=1);u=!0;var c=this.hashCode()*(31^a.hashCode()),a=Object.create(this,{isArray:{value:!0,writable:!0,configurable:!0},rank:{value:a,writable:!0,configurable:!0},$yfiles___hashcode:{value:c,writable:!0,configurable:!0}});u=!1;return a},getArrayRank:function(){return this.isArray&&this.rank||0},getElementType:function(){return this.isArray&&
Object.getPrototypeOf(this)||this},toString:function(){return"[object yfiles.lang.Class<"+this.fullName+">]"},hashCode:function(){return this.$yfiles___hashcode},clone:function(){return this},equals:function(a){return a===this},isInstance:function(a){if("Enum"===this.type){e();for(var c=this.getFields(i.BindingFlags.PUBLIC|i.BindingFlags.STATIC),g=this.isFlagsEnum,b=0,d=0;d<c.length;d++){var f=c[d].getValue();if(g)b|=f;else if(f===a)return!0}return g?(b&a)===a:!1}return a===this||a&&a.getClass&&a.getClass().types[this.fullName]},
isSubclassOf:function(a){return a&&!0===this.types[a.fullName]},isAssignableFrom:function(a){return a&&(a.fullName==this.fullName||a.isSubclassOf(this))},get baseType(){return this.$extends&&this.$extends.$class||null},get assembly(){var a=this.$$assemblyName$0,c=E[a];c||(E[a]=c=new yfiles.lang.Assembly(a));return c},get isClass(){return this.type===A.CLASS},get isEnum(){return this.type===A.ENUM},get isInterface(){return this.type===A.TRAIT},get isPrimitive(){return"yfiles.lang.Number"===this.fullName||
"yfiles.lang.String"===this.fullName||"yfiles.lang.Boolean"===this.fullName},get isPublic(){return!0},get isValueType(){return this.isPrimitive||this.isSubclassOf(yfiles.lang.Struct.$class)},get reflectedType(){return this},get memberType(){e();return i&&i.MemberTypes.TypeInfo||32},newInstance:function(){var a=this.$$constructor$0;if(null===a)throw Error("Cannot instantiate a new object of type "+this.fullName+" using reflection.");var c=Object.create(a.prototype);a.apply(c,arguments);return c},newInstanceFromArray:function(a){var c=
this.$$constructor$0;if(null===c)throw Error("Cannot instantiate a new object of type "+this.fullName+" using reflection.");var g=Object.create(c.prototype);c.apply(g,a);return g},findInterfaces:function(a,c){var g=[];Object.getOwnPropertyNames(this.types).forEach(function(b){b=q.forName(b);b.isInterface&&a(b,c)&&g.push(b)},this);return g},getInterfaces:function(){return this.findInterfaces(function(a){return!a.isAnonymous},null)},$$isValidName$0:function(a,c){if("$class"===a||"$super"===a)return!1;
var g=Object.getOwnPropertyDescriptor(c,a);if(!g)return!1;g=g.value&&g.value.$altNames||g.get&&g.get.$altNames||g.set&&g.set.$altNames||void 0;return!("undefined"!==typeof g&&g[0]!==a)},findMembers:function(a,c,g,d,f){var h=this._membersCache;if(h.members&&h.reflectedType==a&&h.bindingAttr==g&&h.memberType==c){if(!k)return h.members;for(var H=0;H<h.members.length;H++)k.push(h.members[H]);return k}e();d||(d=function(){return!0});var w=this.Object.prototype,k=[];(g&i.BindingFlags.INSTANCE)===i.BindingFlags.INSTANCE&&
Object.getOwnPropertyNames(w).forEach(function(e){if(this.$$isValidName$0(e,w)){var h=j(e,w,this);(c&h)===h&&(e=b(w,e,h,a,this,!1))&&((g&i.BindingFlags.PUBLIC)===i.BindingFlags.PUBLIC&&e.isPublic||(g&i.BindingFlags.NON_PUBLIC)===i.BindingFlags.NON_PUBLIC&&!e.isPublic)&&d(e,f)&&k.push(e)}},this);if((g&i.BindingFlags.STATIC)===i.BindingFlags.STATIC)w=this.Object,Object.getOwnPropertyNames(w).forEach(function(e){if(this.$$isValidName$0(e,w)){var h=j(e,w,this);(c&h)===h&&"arguments"!==e&&"length"!==e&&
"name"!==e&&"caller"!==e&&"displayName"!==e&&"prototype"!==e&&(e=b(w,e,h,a,this,!0))&&((g&i.BindingFlags.PUBLIC)===i.BindingFlags.PUBLIC&&e.isPublic||(g&i.BindingFlags.NON_PUBLIC)===i.BindingFlags.NON_PUBLIC&&!e.isPublic)&&d(e,f)&&k.push(e)}},this);if(0===(g&i.BindingFlags.DECLARED_ONLY))(w=this.baseType)&&(k=k.concat(w.findMembers(a,c,g,d,f)));this._membersCache.bindingAttr=g;this._membersCache.reflectedType=a;this._membersCache.memberType=c;return this._membersCache.members=k},getMembers:function(a){e();
return this.findMembers(this,i.MemberTypes.ALL,a||i.BindingFlags.INSTANCE|i.BindingFlags.PUBLIC|i.BindingFlags.STATIC|i.BindingFlags.DECLARED_ONLY,function(a){return a.isPublic})},getMember:function(a,c){e();return this.findMembers(this,i.MemberTypes.ALL,c||i.BindingFlags.INSTANCE|i.BindingFlags.PUBLIC|i.BindingFlags.STATIC|i.BindingFlags.DECLARED_ONLY,function(c){return c.name===a&&c.isPublic})},getConstructors:function(a){e();return this.findMembers(this,i.MemberTypes.CONSTRUCTOR,a||i.BindingFlags.INSTANCE|
i.BindingFlags.PUBLIC|i.BindingFlags.STATIC|i.BindingFlags.DECLARED_ONLY)},getFields:function(a){e();return this.findMembers(this,i.MemberTypes.FIELD,a||i.BindingFlags.INSTANCE|i.BindingFlags.PUBLIC|i.BindingFlags.STATIC)},getField:function(a,c){for(var g=this.getFields(c),b=0,d=g.length;b<d;b++)if(g[b].name===a)return g[b];return null},getMethods:function(a){e();return this.findMembers(this,i.MemberTypes.METHOD,a||i.BindingFlags.INSTANCE|i.BindingFlags.PUBLIC|i.BindingFlags.STATIC)},getMethod:function(a,
c,g){for(var c=this.getMethods(g),g=0,b=c.length;g<b;g++)if(c[g].name===a)return c[g];return null},getNestedTypes:function(a){e();return this.findMembers(this,i.MemberTypes.NESTED_TYPE,a||i.BindingFlags.INSTANCE|i.BindingFlags.PUBLIC|i.BindingFlags.STATIC|i.BindingFlags.DECLARED_ONLY)},getNestedType:function(a,c){for(var b=this.getNestedTypes(c),d=0,e=b.length;d<e;d++)if(b[d].name===a)return b[d];return null},getProperties:function(a){e();if(this._propertyCache[a])return this._propertyCache[a];var c=
this.findMembers(this,i.MemberTypes.PROPERTY,a||i.BindingFlags.INSTANCE|i.BindingFlags.PUBLIC|i.BindingFlags.STATIC);return this._propertyCache[a]=c},getProperty:function(a,c,b,d){c=this.getProperties(d);b=0;for(d=c.length;b<d;b++)if(c[b].name===a)return c[b];return null},getGenericArguments:function(){return[]},getAttributesFor:function(a){try{if(this.$meta.hasOwnProperty(a)){var c=this.$meta[a];s(c)&&(c=c(),this.$meta[a]=c);if(c&&0<c.length)return s(c[0])&&(c=c.map(function(a){return a()}),this.$meta[a]=
c),c}return[]}catch(b){throw console.log(b),Error("Could not get meta attributes for "+this.name+"."+a);}},getCustomAttributes:function(a){var c=this.getAttributesFor(this.fullName);if(a)(a=this.baseType)&&a instanceof q&&(c=c.concat(a.getCustomAttributes(!0)));return c},getCustomAttributesOfType:function(a,c){for(var b=this.getCustomAttributes(c),d=[],e=0,f=0;f<b.length;f++){var h=b[f];a.isInstance(h)&&(d[e++]=h)}return d},isDefined:function(a,c){for(var b=this.getCustomAttributes(c),d=0,e=b.length;d<
e;d++)if(a.isInstance(b[d]))return!0;return!1},get Object(){return this.$$constructor$0},$static:{forName:function(a){var c=J[a];if(void 0===c){for(var a=a.split("."),c=window,b=0,d=a.length;b<d;b++){if("undefined"===typeof c[a[b]])return null;c=c[a[b]]}return null!=c?c.$class:null}return c},getAssemblies:function(){var a=[];Object.getOwnPropertyNames(E).forEach(function(c){var b=E[c];b||(E[c]=b=new yfiles.lang.Assembly(c));a.push(b)});return a}}}),u=!0;q.$class=new q({name:"yfiles.lang.Class",types:{"yfiles.lang.Class":!0},
type:A.CLASS,isAnonymous:!1,isAbstract:!0,constructor:null,$private:{},$extends:Object});u=!1;f.Assembly=q("Assembly",{constructor:function(a){this.$$name$0=a},get fullName(){return this.$$name$0},isDefined:function(a){return 0<this.getCustomAttributesOfType(a).length},getCustomAttributes:function(){var a=this.$$name$0,c=F[a];if(!c)return[];if(c&&0<c.length){if(s(c[0])){for(var b=[],d=0;d<c.length;d++)for(var e=(0,c[d])(),f=0;f<e.length;f++)b.push(e[f]());return F[a]=b}return c}return[]},getCustomAttributesOfType:function(a){for(var c=
this.getCustomAttributes(),b=[],d=0,e=0,f=c.length;e<f;e++){var h=c[e];a.isInstance(h)&&(b[d++]=h)}return b},getType:function(a){return yfiles.lang.Class.forName(a)},$static:{getExecutingAssembly:function(){return new yfiles.lang.Assembly("yworks")}}});f.Object=q("Object",{constructor:function(){},toString:function(){return"[object "+this.getClass().name+"#"+this.hashCode().toString(16)+"]"},equals:function(a){return this===a},getClass:function(){return Object.getPrototypeOf(this).constructor.$class},
hashCode:function(){var a=this.$$hashCode$0;void 0===a&&(a=yfiles.lang.HashCode.newHashCode(),K(this,"$$hashCode$0",a));return a},memberwiseClone:function(){var a=this.getClass(),c=Object.create(a.Object.prototype);a.isValueType||K(c,"$$hashCode$0",yfiles.lang.HashCode.newHashCode());if(0===a._fields.length&&0===a._valueTypeFields.length){for(var b=Object.getOwnPropertyNames(this),d=0,e=b.length;d<e;d++){var f=b[d],h=this[f];h instanceof yfiles.lang.Struct?(a._valueTypeFields.push(f),c[f]=h.clone()):
(a._fields.push(f),c[f]=h)}return c}b=a._fields;d=0;for(e=b.length;d<e;d++)f=b[d],c[f]=this[f];a=a._valueTypeFields;d=0;for(e=a.length;d<e;d++)f=a[d],c[f]=this[f].clone();return c},getOwnProperty:function(a,c){var c=c||this,b=yfiles.lang.Object.getPropertyDescriptor(this,a);return null===b?null:{get:b.get?b.get.bind(c):void 0,set:b.set?b.set.bind(c):void 0}},$static:{equals:function(a,c){return a===c||a&&c&&a.equals&&a.equals(c)},referenceEquals:function(a,c){return a===c},getPropertyDescriptor:function(a,
c){var b=Object.getOwnPropertyDescriptor(a,c);return!b&&a.getClass&&a.getClass()!==yfiles.lang.Object?yfiles.lang.Object.getPropertyDescriptor(Object.getPrototypeOf(a),c):b||null}}});var o=f.Abstract=q("Abstract",{constructor:function(){if(!(this instanceof o))return new o},$static:{isAbstract:function(a){return a instanceof o||a===o||a===S||a===T?!0:a&&a.value?o.isAbstract(a.value):a&&(a.get||a.set)?a.get&&o.isAbstract(a.get)||a.set&&o.isAbstract(a.set):"function"==typeof a&&o.isAbstract(a["abstract"])?
!0:!1}}}),S=f.AbstractMethod=q("AbstractMethod",{$extends:yfiles.lang.Abstract,constructor:function(){return o()}}),T=f.AbstractProperty=q("AbstractProperty",{$extends:yfiles.lang.Abstract,constructor:function(){return o()}}),U=0,I=f.Attribute=q("Attribute",{$extends:yfiles.lang.Object,constructor:function(a,c){if(!(this instanceof I)){var b=!1;"[object String]"!==Object.prototype.toString.call(a)&&(c=a,a="AnonymousAttribute$"+U++,b=!0);c.$extends||(c.$extends=I);var e,f=function(){return Object.create(e.prototype)};
if(c.hasOwnProperty("constructor"))if(s(c.constructor))c.constructor=p(c.constructor,f);else{c.constructor["default"]||(c.constructor["default"]=function(){});for(var h=Object.getOwnPropertyNames(c.constructor),i=0,w=h.length;i<w;i++){var j=h[i];c.constructor[j]=p(c.constructor[j],f)}}else c.constructor=p(function(){},f);return e=d(a,c,{isAnonymous:b,type:A.ATTRIBUTE})}},$static:{getCustomAttribute:function(a,c){var b=a.getCustomAttributesOfType(c);return 0<b.length?b[0]:null}}}),L=f.Trait=function(a,
c){var b={isAnonymous:!1};if("string"!==typeof a&&!c)c=a,a="AnonymousTrait$"+R++,b.isAnonymous=!0;var d=0<r.length?r+"."+a:a,e=function(){throw Error("Cannot instantiate trait "+d);};e.$name=d;e.toString=function(){return d};yfiles.mappings&&(c=G(c));var f=c.hasOwnProperty("$static")?c.$static:{};delete c.$static;b.$meta||(b.$meta={});if(c.$meta)b.$meta[d]=c.$meta,delete c.$meta;C(f,e);e.$members={};C(c,e.$members,x(b));f={};f[d]=!0;if(c.hasOwnProperty("$with")){var h=c.$with;delete c.$with;delete e.$members.$with;
if(h.hasOwnProperty("$members"))C(h.$class.types,f),h=[e.$members,b,h];else{for(var i=0,j=h.length;i<j;i++){if(void 0==h[i])throw Error("Trying to implement undefined trait in "+(M||d)+" at index "+i);C(h[i].$class.types,f)}h.unshift(e.$members,b)}k.apply(null,h)}e.$class=Object.freeze(O(d,f,b));e.isInstance=function(a){return e.$class.isInstance(a)};e=Object.freeze(e);J[d]=e.$class;return e};f.Trait.isTrait=function(a){return a.$class&&a.$class.isTrait};(function(){var a=1,c=f.Enum=q("Enum",{constructor:function(b,
e){if(this instanceof c)return this;var f=!1;"string"!==typeof b&&!e&&(e=b,b="AnonymousEnum$"+a++,f=!0);if("undefined"===typeof e.$static)e.$static={};e.$extends=yfiles.lang.Enum;var h=e.$Flags||!1,i=0;Object.getOwnPropertyNames(e).forEach(function(a){var b=e[a];"$static"!==a&&"$extends"!==a&&"$Flags"!==a&&("undefined"===typeof b?b=i:i=b,e.$static[a]=b,delete e[a],i++)});var j=d(b,e,{isAnonymous:f,type:A.ENUM,isFlagsEnum:h});j.toString=function(){return"[object "+j.$class.name+"]"};j.contains=function(a,
b){return(b&a)===b};return j},$static:{parse:function(a,b,c){var d=a.Object;if(void 0===c||!c||d[b])return d[b];var e;for(e=0,c=yfiles.lang.Enum.getFilteredOwnPropertyNames(d);e<c.length;e++){var f=c[e];if(yfiles.system.StringExtensions.equals(f,b,yfiles.system.StringComparison.INVARIANT_CULTURE_IGNORE_CASE))return d[f]}throw new yfiles.system.ArgumentException.FromMessage("Enum token "+b+" undefined in "+a);},getName:function(a,b){if(a.isEnum){for(var c=a.Object,d=yfiles.lang.Enum.getFilteredOwnPropertyNames(c),
e=0,f=d.length;e<f;e++){var h=d[e];if(c[h]===b)return h}throw Error("Unknown value "+b+" for Enum "+a.fullName);}throw Error("Not an enum: "+a.fullName);},getFilteredOwnPropertyNames:function(a){var b=Object.getOwnPropertyNames(a);return b=b.filter(function(b){return a.propertyIsEnumerable(b)&&"function"!==typeof a[b]&&"$class"!==b&&"displayName"!==b&&"$super"!=b})}}})})();(function(){var a=0,b=f.Struct=q("Struct",{$extends:f.Object,constructor:function(d,e){if(this instanceof b)return this;"string"!==
typeof d&&!e&&(e=d,d="AnonymousStruct$"+a++);var f=function(){};e.$extends=yfiles.lang.Struct;e.clone=e.clone||function(){var a=this.getClass(),b=new f;if(0===a._fields.length&&0===a._valueTypeFields.length){for(var c=Object.getOwnPropertyNames(this),d=0,e=c.length;d<e;d++){var h=c[d],g=this[h];g instanceof yfiles.lang.Struct?(a._valueTypeFields.push(h),b[h]=g.clone()):(a._fields.push(h),b[h]=g)}return b}c=a._fields;d=0;for(e=c.length;d<e;d++)h=c[d],b[h]=this[h];a=a._valueTypeFields;d=0;for(e=a.length;d<
e;d++)h=a[d],b[h]=this[h].clone();return b};var h;h=q(d,e);f.prototype=h.prototype;if(!h.createDefault)h.createDefault=function(){var a=new f;a.$$init$0&&a.$$init$0();return a};return h},hashCode:function(){var a=this.getClass();if(0===a._fields.length&&0===a._valueTypeFields.length)for(var b=Object.getOwnPropertyNames(this),c=0,d=b.length;c<d;c++){var e=b[c];this[e]instanceof yfiles.lang.Struct?a._valueTypeFields.push(e):a._fields.push(e)}e=1;b=a._fields;c=0;for(d=b.length;c<d;c++){var f=this[b[c]];
f&&!(f instanceof yfiles.lang.Object)&&f.hashCode&&(e=(e<<5)-e+f.hashCode())}b=a._valueTypeFields;c=0;for(d=b.length;c<d;c++)(f=this[b[c]])&&f.hashCode&&(e=(e<<5)-e+f.hashCode());return e},equals:function(a){if(null==a||!this.getClass().isInstance(a))return!1;for(var b=Object.getOwnPropertyNames(this),c=0,d=b.length;c<d;c++){var e=b[c];if(this.propertyIsEnumerable(e)){if(!a.hasOwnProperty(e))return!1;var f=this[e],e=a[e];if(f!==e){if(null==f||null==e)return!1;if(f instanceof yfiles.lang.Struct)if(f.equals(e))continue;
else return!1;if(!yfiles.lang.isFunction(f)||!f.equals||!f.equals(e))return!1}}}return!0}})})();f.Number=q("Number",{});u=!0;f.Number.$class=new q({name:"yfiles.lang.Number",types:{},type:A.CLASS,isAnonymous:!1,isAbstract:!1,constructor:Number,$extends:Object});f.Number.$class.isInstance=function(a){return"[object Number]"===Object.prototype.toString.call(a)};u=!1;f.String=q("String",{});u=!0;f.String.$class=new q({name:"yfiles.lang.String",types:{},type:A.CLASS,isAnonymous:!1,isAbstract:!1,constructor:String,
$extends:Object});f.String.$class.isInstance=function(a){return"[object String]"===Object.prototype.toString.call(a)};u=!1;f.Boolean=q("Boolean",{});u=!0;f.Boolean.$class=new q({name:"yfiles.lang.Boolean",types:{},type:A.CLASS,isAnonymous:!1,isAbstract:!1,constructor:Boolean,$extends:Object});f.Boolean.$class.isInstance=function(a){return"[object Boolean]"===Object.prototype.toString.call(a)};u=!1});yfiles.module("yfiles.lang",function(f){f.Exception=yfiles.lang.Class("Exception",{$extends:Error,
constructor:function(d){yfiles.lang.copyOwnTo(Error(d),this);this.message=d;this.name=this.getClass().name}})});yfiles.module("yfiles.crypto",function(f){f.SHA1={hash:function(d){for(var f=Array(d.length),e=0;e<d.length;e++)f[e]=d.charCodeAt(e);for(var b=8*f.length,d=[],j=e=0;e<f.length;e++,j+=8)d[j>>>5]|=(f[e]&255)<<24-j%32;var f=1732584193,e=4023233417,j=2562383102,p=271733878,k=3285377520;d[b>>>5]|=128<<24-b%32;d[(b+64>>>9<<4)+15]=b;for(b=0;b<d.length;b+=16){for(var n=[],m=0;79>=m;m++)n[m]=16>
m?d[b+m]:(n[m-3]^n[m-8]^n[m-14]^n[m-16])<<1|(n[m-3]^n[m-8]^n[m-14]^n[m-16])>>>31;for(var r=f,t=e,B=j,y=p,v=k,m=0;79>=m;m++){var z=0,x=0;0<=m&&19>=m?(z=t&B|~t&y,x=1518500249):20<=m&&39>=m?(z=t^B^y,x=1859775393):40<=m&&59>=m?(z=t&B|t&y|B&y,x=2400959708):60<=m&&79>=m&&(z=t^B^y,x=3395469782);z=(r<<5|r>>>27)+z+v+x+(n[m]>>>0);v=y;y=B;B=t<<30|t>>>2;t=r;r=z}f+=r;e+=t;j+=B;p+=y;k+=v}f=[f,e,j,p,k];d=[];for(j=e=0;j<32*f.length;j+=8,e++)d[e]=f[j>>>5]>>>24-j%32&255;f="";for(e=0;e<d.length;e++)f+=(d[e]>>4&15).toString(16)+
(d[e]&15).toString(16);return f}}});yfiles.module("yfiles.lang",function(f){f=f.delegate=function(d,f){if(!yfiles.lang.isFunction(d))var e=d,d=d[f],f=e;e=function(){return d.apply(f,arguments)};if(!d.$___belongsTo&&f&&f.getClass)d.$___belongsTo=f.getClass().name;e.handler=e;e.target=f;e.hashCode=function(){return yfiles.lang.HashCode.of(d.name||d.displayName)^41*(f&&f.hashCode?f.hashCode():13)};e.equals=function(b){return null==b?!1:b===this?!0:b.target!==this.target?!1:b.hashCode&&b.hashCode()===
this.hashCode()};return e};f.dynamicInvoke=function(d,f){return d.apply(null,f)};f.createDelegate=function(d,f){var e=function(){for(var b=0,e=d.length;b<e;b++)d[b].apply(f,arguments)};e.handler=d;e.target=f;e.hashCode=function(){for(var b=0,e=0,f=d.length;e<f;e++)b+=d[e].hashCode()^41;return b*(this.target&&this.target.hashCode?this.target.hashCode():13)};e.equals=function(b){return null==b?!1:b===this?!0:b.target!==this.target?!1:b.hashCode&&b.hashCode()===this.hashCode()};return e};f.getInvocationList=
function(d){return!d?[]:d.handler?yfiles.lang.isArray(d.handler)?d.handler:[d.handler]:[d]};f.combine=function(d,f){if(2<arguments.length){for(var e=null,b=0,j=arguments.length;b<j;b++)e=yfiles.lang.delegate.combine(e,arguments[b]);return e}e=yfiles.lang.isArray;if(null==d)return f;if(null==f)return d;b=[];e(d.handler)?Array.prototype.push.apply(b,d.handler):b.push(d);e(f.handler)?Array.prototype.push.apply(b,f.handler):b.push(f);return yfiles.lang.delegate.createDelegate(b)};f.removeAll=function(d,
f){var e=yfiles.lang.delegate.remove,b=null;do b=d,d=e(d,f);while(!b.equals(d));return b};f.remove=function(d,f){var e=yfiles.lang.isArray;if(null==d)return null;if(null==f)return d;if(d===f||d.equals(f))return null;var b=d.handler,j,p,k;if(!e(d.handler)&&!e(f.handler))return d;if(!e(f.handler)){for(e=b.length-1;0<=e;e--)if(b[e]===f||b[e].equals(f)){if(1===b.length)return null;if(2===b.length)return b[0===e?1:0];j=[];if(0<e)for(k=0;k<e;k++)j.push(b[k]);if(e<b.length-1)for(k=0;k<b.length-(e+1);k++)j.push(b[e+
1+k]);return yfiles.lang.delegate.createDelegate(j)}return d}var n=f.handler;if(n.length>b.length)return d;e=b.length-1;a:for(;e>=n.length-1;e--){for(p=0;p<n.length;p++)if(!b[e-p].equals(n[n.length-1-p]))continue a;if(n.length==b.length-1)return e==n.length?b[b.length-1]:b[0];j=[];if(e>n.length)for(k=0;k<e-n.length;k++)j.push(b[k]);if(e<b.length)for(p=0,k=e+1;p<b.length-n.length;k++,p++)j.push(b[k]);break}return yfiles.lang.delegate.createDelegate(j)}})});