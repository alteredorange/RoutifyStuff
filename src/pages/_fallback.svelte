<script>
  import { url } from "@sveltech/routify";
</script>

<style>
  .huge {
    font-size: 12rem;
    font-family: "Josefin Sans", sans-serif;
  }
</style>

<div class="flex flex-wrap w-11/12 pb-20 mx-auto lg:w-8/12">
  <div class="w-full md:w-1/2 image">
    <img src="/404.png" alt="Crying Sadness" class="inline " />
  </div>
  <div
    class="self-center w-full text-center text-blue-500 align-middle md:w-1/2 bold huge">
    404
  </div>
  <div class="w-full text-center big">
    Page not found.
    <a class="text-blue-500" href={$url('../')}>Go back?</a>
  </div>
</script>
