/** @type {HTMLCanvasElement} */
const $ = (selector, parent = document) => parent.querySelector(selector);

const canvas = $('#canvas1');
const ctx = canvas.getContext('2d');
const enemyCount = 15;
const enemyArray = [];

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
let gameFrame = 0;

class Enemy {
  constructor(src) {
    this.image = new Image();
    this.image.src = src;
       
    this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height); 
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }

  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++;
    }
    
  }

  draw() {
    this.update();
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < enemyCount; i++) {
  enemyArray.push(new Enemy('enemy1.png'));
}

console.log(enemyArray);
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemyArray.forEach((enemy, i) => {
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
