/**
 * Promise polyfill
 * https://github.com/kriskowal/q
 */
!function(a){if("function"==typeof bootstrap)bootstrap("promise",a);else if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=a}else Q=a()}(function(){"use strict";function h(a){return function(){return g.apply(a,arguments)}}function q(a){return a===Object(a)}function r(a){return"[object StopIteration]"===p(a)||a instanceof s}function u(b,c){if(a&&c.stack&&"object"==typeof b&&null!==b&&b.stack&&-1===b.stack.indexOf(t)){for(var d=[],e=c;e;e=e.source)e.stack&&d.unshift(e.stack);d.unshift(b.stack);var f=d.join("\n"+t+"\n");b.stack=v(f)}}function v(a){for(var b=a.split("\n"),c=[],d=0;d<b.length;++d){var e=b[d];y(e)||w(e)||!e||c.push(e)}return c.join("\n")}function w(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function x(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function y(a){var b=x(a);if(!b)return!1;var e=b[0],f=b[1];return e===d&&f>=c&&gb>=f}function z(){if(a)try{throw new Error}catch(b){var c=b.stack.split("\n"),e=c[0].indexOf("@")>0?c[1]:c[2],f=x(e);if(!f)return;return d=f[0],f[1]}}function A(a,b,c){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(b+" is deprecated, use "+c+" instead.",new Error("").stack),a.apply(a,arguments)}}function B(a){return I(a)?a:J(a)?V(a):U(a)}function C(){function k(a){d=a,g.source=a,j(b,function(b,c){f(function(){a.promiseDispatch.apply(a,c)})},void 0),b=void 0,c=void 0}var d,b=[],c=[],e=m(C.prototype),g=m(F.prototype);if(g.promiseDispatch=function(a,e,g){var h=i(arguments);b?(b.push(h),"when"===e&&g[1]&&c.push(g[1])):f(function(){d.promiseDispatch.apply(d,h)})},g.valueOf=function(){if(b)return g;var a=H(d);return I(a)&&(d=a),a},g.inspect=function(){return d?d.inspect():{state:"pending"}},B.longStackSupport&&a)try{throw new Error}catch(h){g.stack=h.stack.substring(h.stack.indexOf("\n")+1)}return e.promise=g,e.resolve=function(a){d||k(B(a))},e.fulfill=function(a){d||k(U(a))},e.reject=function(a){d||k(T(a))},e.notify=function(a){d||j(c,function(b,c){f(function(){c(a)})},void 0)},e}function D(a){if("function"!=typeof a)throw new TypeError("resolver must be a function.");var b=C();try{a(b.resolve,b.reject,b.notify)}catch(c){b.reject(c)}return b.promise}function E(a){return D(function(b,c){for(var d=0,e=a.length;e>d;d++)B(a[d]).then(b,c)})}function F(a,b,c){void 0===b&&(b=function(a){return T(new Error("Promise does not support operation: "+a))}),void 0===c&&(c=function(){return{state:"unknown"}});var d=m(F.prototype);if(d.promiseDispatch=function(c,e,f){var g;try{g=a[e]?a[e].apply(d,f):b.call(d,e,f)}catch(h){g=T(h)}c&&c(g)},d.inspect=c,c){var e=c();"rejected"===e.state&&(d.exception=e.reason),d.valueOf=function(){var a=c();return"pending"===a.state||"rejected"===a.state?d:a.value}}return d}function G(a,b,c,d){return B(a).then(b,c,d)}function H(a){if(I(a)){var b=a.inspect();if("fulfilled"===b.state)return b.value}return a}function I(a){return q(a)&&"function"==typeof a.promiseDispatch&&"function"==typeof a.inspect}function J(a){return q(a)&&"function"==typeof a.then}function K(a){return I(a)&&"pending"===a.inspect().state}function L(a){return!I(a)||"fulfilled"===a.inspect().state}function M(a){return I(a)&&"rejected"===a.inspect().state}function Q(){N.length=0,O.length=0,P||(P=!0)}function R(a,b){P&&(O.push(a),b&&"undefined"!=typeof b.stack?N.push(b.stack):N.push("(no stack) "+b))}function S(a){if(P){var b=k(O,a);-1!==b&&(O.splice(b,1),N.splice(b,1))}}function T(a){var b=F({when:function(b){return b&&S(this),b?b(a):this}},function(){return this},function(){return{state:"rejected",reason:a}});return R(b,a),b}function U(a){return F({when:function(){return a},get:function(b){return a[b]},set:function(b,c){a[b]=c},"delete":function(b){delete a[b]},post:function(b,c){return null===b||void 0===b?a.apply(void 0,c):a[b].apply(a,c)},apply:function(b,c){return a.apply(b,c)},keys:function(){return o(a)}},void 0,function(){return{state:"fulfilled",value:a}})}function V(a){var b=C();return f(function(){try{a.then(b.resolve,b.reject,b.notify)}catch(c){b.reject(c)}}),b.promise}function W(a){return F({isDef:function(){}},function(b,c){return ab(a,b,c)},function(){return B(a).inspect()})}function X(a,b,c){return B(a).spread(b,c)}function Y(a){return function(){function b(a,b){var f;if("undefined"==typeof StopIteration){try{f=c[a](b)}catch(g){return T(g)}return f.done?f.value:G(f.value,d,e)}try{f=c[a](b)}catch(g){return r(g)?g.value:T(g)}return G(f,d,e)}var c=a.apply(this,arguments),d=b.bind(b,"next"),e=b.bind(b,"throw");return d()}}function Z(a){B.done(B.async(a)())}function $(a){throw new s(a)}function _(a){return function(){return X([this,bb(arguments)],function(b,c){return a.apply(b,c)})}}function ab(a,b,c){return B(a).dispatch(b,c)}function bb(a){return G(a,function(a){var b=0,c=C();return j(a,function(d,e,f){var g;I(e)&&"fulfilled"===(g=e.inspect()).state?a[f]=g.value:(++b,G(e,function(d){a[f]=d,0===--b&&c.resolve(a)},c.reject,function(a){c.notify({index:f,value:a})}))},void 0),0===b&&c.resolve(a),c.promise})}function cb(a){return G(a,function(a){return a=l(a,B),G(bb(l(a,function(a){return G(a,e,e)})),function(){return a})})}function db(a){return B(a).allSettled()}function eb(a,b){return B(a).then(void 0,void 0,b)}function fb(a,b){return B(a).nodeify(b)}var a=!1;try{throw new Error}catch(b){a=!!b.stack}var d,s,c=z(),e=function(){},f=function(){function g(){for(;a.next;){a=a.next;var b=a.task;a.task=void 0;var d=a.domain;d&&(a.domain=void 0,d.enter());try{b()}catch(f){if(e)throw d&&d.exit(),setTimeout(g,0),d&&d.enter(),f;setTimeout(function(){throw f},0)}d&&d.exit()}c=!1}var a={task:void 0,next:null},b=a,c=!1,d=void 0,e=!1;if(f=function(a){b=b.next={task:a,domain:e&&process.domain,next:null},c||(c=!0,d())},"undefined"!=typeof process&&process.nextTick)e=!0,d=function(){process.nextTick(g)};else if("function"==typeof setImmediate)d="undefined"!=typeof window?setImmediate.bind(window,g):function(){setImmediate(g)};else if("undefined"!=typeof MessageChannel){var h=new MessageChannel;h.port1.onmessage=function(){d=i,h.port1.onmessage=g,g()};var i=function(){h.port2.postMessage(0)};d=function(){setTimeout(g,0),i()}}else d=function(){setTimeout(g,0)};return f}(),g=Function.call,i=h(Array.prototype.slice),j=h(Array.prototype.reduce||function(a,b){var c=0,d=this.length;if(1===arguments.length)for(;;){if(c in this){b=this[c++];break}if(++c>=d)throw new TypeError}for(;d>c;c++)c in this&&(b=a(b,this[c],c));return b}),k=h(Array.prototype.indexOf||function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1}),l=h(Array.prototype.map||function(a,b){var c=this,d=[];return j(c,function(e,f,g){d.push(a.call(b,f,g,c))},void 0),d}),m=Object.create||function(a){function b(){}return b.prototype=a,new b},n=h(Object.prototype.hasOwnProperty),o=Object.keys||function(a){var b=[];for(var c in a)n(a,c)&&b.push(c);return b},p=h(Object.prototype.toString);s="undefined"!=typeof ReturnValue?ReturnValue:function(a){this.value=a};var t="From previous event:";B.resolve=B,B.nextTick=f,B.longStackSupport=!1,B.defer=C,C.prototype.makeNodeResolver=function(){var a=this;return function(b,c){b?a.reject(b):arguments.length>2?a.resolve(i(arguments,1)):a.resolve(c)}},B.promise=D,B.passByCopy=function(a){return a},F.prototype.passByCopy=function(){return this},B.join=function(a,b){return B(a).join(b)},F.prototype.join=function(a){return B([this,a]).spread(function(a,b){if(a===b)return a;throw new Error("Can't join: not the same: "+a+" "+b)})},B.race=E,F.prototype.race=function(){return this.then(B.race)},B.makePromise=F,F.prototype.toString=function(){return"[object Promise]"},F.prototype.then=function(a,b,c){function h(b){try{return"function"==typeof a?a(b):b}catch(c){return T(c)}}function i(a){if("function"==typeof b){u(a,d);try{return b(a)}catch(c){return T(c)}}return T(a)}function j(a){return"function"==typeof c?c(a):a}var d=this,e=C(),g=!1;return f(function(){d.promiseDispatch(function(a){g||(g=!0,e.resolve(h(a)))},"when",[function(a){g||(g=!0,e.resolve(i(a)))}])}),d.promiseDispatch(void 0,"when",[void 0,function(a){var b,c=!1;try{b=j(a)}catch(d){if(c=!0,!B.onerror)throw d;B.onerror(d)}c||e.notify(b)}]),e.promise},B.when=G,F.prototype.thenResolve=function(a){return this.then(function(){return a})},B.thenResolve=function(a,b){return B(a).thenResolve(b)},F.prototype.thenReject=function(a){return this.then(function(){throw a})},B.thenReject=function(a,b){return B(a).thenReject(b)},B.nearer=H,B.isPromise=I,B.isPromiseAlike=J,B.isPending=K,F.prototype.isPending=function(){return"pending"===this.inspect().state},B.isFulfilled=L,F.prototype.isFulfilled=function(){return"fulfilled"===this.inspect().state},B.isRejected=M,F.prototype.isRejected=function(){return"rejected"===this.inspect().state};var N=[],O=[],P=!0;B.resetUnhandledRejections=Q,B.getUnhandledReasons=function(){return N.slice()},B.stopUnhandledRejectionTracking=function(){Q(),P=!1},Q(),B.reject=T,B.fulfill=U,B.master=W,B.spread=X,F.prototype.spread=function(a,b){return this.all().then(function(b){return a.apply(void 0,b)},b)},B.async=Y,B.spawn=Z,B["return"]=$,B.promised=_,B.dispatch=ab,F.prototype.dispatch=function(a,b){var c=this,d=C();return f(function(){c.promiseDispatch(d.resolve,a,b)}),d.promise},B.get=function(a,b){return B(a).dispatch("get",[b])},F.prototype.get=function(a){return this.dispatch("get",[a])},B.set=function(a,b,c){return B(a).dispatch("set",[b,c])},F.prototype.set=function(a,b){return this.dispatch("set",[a,b])},B.del=B["delete"]=function(a,b){return B(a).dispatch("delete",[b])},F.prototype.del=F.prototype["delete"]=function(a){return this.dispatch("delete",[a])},B.mapply=B.post=function(a,b,c){return B(a).dispatch("post",[b,c])},F.prototype.mapply=F.prototype.post=function(a,b){return this.dispatch("post",[a,b])},B.send=B.mcall=B.invoke=function(a,b){return B(a).dispatch("post",[b,i(arguments,2)])},F.prototype.send=F.prototype.mcall=F.prototype.invoke=function(a){return this.dispatch("post",[a,i(arguments,1)])},B.fapply=function(a,b){return B(a).dispatch("apply",[void 0,b])},F.prototype.fapply=function(a){return this.dispatch("apply",[void 0,a])},B["try"]=B.fcall=function(a){return B(a).dispatch("apply",[void 0,i(arguments,1)])},F.prototype.fcall=function(){return this.dispatch("apply",[void 0,i(arguments)])},B.fbind=function(a){var b=B(a),c=i(arguments,1);return function(){return b.dispatch("apply",[this,c.concat(i(arguments))])}},F.prototype.fbind=function(){var a=this,b=i(arguments);return function(){return a.dispatch("apply",[this,b.concat(i(arguments))])}},B.keys=function(a){return B(a).dispatch("keys",[])},F.prototype.keys=function(){return this.dispatch("keys",[])},B.all=bb,F.prototype.all=function(){return bb(this)},B.allResolved=A(cb,"allResolved","allSettled"),F.prototype.allResolved=function(){return cb(this)},B.allSettled=db,F.prototype.allSettled=function(){return this.then(function(a){return bb(l(a,function(a){function b(){return a.inspect()}return a=B(a),a.then(b,b)}))})},B.fail=B["catch"]=function(a,b){return B(a).then(void 0,b)},F.prototype.fail=F.prototype["catch"]=function(a){return this.then(void 0,a)},B.progress=eb,F.prototype.progress=function(a){return this.then(void 0,void 0,a)},B.fin=B["finally"]=function(a,b){return B(a)["finally"](b)},F.prototype.fin=F.prototype["finally"]=function(a){return a=B(a),this.then(function(b){return a.fcall().then(function(){return b})},function(b){return a.fcall().then(function(){throw b})})},B.done=function(a,b,c,d){return B(a).done(b,c,d)},F.prototype.done=function(a,b,c){var d=function(a){f(function(){if(u(a,e),!B.onerror)throw a;B.onerror(a)})},e=a||b||c?this.then(a,b,c):this;"object"==typeof process&&process&&process.domain&&(d=process.domain.bind(d)),e.then(void 0,d)},B.timeout=function(a,b,c){return B(a).timeout(b,c)},F.prototype.timeout=function(a,b){var c=C(),d=setTimeout(function(){c.reject(new Error(b||"Timed out after "+a+" ms"))},a);return this.then(function(a){clearTimeout(d),c.resolve(a)},function(a){clearTimeout(d),c.reject(a)},c.notify),c.promise},B.delay=function(a,b){return void 0===b&&(b=a,a=void 0),B(a).delay(b)},F.prototype.delay=function(a){return this.then(function(b){var c=C();return setTimeout(function(){c.resolve(b)},a),c.promise})},B.nfapply=function(a,b){return B(a).nfapply(b)},F.prototype.nfapply=function(a){var b=C(),c=i(a);return c.push(b.makeNodeResolver()),this.fapply(c).fail(b.reject),b.promise},B.nfcall=function(a){var b=i(arguments,1);return B(a).nfapply(b)},F.prototype.nfcall=function(){var a=i(arguments),b=C();return a.push(b.makeNodeResolver()),this.fapply(a).fail(b.reject),b.promise},B.nfbind=B.denodeify=function(a){var b=i(arguments,1);return function(){var c=b.concat(i(arguments)),d=C();return c.push(d.makeNodeResolver()),B(a).fapply(c).fail(d.reject),d.promise}},F.prototype.nfbind=F.prototype.denodeify=function(){var a=i(arguments);return a.unshift(this),B.denodeify.apply(void 0,a)},B.nbind=function(a,b){var c=i(arguments,2);return function(){function f(){return a.apply(b,arguments)}var d=c.concat(i(arguments)),e=C();return d.push(e.makeNodeResolver()),B(f).fapply(d).fail(e.reject),e.promise}},F.prototype.nbind=function(){var a=i(arguments,0);return a.unshift(this),B.nbind.apply(void 0,a)},B.nmapply=B.npost=function(a,b,c){return B(a).npost(b,c)},F.prototype.nmapply=F.prototype.npost=function(a,b){var c=i(b||[]),d=C();return c.push(d.makeNodeResolver()),this.dispatch("post",[a,c]).fail(d.reject),d.promise},B.nsend=B.nmcall=B.ninvoke=function(a,b){var c=i(arguments,2),d=C();return c.push(d.makeNodeResolver()),B(a).dispatch("post",[b,c]).fail(d.reject),d.promise},F.prototype.nsend=F.prototype.nmcall=F.prototype.ninvoke=function(a){var b=i(arguments,1),c=C();return b.push(c.makeNodeResolver()),this.dispatch("post",[a,b]).fail(c.reject),c.promise},B.nodeify=fb,F.prototype.nodeify=function(a){return a?(this.then(function(b){f(function(){a(null,b)})},function(b){f(function(){a(b)})}),void 0):this};var gb=z();return B});

/**
 *
 */
if(!window.pbckcode) {
    window.pbckcode = {
        files : []
    };
}

/**
 * Load the script only once
 * @param type
 * @param path
 * @returns {Function|promise|promise|Promise|promise|promise|*}
 */
function loadJsOnceAsync(path) {
    "use strict";
    var q = Q.defer();
    if(window.pbckcode.files.indexOf(path) !== -1) {
        q.resolve("already loaded");
    }
    else {
        window.pbckcode.files.push(path);
        var head = document.getElementsByTagName('HEAD').item(0);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = path;
        head.appendChild(script);

        script.onload = function () {
            q.resolve("file " + path + " loaded!");
        }
    }

    return q.promise;
}

function loadCssOnceAsync(path) {
    "use strict";

    var q = Q.defer();
    if(window.pbckcode.files.indexOf(path) !== -1) {
        q.resolve("already loaded");
    }
    else {
        window.pbckcode.files.push(path);
        var head = document.getElementsByTagName('HEAD').item(0);
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = path;
        link.media = 'all';
        head.appendChild(link);

        q.resolve("file " + path + " loaded!");
    }
    return q.promise;
}


/**
 * load the ACE Editor for the modal
 */
function promise1(resolve, reject) {
    return loadJsOnceAsync(CKEDITOR.plugins.getPath('pbckcode') + "dialogs/ace-1.1.1/ace.js");
};

/**
 * Load PBSyntaxHighlighter class for the dialog modal
 * @param resolve
 * @param reject
 * @returns {Function|promise|promise|Promise|promise|promise|*}
 */
promise2 = function promise2(resolve, reject) {
    return loadJsOnceAsync(CKEDITOR.plugins.getPath('pbckcode') + "dialogs/PBSyntaxHighlighter.js");
};

/**
 * Plugin definition
 */
CKEDITOR.plugins.add('pbckcode', {
    icons      : 'pbckcode',
    lang       : ['fr', 'en'],
    beforeInit : function (editor) {
        loadCssOnceAsync(CKEDITOR.plugins.getPath('pbckcode') + "dialogs/style.css");
    },
    init       : function (editor) {
        var plugin = this;

        editor.ui.addButton('pbckcode', {
            label   : editor.lang.pbckcode.addCode,
            command : 'pbckcodeCommand',
            toolbar : 'pbckcode'
        });
        Q.all([promise1(), promise2()]).then(function () {
            editor.codeId = Math.random().toString(36).substring(3);

            editor.addCommand('pbckcodeCommand', new CKEDITOR.dialogCommand('pbckcodeDialog', {
                allowedContent : 'pre[*]{*}(*)'
            }));

            CKEDITOR.dialog.add('pbckcodeDialog', plugin.path + 'dialogs/pbckcode.js');

            if (editor.contextMenu) {
                editor.addMenuGroup('pbckcodeGroup');
                editor.addMenuItem('pbckcodeItem', {
                    label   : editor.lang.pbckcode.editCode,
                    icon    : plugin.path + "icons/pbckcode.png",
                    command : 'pbckcodeCommand',
                    group   : 'pbckcodeGroup'
                });

                editor.contextMenu.addListener(function (element) {
                    if (element.getAscendant('pre', true)) {
                        return { pbckcodeItem : CKEDITOR.TRISTATE_OFF };
                    }
                });
            }
        },
        function () {
            alert("The pbckcode can not load the required javascript files. Please retry.");
        });
    }
});