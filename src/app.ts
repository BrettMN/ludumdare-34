import Config = require('./config');
let config = new Config.Config(window.innerWidth-15);
import MainModule = require('./main');

let canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = config.CanvasWidth;
canvas.height = config.CanvasHeight;
document.body.appendChild(canvas);

let context =canvas.getContext('2d');

let main = new MainModule.Main(context, config);

main.reset();

let loop = function(){
	main.thisTime = Date.now();
	let delta = main.thisTime - main.lastTime;
	main.update(delta / 1000);
	main.render();
	
	
	main.lastTime = main.thisTime;
	requestAnimationFrame(loop);
};

loop();
