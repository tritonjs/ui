/**
 * Page Router.
 *
 * @author Jared Allard <jaredallard@outlook.com>
 * @version 1.0.0
 * @license MIT
 **/
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),Route=function(){function e(t,o){_classCallCheck(this,e),console.log("constructed a new route"),t&&(this._path=t),o&&(this._code=o)}return _createClass(e,[{key:"use",value:function(e){this._code=e}},{key:"path",value:function(e){this._path=e}}]),e}(),Router=function(){function e(){_classCallCheck(this,e),console.log("constructed router."),this.active=!1,this.routes=[],this.binds=[]}return _createClass(e,[{key:"hook",value:function(){var e=this;this.active=!0,console.log("router hooked into page.");var t=function(){console.log("router: started pace");var t=document.location.hash.replace(/^#/,"");""===t&&(t="/"),console.log("router: page ->",t),$("#dom").css("background","#FFFFFF"),$("#dom").html("");var o=0;e.routes.forEach(function(n){n.path===t&&(console.log("router: page hit on index:",o),console.log("router: route ->",n),n.code(function(){$(document).ready(function(){console.log("router: finished loading anything"),console.log("router: executing bind(s)"),e.binds.forEach(function(e){e.code()}),Pace.stop()})}),o++)})};window.onhashchange=function(){Pace.start({document:!1}),t()},t()}},{key:"isActive",value:function(){return this.active}},{key:"use",value:function(e){return!(!e._path||!e._code)&&(this.routes.push({path:e._path,code:e._code,object:e}),void console.log("registered route",e._path,"onto Router"))}},{key:"bind",value:function(e){this.binds.push({code:e}),console.log("router: new bind added, total:",this.binds.length)}}]),e}(),triton=new Triton($),router=new Router,login=new Route("/login");login.use(function(e){return $.cookie("triton_userapikey")?(console.log("LOGIN: already set cookie, go ahead..."),window.location.hash="/dashboard"):($("#dom").html(TRITON.templates.login()),e())});var register=new Route("/register");register.use(function(e){return $("#dom").html(TRITON.templates.register()),e()});var index=new Route("/");index.use(function(e){return $("#dom").html(TRITON.templates.index()),e()});var dash=new Route("/dashboard");dash.use(function(e){triton.get("users").then(function(t){var o=gravatar(t.email,{size:200}),n=t.display_name;triton.get("assignments/list").then(function(t){return t.forEach(function(e){var t=(e.created,new moment(e.created).format("MM/DD/YY"));console.log("eval date to",t),e.json=JSON.stringify(e),e.created=t}),$("#dom").html(TRITON.templates.dashboard({header:TRITON.templates.dash_header({image:o,info:n}),assignments:t,footer:TRITON.templates.dash_footer()})),e()})})});var sett=new Route("/dashboard/settings");sett.use(function(e){triton.get("users").then(function(t){var o=gravatar(t.email,{size:200}),n=t.display_name;return $("#dom").html(TRITON.templates.settings({header:TRITON.templates.dash_header({image:o,info:n}),footer:TRITON.templates.dash_footer(),display_name:t.display_name,email:t.email})),e()})});var logout=new Route("/dashboard/logout");logout.use(function(e){return triton.invalidateCache("assignments/list"),$.cookie("triton_userapikey",void 0,{path:"/",domain:window.API_CONFIG.cdomain}),$.cookie("triton_username",void 0,{path:"/",domain:window.API_CONFIG.cdomain}),window.location.href="/",console.log("logged out user"),e()});var loading=new Route("/workspace");loading.use(function(e){return $("#dom").html(TRITON.templates.loading()),e()});var assigninfo=new Route("/dashboard/assignment");assigninfo.use(function(e){if(!$.cookie("triton_assignmentinfo"))return window.location.hash="/dashboard";var t;try{t=JSON.parse($.cookie("triton_assignmentinfo"))}catch(o){return $.cookie("triton_assignmentinfo",void 0),window.location.hash="/dashboard"}triton.get("users").then(function(o){var n=gravatar(o.email,{size:200}),a=o.display_name;return $("#dom").html(TRITON.templates.assigninfo({header:TRITON.templates.dash_header({image:n,info:a}),footer:TRITON.templates.dash_footer(),assignment:t})),e()})});var admindash=new Route("/admin");admindash.use(function(e){triton.get("users").then(function(t){console.log("users:",t);var o=gravatar(t.email,{size:200}),n=t.display_name;return $("#dom").html(TRITON.templates.admindash({header:TRITON.templates.admindash_header({image:o,info:n}),name:t.display_name.split(" ")[0],footer:TRITON.templates.dash_footer()})),e()})}),router.use(index),router.use(login),router.use(dash),router.use(admindash),router.use(sett),router.use(logout),router.use(loading),router.use(register),router.use(assigninfo),window.ROUTER=router,router.hook();