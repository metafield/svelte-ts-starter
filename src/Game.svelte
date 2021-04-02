<script lang="ts">
  import kd from 'keydrown'
  import { onMount } from 'svelte'
  import { Animator, Player } from './engine/Actors/Player'
  import { createAtlas } from './engine/atlas'
  import { createRenderer } from './engine/createRenderer'

  let canvas: HTMLCanvasElement
  let player: Player

  onMount(async () => {
    const atlas = await createAtlas()
    player = new Player(
      atlas.warrior,
      new Animator(atlas.warrior.anims['idle'])
    )
    const render = await createRenderer(canvas.getContext('2d'))

    function gameLoop() {
      kd.tick()
      player.onUpdate(kd)
      render(player)
      requestAnimationFrame(gameLoop)
    }

    gameLoop()
  })
</script>

{#if player}
  <h2>{player.animator.frameIndex}</h2>
{/if}
<canvas bind:this={canvas} height={800} width={600} />

<style>
  canvas {
    background-color: cornflowerblue;
  }
</style>
