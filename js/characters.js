var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

ctx.font = '20px Arial';
var interval ;
var timeGameStarted = Date.now()
var frameCount = 0;
var score = 0;

class Entity{
    constructor(x,y,height,width,dx,dy){
	this.x = x ;
	this.y = y ;
	this.height = height;
	this.width = width;
	this.dx = dx;
	this.dy = dy;
	this.health = 10;
	//	this.color = color
	this.spriteVelocity  = 0;
	this.counterAttack = 0;
	this.attackSpeed = 1;
	this.pressDown = false;
	this.pressUp = false;
	this.pressLeft = false;
	this.pressRight = false;
	this.pressShift = false;
	this.image = new Image();
	this.image.src = "../video_games/images/pony_1.png"
	this.aimAngle = Math.atan2(this.y,this.x) / Math.PI*180
    }


    update(){
	this.x+= this.dx;
	this.y += this.dy;

	//this.draw()
	
	if(this.x > canvas.width || this.x < 0){
	    this.dx *= -1;
	}
	if(this.y > canvas.height || this.y < 0){
	    this.dy *= -1; // change direction
	}
    }
    draw(){
	/*let x = this.x-(this.width/2)
	let y = this.y-(this.height/2)*/

	let x = this.x - player.x
	let y = this.y - player.y

	x += canvas.width/2
	y += canvas.height/2

	x -= this.width/2
	y -= this.height/2
	
	let width_img = this.image.width/3;
	let height_img = this.image.height/4;

	
	let direction = 0;

	
	if(this.pressDown) direction = 0;
	if(this.pressLeft) direction = 1;
	if(this.pressRight) direction = 2;
	if(this.pressUp) direction = 3;

	if(this.pressDown || this.pressLeft || this.pressRight || this.pressUp) this.spriteVelocity += 0.3;
	let walk = Math.floor(this.spriteVelocity)  % 3;
	ctx.drawImage(this.image,
		      walk*width_img,direction*height_img,width_img,height_img,
		      x,y,this.width,this.height)
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



class Enemy{
    constructor(x,y,height,width,dx,dy,player){
	this.image = new Image();
	this.image.src = "../video_games/images/bird_sprite-sheet.jpg";	
	this.x = x ;
	this.y = y ;
	this.height = height;
	this.width = width;
	this.dx = dx;
	this.dy = dy;
	this.health = 10;
	this.spriteVelocity = 0;
    }
    update(){
	this.x+= this.dx;
	this.y += this.dy;

	//this.draw()
	
	if(this.x > canvas.width || this.x < 0){
	    this.dx *= -1;
	}
	if(this.y > canvas.height || this.y < 0){
	    this.dy *= -1; // change direction
	}
    }
    
    draw(){
	/*let x = this.x-(this.width/2)
	  let y = this.y-(this.height/2)*/

	let x = this.x - player.x
	let y = this.y - player.y

	x += canvas.width/2;
	y += canvas.height/2;

	x -= this.width/2;
	y -= this.height/2;

	
	let walk = this.spriteVelocity ++ % 5; 
	let width_sprite = this.image.width/5;
	ctx.drawImage(this.image,
		      walk*width_sprite,0,width_sprite,this.image.height,
		      x,y,this.width,this.height)

    }

    collisionRect(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
    }

    
	
}


class Item{
    constructor(x,y,height,width,dx,dy,category){
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = dx;
	this.dy = dy;
	this.category = category
	this.image = new Image();
	this.image.src = category === "attack" ? "../video_games/images/flower_02.png": "../video_games/images/flower_03.jpg"
    } 

            draw(){
	/*let x = this.x-(this.width/2)
	let y = this.y-(this.height/2)*/

	let x = this.x - player.x
	let y = this.y - player.y

	x += canvas.width/2
	y += canvas.height/2

	x -= this.width/2
	y -= this.height/2

	   	
	ctx.drawImage(this.image,
		      0,0,this.image.width,this.image.height,
		      x,y,this.width,this.height)

    }
    
   
}

class Bullet{
    constructor(x,y,height,width,speed_x,speed_y,timer){
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = speed_x
	this.dy = speed_y
	this.timer = timer;
	this.image = new Image();
	this.image.src = '../video_games/images/bullet_ball_red.png';	
    }
    
    draw(){
	let x = this.x - player.x
	let y = this.y - player.y

	    x += canvas.width/2;
	    y += canvas.height/2;

	    x -= this.width/2;
	    y -= this.height/2;
	ctx.drawImage(this.image,
		      0,0,this.image.width,this.image.height,
		      x,y,this.width,this.height)
    }
    update(){
	this.x+= this.dx;
	this.y += this.dy;

	//this.draw()
	
	if(this.x > canvas.width || this.x < 0){
	    this.dx *= -1;
	}
	if(this.y > canvas.height || this.y < 0){
	    this.dy *= -1; // change direction
	}
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
	ctx.drawImage(this.image,
		      0, 0, this.image.width,this.image.height,
		      x,y,this.image.width , this.image.height )
		      
    }
    gameOver(){
	ctx.font = "60px Roboto";
	ctx.fillStyle = 'peru';
	ctx.fillText("GAME OVER",canvas.width/2,canvas.height/2)
	ctx.font = "40px Serif";
	//ctx.fillStyle = 'blue';
	ctx.fillText("Press 'Esc' to Reset",500,300)
    }
}
