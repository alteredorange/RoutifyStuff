# routify-starter

Starter template for [Routify](https://github.com/sveltech/routify)

### Get started

To use this starter run `npx @sveltech/routify init` in an empty folder.

Alternatively, you can clone this repo.
 
### Npm scripts

| Syntax          | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| `dev`            | Development (to test dynamic imports use ``npm run dev -- -D``)                                                    |
| `build`          | Build a bundled app for SSR + prerendering and a dynamic app for code splitting   |
| `preview-build`  | Run after build to preview app                                                    |
| `deploy:*`       | Deploy to netlify or now                                                          |

### SSR and pre-rendering

SSR and pre-rendering are included in the default build process.

`npm run deploy:(now|netlify)` will deploy the app with SSR and prerendering included.

To render async data, call the `$ready()` helper whenever your data is ready.

If $ready() is present, rendering will be delayed till the function has been called.

Otherwise it will be rendered instantly.

See [src/pages/example/api/[showId].svelte](https://github.com/sveltech/routify-starter/blob/master/src/pages/example/api/%5BshowId%5D.svelte) for an example.

### Production

* For SPA or SSR apps please make sure that url rewrite is enabled on the server.
* For SPA redirect to `__dynamic.html`.
* For SSR redirect to the lambda function or express server.

### Issues?

File on Github! See https://github.com/sveltech/routify/issues .
