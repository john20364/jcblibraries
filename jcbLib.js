'use strict';

function jcbCreateNS(ns) {
    let array = ns.split(".");

    // first create the root namespace object
    if (!window[array[0]]) {
        window[array[0]] = {};
    }

    let root = window[array[0]];
    array = array.slice(1);

    for (let i = 0; i < array.length; i++) {
        if (!root[array[i]]) {
            root[array[i]] = {};
        }
        root = root[array[i]];
    }

    return root;
}

jcbCreateNS("jcb.lib").waitForAnyKey = function (nMilliSeconds, func) {
    let keyboard = jcb.lib.KeyBoardFactory.getInstance();
        
    keyboard.clearKeyStates();
    
    function loop () {
        if (document.hasFocus()) {
            if (keyboard.isAnyKey()) {
                clearTimeout(timer);
                if (func) func();
                return;
            }
        }   
        timer = setTimeout(loop, nMilliSeconds);
    }
    let timer = setTimeout(loop, nMilliSeconds);
}