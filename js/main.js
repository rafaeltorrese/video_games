var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
ctx.font = '30px Arial';
var interval ;
var timeGameStarted = Date.now()

document.onmousemove = function(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    player.x = mouseX;
    player.y = mouseY;
}




var player = new Player(50,30,30,10)



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


collision = function(ent1,ent2,d){
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
	let x = epsilon + Math.floor((canvas.width - epsilon)*Math.random() )
	let y = epsilon + Math.floor((canvas.height - epsilon)*Math.random() );
	var dx = 50 + Math.floor(Math.random()*56);
	var dy = 10 + Math.floor(Math.random()*6);
	enemies[i] = new Enemy(x,y,dx,dy,'blue','E'+(i+1));
    }
    return enemies;
}


var enemies = createEnemies(3)

update = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    // updateEntity(player);   
    for(let i= 0; i <enemies.length ; i++){
	updateEntity(enemies[i]);
	enemies[i].draw()
	var isCollision = collision(enemies[i],player,30)
	if(isCollision){
	    player.health--;
	    console.log("Collision with",enemies[i].name,player.health)
	  
	}	

    }
    ctx.fillStyle = 'black';
    ctx.fillText(player.health + "Health" , 0 ,30)
    if(player.health === 0) {
	var survived = Date.now() - timeGameStarted
	ctx.clearRect(0,0,50,50)
	ctx.fillText("Survived" + survived+" ms" , 0 ,30)
	gameOver();
    }
    
}


gameOver = function(){
    clearInterval(interval)
}

start = function(){
    interval = setInterval(update,40);    
}

restart = function(){
    interval = undefined;
    start()
    enemies = []
}





addEventListener("keydown", function(e){
    if(e.keyCode === 27){
	console.log(e.keyCode)
	restart();
    }
})


start();



