createPlayer = function(){
    let x = canvas.width/2;
    let y = canvas.height/2;
    let height = 60;
    let width = 60;
    let dx = 20;
    let dy = 20;
    return new Entity(x,y,height,width,dx,dy);
}


createEnemy = function(player){
    let epsilon = 5
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    let height = 30
    let width = 30
    let dx = epsilon + Math.random()*5;
    let dy = epsilon + Math.random()*5;
    return new Enemy(x,y,height,width,dx,dy,player);
}

createItem = function(){
    let x = Math.random()*canvas.width
    let y = Math.random()*canvas.height
    let dx = 0;
    let dy = 0;
    let height = 20;
    let width = 20;
    let category = 'attack'
    let color = 'purple'
    if (Math.random() < 0.5){
	height = 15;
	width = 15;
	category = 'health';
	color = 'yellow';
    }
    
    return new Item(x,y , height,width,dx,dy, color,category)
}


createBullet = function(entity,overWriteAngle){
    // rad = 180 / PI
    // degrees = radians x 180 / PI
    let time = Date.now();
    let x = entity.x;
    let y = entity.y;
    let height = 15;
    let width = 15;
    let degrees = entity.aimAngle;
    if(entity.pressUp && entity.pressShift){
	degrees = 270}
    if(entity.pressDown && entity.pressShift){
	degrees = 90}
    if(entity.pressLeft && entity.pressShift){
	degrees = 0}
    if(entity.pressRight && entity.pressShift){
	degrees = 360}
    if(overWriteAngle !== undefined){
	degrees = overWriteAngle;
    }

    let speed_x = Math.cos(degrees/180*Math.PI)*5 ;
    let speed_y = Math.sin(degrees/180*Math.PI)*5;
    
    return new Bullet(x, y, height, width,speed_x,speed_y,time)
}



collisionRect = function(item){
    return  (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
}


updateEntity = function(entity){
    entity.x+= entity.dx;
    entity.y += entity.dy;

    //entity.draw()
    
    if(entity.x > canvas.width || entity.x < 0){
	entity.dx *= -1;
    }
    if(entity.y > canvas.height || entity.y < 0){
	entity.dy *= -1; // change direction
    }
}





