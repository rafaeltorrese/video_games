var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

ctx.font = '20px Arial';
var interval ;
var timeGameStarted = Date.now()
var frameCount = 0;
var score = 0;

class Entity{
    constructor(x,y,height=30,width=30,dx=20,dy=20,color='green',name='P'){

	this.x = x ;
	this.y = y ;
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
	this.image.src = "../video_games/images/pony.png"
	this.aimAngle = 0;
    }



    draw(){
	//let x = this.x-(this.width/2)
	//let y = this.y-(this.height/2)

	let x = this.x - player.x
	let y = this.y - player.y

	x += canvas.width/2
	y += canvas.height/2

	x -= this.width/2
	y -= this.height/2
	
	ctx.drawImage(this.image,x,y,this.width,this.height)
	/*
ctx.fillStyle = this.color
	ctx.fillRect(this.x-(this.width/2) ,this.y-(this.height/2),this.width,this.height);*/
    }

    collisionRect(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
    }
}



class Enemy extends Entity{
    constructor(x,y,height,width,dx,dy,name){
	super(x,y,height,width,dx,dy,name='E')
	this.image = new Image();
	this.image.src = "../video_games/images/bird.jpeg"
    }

    
	
}


class Item extends Entity{
    constructor(x,y,height,width,dx,dy,color,category){
	super(x,y,height,width,dx,dy,color)
	this.category = category
	this.image = new Image();
	this.image.src = category === "attack" ? "../video_games/images/flower_02.png": "../video_games/images/flower_03.jpg"
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
	this.timer = timer;
	this.image = new Image();
	this.image.src = '../video_games/images/bullet_ball_red.png';	
    }
    
    draw(){
	ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    collisionRect(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
    }
}


class Background{
    constructor(entity){
	this.entity = entity
	this.x =0;
	this.y =0 ;
	this.width = canvas.width;
	this.height = canvas.height;
	this.image = new Image();
	this.image.src = "../video_games/images/bg_02.png";
    }
    
    draw(){
	let x = canvas.width/2 - this.entity.x
	let y = canvas.height/2 - this.entity.y
	ctx.drawImage(this.image, this.x , this.y,this.image.width,this.image.height,x ,y, canvas.width,canvas.height)
    }
}
