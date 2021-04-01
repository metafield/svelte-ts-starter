import SheetParser from './utils/SheetParser'
import type { Animation, Skin } from './types'

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((r) => {
    let i = new Image()
    i.onload = () => r(i)
    i.src = url
  })
}

const createAnim = (name, frames, speed, oneShot): Animation => ({
  name,
  frames,
  speed,
  length: frames.length,
  oneShot,
})

export const createAtlas = async () => {
  const warriorSheet = new SheetParser(6, 17, 69, 44)

  const warrior: Skin = {
    img: await loadImage('/assets/warrior.png'),
    anims: {
      idle: createAnim('idle', warriorSheet.slice(0, 6), 150, false),
      run: createAnim('run', warriorSheet.slice(6, 8), 100, false),
      crouch: createAnim('crouch', warriorSheet.slice(63, 5), 150, true),
      crouchIdle: createAnim(
        'crouchIdle',
        warriorSheet.slice(64, 3),
        300,
        false
      ),
      slash: createAnim('slash', warriorSheet.slice(14, 12), 75, true),
    },
  }

  return { warrior }
}
