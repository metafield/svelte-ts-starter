import SpriteGrid from '../utils/SpriteGrid'
import type { Actor } from '../types'
import { Atlas } from '../../stores'

export async function createPlayer(): Promise<Actor> {
  let warriorImg
  Atlas.subscribe((sprites) => {
    warriorImg = sprites.warrior
  })
  console.log(warriorImg)
  const warriorSheet = new SpriteGrid(6, 17, 69, 44)
  const idleAnim = warriorSheet.slice(0, 6)
  const runAnim = warriorSheet.slice(6, 8)

  return {
    description: {
      sourceTexture: warriorImg,
      sourceRect: idleAnim[0],
      scale: 4,
    },
    texture: warriorImg,
    anims: [
      { name: 'idle', frames: idleAnim, speed: 150 },
      { name: 'run', frames: runAnim, speed: 150 },
    ],
    onUpdate() {},
  }
}
