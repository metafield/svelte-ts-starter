import type { Rect } from '../types'

class SpriteGrid {
  constructor(
    public cols: number,
    public rows: number,
    public cellSizeX: number,
    public cellSizeY: number
  ) {}

  slice(startIndex: number, amount: number): Rect[] {
    // 6   8
    let cells: Rect[] = []
    let x
    let y

    for (let i = 0; i < amount; i++) {
      x = (i + startIndex) % this.cols
      console.log('x is: ', x)
      y = ~~((i + startIndex) / this.cols)

      cells[i] = {
        x: x * this.cellSizeX,
        y: y * this.cellSizeY,
        width: this.cellSizeX,
        height: this.cellSizeY,
      }
    }

    return cells
  }
}

export default SpriteGrid
