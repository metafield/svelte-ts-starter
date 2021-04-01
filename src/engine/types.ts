export type Rect = {
  x: number
  y: number
  width: number
  height: number
}

export type Animation = {
  name: string
  frames: Rect[]
  speed: number
  length: number
  oneShot: boolean
}

export interface Description {
  sourceImg: HTMLImageElement
  sourceRect: Rect
  scale: number
}

export interface Renderable {
  description: Description
}

export interface Actor extends Renderable {
  onUpdate: (keys: any) => void
}

export interface Skin {
  img: HTMLImageElement
  anims: {
    [key: string]: Animation
  }
}
