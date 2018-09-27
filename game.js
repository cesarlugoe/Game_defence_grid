function Game(parent) {
  var self = this;

  self.parentElement = parent;
  self.gameElement = null;
  self.onGameOverCallBack = null;

}
document.addEventListener('keyUp', self.handleKeyUp);

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


