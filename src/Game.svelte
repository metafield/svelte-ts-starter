<script lang="ts">
  import kd from 'keydrown'
  import { onMount } from 'svelte'
  import { createPlayer } from './engine/Actors/Player'
  import { createAtlas } from './engine/atlas'
  import { createRenderer } from './engine/createRenderer'

  let canvas: HTMLCanvasElement

  onMount(async () => {
    const atlas = await createAtlas()
    const render = await createRenderer(canvas.getContext('2d'))
    const player = createPlayer(atlas.warrior)

    function gameLoop() {
      kd.tick()
      player.onUpdate(kd)
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
