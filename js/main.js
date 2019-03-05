var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
ctx.font = '20px Arial';
var interval ;
var timeGameStarted = Date.now()
var frameCount = 0;
var score = 0;


document.onmousemove = function(e){
    var mouseX = e.clientX - canvas.getBoundingClientRect().left;
    var mouseY = e.clientY - canvas.getBoundingClientRect().top;

    if(mouseX < player.width/2){
	mouseX = player.width/2
    }
    if(mouseX > canvas.width - player.width/2){
	mouseX = canvas.width - player.width/2
    }
    if(mouseY < player.height/2){
	mouseY = player.height/2
    }
    if(mouseY > canvas.height - player.height/2){
	mouseY = canvas.height - player.height/2
    }
    
    player.x = mouseX;
    player.y = mouseY;
}


var player = new Player(x=canvas.width/2,y=canvas.height/2)
var enemies = createEnemies(2)

list_Bullets = []
list_Items = []

update = function(){
    frameCount++;
    

    ctx.clearRect(0,0,canvas.width,canvas.height)
    player.draw()

    if(frameCount % 100 === 0){
	enemies.push(createEnemy())
    }
    
    if(frameCount % 50 === 0){
	list_Items.push(createItem())
    }
    if(frameCount % 25 === 0){
	bullet = createBullet(player)
	list_Bullets.push(bullet)
	
    }

    
    
    for(let i= 0; i <list_Bullets.length ; i++){
	updateEntity(list_Bullets[i]);
	list_Bullets[i].draw()	
	for(let j = 0; j <enemies.length ; j++){
	    if(list_Bullets[i].collisionRect(enemies[j])){
		list_Bullets.splice(i,1)
		enemies.splice(j,1)

		score++;
		break;
	    }
	}
	
    }	 
    for(let i=0; i<list_Bullets.length ; i++){
	if(Date.now() - list_Bullets[i].timer  === 10000){
	    list_Bullets.splice(i,1)
	}
    }
    
    for(let i= 0; i <list_Items.length ; i++){
	updateEntity(list_Items[i]);
	list_Items[i].draw();
	// var isCollision = collisionCircle(list_Items[i],player,10)
	
	if(player.collisionRect(list_Items[i])){
	    player.health *= 2;
	    list_Items.splice(i,1)
	}
    }
    
    
    for(let i= 0; i <enemies.length ; i++){
	updateEntity(enemies[i]);
	enemies[i].draw()
	//var isCollision = collisionCircle(enemies[i],player,10)
	if(enemies[i].collisionRect(player)){
	    player.health--;
	}	

    }

    
    
    
    ctx.fillStyle = 'black';
    ctx.fillText(player.health + "Health" , 0 ,30);
    ctx.fillText(`Score: ${score}` , 200 ,30);


    if(player.health <= 0) {
	var survived = Date.now() - timeGameStarted
	//ctx.clearRect(0,0,50,50)
	ctx.fillText("Survived" + survived+" ms" , 0 ,60)
	gameOver();
    }
    
}


gameOver = function(){
    clearInterval(interval)
}

start = function(){
    interval = setInterval(update,50);    
}

restart = function(){
    player.health = 10;
    frameCount = 0;
    enemies = createEnemies(3)
    
}





addEventListener("keydown", function(e){
    if(e.keyCode === 27){
	console.log(e.keyCode)
	restart();
    }
})


start();



