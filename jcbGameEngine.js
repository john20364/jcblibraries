'use strict';

jcbCreateNS("jcb.lib").GameEngine = function (nScreenWidth, nScreenHeight) {
    this.nScreenWidth = nScreenWidth;
    this.nScreenHeight = nScreenHeight;
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.nScreenWidth;
    this.canvas.height = this.nScreenHeight;
    this.canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto";
//    this.canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid blue";
    this.fLastTime = 0;
    this.bPaused = false;
    
    let that = this;
    
    window.onblur = function () {
        that.bPaused = true;
        that.onPause();
    };

    
    // Clear screen
    this.clearScreen = function (sColor) {
        this.context.fillStyle = sColor;
        this.context.fillRect(0, 0, 
                              this.nScreenWidth, 
                              this.nScreenHeight);
    };

    this.box = function (x, y, w, color) {
        this.context.strokeStyle = color;
        this.context.strokeWidth = 1;
        this.context.strokeRect(x+0.5, y+0.5, w, w);
    }

    this.fillBox = function (x, y, w, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x+0.5, y+0.5, w, w);
        this.context.strokeStyle = "black";
        this.context.strokeWidth = 1;
        this.context.strokeRect(x+0.5, y+0.5, w, w);
    }

    this.fillRect = function (x, y, w, h, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x+0.5, y+0.5, w, h);
        this.context.strokeStyle = color;
        this.context.strokeWidth = 1;
        this.context.strokeRect(x+0.5, y+0.5, w, h);
    }

    // initialization
    this.init = function () {
    }

    // finalization
    this.terminate = function () {
        
    }
    
    // gameloop
    this.gameloop = function (fElapsedTime) {
        return true;
    }
    
    // pause event handler
    this.onPause = function () {
        
    }
    
    this.ElapsedTime = function () {
        let fNow = new Date();
        let fElapsedTime = fNow - this.fLastTime;
        this.fLastTime = fNow;
        return fElapsedTime;
    }
    
    this.continue = function () {
        this.bPaused = false;    
        process();
    }
    
    function process () {
        that.fLastTime = new Date();
        (function loop() {
            if (!that.bPaused)
                if (that.gameloop(that.ElapsedTime())) {
                    requestAnimationFrame(loop);
                } else {
                    that.terminate();
                }
        }());
    }
    
    // Run
    this.run = function () {
        this.init();
        process();
    }
}
