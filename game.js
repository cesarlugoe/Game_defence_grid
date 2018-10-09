class Game {

  constructor(parent) {
    const self = this;
    self.parentElement = parent;
    self.gameElement = null;
    self.onGameOverCallback = null;
    self.pauseState = false;
    
    self.randomSpawn = 0.99;
    self.accelerateSpawn = false;

    self._start();
    self._startLoop();
  }


  _start() {
    const self = this;
    self.gameElement = buildDom(`
    <main class="game container">
      <div class="game_canvas">
        <canvas class="canvas"></canvas>
        <footer class="game_footer">
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </footer>
      </div>
      <footer class="game_footer">
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </footer>
    <audio class="sountrack" src="Audio/12 The Planets： Jupiter.mp3" loop="true" autoplay="true"></audio>
    <audio class="laser_audio" src="Audio/Laser sound effects.mp3"></audio>
    </main>
    `)
    self.parentElement.appendChild(self.gameElement);

    self.canvasParentElement = document.querySelector('.game_canvas');
    self.canvasElement = document.querySelector('.canvas');
    self.scoreElement = document.querySelector('.score .value');
    self.laserAudioElement = document.querySelector('.laser_audio');

    self.width = self.canvasParentElement.clientWidth;
    self.height = self.canvasParentElement.clientHeight;

    self.canvasElement.setAttribute('width',self.width);
    self.canvasElement.setAttribute('height', self.height);

    self.ctx = self.canvasElement.getContext('2d');
  }

  _startLoop() {
    const self = this;

    self.score = 0;
    self.enemies = [];
    self.player = new Player(self.canvasElement);
    
    self.handleKeyDown = evt => {
      switch (evt.key) {
        case 'a':
          self.player.setLaserState('primary',self.laserAudioElement);
          break;
        case 's':
          self.player.setLaserState('success',self.laserAudioElement);
          break;
        case 'd':
          self.player.setLaserState('danger',self.laserAudioElement);
          break;
        case 'Escape':
          self.pause(loop);
          break;
      }
    }  

    document.addEventListener("keydown" , self.handleKeyDown);
    
    function loop(){
      
        self._clearAll();
        self._updateAll();
        self._renderAll();
        
        if (self._isPlayerAlive() && !self.pauseState) {
          requestAnimationFrame(loop);
        }
        else if (!self._isPlayerAlive()) {
          self.onGameOverCallback();
        }
    }
    requestAnimationFrame(loop);
  }

  _updateAll() {
    const self = this;

    self._spawnEnemy();
    self._checkAllCollision();
    self.enemies.forEach(item => {
      item.update();
    })
    self._updateScoreBoard();
    self.player.update();
  }

  _renderAll() {
    const self = this;

    self.enemies.forEach(item => {
      item.render();
    })
    if(self.player.laserState) {
      self.player.render();
    }
  }

  _clearAll() {
    const self = this;

    self.ctx.clearRect(0, 0, self.width, self.height);
  }

  _spawnEnemy() {
    const self = this;

    if (!self.accelerateSpawn) {
      self.accelerate();
    }
    
    if (Math.random() > self.randomSpawn) {
      const asteroidColors = ['primary', 'success', 'danger'];
      const color = asteroidColors[Math.round(Math.random() * 2)];
      const randomX = Math.random() * self.width * 0.9;
      self.enemies.push(new Enemy(self.canvasElement, randomX, 1, color));
    }
  }

  _checkAllCollision() {
    const self = this;
    const explotionAudio = new Audio('Audio/Laser and explosion (with sound) (1).mp3');
    
    self.enemies.forEach((item,idx) => {
      if (self.player.checkCollision(item)) {
        self.enemies.splice(idx,1);
        self.score++;
        explotionAudio.play();
      }
    })
  }

  _isPlayerAlive() {
    const self = this;
    let gridBreached = false;

    self.enemies.forEach(item => {
      if (item.y - item.height > self.player.y) {
        gridBreached = true;
      }
    })
    return gridBreached? false : true;
  }

  _updateScoreBoard() {
      const self = this;

      self.scoreElement.innerText = self.score;
  }

  pause(loop) {
    const self = this;

    self.sountrackElement.pause();
    self.laserAudioElement.pause();
    self.pauseState = !self.pauseState;

    if (!self.pauseState) {
      self.sountrackElement.play();
      requestAnimationFrame(loop)
    }
  }

  destroy() {
    const self = this;

    self.gameElement.remove();
    document.removeEventListener("keydown", self.handleKeyDown);
  }

  onOver(callback) {
    const self = this;

    self.onGameOverCallback = callback;
  }

  accelerate(){
    const self = this;

    self.accelerateSpawn = true;
    window.setTimeout( () => {
      self.randomSpawn-= 0.00025;
      self.accelerateSpawn = false;
    }, 5000)
  }

}