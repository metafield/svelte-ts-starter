import { Atlas } from '../../stores'

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((r) => {
    let i = new Image()
    i.onload = () => r(i)
    i.src = url
  })
}

export default async function loadSprites() {
  const sprites = {
    warrior: await loadImage('/assets/warrior.png'),
  }

  Atlas.set(sprites)
}
