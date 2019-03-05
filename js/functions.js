createEnemy = function(){
    let epsilon = 5
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    let height = epsilon  + Math.random()*20
    let width = epsilon + Math.random()*20
    let dx = epsilon + Math.random()*5;
    let dy = epsilon + Math.random()*5;
    return new Enemy(x,y,height,width,dx,dy,'blue');
}

createItem = function(){
    let x = Math.random()*canvas.width
    let y = Math.random()*canvas.height
    let dx = 0;
    let dy = 0;
    let height = 20;
    let width = 20;
    color = 'purple'
    if (Math.random() < 0.5){
	color = 'yellow'
    }
    
    return new Item(x,y , height,width,dx,dy, color=color)
}


createBullet = function(player){
    // rad = 180 / Pi
    // degrees = radians x 180 / PI
    let time = Date.now()
    let x = player.x
    let y = player.y
    let degrees = Math.random()*360 ;
    let dirx = Math.cos(degrees/180*Math.PI)*5 ;
    let diry = Math.sin(degrees/180*Math.PI)*5
    
    return new Bullet(x, y, height=20, width=20,dx=dirx,dy=diry,color='black',time)
}

createListBullets = function(n,player){
    bullets = []
    for(let i = 0; i<n; i++){
	bullets[i] = createBullet(player)
    }
    return bullets;	
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

collisionCircle = function(ent1,ent2,d){
    var difx =  ent1.x -ent2.x ;
    var dify = ent1.y - ent2.y ;
    var distance = Math.hypot(difx,dify)
    return distance <= d
}


createEnemies = function(n){
    // n: number of enemies
    var enemies = []
    var epsilon = 5    
    for(let i=0; i<n; i++){
	//enemies[i] = createEnemy()
	let epsilon = 5
	let x = Math.random();
	let y = Math.random();
	let height = epsilon  + Math.random()*20
	let width = epsilon + Math.random()*20
	let dx = epsilon + Math.random()*5;
	let dy = epsilon + Math.random()*5;
	let id = Math.random()
	enemies[i] = new Enemy(x,y,height,width,dx,dy,'blue','E'+(i+1));
    }
    return enemies;
}
