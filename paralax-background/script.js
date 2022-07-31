const $ = (selector, parent = document) => parent.querySelector(selector);
let gameSpeed = 5;

const canvas = $('#canvas1');
const ctx = canvas.getContext('2d');
const slider = $('#slider');
const showGameSpeed = $('#showGameSpeed');
slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
})
slider.value = gameSpeed;
showGameSpeed.innerHTML = slider.value;

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);


class Layer {
  constructor(src, speedModifier) {
    this.layer = new Image();
    this.layer.src = src;
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.speedModifier = gameSpeed * speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);

  }
  draw() {
    this.update();
    ctx.drawImage(this.layer, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.layer, this.x + this.width, this.y, this.width, this.height);
  }
}

const layer1 = new Layer('layer-1.png', 0.2);
const layer2 = new Layer('layer-2.png', 0.3);
const layer3 = new Layer('layer-3.png', 0.6);
const layer4 = new Layer('layer-4.png', 0.8);
const layer5 = new Layer('layer-5.png', 1);

const layers = [layer1, layer2, layer3, layer4, layer5];
let x = 0;

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layers.forEach(layer => {
    layer.draw();
  })
  requestAnimationFrame(animate);
};

animate();
