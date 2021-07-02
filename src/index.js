import './index.scss';

import SenseiWalk from './assets/Male-1-Walk.png';

const STEP = 30;
const FRAME_UPDATE = 100;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 49;
const CANVAS_LENGTH = 600;
const SHOTS = 3;
const KEY_LIST = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

const AXIS = {
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
    way: AXIS.VERTICAL,
    side: DirectionToNumber.FORWARD,
  },
  left: {
    way: AXIS.HORIZONTAL,
    side: DirectionToNumber.BACKWARD,
  },
  right: {
    way: AXIS.HORIZONTAL,
    side: DirectionToNumber.FORWARD,
  },
  up: {
    way: AXIS.VERTICAL,
    side: DirectionToNumber.BACKWARD,
  },
};

let cycle = 0;

const position = {
  [AXIS.HORIZONTAL]: {
    value: 0,
  },
  [AXIS.VERTICAL]: {
    value: offscreenBuffering,
  },
};

let direction = DIRECTION.DOWN;
let buttonPressed = false;

const checkPosition = (positionValue) => {
  const minValue = 0;
  const maxValue = CANVAS_LENGTH - SPRITE_WIDTH;

  return Math.min(maxValue, Math.max(minValue, positionValue));
};

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const img = document.createElement('img');
img.src = SenseiWalk;

function keyDownHandler(evt) {
  if (KEY_LIST.includes(evt.key)) {
    buttonPressed = true;
    checkPosition(position[AXIS.HORIZONTAL].value);
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
    default:
      break;
  }
}

function keyUpHandler(evt) {
  if (KEY_LIST.includes(evt.key)) {
    buttonPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

img.addEventListener('load', () => {
  setInterval(() => {
    if (buttonPressed) {
      const { way, side } = DirectionValue[direction];
      position[way].value += STEP * side;
      cycle = (cycle + 1) % SHOTS;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(
      img,
      SPRITE_WIDTH * cycle,
      RotationToNumber[direction],
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      checkPosition(position[AXIS.HORIZONTAL].value),
      checkPosition(position[AXIS.VERTICAL].value),
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
    );
  }, FRAME_UPDATE);
});
