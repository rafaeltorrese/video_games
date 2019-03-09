

createPlayer = function(){
    let x = canvas.width/2;
    let y = canvas.height/2;
    let height = 80;
    let width = 80;
    let dx = 20;
    let dy = 20;
    return new Entity(x,y,height,width,dx,dy);
}


createEnemy = function(player){
    let epsilon = 5
    let x = Math.random()* player.map.width;
    let y = Math.random()* player.map.height;
    let height = 60
    let width = 60
    let dx = epsilon + Math.random()*10;
    let dy = epsilon + Math.random()*10;
    return new Enemy(x,y,height,width,dx,dy,player);
}

createItem = function(background){
    let x = Math.random()*background.width
    let y =  Math.random()*background.height;
    let height = 80;
    let width = 80;
    let category = 'score'
    if (Math.random() < 0.4){
	height = 50;
	width = 50;
	category = 'attack';
    }
    
    return new Item(x,y , height,width,category)
}


createBullet = function(entity,overWriteAngle){
    // rad = 180 / PI
    // degrees = radians x 180 / PI
    let x = entity.x;
    let y = entity.y;
    let map = entity.map;
    let height = 50;
    let width = 50;
    let degrees = entity.aimAngle; // Do you want to use the mouse?
    
    if(overWriteAngle !== undefined){
	degrees = overWriteAngle;
	if(degrees === 360){ // Right
	    x = entity.x + entity.width/2;
	    y = entity.y;
	}
	if(degrees === 270){ // Up
	    x = entity.x ;
	    y = entity.y - entity.hight;
	}
	if(degrees === 180){ // Left
	    x = entity.x - entity.width/2;
	    y = entity.y;
	}
	if(degrees === 90){ // Down
	    x = entity.x ;
	    y = entity.y + entity.hight/2;
	}	
	
    }

    let speed_x = Math.cos(degrees/180*Math.PI)*5 ;
    let speed_y = Math.sin(degrees/180*Math.PI)*5;
    
    return new Bullet(x, y, height, width,speed_x,speed_y,map)
}



collisionRect = function(item){
    return  (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
}




createStage = function(entity,file){
    image_file = file
    return new Stage(entity,image_file)
}


sound_blast = function(audioFlag,audio){

    if(audioFlag){
	    audio.pause();
	    audio.currentTime =0;
	    audio.play()
	    soundFlag = false
	}
}

