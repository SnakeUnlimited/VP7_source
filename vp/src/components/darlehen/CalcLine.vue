



<script setup lang="ts">


import { computed, ref } from 'vue'

import Grid from '../Grid.vue'

type gridType = string[][][]

const props = defineProps<{
  input: Record<string, any>,
  width: number,
  height: number,
  calcLine: gridType[],
}>()
</script>



<template>
    
    <div >
        <h1>|</h1>
        <h1>|</h1>
        <h1>Calc-#: {{ props.calcLine.length }}</h1>
        <h1>Rechenweg: </h1>
        <div v-for = "(grid, n) in calcLine" :key="n">
            <h1>|</h1>
            <h1>{{ n + 1 }}. Schritt:</h1>
            <Grid :input="props.input" :grid="grid" :width="props.width" :height="props.height" /> 
        </div>
    </div>
</template>    