function Player(canvas) {
  var self = this;

  self.x = 1;
  self.y = 600;
  self.height = 6;
  self.width = 0;
  self.maxWidth = canvas.width;
  self.laser = [new Laser(1, canvas), new Laser(canvas.width, canvas)];
  self.laserState = null;
  self.ctx = canvas.getContext('2d');
}

function Laser(x, canvas){
  var self = this;
  
  self.x = x;
  self.maxWidth = (canvas.width)/2;
  self.width = 0;
  self.ctx = canvas.getContext('2d');
}

Player.prototype.update = function(){
  var self = this;
  
  self.laser.forEach(function(eachLaser){
    if (eachLaser.x === 1 && eachLaser.x < eachLaser.maxWidth){
      eachLaser.width += 45;
    }
    else if (eachLaser.x > eachLaser.maxWidth){ 
      eachLaser.width -= 45;
    } 
  })
}
  
Player.prototype.render = function(){
  var self = this;
  var random = Math.round(Math.random() * 4);
  var laserPrimary = ["#071630","#0C234C","#19499E","#3E8BB7","#26DEEF"];
  var laserSuccess = ["#102D0B","#194912","#2B821D","#2CAA19","29DD0D"];
  var laserDanger = ["#490B0B", "#5B0E0E", "#9E1919", "#E23F3F", "#EA2525"];
  
  self.laser.forEach(function(eachLaser){
    if (self.laserState === 'primary') {
       eachLaser.ctx.fillStyle = laserPrimary[random]; 
    }
    else if (self.laserState === 'success'){
       eachLaser.ctx.fillStyle = laserSuccess[random];
    }
    else if (self.laserState === 'danger'){
       eachLaser.ctx.fillStyle = laserDanger[random]; 
    }
       eachLaser.ctx.fillRect(eachLaser.x, self.y, eachLaser.width, self.height); 
  })
}

Player.prototype.setLaserState = function(state, audio){
  var self = this;
  audio.play();
  self.laserState = state;
  self.laser.forEach(function(eachLaser){
    eachLaser.width = 0;
  })
}

Player.prototype.checkCollision = function(item) {
  var self = this;
  var collision;
  
  self.laser.forEach(function(eachLaser){
    var enemyBotCollision = item.y + item.height > self.y;
    var enemyTopCollision = item.y < self.y + self.height;
    var enemyLeftCollision = item.x < eachLaser.x + eachLaser.width;
    var enemyRightCollision = item.x + item.width > eachLaser.x + eachLaser.width;
    var collisionLeftLaser =  enemyBotCollision && enemyTopCollision && enemyLeftCollision;
    var collisionRightLaser = enemyBotCollision && enemyTopCollision && enemyRightCollision;
    var sameColor = self.laserState === item.color;
    if((sameColor && collisionLeftLaser) || (sameColor && collisionRightLaser)){
      collision = true;
    }  
  })
 return collision; 
} 