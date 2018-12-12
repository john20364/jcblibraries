'use strict';

jcbCreateNS("jcb.lib").KeyBoardFactory = (function () {
    let _instance = undefined;
    
    function jcbKeyBoard () {
        const KEY_LEFT_ARROW    = 37;
        const KEY_UP_ARROW      = 38;
        const KEY_RIGHT_ARROW   = 39;
        const KEY_DOWN_ARROW    = 40;
        const KEY_SHIFT         = 16;
        const KEY_CTRL          = 17;
        const KEY_ALT           = 18;
        const KEY_CAPS_LOCK     = 20;
        const KEY_TAB           = 9;
        const KEY_ESC           = 27;
        const KEY_BACK_SPACE    = 8;
        const KEY_ENTER         = 13;
        const KEY_DELETE        = 46;
        const KEY_NUM_LOCK      = 144;
        const KEY_HOME          = 36;
        const KEY_END           = 35;
        const KEY_PAGE_UP       = 33;
        const KEY_PAGE_DOWN     = 34;

        function keyState () {
            this.bKeyDown = false;
            this.bPreviousKeyDown = false;
        }
        
        let keys = [];
        
        // Initialize 128 entries for ASCII Set
        for (let i = 0; i < 256; i++) {
            keys[i] = new keyState();
        }

        document.addEventListener("keydown", function(e){
//            console.log("keydown: " + e.keyCode);    
            keys[e.keyCode].bKeyDown = true;
        });
        
        document.addEventListener("keyup", function(e){
            keys[e.keyCode].bKeyDown = false;
            keys[e.keyCode].bPreviousKeyDown = false;
        });

        this.isAnyKey = function () {
            for (let i = 0; i < 256; i++) {
                if (keys[i].bKeyDown) return true;
            }    
            return false;
        }
        
        this.isKeyDown = function (nKeyCode) {
            return keys[nKeyCode].bKeyDown;
        }

        this.isKeyUp = function (nKeyCode) {
            return !keys[nKeyCode].bKeyDown;
        }

        this.isKeyPressed = function (nKeyCode) {
            if (keys[nKeyCode].bKeyDown && !keys[nKeyCode].bPreviousKeyDown) {
                keys[nKeyCode].bPreviousKeyDown = true;
                return true;
            }
            return false;
        }
        
        this.clearKeyStates = function () {
            for (let i = 0; i < 256; i++) {
                keys[i].bKeyDown = false;
                keys[i].bPreviousKeyDown = false;
            }
        }
        
        this.getKeyCode = function (cKey) {
            return cKey.toUpperCase().charCodeAt(0);
        }
        
        this.KEY_LEFT_ARROW  = () => { return KEY_LEFT_ARROW  };
        this.KEY_UP_ARROW    = () => { return KEY_UP_ARROW    };
        this.KEY_RIGHT_ARROW = () => { return KEY_RIGHT_ARROW };
        this.KEY_DOWN_ARROW  = () => { return KEY_DOWN_ARROW  };
        this.KEY_SHIFT       = () => { return KEY_SHIFT       };
        this.KEY_CTRL        = () => { return KEY_CTRL        };
        this.KEY_ALT         = () => { return KEY_ALT         };
        this.KEY_CAPS_LOCK   = () => { return KEY_CAPS_LOCK   };
        this.KEY_TAB         = () => { return KEY_TAB         };
        this.KEY_ESC         = () => { return KEY_ESC         };
        this.KEY_BACK_SPACE  = () => { return KEY_BACK_SPACE  };
        this.KEY_ENTER       = () => { return KEY_ENTER       };
        this.KEY_DELETE      = () => { return KEY_DELETE      };
        this.KEY_NUM_LOCK    = () => { return KEY_NUM_LOCK    };
        this.KEY_HOME        = () => { return KEY_HOME        };
        this.KEY_END         = () => { return KEY_END         };
        this.KEY_PAGE_UP     = () => { return KEY_PAGE_UP     };
        this.KEY_PAGE_DOWN   = () => { return KEY_PAGE_DOWN   };
    }
    
    return {
      getInstance : function () {
          if (_instance === undefined) {
              _instance = new jcbKeyBoard();
              _instance.constructor = null;
          }
          return _instance;
      }
    }
})();