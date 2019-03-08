



var game_audio = new Audio();
game_audio.src ="../video_games/audio/A_Virus_Named_TOM_130_Little_Viruses.mp3"


var end_audio = new Audio();
end_audio.src = "../video_games/audio/A_Virus_Named_TOM_Badvoca.mp3"
end_audio.loop = false


//var player = new Entity(x=canvas.width/2,y=canvas.height/2)
var player = createPlayer();
var enemies = [createEnemy(player),createEnemy(player)]
var bg = new Background(player)

document.onmousemove = function(e){
    var mouseX = e.clientX - canvas.getBoundingClientRect().left;
    var mouseY = e.clientY - canvas.getBoundingClientRect().top;
    mouseX -= player.x
    mouseY -= player.y
    player.aimAngle = Math.atan2(mouseY, mouseX) / Math.PI * 180;
/*
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
*/
    
}


list_Bullets = []
list_Items = []



document.onclick = function(){
    if(player.counterAttack > 25){
	list_Bullets.push(createBullet(player));
	player.counterAttack = 0;
    }
}

document.oncontextmenu = function(mouse){
    if(player.counterAttack > 50){
	list_Bullets.push(createBullet(player,player.aimAngle - 5));
	list_Bullets.push(createBullet(player));
	list_Bullets.push(createBullet(player,player.aimAngle + 5));
	player.counterAttack = 0;
    }
    mouse.preventDefault();
}







update = function(){
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.draw()
    frameCount++;

    player.counterAttack += player.attackSpeed  

    

    
    updatePlayerPosition(player);
    player.draw()

    if(frameCount % 50 === 0){
	enemies.push(createEnemy(player))
    }
    
    if(frameCount % 50 === 0){
	list_Items.push(createItem())
    }

 



    
    
    for(let i= 0; i <list_Bullets.length ; i++){
	//updateEntity(list_Bullets[i]);
	list_Bullets[i].update()
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
	if(Date.now() - list_Bullets[i].timer  === 1000){
	    list_Bullets.splice(i,1)
	}
    }
    
    for(let i= 0; i <list_Items.length ; i++){
	updateEntity(list_Items[i]);
	list_Items[i].draw();
	
	if(player.collisionRect(list_Items[i]))	{
	    if(list_Items[i].category == 'health') player.health++;
	    else player.attackSpeed++;
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

     
    ctx.fillStyle = 'red';
    ctx.fillText(player.health + "Health" , 0 ,30);
    ctx.fillText(`Score: ${score}` , 200 ,30);


    if(player.health <= 0) {
	//var survived = Date.now() - timeGameStarted
	//ctx.clearRect(0,0,50,50)
	//ctx.fillText("Survived" + survived+" ms" , 0 ,60)
	gameOver();
    }
    
}


gameOver = function(){
    
    clearInterval(interval)
    game_audio.pause()
    end_audio.play()
    bg.gameOver()
    
}

start = function(){
    game_audio.play();
    if(interval !== undefined) return;
    interval = setInterval(update,50);
    
}

restart = function(){
    player.health = 10;
    frameCount = 0;
    enemies = [createEnemy(player),createEnemy(player),createEnemy(player)]
}



document.onkeydown =  function(e){
    switch(e.keyCode){
    case 37:
	player.pressLeft = true;
	break;
    case 38:
	player.pressUp = true;
	break;
    case 39:
	player.pressRight = true;
	break;
    case 40:
	player.pressDown = true;
	break;
    case 16:
	player.pressShift = true;
	
	break;
    }
}    

document.onkeyup =  function(e){
    switch(e.keyCode){
    case 37:
	player.pressLeft = false;
	break;
    case 38:
	player.pressUp = false;
	break;
    case 39:
	player.pressRight = false;
	break;
    case 40:
	player.pressDown = false;
	break;
    case 16:
	player.pressShift = false;
	
	break;
    }
}   



updatePlayerPosition = function(player){

    if(player.pressLeft ){
	player.x -= 10
    }
    if(player.pressLeft && player.pressShift){
	
	list_Bullets.push(createBullet(player))
    }
    if(player.pressRight && player.pressShift){
	list_Bullets.push(createBullet(player))
    }
    if(player.pressRight){
	player.x += 10
    }
    if(player.pressRight && player.pressShift){
	list_Bullets.push(createBullet(player));
    }
    if(player.pressUp){
	player.y -= 10
    }
    if(player.pressUp && player.pressShift){
	list_Bullets.push(createBullet(player))
    }
    if(player.pressDown){
	player.y += 10
    }
    if(player.pressDown && player.pressShift){
	list_Bullets.push(createBullet(player));
    }
    
    
    if(player.x < player.width/2){
	player.x = player.width/2
    }
    if(player.x > canvas.width - player.width/2){
	player.x = canvas.width - player.width/2
    }
    if(player.y < player.height/2){
	player.y = player.height/2
    }
    if(player.y > canvas.height - player.height/2){
	player.y = canvas.height - player.height/2
    }
}

updatePlayerPosition(player)
start();



