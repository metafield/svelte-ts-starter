<script lang="ts">
  import { onMount } from 'svelte'
  import { createPlayer } from './engine/Actors/Player'
  import { createRenderer } from './engine/createRenderer'
  import loadSprites from './engine/utils/loadSprites'

  let canvas: HTMLCanvasElement

  onMount(async () => {
    await loadSprites()
    const render = await createRenderer(canvas.getContext('2d'))
    const player = await createPlayer()

    function gameLoop() {
      render(player)
      requestAnimationFrame(gameLoop)
    }

    gameLoop()
  })
</script>

<canvas bind:this={canvas} height={800} width={600} />

<style>
  canvas {
    background-color: cornflowerblue;
  }
</style>
