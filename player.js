function Player(canvas) {
  var self = this;

  self.x = 1;
  self.y = (canvas.height * 0,85);
  self.ctx = canvas.getContext('2d');
}

/* nothing to update?
Player.prototype.update = function(){

}
*/

Player.prototype.render = function(){
  var self = this;

  self.ctx.fillRect(self.x, self.y, canvas.width, 6);
}

Player.prototype.setLaserState = function(state){
  var self = this;

  self.laserState = state;
}