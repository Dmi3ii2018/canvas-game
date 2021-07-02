import './index.scss';

import SenseiWalk from './assets/Male-1-Walk.png';

const STEP = 10;
const FRAME_UPDATE = 100;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 49;
const SHOTS = 3;
const KEY_LIST = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

const MAIN_WAY = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
};

const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

const DirectionToNumber = {
  FORWARD: 1,
  BACKWARD: -1,
};

const RotationToNumber = {
  down: 0,
  left: 49,
  right: 97,
  up: 145,
};

const DirectionValue = {
  down: {
    way: MAIN_WAY.VERTICAL,
    side: DirectionToNumber.FORWARD,
  },
  left: {
    way: MAIN_WAY.HORIZONTAL,
    side: DirectionToNumber.BACKWARD,
  },
  right: {
    way: MAIN_WAY.HORIZONTAL,
    side: DirectionToNumber.FORWARD,
  },
  up: {
    way: MAIN_WAY.VERTICAL,
    side: DirectionToNumber.BACKWARD,
  },
};

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let cycle = 0;

const position = {
  [MAIN_WAY.HORIZONTAL]: 0,
  [MAIN_WAY.VERTICAL]: 0,
};

let direction = DIRECTION.DOWN;
let bottonPressed = false;

const img = document.createElement('img');
img.src = SenseiWalk;

function keyDownHandler(evt) {
  if (KEY_LIST.includes(evt.key)) {
    bottonPressed = true;
  }
  switch (evt.key) {
    case 'ArrowLeft':
      direction = DIRECTION.LEFT;
      break;
    case 'ArrowRight':
      direction = DIRECTION.RIGHT;
      break;
    case 'ArrowUp':
      direction = DIRECTION.UP;
      break;
    case 'ArrowDown':
      direction = DIRECTION.DOWN;
      break;
    default: break;
  }
}

function keyUpHandler(evt) {
  if (KEY_LIST.includes(evt.key)) {
    bottonPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottonPressed) {
      const { way, side } = DirectionValue[direction];
      position[way] += STEP * side;
      cycle = (cycle + 1) % SHOTS;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(
      img,
      SPRITE_WIDTH * cycle,
      RotationToNumber[direction],
      SPRITE_WIDTH, SPRITE_HEIGHT,
      position[MAIN_WAY.HORIZONTAL], position[MAIN_WAY.VERTICAL],
      SPRITE_WIDTH, SPRITE_HEIGHT,
    );
  }, FRAME_UPDATE);
});
