<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Noto+Sans:wght@400;700&display=swap");

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-weight: 300;
  line-height: 1.6;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

html,
body,
h1 {
  font-family: "Noto Sans TC", "Noto Sans", sans-serif;
  background-color: #e5e5e5;
  letter-spacing: 0.01em;
}

.app {
  font-family: "Noto Sans TC", "Noto Sans", sans-serif;
}
</style>
