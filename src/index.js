import './index.scss';

import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

// const STEP = 10;
// const FRAME_UPDATE = 100;
// const SPRITE_WIDTH = 48;
// const SPRITE_HEIGHT = 49;
// const CANVAS_LENGTH = 600;
// const SHOTS = 3;
// const KEY_LIST = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

// const Axis = {
//   HORIZONTAL: 'HORIZONTAL',
//   VERTICAL: 'VERTICAL',
// };

// const Direction = {
//   LEFT: 'left',
//   RIGHT: 'right',
//   UP: 'up',
//   DOWN: 'down',
// };

// const DirectionToNumber = {
//   FORWARD: 1,
//   BACKWARD: -1,
// };

// const RotationToNumber = {
//   down: 0,
//   left: 49,
//   right: 97,
//   up: 145,
// };

// const DefaultPosition = {
//   [Axis.HORIZONTAL]: CANVAS_LENGTH / 2 - SPRITE_WIDTH / 2,
//   [Axis.VERTICAL]: CANVAS_LENGTH / 2 - SPRITE_HEIGHT / 2,
// };

// const DirectionValue = {
//   down: {
//     way: Axis.VERTICAL,
//     side: DirectionToNumber.FORWARD,
//   },
//   left: {
//     way: Axis.HORIZONTAL,
//     side: DirectionToNumber.BACKWARD,
//   },
//   right: {
//     way: Axis.HORIZONTAL,
//     side: DirectionToNumber.FORWARD,
//   },
//   up: {
//     way: Axis.VERTICAL,
//     side: DirectionToNumber.BACKWARD,
//   },
// };

// const checkPosition = (positionValue) => {
//   const minValue = 0;
//   const maxValue = CANVAS_LENGTH - SPRITE_WIDTH;

//   return Math.min(maxValue, Math.max(minValue, positionValue));
// };

// let cycle = 0;

// const position = {
//   [Axis.HORIZONTAL]: {
//     value: DefaultPosition[Axis.HORIZONTAL],
//   },
//   [Axis.VERTICAL]: {
//     value: DefaultPosition[Axis.VERTICAL],
//   },
// };

// let direction = Direction.DOWN;
// let buttonPressed = false;

// function keyDownHandler(evt) {
//   if (KEY_LIST.includes(evt.key)) {
//     buttonPressed = true;
//     checkPosition(position[Axis.HORIZONTAL].value);
//   }

//   switch (evt.key) {
//     case 'ArrowLeft':
//       direction = Direction.LEFT;
//       break;
//     case 'ArrowRight':
//       direction = Direction.RIGHT;
//       break;
//     case 'ArrowUp':
//       direction = Direction.UP;
//       break;
//     case 'ArrowDown':
//       direction = Direction.DOWN;
//       break;
//     default:
//       break;
//   }
// }

// function keyUpHandler(evt) {
//   if (KEY_LIST.includes(evt.key)) {
//     buttonPressed = false;
//   }
// }

// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);

// const walk = (timestamp) => {
//   console.log(timestamp);
//   if (buttonPressed) {
//     const { way, side } = DirectionValue[direction];
//     position[way].value += STEP * side;
//     cycle = (cycle + 1) % SHOTS;
//   }
//   ctx.clearRect(0, 0, 600, 600);
//   ctx.drawImage(
//     img,
//     SPRITE_WIDTH * cycle,
//     RotationToNumber[direction],
//     SPRITE_WIDTH,
//     SPRITE_HEIGHT,
//     checkPosition(position[Axis.HORIZONTAL].value),
//     checkPosition(position[Axis.VERTICAL].value),
//     SPRITE_WIDTH,
//     SPRITE_HEIGHT,
//   );

//   window.requestAnimationFrame(walk);
// };

// img.addEventListener('load', () => {
//   window.requestAnimationFrame(walk);
// });
