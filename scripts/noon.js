// ==UserScript==
// @name         Noon
// @downloadURL  https://raw.githubusercontent.com/Leo7654/TMScripts/master/scripts/noon.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://noondate.com/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var pathArray = window.location.pathname.split( '/' );
    function getIdx() {
        return pathArray[3];
    }
    var idx = getIdx();
    $.post('http://noondate.com/v2/dialogs/user_impression', {idx:idx, gender:1}, function(res){
        if (res.indexOf('이미 평가한') > 0) {
            console.debug('이미평가');
        } else {
            console.debug('아직평가');
        }
    });

    // Your code here...
})();
