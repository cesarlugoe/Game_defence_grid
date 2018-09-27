## Game_defense_grid
Game proyect for Ironhack Bootcamp


# DEFENSE GRID 

## Description
Score based game. Asteroids are falling down the screen and moving on the X axis with an static Y. The Player has a laser proyector that can be activated with a key at the bottom of the screen on an static x axis that covers the whole Y line of the screen. When an asteroid is impacted by the laser it is destroyed. If an asteroid pases the laser defense the game is lost. So no winning condition, but only a losing condition.

## MVP 

CANVAS based. The MVP will be the most basic game structure, with only one type of laser (line), and one type of enemy (square). Also static velocity in the new enemies in the game, but still generated on a random Y position.


## BackLog

	⁃	Add points and Score
	⁃	Add soundtrack
	⁃	Asteroid apperareance.
	⁃	Laser animation.
	⁃	3 Type of Asteroids (colors)
	⁃	3 Types of Lasers (colors)
	⁃	Each laser only destroys each asteroid.
	⁃	HighScore storage and display in Game Over screen with username.
	⁃	Acceleration of enemies velocity while the game progresses.
	⁃	Shortening of enemies generation interval while game progresses.

## Data Structure

````
///////////////////////////
main.js
buildDom = =>{}
Main = =>{
 	containerElement // = query selector
	handleSplashClick= =>{}
}
buildSplash = =>{};
destroySplash = =>{};
buildGame = =>{};
destroyGame= =>{};
buildGameOver = =>{
addEventListener //start Button};
destroyGameOver = =>{};


////////////////////////
game.js


Game = => {
  self.gameIsOver();
  self.score();
}

addEventListeners
Methods:

  Game.prototype_start = => {
 	 buidDom()
  	queryselectors
  	self.score
  	self.canvas
  	self.width
  	self.height
  	self.ctx
  	Self.__startLoop();
  }

Game.prototype.__startLoop = => {
	self.enemy();
	self.handleKeys();
	loop() {
		__clearAll();
		__updateAll();
		__renderAll();
	
	__playerAlive()?
		requestAnimationFrame(loop):
		self.onGameOverCallBack();
		
	}
}
 
Game.prototype.__updaterAll = =>{
	self.__spawnEnemy();
	self.enemy.forEach(item){ item.update())}
	self.enemy.Filter(){is dead?}
	self.player.update();
	self.__checkAllCollision();
	self.__updateScoreBoard();
}

Game.prototype.__renderAll = => {
	self.enemy.forEach=>(item)render();
	self.player.render();
}

Game.prototype.__clearAll = => {
	self.ctx.clearect(values);
}

Game.prototype.__spawnEnemy = =>{
 	random time with Math.Random;
	random X (axis) position;
	self.enemy.push( new Enemy(parameters);
}

Game.prototype.__checkAllCollision = =>{
	self.enemy.forEach(=>
		self.player.checkCollision()?
			self.enemy.splice from array:
			self.score++
	)	
}
 Game.prototype.__isPlayerAlive = => {
        Return self.enemy.forEach(item=>
		item.x<self.player.x? 
			false:
			true
	)}

Game.prototype.__updateScoreBoard = => {
	self.scoreElement.innerText = self.score
}


 Game.prototype.destroy = => {
	self.gameElement.remove();
	remove Event Listeners;
}

////////////////////////

player.js

Function player = =>{
	self.x 
	self.y = width
	self.ctx
	self.laserState
}
 
player.prototype.update = => {
	self.x =  on/off? Width : 0;
	
}

player.prototype.render = =>{
	on/off? Width : 0
	self.ctx.fillRect(parameters);
}

player.prototype.checkCollision = =>{
        player on/off? self.enemy.x+size === self.player.x
}


////////////////////

enemy.js

function enemy (){
	self.x
	self.y
	self.size
	self.speed
	self.ctx
}

Enemy.prototype.update();
Enemy.prototype.render();
Enemy.prototype.isDead()


````
## States and States Transition

- splashScreen <br>
destroyGameOver(if) <br>
buildSplash()<br>

- gameScreen <br>
destroySplash <br>
Create new Game<br>
__start()//Game Start<br>

- gameOver<br>
destroyGame<br>
buildGameOver()<br>

## Tasks

create javaScript Files <br>
Main - buildDom <br>
Main - buildSplash <br>
Main - buildGameOver <br>
Main - buildGame <br>
Main - destroySplash <br>
Main - destroyGameOver <br>
Main - destroy Game <br>
Main - handleGameOverClick <br>

Game - init (buildDom) <br>
Game - addEventListener <br>
Game - loop // create enemies // check player activation <br>
Game - updateAll <br>
Game - renderAll <br>
Game - clearAll <br>
Game - spawnEnemy <br>
Game - checkCollision <br>
Game - isPlayerAlive <br>
Game - upDateScoreBoard <br>
Game - destroyGameOver <br>

Player - create <br>
Player - Laser state <br>
Player - update <br>
Player - render <br>
Player - checkCollision <br>

Enemy - create <br>
Enemy - update <br>
Enemy - render <br>
Enemy - isDead <br>



## Links

### Git
