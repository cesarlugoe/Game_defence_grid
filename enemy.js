class Enemy {
  
  constructor (canvas, x, y, color){
    const self = this;

    self.x = x;
    self.y = y;
    self.height = 35;
    self.width = 50;
    self.speed = 1.5;
    self.ctx = canvas.getContext('2d');
    self.color = color;
    self.img = new Image();


  }

  update() {
    const self = this;

    self.y += self.speed;
  }

  render() {
    const self = this;

    if (self.color === 'primary'){
      self.img.src = 'img/blue_asteroid.png';
    }
    else if (self.color === 'success'){
      self.img.src = 'img/green asteroid.png';
    }
    else {
      self.img.src = 'img/RA3.png';
    }
    
    self.ctx.drawImage(self.img, self.x, self.y, self.width + 8, self.height + 8);
  }

}
