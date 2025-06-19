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
    let annuitaet = props.input.repaymentRate // Absolute PR
    let annuitaetString = String(annuitaet)

    let iZins
    let iZinsString
    let iTilg
    let iTilgString
    let iJahresende
    let iJahresendeString
    let iJahresanfang = props.input.loanAmount
    let iJahresanfangString = String(iJahresanfang)

    for (let iRow = 1; iRow < props.height-2; iRow++) {
      
      if (iRow != 1) { props.grid[iRow][1] = props.grid[iRow-1][2]}

      iZins = (Number(props.grid[iRow][1][0]) * props.input.interestRate)/100
      iZinsString = String(iZins)

      iTilg = annuitaet - iZins
      iTilgString = String(iTilg)

      iJahresende = Number(props.grid[iRow][1][0])-iTilg
      iJahresendeString = String(iJahresende)

      

      // Jahresende
      props.grid[iRow][2] = [iJahresendeString, "_€"]

      // Tilgung
      props.grid[iRow][3] = [iTilgString, "_€"]

      // Zinsen
      props.grid[iRow][4] = [iZinsString, "_€"]

      // Annuität
      props.grid[iRow][5] = [annuitaetString, "_€"]

    }
    // Letzes Jahr

    // Jahresanfang
    props.grid[props.height-2][1] = props.grid[props.height-3][2]

    // Tilgung 
    props.grid[props.height-2][3] = props.grid[props.height-2][1]

    // Zinsen
    props.grid[props.height-2][4] = [String((Number(props.grid[props.height-2][1][0]) * props.input.interestRate)/100), "_€"]

    // Geldmittelabfluss
    props.grid[props.height-2][5] = [String(Number(props.grid[props.height-2][3][0])+Number(props.grid[props.height-2][4][0])) , "_€"]

    return props.grid;
});

</script>

<template>
  <div >
      <h1>Annuitätendarlehen</h1>
       <Grid :input="props.input" :grid="aggregatedGrid" :width="props.width" :height="props.height" /> 
  </div>
</template>
