function Enemy (canvas, x, y) {
  var self = this;

  self.x = x;
  self.y = y;
  self.size = 20;
  self.speed = 5;
  self.ctx = canvas.getContext('2d');
}

Enemy.prototype.update = function() {
  var self = this;

  self.y -= self.speed;
}

Enemy.prototype.render = function() {
  var self = this;

  ctx.fillRect(self.x, self.y, self.size, self.size);
}