export class Config{
	
	/**
	 *
	 */
	constructor(canvasWidth:number) {
		this.CanvasWidth = canvasWidth;
	}
	
	public CanvasWidth:number = 512;
	public CanvasHeight:number = 480;
	
	
	public Red:string = '#CC1805';
	public Blue:string = '#4932CC';
	public Green:string = '#00FF00';
	public Black: string = '#000';
	
	
	public Right:number = 100;
	public Left:number = 97;
	public Space:number = 32;
	
	public DropSpeed = 500;
	
}