System.register(['./config', './main'], function(exports_1) {
    var Config, MainModule;
    var config, canvas, ctx, context, main, loop;
    return {
        setters:[
            function (Config_1) {
                Config = Config_1;
            },
            function (MainModule_1) {
                MainModule = MainModule_1;
            }],
        execute: function() {
            config = new Config.Config(window.innerWidth - 15);
            canvas = document.createElement("canvas");
            ctx = canvas.getContext("2d");
            canvas.width = config.CanvasWidth;
            canvas.height = config.CanvasHeight;
            document.body.appendChild(canvas);
            context = canvas.getContext('2d');
            main = new MainModule.Main(context, config);
            main.reset();
            loop = function () {
                main.thisTime = Date.now();
                var delta = main.thisTime - main.lastTime;
                main.update(delta / 1000);
                main.render();
                main.lastTime = main.thisTime;
                requestAnimationFrame(loop);
            };
            loop();
        }
    }
});
