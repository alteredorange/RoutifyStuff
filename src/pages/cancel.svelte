<script>
  import { url } from "@sveltech/routify";
  //   import fitty from "fitty";
  //   import { onMount, afterUpdate, tick } from "svelte";
  //   import fitText from "FitText-UMD";

  //   afterUpdate(async () => {
  //     if (y) fitText(document.getElementById("fitz"));
  //   });
  // p
  //   let y;
</script>

<style>
  .paragraphs {
    text-indent: 4em;
    line-height: 1.65em;
  }
  .plea {
    font-weight: 100;
  }
  div.content {
    font-family: "Open Sans", sans-serif;
    font-size: 1.3em;
  }

  .loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .huge {
    font-size: 20vw;
    font-family: "Josefin Sans", sans-serif;
  }

  @media screen and (min-width: 741px) {
    .huge {
      font-size: 10vw;
    }
  }
</style>

<div class="flex flex-wrap w-11/12 max-w-full pb-20 mx-auto lg:w-8/12">
  <div class="w-full md:w-1/2 image">
    <img src="/cancel.png" alt="Happy Thank You!" class="inline " />
  </div>
  <div
    class="self-center w-full pt-10 text-center text-blue-500 align-middle md:w-1/2 md:pt-0 huge">
    Hmmmm...
  </div>

</div>
