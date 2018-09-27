function Game(parent) {
  var self = this;

  self.parentElement = parent;
  self.gameElement = null;
  self.onGameOverCallBack = null;

  self.__start();
  self.__startLoop();


}
document.addEventListener('keyup', self.handleKeyUp);

Game.prototype.__start = function(){
  var self = this;
  self.gameElement = buildDom(`
  <main class="game container">
    <div class="game_canvas">
      <canvas class="canvas"></canvas>
    </div>
    <footer class="game_footer">
      <div class="score">
        <span class="label">Score:</span>
        <span class="value"></span>
      </div>
    </footer>
  </main>
  `)
self.parentElement.appendChild(self.gameElement);

self.canvasParentElement = document.querySelector('.game_canvas');
self.canvasElement = document.querySelector('.canvas');

self.scoreElement = document.querySelector('.score .value ');

self.width = self.canvasParentElement.clientWidth;
self.height = self.canvasParentElement.clientHeight;

self.canvasElement.setAttribute('width',self.width);
self.canvasElement.setAttribute('height', self.height);

self.ctx = self.canvasElement.getContext('2d');
}

Game.prototype.__startLoop = function(){
  var self = this;

  self.score = 0;
  self.enemies = [];
  self.player = new Player(self.canvasElement);

  // laser delay
  if (!self.player.laserState){
    self.handleKeyUp= function(evt){
     if (evt.key === "a") { 
       self.player.setlaserState(true);
       // laser delay
       laserTimer();
      }
     else { 
       self.player.setlaserState(false);
      } 
    }
  }

  document.addEventListener("a",self.handleKeyUp);

  function loop(){
    self._clearAll();
    self._updateAll();
    self._renderAll();

    if (self._isPlayerAlive()) {
      requestAnimationFrame(loop);
    }
    else {
      self.onGameOverCallBack();
    }
  }

  requestAnimationFrame(loop);
}

Game.prototype._updateAll = function(){
  var self = this;

  self._spawnEnemy();

  self._checkAllCollision();
  self.enemies.forEach(function(item){
    item.update();
  })
  self.player.update();
  self._updateScoreBoard();
  

}

Game.prototype._renderAll = function(){
  var self = this;

  self.enemies.forEach(function(item){
    item.render();
  })

  if(self.player.laserState) {
    self.player.render();
  }
}

Game.prototype._clearAll = function(){
  var self = this;

  self.ctx.clearRect(0, 0, self.width, self.height);
}

Game.prototype._spawnEnemy = function(){
  var self = this;

  if (Math.random() > 0.95) {
    var randomX = Math.random() * self.width * 0.9;
    self.enemies.push(new Enemy(self.canvasElement, randomX, self.height));
  }
}

Game.prototype._checkAllCollision = function(){
  var self = this;

  self.enemies.forEach(function(item,idx){
    if (player.checkCollision(item)) {
       self.enemies.splice(idx,1);
       self.score++;
    }
  })
}

Game.prototype._isPlayerAlive = function(){
  var self = this;
  var gridBreached;
  self.enemies.forEach(function(item){
    if (item.x - item.size < self.player.x) {
      gridBreached = true;
    }
  })
   return gridBreached? true : false;
}

Game.prototype.updateScoreBoard = function(){
    self.scoreElement.innerText = self.score;
}

Game.prototype.destroy = function(){
   self.gameElement.remove();
   document.removeEventListener("a", handleKeyUp);
}

Game.prototype.laserTimer = function(){
   window.setTimeout(self.player.setlaserState(false),500)
}