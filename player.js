class Player {

  constructor(canvas){
    const self = this;

    self.x = 1;
    self.y = 600;
    self.height = 6;
    self.width = 0;
    self.maxWidth = canvas.width;
    self.laser = [new Laser(1, canvas), new Laser(canvas.width, canvas)];
    self.laserState = null;
    self.ctx = canvas.getContext('2d');
  }

  update(){
    const self = this;
    
    self.laser.forEach(eachLaser => {
      if (eachLaser.x === 1 && eachLaser.x < eachLaser.maxWidth){
        eachLaser.width += 45;
      }
      else if (eachLaser.x > eachLaser.maxWidth){ 
        eachLaser.width -= 45;
      } 
    })
  }
    
  render() {
    const self = this;
    const random = Math.round(Math.random() * 4);
    const laserPrimary = ["#071630","#0C234C","#19499E","#3E8BB7","#26DEEF"];
    const laserSuccess = ["#102D0B","#194912","#2B821D","#2CAA19","29DD0D"];
    const laserDanger = ["#490B0B", "#5B0E0E", "#9E1919", "#E23F3F", "#EA2525"];
    
    self.laser.forEach(eachLaser => {
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

  setLaserState(state, audio) {
    const self = this;
    audio.play();
    self.laserState = state;
    self.laser.forEach(eachLaser => {
      eachLaser.width = 0;
    })
  }

  checkCollision(item) {
    const self = this;
    let collision;
    
    self.laser.forEach(eachLaser => {
      const enemyBotCollision = item.y + item.height > self.y;
      const enemyTopCollision = item.y < self.y + self.height;
      const enemyLeftCollision = item.x < eachLaser.x + eachLaser.width;
      const enemyRightCollision = item.x + item.width > eachLaser.x + eachLaser.width;
      const collisionLeftLaser =  enemyBotCollision && enemyTopCollision && enemyLeftCollision;
      const collisionRightLaser = enemyBotCollision && enemyTopCollision && enemyRightCollision;
      const sameColor = self.laserState === item.color;
      if((sameColor && collisionLeftLaser) || (sameColor && collisionRightLaser)){
        collision = true;
      }  
    })
  return collision; 
  }

}

function Laser(x, canvas){
  const self = this;
  
  self.x = x;
  self.maxWidth = (canvas.width)/2;
  self.width = 0;
  self.ctx = canvas.getContext('2d');
}
