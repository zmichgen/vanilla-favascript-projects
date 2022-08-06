/** @type {HTMLCanvasElement} */
const $ = (selector, parent = document) => parent.querySelector(selector);

const canvas1 = $('#canvas1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = $('#canvas2');
const ctx2 = canvas2.getContext('2d');
const canvas3 = $('#canvas3');
const ctx3 = canvas3.getContext('2d');
const canvas4 = $('#canvas4');
const ctx4 = canvas4.getContext('2d');
const enemyCount = 50;
const enemyArray1 = [];
const enemyArray2 = [];
const enemyArray3 = [];
const enemyArray4 = [];

const CANVAS_WIDTH =
  (canvas1.width =
  canvas2.width =
  canvas3.width =
  canvas4.width =
    500);
const CANVAS_HEIGHT =
  (canvas1.height =
  canvas2.height =
  canvas3.height =
  canvas4.height =
    1000);
let gameFrame = 0;

const sprites = [
  {
    src: 'enemy2.png',
    width: 266,
    height: 188,
    move: 'moveLeft',
    angleSpeed: () => Math.random() * 0.2,
    curve: 7,
  },
  {
    src: 'enemy1.png',
    width: 293,
    height: 155,
    move: 'stay',
    angleSpeed: () => Math.random() * 1.5,
    curve: 7,
  },
  {
    src: 'enemy3.png',
    width: 218,
    height: 177,
    move: 'path',
    angleSpeed: () => Math.random() * 1.5 + 0.5,
    curve: 200,
  },
  {
    src: 'enemy4.png',
    width: 213,
    height: 213,
    move: 'randomMove',
    angleSpeed: () => 0.2,
    curve: 7,
  },
];
class Enemy {
  constructor(sprite) {
    this.image = new Image();
    this.image.src = sprite.src;

    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = sprite.width;
    this.spriteHeight = sprite.height;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.newX = Math.random() * (CANVAS_WIDTH - this.width);
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = sprite.angleSpeed();
    this.curve = Math.random() * sprite.curve;
    this.move = sprite.move;
    this.interval = Math.floor(Math.random() * 200 + 50)
  }

  update() {
    this[this.move]();
  }

  randomMove() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 20;
    this.y -= dy / 20;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  stay() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  moveLeft() {
    this.x -= this.speed;
    if (this.x + this.width < 0) this.x = CANVAS_WIDTH;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  path() {
    this.x =
      (CANVAS_WIDTH / 2) * Math.cos((this.angle * Math.PI) / 90) +
      (CANVAS_WIDTH / 2 - this.width / 2);
    if (this.x + this.width < 0) this.x = CANVAS_WIDTH;
    this.y =
      (CANVAS_HEIGHT / 2) * Math.sin((this.angle * Math.PI) / 270) +
      (CANVAS_HEIGHT / 2 - this.height / 2);
    if (this.x + this.width < 0) this.x = CANVAS_HEIGHT;
    this.angle += this.angleSpeed;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw(ctx) {
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
  enemyArray1.push(new Enemy(sprites[0]));
  enemyArray2.push(new Enemy(sprites[1]));
  enemyArray3.push(new Enemy(sprites[2]));
  enemyArray4.push(new Enemy(sprites[3]));
}

function animate() {
  ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemyArray1.forEach((enemy, i) => {
    enemy.draw(ctx1);
  });
  enemyArray2.forEach((enemy, i) => {
    enemy.draw(ctx2);
  });
  enemyArray3.forEach((enemy, i) => {
    enemy.draw(ctx3);
  });
  enemyArray4.forEach((enemy, i) => {
    enemy.draw(ctx4);
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
