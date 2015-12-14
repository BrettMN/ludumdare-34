import MoveModule = require('./move');
import Move = MoveModule.Move;

export class Object{
	
	color:string;
	x:number;
	y:number;
	private moveSpeed:number;

	private screenWidth:number;
	private screenHieght:number;
	private context:CanvasRenderingContext2D;

	power:number;

	
	
	/**
	 *
	 */
	constructor(screenWidth:number, screenHieght:number, context:CanvasRenderingContext2D) {
		this.screenWidth = screenWidth;
		this.screenHieght = screenHieght;
		this.context = context;		
		this.reset();
	}
	
	setup(x:number, y:number, power:number, moveSpeed:number, color:string){
		this.x = x;
		this.y = y;
		this.power = power;
		this.moveSpeed = moveSpeed;
		this.color = color;
		
		return this;
	}
	
	reset(){
		this.x = 0;
		this.y = 0;
		this.power = 0;
		this.moveSpeed = 0;
		this.color = '';
		
		return this;
	}
	
	move(direction:number, modifier:number){
		
		if(direction === Move.none){
		}else if(direction === Move.down){
			this.y += this.moveSpeed * modifier;
		}else if(direction === Move.up){
			this.y -= this.moveSpeed * modifier;	
		}else if(direction === Move.left){			
			this.x -= this.moveSpeed * modifier;
			if(this.x <=0){
				this.x = 0;
			}
		}else if(direction === Move.right){			
			this.x += this.moveSpeed * modifier;
			if(this.x >= this.screenWidth - this.power){
				this.x = this.screenWidth - this.power;
			}
		}	
	}
		

	draw(){
		this.context.fillStyle = this.color;
		this.context.fillRect(this.x,this.y ,this.power,this.power);
	}
	
	checkScreenBounds(){
		return this.y > this.screenHieght;
	}

	setPower(modifier:number){
		let tempPower = this.power + modifier;
		this.power =  tempPower> 10 ? tempPower : 10;
	}
	
}