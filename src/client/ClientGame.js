import sprites from '../config/sprites';
import levelCfg from '../config/world.json';
import gameObjects from '../config/gameObjects.json';
import EventSourceMixin from '../common/EventSourceMixin';

import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  getWorld() {
    return this.map;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player)
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.movePlayerToDir('left'),
      ArrowRight: (keydown) => keydown && this.movePlayerToDir('right'),
      ArrowDown: (keydown) => keydown && this.movePlayerToDir('down'),
      ArrowUp: (keydown) => keydown && this.movePlayerToDir('up'),
    });
  }

  movePlayerToDir(dir) {
    const dirs = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, -1],
      down: [0, 1]
    }

    const { player } = this;

    if (player && player.motionProgress === 1) {
      const canMove = player.moveByCellCoord(dirs[dir][0], dirs[dir][1], (cell) => {
        return cell.findObjectsByType('grass').length;
      });

      if (canMove) {
        player.setState(dir);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientGame;
