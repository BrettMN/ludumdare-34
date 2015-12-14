import Config = require('./config');
import MoveModule = require('./move');
import Move = MoveModule.Move;
import ObjectModule = require('./object');
import Object = ObjectModule.Object;


export class Main{
	
	private context:CanvasRenderingContext2D;
	private config:Config.Config;
	private moveCharacter: Move = Move.none; 
	private character :Object;
	private fallingBlocks: Object[];
	private fallingBlockCount:number;
	private standbyBlocks: Object[];
	private startTime:number;
	private endTime:number;
	private gameOver:boolean;
	private startOver:boolean;
	
	lastTime:number;
	thisTime:number;
	

	/**
	*
	*/
	constructor(context:CanvasRenderingContext2D, config:Config.Config) {
		
		this.context = context;
		this.config = config;
		this.fallingBlocks = new Array<Object>();
		this.standbyBlocks = new Array<Object>();
		
		window.onkeypress = (key)=>{
			if(key.charCode === config.Left){
				this.moveCharacter = Move.left
			}else if(key.charCode === config.Right){
				this.moveCharacter = Move.right;
			}else if(key.charCode  == config.Space){
				this.startOver = true;
			}
		}		
	}	
	
	reset(){
		this.startTime = Date.now();
		this.lastTime = this.startTime;
		this.gameOver = false;
		this.startOver = false;
		this.endTime = 0;
		
		this.fallingBlocks.length = 0;
		this.standbyBlocks.length = 0;		
		
		this.character = new Object(this.config.CanvasWidth,this.config.CanvasHeight, this.context);		
		this.character.setup(200, this.config.CanvasHeight - 50, 50, 500, this.config.Blue);		
	}	
	
	update(modifier:number){
		
		if(this.gameOver){
			if(this.startOver === true){
				this.reset();
			}		
		}else{
				this.character.move(this.moveCharacter, modifier);
		this.moveCharacter = Move.none;
		
		this.fallingBlockCount = this.fallingBlocks.length;
		for(let i = 0; i < this.fallingBlockCount; i ++ ){
			this.fallingBlocks[i].move(Move.down, modifier);
			let remove = false;
			
			if(this.fallingBlocks[i].checkScreenBounds()){				
				remove = true;				
			}
			
			if(this.character.x < this.fallingBlocks[i].x + this.fallingBlocks[i].power &&
				this.character.x + this.character.power > this.fallingBlocks[i].x &&
				this.character.y < this.fallingBlocks[i].y + this.fallingBlocks[i].power &&
				this.character.y + this.character.power > this.fallingBlocks[i].y){
				remove = true;
				if(this.fallingBlocks[i].color === this.config.Red){
					this.character.setPower(this.fallingBlocks[i].power);
				}else{					
					this.character.setPower(-this.fallingBlocks[i].power);
				}
				
			}
			
			if(this.character.power >= this.config.CanvasWidth){
				this.gameOver = true;
				this.endTime = this.thisTime;
			}
			
			
			if(remove){
				let tempBlock = this.fallingBlocks.splice(i,1)[0];
				tempBlock.reset();
				
				this.standbyBlocks.push(tempBlock);
				i--;
				this.fallingBlockCount = this.fallingBlocks.length;
			}
			
		}
				
		if(this.fallingBlockCount < (this.thisTime - this.startTime) / this.config.DropSpeed ){
			this.generateFallingBlock();
		}	
		
		//this.logStatus();
		}
	}
	
	
	render(){
			this.context.clearRect(0,0, this.config.CanvasWidth + 50, this.config.CanvasHeight + 50);			
			
			if(this.gameOver){
				this.renderGameOver();
			}else{
			
				this.character.draw();
				
				this.fallingBlockCount = this.fallingBlocks.length;
				for(let i = 0; i < this.fallingBlockCount; i ++ ){
					this.fallingBlocks[i].draw();
				}	
				
				this.context.fillStyle = this.config.Black;
				this.context.font = 'bold 20px sans-serif';
				this.context.textAlign = 'Left';
				this.context.textBaseline = 'Hanging';
				this.context.fillText(`Time: ${Math.floor((this.thisTime - this.startTime) / 1000)}`, 0, 20);
			}
	}	
	
	
	generateFallingBlock(){
		
		let type = Math.floor(Math.random()*10) % 3;
		let power =  Math.floor(Math.random()*1000) % 20;
		let x =  Math.floor(Math.random()* this.config.CanvasWidth);
		let speed = Math.floor(Math.random()*200)
		
		if(this.standbyBlocks.length == 0){
			this.addStandbyBlocks(20);
		}
		let temp = this.standbyBlocks.pop();
		
		if(type === 1){			
			temp.setup(x, 0, power, speed, this.config.Green);
			this.fallingBlocks.push(temp);
		}else{
			temp.setup(x, 0, power, speed, this.config.Red);
			this.fallingBlocks.push(temp);
		}
	}
	
	addStandbyBlocks(amount:number){				
		for(let i = 0; i < amount; i++){
			this.standbyBlocks.push(new Object(this.config.CanvasWidth, this.config.CanvasHeight, this.context))
		}
	}
	
	renderGameOver(){
		this.context.fillStyle = this.config.Red;
		this.context.font = 'bold 30px sans-serif';
		this.context.textAlign = 'Center';
		this.context.textBaseline = 'Middle';
		this.context.fillText(`Game Over! You lasted ${Math.floor((this.endTime - this.startTime) / 1000)} seconds`, 50, 50);
		this.context.fillText(`Press the "Spacebar" to play again.`, 50, 150);
	}
	
	logStatus(){
		console.log('----Status Update----')
		console.log(`Falling Blocks: ${this.fallingBlocks.length}`);
		console.log(`Standby Blocks: ${this.standbyBlocks.length}`);
		console.log(`Total Blocks: ${this.fallingBlocks.length + this.standbyBlocks.length}`);
	}
}