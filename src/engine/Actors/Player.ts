import type {
  Actor,
  Animation,
  Description,
  Rect,
  Renderable,
  Skin,
} from '../types'

export class Animator {
  frameIndex = 0
  lastUpdate = performance.now()

  constructor(private animation: Animation) {}

  advance(amount: number) {
    let nextValue = this.frameIndex + amount

    if (this.frameIndex === this.animation.length - 1) {
      // call onEnd subscribers
      this.animation = null
      return
    }

    if (nextValue < 0) nextValue = 0

    this.frameIndex = nextValue
    this.lastUpdate = performance.now()
  }

  update() {
    if (!this.animation) return
    if (performance.now() - this.lastUpdate > this.animation.speed) {
      this.advance(1)
    }
  }

  getFrame(): Rect {
    return this.animation.frames[this.frameIndex]
  }

  setAnimation(animation: Animation) {
    // TODO: not sure if we want to do nothing if the ani is the same yet

    if (animation.name === this?.animation?.name) return

    this.frameIndex = 0
    this.lastUpdate = performance.now()
    this.animation = animation
  }
}

export class Player implements Actor {
  description: Description
  state: 'standing' | 'crouching' | 'running' = 'standing' // belongs in desc?

  constructor(private skin: Skin, private animator: Animator) {}

  setDescription(description: Description) {
    this.description = description
  }

  private handleKeys(keys: any) {
    if (keys.D.isDown()) {
      this.animator.setAnimation(this.skin.anims.run)
      return
    }

    this.animator.setAnimation(this.skin.anims.idle)
  }

  onUpdate(keys: any) {
    this.animator.update()
    this.handleKeys(keys)
    this.setDescription({
      scale: 4,
      sourceRect: this.animator.getFrame(),
      sourceImg: this.skin.img,
    })
  }
}
