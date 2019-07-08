<template>
  <div id="app">
    <div class="columns">
      <div class="column">
        <h1 class="title is-3">Astro Photography Exposure Calculator</h1>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);
$red: #a90000;
$red-darker: #802626;
$darkbg: #222;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $red;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Text
$text: $red;
$box-color: $red;
$box-background-color: $darkbg;
$title-color: $red;
$label-color: $red;

// Forms
$input-color: $red;
$input-hover-color: $red-darker;
$input-background-color: $darkbg;
$input-border-color: $red;
$input-hover-border-color: $red-darker;
$input-icon-color: $red;
$input-arrow: $red;
$input-focus-border-color: $red-darker;

// Tables
$table-color: $red;
$table-cell-heading-color: $black;
$table-background-color: $darkbg;
$table-row-hover-background-color: $black;
$table-striped-row-even-background-color: $darkbg;
$table-striped-row-even-hover-background-color: $black;
$table-head-background-color: $red-darker;
$content-table-cell-heading-color: $black;
$table-cell-border: 1px solid $red-darker;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

html {
  background: #111;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: $red;
  padding: 30px;
  background: #111;
}

label, .label {
  color: $red;
}
</style>
