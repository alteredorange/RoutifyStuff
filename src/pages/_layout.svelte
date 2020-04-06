<script>
  import Nav from "./_components/Nav.svelte";
  import MobileNav from "./_components/MobileNav.svelte";
  import Footer from "./_components/Footer.svelte";
</script>

<style>
  :global(div.wholesite) {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
</style>

<div class="wholesite">
  <Nav />
  <main class="flex flex-1">
    <div class="justify-center flex-1">
      <slot />
    </div>
  </main>
  <Footer />
  <MobileNav />
</div>
