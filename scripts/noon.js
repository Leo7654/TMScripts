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
        if (res.indexOf('이미 평가한') > 0 || res.indexOf('제한시간') > 0) {
            console.debug('이미평가');
        } else {
            console.debug('아직평가');
            const params = {
                gender:0,
                idx:idx,
                'impression[appearance]': 5,
                'impression[carrer]': 0,
                'impression[story]': 0,
            };
            const res = api.call('api/user_impression', params, null);
            console.debug(res);
        }
    });

    $('a[href^="javascript: select"]').each(function(index){
        const idx = this.href.match(/javascript: select\( (\d+),(\d+), false \)/)[1];
        const other_idx = 1;//this.href.match(/javascript: select\( (\d+),(\d+), false \)/)[2];
        console.debug('select('+idx+', '+0+', false)');
        api.call('api/card_select', {idx: idx, other_idx : other_idx, theme : false }, function(res) {
            location.href = "http://noondate.com/v2/cards/" + idx;
        });
    });

    $('a[href^="javascript: api.dialog(\'select_more\'').each(function(index){
        const idx = this.href.match(/javascript: api\.dialog\(\'select_more\', \{idx: (\d+) \}/)[1];
        const other_idx = 1;
        console.debug('select('+idx+', '+0+', false)');
        api.call('api/card_select', {idx: idx, other_idx : other_idx, theme : false }, function(res) {
            location.href = "http://noondate.com/v2/cards/" + idx;
        });
    });
    // Your code here...
})();
