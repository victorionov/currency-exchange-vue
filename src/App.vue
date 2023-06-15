<template>
  <div id="app">
    <h1>Currency Exchange</h1>
    <CurrencyConverter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CurrencyConverter from './components/CurrencyConverter.vue';

export default defineComponent({
  name: 'App',
  components: {
    CurrencyConverter,
  },
});
</script>

<style>
html,
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgb(73, 102, 195);
}

h1 {
  color: #2d2d2d;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  border-radius: 10px;
  background-color: rgb(232, 234, 239);
}
</style>
