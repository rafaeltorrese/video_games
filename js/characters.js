class Player{
    constructor(x,y,height=30,width=30,dx=20,dy=20,color='green',name='P'){
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = dx;
	this.dy = dy;
	this.name = name;
	this.health = 10;
	this.color = color
	this.counterAttack = 0;
	this.attackSpeed = 1;
	this.pressDown = false;
	this.pressUp = false;
	this.pressLeft = false;
	this.pressRight = false;
	this.image = new Image();
	this.aimAngle = 0;
    }



    draw(){
	ctx.fillStyle = this.color
	ctx.fillRect(this.x-(this.width/2) ,this.y-(this.height/2),this.width,this.height);
    }

    collisionRect(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
    }
}



class Enemy extends Player{

    
	
}


class Item extends Player{
    constructor(x,y,height,width,dx,dy,color,category){
	super(x,y,height,width,dx,dy,color)
	this.category = category
    } 
    
    
   
}

class Bullet{
    constructor(x,y,height,width,speed_x,speed_y,color,timer){
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = speed_x
	this.dy = speed_y
	this.color = color
	//super(x,y,height, width,dx,dy,color)
	this.timer = timer;
//	this.image = new Image();
//	this.image.src = '../images/bullet_01.jpeg';	
    }
    
    draw(){
	ctx.fillStyle = this.color
	ctx.fillRect(this.x-(this.width/2) ,this.y-(this.height/2),this.width,this.height);
    }

    collisionRect(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
    }
}

class Background{
    constructor(){
	this.x = 0;
	this.y = 0;
	this.width = canvas.width;
	this.height = canvas.height;
	this.image = new Image();
	this.image.src = '../images/bg_01.png'
    }
    draw(){
	ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}
