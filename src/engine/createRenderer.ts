import type { Renderable } from './types'

export function createRenderer(ctx: CanvasRenderingContext2D) {
  // TODO: render options go here, maybe global scale?
  ctx.imageSmoothingEnabled = false

  return function render(entity: Renderable) {
    // TODO: definitely update these dims or have a store it can subscribe to
    const sourceRect = entity.description.sourceRect
    const scale = entity.description.scale

    ctx.clearRect(0, 0, 800, 600)
    ctx.drawImage(
      entity.description.sourceTexture,
      // source rectangle
      sourceRect.x,
      sourceRect.y,
      sourceRect.width,
      sourceRect.height,
      // destination rectangle TODO: add x/y for the player
      0,
      0,
      sourceRect.width * scale,
      sourceRect.height * scale
    )
  }
}
