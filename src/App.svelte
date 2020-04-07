<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    font-family: "Open Sans", sans-serif;
    font-size: 1.3em;
  }
  div#nav {
    font-family: "Josefin Sans", sans-serif;
  }
</style>

<Router {routes} />
