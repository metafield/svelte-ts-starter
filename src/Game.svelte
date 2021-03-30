<script lang="ts">
  import { onMount } from 'svelte'
  import { run } from 'svelte/internal'
  import Sheet from './engine/Sheet'

  let canvas: HTMLCanvasElement
  const warriorSheet = new Sheet(6, 17, 69, 44)
  const idleAnim = warriorSheet.slice(0, 6)
  const runAnim = warriorSheet.slice(6, 8)
  const anims = [idleAnim, runAnim]
  console.log(runAnim)
  const playlist = [0, 0, 0, 0, 1, 1, 1, 1]

  onMount(() => {
    let curPlaylistIndex = 0

    function drawFrame(frame: number) {
      // console.log('drawing frame: ', frame)
      const { x, y, width, height } = anims[playlist[curPlaylistIndex]][frame]
      ctx.clearRect(0, 0, 800, 600)
      ctx.drawImage(
        warriorImg,
        // source rectangle
        x,
        y,
        width,
        height,
        // destination rectangle
        0,
        0,
        warriorSheet.cellSizeX * 5,
        warriorSheet.cellSizeY * 5
      )
    }

    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    const warriorImg = document.createElement('img')
    warriorImg.src = '/assets/warrior.png'
    warriorImg.addEventListener('load', () => {
      let cycle = 0
      setInterval(() => {
        drawFrame(cycle)

        // cycle = (cycle + 1) % currentAnim.length
        if (cycle === anims[playlist[curPlaylistIndex]].length - 1) {
          curPlaylistIndex =
            curPlaylistIndex < playlist.length - 1 ? curPlaylistIndex + 1 : 0
          console.log('playlist at: ', curPlaylistIndex)
          cycle = 0
        }

        cycle++
      }, 100)
    })
  })
</script>

<canvas bind:this={canvas} height={800} width={600} />

<style>
  canvas {
    background-color: cornflowerblue;
  }
</style>
