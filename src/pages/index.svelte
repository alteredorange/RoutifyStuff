<script>
  import { onMount } from "svelte";
  //The logo animation function
  let canvas;
  onMount(() => {
    const ctx = canvas.getContext("2d");
    let frame;
    (function loop() {
      frame = requestAnimationFrame(loop);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let p = 0; p < imageData.data.length; p += 4) {
        const i = p / 4;
        const x = i % canvas.width;
        const y = (i / canvas.height) >>> 0;
        const t = window.performance.now();
        //changing both 2000's below will change the animation speed, high numbers = slower animation, so 500 would be really fast
        const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 2000);
        const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 2000);
        const b = 128;
        imageData.data[p + 0] = r;
        imageData.data[p + 1] = g;
        imageData.data[p + 2] = b;
        imageData.data[p + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    })();
    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<style>
  /* Logo animation styles */
  canvas {
    width: 50%;
    height: 50%;
    background-color: #444;
    -webkit-mask: url(/svelte-logo-mask.svg) 50% 50% no-repeat;
    mask: url(/svelte-logo-mask.svg) 50% 50% no-repeat;
  }
</style>

<div class="flex justify-center">
  <canvas class="w-20 h-20" bind:this={canvas} />
</div>
