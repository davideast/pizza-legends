import { GameObject } from './GameObject';
import { Person } from './Person';
import { withGrid } from './utils';

export class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.upperImage = new Image();

    this.lowerImage.src = config.lowerSrc;
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage, 
      withGrid(10.5) - cameraPerson.x, 
      withGrid(6) - cameraPerson.y,
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage, 
      withGrid(10.5) - cameraPerson.x, 
      withGrid(6) - cameraPerson.y,
    );
  }
}

export const OverworldMaps = {
  DemoRoom: {
    lowerSrc: '/images/maps/DemoLower.png',
    upperSrc: '/images/maps/DemoUpper.png',
    gameObjects: {
      hero: new Person({ 
        x: withGrid(5), 
        y: withGrid(6), 
        isPlayerControlled: true,
      }),
      npc1: new Person({ 
        x: withGrid(7), 
        y: withGrid(9),
        src: '/images/characters/people/npc1.png',
      })
    }
  },
  Kitchen: {
    lowerSrc: '/images/maps/KitchenLower.png',
    upperSrc: '/images/maps/KitchenUpper.png',
    gameObjects: {
      hero: new GameObject({
        x: withGrid(3),
        y: withGrid(5),
      }),
      npcA: new GameObject({ 
        x: withGrid(9), 
        y: withGrid(6), 
        src: '/images/characters/people/npc2.png',
      }),
      npc3: new GameObject({ 
        x: withGrid(10), 
        y: withGrid(8),
        src: '/images/characters/people/npc3.png',
      })
    }
  }
}