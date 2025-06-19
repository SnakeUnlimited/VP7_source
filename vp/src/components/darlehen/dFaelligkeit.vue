<script setup lang="ts">


import { computed, ref } from 'vue'

import Grid from '../Grid.vue'

const props = defineProps<{
  input: Record<string, any>,
  grid: string[][][],
  width: number,
  height: number,
}>()

// Define the event you want to emit
const emit = defineEmits<{
  (e: 'calc', value: string[][][]): void
}>()


const aggregatedGrid = computed<string[][][]>(() => {

  // Makros
  let loan = String(props.input.loanAmount);
  let interestAmount = (props.input.interestRate * props.input.loanAmount) / 100
  let interestString = String(interestAmount)

  
  for (let iRow = 1; iRow < props.height-2; iRow++) {
    // Jahresanfangsschuld und -endeschuld
    props.grid[iRow][1] = [loan, "_€"]
    props.grid[props.height-2-iRow][2] = [loan, "_€"]


    // Tilgung
    props.grid[iRow][3] = ["0","_€"];

    // Geldmittelabfluss
    props.grid[iRow][5] = [interestString,"_€"];


    // Zinsen
    props.grid[iRow][4] = [interestString,"_€"];

  }

  // Letzes Jahr:
  //Jahresanfangsschuld
  props.grid[props.height-2][1] = [loan,"_€"]

  
  // Tilgung
  props.grid[props.height-2][3] = [loan, "_€"];

  // Zinsen
  props.grid[props.height-2][4] = [interestString,"_€"];

  // Geldmittelabfluss
  props.grid[props.height-2][5] = [String(interestAmount + props.input.loanAmount), "_€"]

  return props.grid;
});

</script>

<template>
  <div >
      <h1>Fälligkeitsdarlehen</h1>
       <Grid :input="props.input" :grid="aggregatedGrid" :width="props.width" :height="props.height" /> 
  </div>
</template>
