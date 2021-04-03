import type { Renderable } from './types'

export function createRenderer(ctx: CanvasRenderingContext2D) {
  // TODO: render options go here, maybe global scale?
  ctx.imageSmoothingEnabled = false

  return function render(entity: Renderable) {
    // TODO: definitely update these dims or have a store it can subscribe to
    const sourceRect = entity.description.sourceRect
    const scale = entity.description.scale

    ctx.clearRect(0, 0, 800, 600)
    ctx.fillStyle = '#09f'
    let scaledWidth = sourceRect.width * scale.x
    ctx.fillRect(0, 0, scaledWidth, sourceRect.height)

    /* scaleX -1 for flipped. 1 for not */
    function draw(scaleXModifier: 1 | -1) {
      ctx.drawImage(
        entity.description.sourceImg,
        // source rectangle
        sourceRect.x,
        sourceRect.y,
        sourceRect.width,
        sourceRect.height,
        // destination rectangle TODO: add x/y for the player
        0 + sourceRect.width / 2,
        0,
        sourceRect.width * scaleXModifier * scale.x,
        sourceRect.height * scale.y
      )
    }

    if (entity.description.xFlipped) {
      ctx.save()
      ctx.scale(-1, 1)
      draw(-1)
      ctx.restore()
    } else {
      draw(1)
    }
  }
}
