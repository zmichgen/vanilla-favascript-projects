const $ = (selector, parent = document) => parent.querySelector(selector);
const dropdown = $('#animations');
let playerState = 'idle';
dropdown.addEventListener('change', (e) => {
    playerState = e.target.value;
})
const canvas = $('#canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const straggerFrames = 5;

const spriteAnimations = {};
const spritesStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 7
    },
    {
        name: 'gethit',
        frames: 4
    },
];
spritesStates.forEach((state, index) => {
    const frames = {
        loc: []
    }
    for (let j =0; j < state.frames; j++) {
        const x = j * spriteWidth;
        const y = index * spriteHeight;
        frames.loc.push({x, y});
    }
    spriteAnimations[state.name] = frames;
});


function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame / straggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  if (gameFrame % straggerFrames === 0) {
    if (frameX < 6) frameX++;
    else frameX = 0;
  }

  gameFrame++;

  requestAnimationFrame(animate);
}

animate();
