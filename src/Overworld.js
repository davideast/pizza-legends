import { DirectionInput } from './DirectionInput';
import { GameObject } from './GameObject';
import { OverworldMap, OverworldMaps } from './OverworldMap';

export class Overworld {

  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector('.game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.map = null;
  }

  startGameLoop() {
    const step = () => {

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // establish the camera
      const cameraPerson = this.map.gameObjects.hero;
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      }); 

      this.map.drawLowerImage(this.ctx, cameraPerson);
      
      Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      }); 

      this.map.drawUpperImage(this.ctx, cameraPerson);
 
      requestAnimationFrame(() => {
        step();
      })
    };
    step();
  }

  init() {
    this.map = new OverworldMap(OverworldMaps.DemoRoom);
    this.map.mountObjects();
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
    
  }

}