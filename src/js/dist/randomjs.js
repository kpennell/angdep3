"use strict";angular.module("app").filter("fromNow",function(){return function(e){return moment(e).fromNow()}}),angular.module("app").filter("noFractionCurrency",["$filter","$locale",function(e,n){var t=e("currency"),r=n.NUMBER_FORMATS;return function(e,n){var i=t(e,n),o=i.indexOf(r.DECIMAL_SEP);return e>=0?i.substring(0,o):i.substring(0,o)+")"}}]),angular.module("app").filter("num",[function(){return function(e){return parseInt(e,10)}}]),angular.module("app").filter("prettyTime",function(){return function(e){var n=Math.floor(e/3600),t="0"+Math.floor(e%3600/60),r="0"+Math.floor(e%60);return t=t.substr(t.length-2),r=r.substr(r.length-2),isNaN(r)?"00:00":n?n+":"+t+":"+r:t+":"+r}}),angular.module("app").filter("upComing",["$parse",function(e){return function(n,t,r){var i=+Date.now()+864e5*(r-.5),o=+Date.now()+864e5*(r+.1),a=e(t);return(n||[]).filter(function(e){var n=+new Date(a(e));return n>i&&o>n})}}]),angular.module("app").directive("appVersion",["version",function(e){return function(n,t){t.text(e)}}]),angular.module("app").directive("ngHideAuth",["simpleLogin","$timeout",function(e,n){var t;return e.watch(function(e){t=!!e}),{restrict:"A",link:function(r,i){function o(){i.addClass("ng-cloak"),n(function(){i.toggleClass("ng-cloak",t!==!1)},0)}o(),e.watch(o,r)}}}]),angular.module("app").directive("ngShowAuth",["simpleLogin","$timeout",function(e,n){var t;return e.watch(function(e){t=!!e}),{restrict:"A",link:function(r,i){function o(){n(function(){i.toggleClass("ng-cloak",!t)},0)}i.addClass("ng-cloak"),o(),e.watch(o,r)}}}]),angular.module("app").directive("setNgAnimate",["$animate",function(e){return{link:function(n,t,r){n.$watch(function(){return n.$eval(r.setNgAnimate,n)},function(n,r){e.enabled(!!n,t)})}}}]),angular.module("app").directive("uiButterbar",["$rootScope","$anchorScroll",function(e,n){return{restrict:"AC",template:'<span class="bar"></span>',link:function(e,t,r){t.addClass("butterbar hide"),e.$on("$stateChangeStart",function(e){n(),t.removeClass("hide").addClass("active")}),e.$on("$stateChangeSuccess",function(e,n,r,i){e.targetScope.$watch("$viewContentLoaded",function(){t.addClass("hide").removeClass("active")})})}}}]),angular.module("app").directive("uiFocus",["$timeout","$parse",function(e,n){return{link:function(t,r,i){var o=n(i.uiFocus);t.$watch(o,function(n){n===!0&&e(function(){r[0].focus()})}),r.bind("blur",function(){t.$apply(o.assign(t,!1))})}}}]),angular.module("app").directive("uiFullscreen",["uiLoad","$document","$window",function(e,n,t){return{restrict:"AC",template:'<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',link:function(t,r,i){r.addClass("hide"),e.load("vendor/libs/screenfull.min.js").then(function(){screenfull.enabled&&!navigator.userAgent.match(/Trident.*rv:11\./)&&r.removeClass("hide"),r.on("click",function(){var e;i.target&&(e=$(i.target)[0]),screenfull.toggle(e)}),n.on(screenfull.raw.fullscreenchange,function(){screenfull.isFullscreen?r.addClass("active"):r.removeClass("active")})})}}}]),angular.module("ui.jq",["ui.load"]).value("uiJqConfig",{}).directive("uiJq",["uiJqConfig","JQ_CONFIG","uiLoad","$timeout",function(e,n,t,r){return{restrict:"A",compile:function(i,o){if(!angular.isFunction(i[o.uiJq])&&!n[o.uiJq])throw new Error('ui-jq: The "'+o.uiJq+'" function does not exist');var a=e&&e[o.uiJq];return function(e,i,o){function u(){var n=[];return o.uiOptions?(n=e.$eval("["+o.uiOptions+"]"),angular.isObject(a)&&angular.isObject(n[0])&&(n[0]=angular.extend({},a,n[0]))):a&&(n=[a]),n}function c(){r(function(){i[o.uiJq].apply(i,u())},0,!1)}function s(){o.uiRefresh&&e.$watch(o.uiRefresh,function(){c()})}o.ngModel&&i.is("select,input,textarea")&&i.bind("change",function(){i.trigger("input")}),n[o.uiJq]?t.load(n[o.uiJq]).then(function(){c(),s()})["catch"](function(){}):(c(),s())}}}}]),angular.module("app").directive("uiModule",["MODULE_CONFIG","uiLoad","$compile",function(e,n,t){return{restrict:"A",compile:function(r,i){var o=r.contents().clone();return function(r,i,a){i.contents().remove(),n.load(e[a.uiModule]).then(function(){t(o)(r,function(e,n){i.append(e)})})}}}}]),angular.module("app").directive("uiNav",["$timeout",function(e){return{restrict:"AC",link:function(e,n,t){var r,i=$(window),o=768,a=$(".app-aside"),u=".dropdown-backdrop";n.on("click","a",function(e){r&&r.trigger("mouseleave.nav");var n=$(this);n.parent().siblings(".active").toggleClass("active"),n.next().is("ul")&&n.parent().toggleClass("active")&&e.preventDefault(),n.next().is("ul")||i.width()<o&&$(".app-aside").removeClass("show off-screen")}),n.on("mouseenter","a",function(e){if(r&&r.trigger("mouseleave.nav"),$("> .nav",a).remove(),!(!$(".app-aside-fixed.app-aside-folded").length||i.width()<o||$(".app-aside-dock").length)){var n,t=$(e.target),c=$(window).height(),s=50,l=150;!t.is("a")&&(t=t.closest("a")),t.next().is("ul")&&(r=t.next(),t.parent().addClass("active"),n=t.parent().position().top+s,r.css("top",n),n+r.height()>c&&r.css("bottom",0),n+l>c&&r.css("bottom",c-n-s).css("top","auto"),r.appendTo(a),r.on("mouseleave.nav",function(e){$(u).remove(),r.appendTo(t.parent()),r.off("mouseleave.nav").css("top","auto").css("bottom","auto"),t.parent().removeClass("active")}),$(".smart").length&&$('<div class="dropdown-backdrop"/>').insertAfter(".app-aside").on("click",function(e){e&&e.trigger("mouseleave.nav")}))}}),a.on("mouseleave",function(e){r&&r.trigger("mouseleave.nav"),$("> .nav",a).remove()})}}}]),angular.module("app").directive("uiScroll",["$location","$anchorScroll",function(e,n){return{restrict:"AC",link:function(t,r,i){r.on("click",function(t){e.hash(i.uiScroll),n()})}}}]),angular.module("app").directive("uiShift",["$timeout",function(e){return{restrict:"A",link:function(n,t,r){function i(){e(function(){var e=r.uiShift,n=r.target;u.hasClass("in")||u[e](n).addClass("in")})}function o(){a&&a.prepend(t),!a&&u.insertAfter(s),u.removeClass("in")}var a,u=$(t),c=$(window),s=u.prev(),l=c.width();!s.length&&(a=u.parent()),768>l&&i()||o(),c.resize(function(){l!==c.width()&&e(function(){c.width()<768&&i()||o(),l=c.width()})})}}}]),angular.module("app").directive("uiToggleClass",["$timeout","$document",function(e,n){return{restrict:"AC",link:function(e,n,t){n.on("click",function(e){function r(e,n){for(var t=new RegExp("\\s"+e.replace(/\*/g,"[A-Za-z0-9-_]+").split(" ").join("\\s|\\s")+"\\s","g"),r=" "+$(n)[0].className+" ";t.test(r);)r=r.replace(t," ");$(n)[0].className=$.trim(r)}e.preventDefault();var i=t.uiToggleClass.split(","),o=t.target&&t.target.split(",")||Array(n),a=0;angular.forEach(i,function(e){var n=o[o.length&&a];-1!==e.indexOf("*")&&r(e,n),$(n).toggleClass(e),a++}),$(n).toggleClass("active")})}}}]),angular.module("changeEmail",["firebase.utils"]).factory("changeEmail",["fbutil","$q",function(e,n){return function(t,r,i,o){function a(){return o.login(p.old.email,t).then(function(e){p.old.uid=e.uid})}function u(){var t=n.defer();return p.old.ref=e.ref("users",p.old.uid),p.old.ref.once("value",function(e){var n=e.val();null===n?t.reject(r+" not found"):(p.old.name=n.name,t.resolve())},function(e){t.reject(e)}),t.promise}function c(){return o.createAccount(p.curr.email,t,p.old.name).then(function(e){p.curr.uid=e.uid})}function s(){var t=n.defer();p.curr.ref=e.ref("users",p.curr.uid);var r={email:p.curr.email,name:p.old.name||""};return p.curr.ref.set(r,function(e){e?t.reject(e):t.resolve()}),t.promise}function l(){var e=n.defer();return p.old.ref.remove(function(n){n?e.reject(n):e.resolve()}),e.promise}function f(){var e=n.defer();return o.removeUser(p.old.email,t).then(function(){e.resolve()},function(n){e.reject(n)}),e.promise}function d(){return o.login(p.curr.email,t)}var p={old:{email:r},curr:{email:i}};return a().then(u).then(c).then(s).then(a).then(l).then(f).then(d)["catch"](function(e){return console.error(e),n.reject(e)})}}]),angular.module("app").service("Player",["$rootScope",function(e){var n;return e.trackPlayingIndex,{playing:!1,play:function(t,r){if(e.trackPlayingIndex=r,!t)return void(this.currentTrack&&n&&(n.play(),this.playing=!0,e.$broadcast("statusChanged",!0)));var i=this;SC.stream(t.properties.stream_url,function(r){n&&n.stop(),r.play({whileplaying:function(){i.duration=Math.floor(this.durationEstimate/1e3),i.position=Math.floor(this.position/1e3),i.progress=this.position/this.durationEstimate*100,e.$broadcast("statusChanged",!0)},onfinish:function(){e.$broadcast("finished")}}),n=r,i.currentTrack=t,i.playing=!0,e.$broadcast("statusChanged",!0)})},pause:function(){n&&(n.pause(),this.playing=!1,e.trackPlayingIndex={},e.$broadcast("statusChanged",!0))},setPosition:function(e){n.setPosition(e*n.duration)}}}]),angular.module("simpleLogin",["firebase","firebase.utils","changeEmail"]).factory("requireUser",["simpleLogin","$q",function(e,n){return function(){return e.getUser().then(function(e){return e?e:n.reject({authRequired:!0})})}}]).factory("simpleLogin",["$firebaseSimpleLogin","fbutil","createProfile","changeEmail","$q","$rootScope",function(e,n,t,r,i,o){function a(){s.getUser().then(function(e){s.user=e||null,angular.forEach(c,function(n){n(e||null)})})}var u=e(n.ref()),c=[],s={user:null,getUser:function(){return u.$getCurrentUser()},login:function(e,n){return u.$login("password",{email:e,password:n,rememberMe:!0})},logout:function(){u.$logout()},createAccount:function(e,n,r){return u.$createUser(e,n).then(function(){return s.login(e,n)}).then(function(n){return t(n.uid,e,r).then(function(){return n})})},changePassword:function(e,n,t){return u.$changePassword(e,n,t)},changeEmail:function(e,n){return r(e,s.user.email,n,this)},removeUser:function(e,n){return u.$removeUser(e,n)},watch:function(e,n){s.getUser().then(function(n){e(n)}),c.push(e);var t=function(){var n=c.indexOf(e);n>-1&&c.splice(n,1)};return n&&n.$on("$destroy",t),t}};return o.$on("$firebaseSimpleLogin:login",a),o.$on("$firebaseSimpleLogin:logout",a),o.$on("$firebaseSimpleLogin:error",a),a(),s}]).factory("createProfile",["fbutil","$q","$timeout",function(e,n,t){return function(r,i,o){function a(e){return u(e.substr(0,e.indexOf("@"))||"")}function u(e){e+="";var n=e.charAt(0).toUpperCase();return n+e.substr(1)}var c=e.ref("users",r),s=n.defer();return c.set({email:i,name:o||a(i)},function(e){t(function(){e?s.reject(e):s.resolve(c)})}),s.promise}}]),angular.module("ui.load",[]).service("uiLoad",["$document","$q","$timeout",function(e,n,t){var r=[],i=!1,o=n.defer();this.load=function(e){e=angular.isArray(e)?e:e.split(/\s+/);var n=this;return i||(i=o.promise),angular.forEach(e,function(e){i=i.then(function(){return e.indexOf(".css")>=0?n.loadCSS(e):n.loadScript(e)})}),o.resolve(),i},this.loadScript=function(i){if(r[i])return r[i].promise;var o=n.defer(),a=e[0].createElement("script");return a.src=i,a.onload=function(e){t(function(){o.resolve(e)})},a.onerror=function(e){t(function(){o.reject(e)})},e[0].body.appendChild(a),r[i]=o,o.promise},this.loadCSS=function(i){if(r[i])return r[i].promise;var o=n.defer(),a=e[0].createElement("link");return a.rel="stylesheet",a.type="text/css",a.href=i,a.onload=function(e){t(function(){o.resolve(e)})},a.onerror=function(e){t(function(){o.reject(e)})},e[0].head.appendChild(a),r[i]=o,o.promise}}]);