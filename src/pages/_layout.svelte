<script>
  import Nav from "./_components/Nav.svelte";
  import Footer from "./_components/Footer.svelte";
</script>

<style>
  :global(div.wholesite) {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
</style>

<header>
  <!-- Custom Fonts -->
  <link
    href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&family=Open+Sans:wght@300;400;700&family=Roboto&display=swap"
    rel="stylesheet" />
</header>
<div class="wholesite">
  <Nav />
  <main class="flex flex-1">
    <div class="justify-center flex-1">
      <slot />
    </div>
  </main>
  <Footer />

</div>
