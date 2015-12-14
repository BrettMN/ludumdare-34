System.register([], function(exports_1) {
    var Config;
    return {
        setters:[],
        execute: function() {
            Config = (function () {
                /**
                 *
                 */
                function Config(canvasWidth) {
                    this.CanvasWidth = 512;
                    this.CanvasHeight = 480;
                    this.Red = '#CC1805';
                    this.Blue = '#4932CC';
                    this.Green = '#00FF00';
                    this.Black = '#000';
                    this.Right = 100;
                    this.Left = 97;
                    this.Space = 32;
                    this.DropSpeed = 500;
                    this.CanvasWidth = canvasWidth;
                }
                return Config;
            })();
            exports_1("Config", Config);
        }
    }
});
