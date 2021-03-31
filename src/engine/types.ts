export type Rect = {
  x: number
  y: number
  width: number
  height: number
}

export type Animation = {
  name: string
  speed: number
  frames: Rect[]
}

export interface Renderable {
  description: {
    sourceTexture: HTMLImageElement
    sourceRect: Rect
    scale: number
  }
}

export interface Actor extends Renderable {
  texture: HTMLImageElement
  anims: Animation[]
  onUpdate: () => void
}
