
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
      idleDown: [
        [0,0]
      ]
    };
    this.currentAnimation = config.currentAnimation || 'idleDown';
    this.currentAnimationFrame = 0;

    this.gameObject = config.gameObject;
  }

  draw(ctx) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(
      this.shadow, x, y,
    );

    this.isLoaded && ctx.drawImage(
      this.image,
      0, // left cut
      0, // top cut
      32, // width of the cut
      32, // height of the cut
      x, // x draw position 
      y, // y draw position
      32, // character width
      32, // character height
    );
  }
}