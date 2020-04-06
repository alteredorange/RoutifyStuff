<div
  id="nav"
  class="z-10 items-center justify-between hidden w-screen max-w-full px-4 py-3
  bg-gray-100 shadow-xl sm:flex">
  <a
    class="text-2xl font-bold text-black no-underline hover:no-underline
    hover:text-orange-600 lg:text-4xl md:ml-20 lg:ml-20 xl:ml-40"
    href="/">
    <svg
      class="inline-block w-8 h-8 text-orange-600 fill-current"
      viewBox="0 0 20 20">
      <path d="M13 8V0L8.11 5.87 3 12h4v8L17 8h-4z" />
    </svg>
    BOLT
  </a>

  <div id="nav-links" class=" md:mr-20 lg:mr-20 xl:mr-40">
    <a
      href="/dash"
      class="px-1 text-blue-400 rounded hover:bg-gray-600 hover:text-white ">
      Dashboard
    </a>
    <a
      href="/profile"
      class="px-1 text-blue-400 rounded hover:bg-gray-600 hover:rounded
      hover:text-white">
      Profile
    </a>
    <a
      href="/test"
      class="px-1 text-blue-400 rounded hover:bg-gray-600 hover:rounded
      hover:text-white">
      Test
    </a>
    <a
      href="/login"
      class="px-1 text-blue-400 rounded hover:bg-gray-600 hover:rounded
      hover:text-white">
      Login
    </a>
    <a
      href="/register"
      class="px-1 text-blue-400 rounded hover:bg-gray-600 hover:rounded
      hover:text-white">
      Register
    </a>
  </div>
</div>
<!-- <nav>   <ul>     <li>       <a class:selected={segment === undefined} href=".">home</a>     </li>     <li>       <a class:selected={segment === 'about'} href="about">about</a>     </li>     <li>       <a rel="prefetch" class:selected={segment === 'blog'} href="blog">blog</a>     </li>     <li>       <a class:selected={segment === 'profile'} href="profile">Profile</a>     </li>     <li>       <a class:selected={segment === 'login'} href="login">Login</a>     </li>   </ul> </nav> -->
<!-- <nav class="navbar navbar-light">   <div class="container">     <a rel="prefetch" class="navbar-brand" href=".">conduit</a>     <ul class="nav navbar-nav pull-xs-right">       <li class="nav-item">         <a           rel="prefetch"           class="nav-link"           class:active={$page.path === '/'}           href="/">           Home         </a>       </li>       {#if $session.user}         <li class="nav-item">           <a             rel="prefetch"             href="/editor"             class="nav-link"             class:active={$page.path === '/editor'}>             <i class="ion-compose" />             &nbsp;New Post           </a>         </li>         <li class="nav-item">           <a             rel="prefetch"             href="/settings"             class="nav-link"             class:active={$page.path === '/settings'}>             <i class="ion-gear-a" />             &nbsp;Settings           </a>         </li>         <li class="nav-item">           <a             rel="prefetch"             href="/profile/@{$session.user.username}"             class="nav-link">             {$session.user.username}           </a>         </li>       {:else}         <li class="nav-item">           <a             rel="prefetch"             href="/login"             class="nav-link"             class:active={$page.path === '/login'}>             Sign in           </a>         </li>         <li class="nav-item">           <a             rel="prefetch"             href="/register"             class="nav-link"             class:active={$page.path === '/register'}>             Sign up           </a>         </li>       {/if}     </ul>   </div> </nav> -->
