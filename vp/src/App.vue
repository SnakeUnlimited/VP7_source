<script setup lang="ts">
import { ref } from 'vue' // <-- Wichtig!

import darlehenMain from './components/darlehen/main.vue'
import calculatorMain from './components/Calculator.vue'


const currentComponent = ref('A')
</script>

<template>
  <div>
    <h1></h1>
    <button @click="currentComponent = 'A'">Darlehensberechnung</button>
    <button @click="currentComponent = 'B'">Taschenrechner</button>
    <button @click="currentComponent = 'C'">Vorwärtskalkulation</button>
    <darlehenMain v-if="currentComponent == 'A'"/>
    <calculatorMain v-else-if="currentComponent == 'B'"/>
  </div>
</template>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
