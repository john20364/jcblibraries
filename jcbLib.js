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

jcbCreateNS("jcb.lib").colorToHexStr = function (red, green, blue) {
    var r = 0;
    var g = 0;
    var b = 0;

    if (red !== undefined) {
        r = red;
        if (green !== undefined) {
            g = green;
            if (blue !== undefined) {
                b = blue;
            }
        } else {
            g = red;
            b = red;
        }
    }
    
    var c = (r << 16) + (g << 8) + b;
    c = c.toString(16).toUpperCase();
    
    while (c.length < 6) {
        c = "0" + c;
    }
    return "#" + c;
}

jcbCreateNS("jcb.lib").colorToRGBStr = function(red, green, blue) {
    var r = 0;
    var g = 0;
    var b = 0;

    if (red !== undefined) {
        r = red;
        if (green !== undefined) {
            g = green;
            if (blue !== undefined) {
                b = blue;
            }
        } else {
            g = red;
            b = red;
        }
    }
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

jcbCreateNS("jcb.lib").colorToRGBAStr = function (red, green, blue, alpha) {
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 255;

    if (red !== undefined) {
        r = red;
        if (green !== undefined) {
            g = green;
            if (blue !== undefined) {
                b = blue;
                if (alpha !== undefined) {
                    a = alpha;
                }
            }
        } else {
            g = red;
            b = red;
        }
    }
    
    return "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
}
