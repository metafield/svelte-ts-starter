import type { Actor, Animation, Description, Rect, Skin } from '../types'

export class Animator {
  frameIndex = 0
  lastUpdate = performance.now()
  animationResolved
  animation

  constructor(animation: Animation) {
    this.setAnimation(animation)
  }

  advance(amount: number) {
    let nextValue = this.frameIndex + amount

    if (this.frameIndex === this.animation.length - 1) {
      // call onEnd subscribers / promises
      console.log(`${this.animation.name} ending`)
      this.animation = null
      this.animationResolved(true)
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
    return new Promise((res, rej) => {
      // TODO: not sure if we want to do nothing if the ani is the same yet
      if (animation.name === this?.animation?.name) {
        rej(`this animation: ${animation.name} is already playing`)
        return
      }

      this.frameIndex = 0
      this.lastUpdate = performance.now()
      this.animation = animation
      console.log('animation changed to ' + animation.name)
      // resolve the animation once it is completed
      this.animationResolved = res
    })
  }
}

export class Player implements Actor {
  description: Description
  state: 'standing' | 'crouching' | 'running' | 'toCrouching' | 'attacking' =
    'standing' // belongs in desc?

  constructor(private skin: Skin, public animator: Animator) {
    this.description = {
      scale: { x: 4, y: 4 },
      sourceRect: this.animator.getFrame(),
      sourceImg: this.skin.img,
      xFlipped: true,
      yFlipped: false,
    }
  }

  // TODO: type this
  setDescription(key, value) {
    this.description[key] = value
  }

  private async handleKeys(keys: any) {
    if (keys.A.isDown() && !keys.D.isDown()) {
      this.setDescription('xFlipped', true)
      this.state = 'running'
    } else if (this.state === 'running') {
      this.state = 'standing'
    }

    if (keys.D.isDown()) {
      this.setDescription('xFlipped', false)

      this.state = 'running'
    } else if (this.state === 'running' && !keys.A.isDown()) {
      this.state = 'standing'
    }

    if (keys.F.isDown()) {
      this.state = 'attacking'
      if (this.animator.animation !== this.skin.anims.slash) {
        await this.animator.setAnimation(this.skin.anims.slash)
        this.state = 'standing'
      }
    }

    if (
      keys.S.isDown() &&
      this.state !== 'toCrouching' &&
      this.state !== 'crouching'
    ) {
      this.state = 'toCrouching'
      await this.animator.setAnimation(this.skin.anims.crouch)
      this.state = 'crouching'
      this.animator.setAnimation(this.skin.anims.crouchIdle)
      return
    } else if (!keys.S.isDown() && this.state === 'crouching') {
      this.state = 'standing'
    }

    switch (this.state) {
      case 'crouching':
        if (this.animator.animation !== this.skin.anims.crouchIdle)
          this.animator.setAnimation(this.skin.anims.crouchIdle)
        break
      case 'running':
        if (this.animator.animation !== this.skin.anims.run)
          this.animator.setAnimation(this.skin.anims.run)
        break
      case 'standing':
        if (this.animator.animation !== this.skin.anims.idle)
          this.animator.setAnimation(this.skin.anims.idle)
        break
    }
  }

  onUpdate(keys: any) {
    this.handleKeys(keys)
    this.setDescription('sourceRect', this.animator.getFrame())

    this.animator.update()
  }
}
