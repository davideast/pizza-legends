import { withGrid } from "./utils";

export class Sprite {
  constructor(config) {

    this.image = new Image();
    this.image.src = config.src;
    this.isLoaded = false;
    this.image.addEventListener('load', () => {
      this.isLoaded = true;
    });
    
    this.useShadow = true;
    this.isShadowLoaded = false;
    this.shadow = new Image();
    if(this.useShadow) {
      this.shadow.src = '/images/characters/shadow.png';
    }
    this.shadow.addEventListener('load', () => {
      this.isShadowLoaded = true;
    });

    this.animations = config.animations || {
      'idle-down' : [ [0,0] ],
      'idle-right': [ [0,1] ],
      'idle-up'   : [ [0,2] ],
      'idle-left' : [ [0,3] ],
      'walk-down' : [ [1,0],[0,0],[3,0],[0,0], ],
      'walk-right': [ [1,1],[0,1],[3,1],[0,1], ],
      'walk-up'   : [ [1,2],[0,2],[3,2],[0,2], ],
      'walk-left' : [ [1,3],[0,3],[3,3],[0,3], ]
    };
    this.currentAnimation = 'idle-right' // config.currentAnimation || 'idle-down';
    this.currentAnimationFrame = 0;

    // How many game loop frames do we want to show the one cut of the
    // sprite sheet?
    this.animationFrameLimit = config.animationFrameLimit || 8;

    // How much time is left before we need to switch to the next frame?
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if(this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    // downtick frame progress
    if(this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // reset counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if(this.frame == undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + withGrid(6) - cameraPerson.y;

    const [frameX, frameY] = this.frame;

    this.isShadowLoaded && ctx.drawImage(
      this.shadow, x, y,
    );

    this.isLoaded && ctx.drawImage(
      this.image,
      frameX * 32, // left cut
      frameY * 32, // top cut
      32, // width of the cut
      32, // height of the cut
      x, // x draw position 
      y, // y draw position
      32, // character width
      32, // character height
    );

    this.updateAnimationProgress();
  }
}