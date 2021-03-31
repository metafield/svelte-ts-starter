import type { Actor, Visual } from '../types'

export function createPlayer(visual: Visual): Actor {
  const { anims } = visual
  let curAnim = anims['idle']
  let frame = 0
  let animEnded = false
  let state: 'standing' | 'crouching' | 'running' = 'standing'

  const player = {
    frameCount: 0,
    lastUpdate: 0,
    queue: [curAnim],
    update() {
      console.log(performance.now() - player.lastUpdate > curAnim.speed)
      if (performance.now() - player.lastUpdate > curAnim.speed) {
        player.lastUpdate = performance.now()
        player.frameCount++
        if (player.frameCount + 1 === curAnim.length) player.frameCount = 0
      }
      return player.queue[0].frames[player.frameCount]
      // player.frame = Math.floor((performance.now() / curAnim.speed) % curAnim.length)
    },
  }

  const description = {
    sourceTexture: visual.img,
    sourceRect: curAnim.frames[frame],
    scale: 4,
  }

  function setAnim(name: keyof typeof anims) {
    // go to next animation
    if (animEnded && curAnim.next) {
      console.log('going to next ', curAnim.next)
      animEnded = false
      curAnim = anims[curAnim.next]
      frame = 0
      return
    }

    if (name === curAnim.name) return

    animEnded = false
    frame = 0
    curAnim = anims[name]
  }

  function animByInput(keys) {
    if (keys.D.isDown()) {
      setAnim('run')
      return
    } else if (keys.S.isDown()) {
      if (curAnim.name === 'crouchIdle') return
      setAnim('crouch')
      return
    } else if (keys.L.isDown()) {
      setAnim('slash')
      return
    } else {
      setAnim('idle')
    }
  }

  function onUpdate(keys) {
    description.sourceRect = player.update()
    // animByInput(keys)
    // curAnim = anims['slash']

    // if (curAnim.oneShot && frame === curAnim.length - 1) animEnded = true

    // if (curAnim.oneShot && animEnded) {
    //   frame = curAnim.length - 1
    // }
    // description.sourceRect = curAnim.frames[frame]

    // frame = Math.floor((performance.now() / curAnim.speed) % curAnim.length)
  }

  return {
    description,
    onUpdate,
  }
}
