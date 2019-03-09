var interval = undefined;
var timeGameStarted = Date.now()
var frameCount = 0;
var score = 0;

// Audio 
var audio_bullet = new Audio();
audio_bullet.src = "../video_games/audio/blast_01.mp3"

var game_audio = new Audio();
game_audio.src ="../video_games/audio/stage_01.mp3"
game_audio.loop = true

var end_audio = new Audio();
end_audio.src = "../video_games/audio/gameOver.mp3"

var victory_audio = new Audio();
victory_audio.src = "../video_games/audio/victory.mp3"

var damagePlayer_audio = new Audio();
damagePlayer_audio.src = "../video_games/audio/blast_player.mp3"

var item_audio = new Audio();
item_audio.src = "../video_games/audio/item_01.mp3"

//var player = new Entity(x=canvas.width/2,y=canvas.height/2)
var player = createPlayer();
var bg = new Background(player)


player.get_map(bg.image)

var enemies = [createEnemy(player),createEnemy(player)]


list_Bullets = []
list_Items = []




update = function(){    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.draw()
    frameCount++;
    //ctx.fillText(frameCount,player.map.width,0)
    player.counterAttack += player.attackSpeed  
    player.update()
    //player.draw()
    updatePlayerPosition(player)


    if(frameCount % 40 === 0){
	
	enemies.push(createEnemy(player,bg.image))
    }
    
    if(frameCount % 60 === 0){
	list_Items.push(createItem(bg.image))
    }

         
    for(let i= 0; i <list_Bullets.length ; i++){
	list_Bullets[i].update()	
	for(let j = 0; j <enemies.length ; j++){
	    if(list_Bullets[i].collisionRect(enemies[j])){
		list_Bullets.splice(i,1)
		enemies.splice(j,1)
		break;
	    }
	}
	
    }
    
    for(let i=0; i<list_Bullets.length ; i++){
	if(list_Bullets[i].timer++  > 45){
	    list_Bullets.splice(i,1)
	}
    }
    
    for(let i= 0; i <list_Items.length ; i++){
	list_Items[i].draw()
	if(player.collisionRect(list_Items[i]))	{
	     
	    if(list_Items[i].category == 'health')
	    {
		score++;
		
	    }
	    else{
		player.attackSpeed++;
		
	    }
	    list_Items.splice(i,1)
	    
	}
    }
    
    
    for(let i= 0; i <enemies.length ; i++){
	enemies[i].update();
	//enemies[i].draw()
	
	if(enemies[i].collisionRect(player)){
	    Math.floor(player.health-= 0.5);
	    audioflag = true
	    sound_blast(audioflag,damagePlayer_audio)
	}	

    }

     
    


    if(player.health <= 0) {
	gameOver();
    }
    if(score === 5){
	winner()
    }

    ctx.fillStyle = 'red';
    ctx.fillText(player.health + "Health" , canvas.width ,canvas.height);
    ctx.fillText(`Score: ${score}` , canvas.width ,canvas.height);
    
}


gameOver = function(){
    
    clearInterval(interval)
    bg.gameOver()
    game_audio.pause();
    game_audio.currentTime = 0;
    end_audio.play();
}

winner = function(){
    
    clearInterval(interval)
    bg.winner()
    game_audio.pause();
    game_audio.currentTime = 0;
    victory_audio.play();
}




document.onmousemove = function(e){
    var mouseX = e.clientX - canvas.getBoundingClientRect().left;
    var mouseY = e.clientY - canvas.getBoundingClientRect().top;

    mouseX -= canvas.width / 2
    mouseY -= canvas.height / 2
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

    audioflag = true
            if(player.pressLeft && player.pressShift  && player.counterAttack > 25){
	list_Bullets.push(createBullet(player,180));
	player.counterAttack = 0;
		sound_blast(audioflag,audio_bullet)
	
	    }
    
    if(player.pressRight && player.pressShift && player.counterAttack > 25){
	list_Bullets.push(createBullet(player,360))
	player.counterAttack = 0;
	sound_blast(audioflag,audio_bullet)
    }
    
    if( player.pressUp  && player.pressShift && player.counterAttack > 25){
	list_Bullets.push(createBullet(player,272))
	player.counterAttack = 0;
	sound_blast(audioflag,audio_bullet)
    }
    if(player.pressDown && player.pressShift && player.counterAttack > 25){
	list_Bullets.push(createBullet(player,95));
	player.counterAttack = 0;
	sound_blast(audioflag,audio_bullet)
    }
       
}



start = function(){
    if(interval != undefined) return
    interval = setInterval(update,1000/20)
    game_audio.play();
    
}




pause = function(){
    clearInterval(interval)
    start()
     
}



restart = function(){
    
    clearInterval(interval);
    interval = undefined;
    frameCount = 0;
    score = 0;
    list_Bullets = [];
    list_Items = [];
    enemies = []
    start()
    
    
}


