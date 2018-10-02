function Enemy (canvas, x, y, color) {
  var self = this;

  self.x = x;
  self.y = y;
  self.height = 35;
  self.width = 50;
  self.speed = 1.5;
  self.ctx = canvas.getContext('2d');
  self.color = color;
  self.img = new Image();
  
}

Enemy.prototype.update = function() {
  var self = this;

  self.y += self.speed;
}

Enemy.prototype.render = function() {
  var self = this;

  var asteroidPrimary = "#0000FF";
  var asteroidSuccess = "#008000";
  var asteroidDanger = "#FF0000";
  
  if (self.color === 'primary'){
    self.ctx.fillStyle = asteroidPrimary;
    self.img.src = 'img/blue_asteroid.png';
  }
  else if (self.color === 'success'){
    self.ctx.fillStyle = asteroidSuccess;
    self.img.src = 'img/green asteroid.png';
  }
  else {
    self.ctx.fillStyle = asteroidDanger;
    self.img.src = 'img/RA3.png';
  }
  
  self.ctx.drawImage(self.img, self.x, self.y, self.width + 8, self.height + 8);
}
