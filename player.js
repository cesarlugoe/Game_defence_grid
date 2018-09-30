function Player(canvas) {
  var self = this;

  self.x = 1;
  self.y = 600;
  self.height = 6;
  self.width = canvas.width;
  self.laserState = false;
  self.ctx = canvas.getContext('2d');
}

/* nothing to update?
Player.prototype.update = function(){

}
*/

Player.prototype.render = function(){
  var self = this;
  self.ctx.fillStyle = '#000000';
  self.ctx.fillRect(self.x, self.y, self.width, self.height);
}

Player.prototype.setLaserState = function(state){
  var self = this;
  console.log('ok');
  self.laserState = state;
}

Player.prototype.checkCollision = function(item) {
  var self = this;
  var enemyBotCollision = item.y + item.size > self.y;
  var enemyTopCollision = item.y < self.y + self.height;

   if(self.laserState === true && enemyBotCollision && enemyTopCollision){
       return true;
   } 
}