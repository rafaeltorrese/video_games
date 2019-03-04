class Player{
    constructor(x,y,dx,dy,color='green',name='P'){
	this.x = x;
	this.y = y;
	this.height = 30;
	this.width = 30
	this.dx = dx;
	this.dy = dy;
	this.name = name;
	this.health = 10;
	this.color = color
    }

    draw(){
	ctx.fillStyle = this.color
	ctx.fillRect(this.x-(this.width/2) ,this.y-(this.height/2),this.width,this.height);
    }
}



class Enemy extends Player{

    draw(){
	ctx.fillStyle = this.color
	ctx.fillRect(this.x-(this.width/2) ,this.y-(this.height/2),5 + Math.random()*(this.width-6),5 + Math.random()*(this.height - 6));
    }
}
