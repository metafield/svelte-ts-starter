import SpriteGrid from '../utils/SpriteGrid'
import type { Actor } from '../types'
import { Atlas } from '../../stores'

export async function createPlayer(): Promise<Actor> {
  let warriorImg
  Atlas.subscribe((sprites) => {
    warriorImg = sprites.warrior
  })

  const warriorSheet = new SpriteGrid(6, 17, 69, 44)
  const idleAnimFrames = warriorSheet.slice(0, 6)
  const runAnimFrames = warriorSheet.slice(6, 8)
  const anims = [
    {
      name: 'idle',
      frames: idleAnimFrames,
      speed: 100, // 100 is 6f per frame. 6 being 10% of 60fps
      length: idleAnimFrames.length,
    },
    {
      name: 'run',
      frames: runAnimFrames,
      speed: 150,
      length: runAnimFrames.length,
    },
  ]

  let currentAnimation = anims[0]

  let frame = 0
  const description = {
    sourceTexture: warriorImg,
    sourceRect: currentAnimation[frame],
    scale: 4,
  }

  return {
    description,
    texture: warriorImg,
    anims,
    onUpdate() {
      frame = Math.floor((performance.now() / anims[0].speed) % anims[0].length)
      description.sourceRect = idleAnimFrames[frame]
      console.log(frame)
    },
  }
}
