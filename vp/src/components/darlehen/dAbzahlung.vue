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
    let tilgung = Number((props.input.loanAmount / props.input.term))
    let tilgungString = String(tilgung)

    // Counter
    let iJahresende = props.input.loanAmount - tilgung;
    let iJahresendeString
    let iZinsen
    let iZinsenString
    let iGeldmittel
    let iGeldmittelString

    for (let iRow = 1; iRow < props.height-2; iRow++) {
    
      if (iRow != 1) { iJahresende -= tilgung; }
      iJahresendeString = String(iJahresende)
      
      iZinsen = (iJahresende * props.input.interestRate)/100.0
      iZinsenString = String(iZinsen)

      iGeldmittel = tilgung + iZinsen
      iGeldmittelString = String(iGeldmittel)

      // Jahresanfang
      if (iRow != 1) { props.grid[iRow][1] = props.grid[iRow-1][2]}

      // Restschuld
      props.grid[iRow][2] = [iJahresendeString, "_€"]
      
      // Tilgung
      props.grid[iRow][3] = [tilgungString, "_€"]

      // Zinsen
      props.grid[iRow][4] = [iZinsenString, "_€"]

      // Geldmittelabfluss
      props.grid[iRow][5] = [iGeldmittelString, "_€"]

    }



    // Letzes Jahr

    // Restschuld
    props.grid[props.height-2][1] = props.grid[props.height-3][2]

    // Tilgung
    props.grid[props.height-2][3] = [tilgungString, "_€"]

    // Zinsen
    iZinsen = (Number(props.grid[props.height-2][1][0]) * props.input.interestRate)/100.0
    iZinsenString = String(iZinsen)
    props.grid[props.height-2][4] = [iZinsenString, "_€"]

    // Geldmittelabfluss
    iGeldmittel = tilgung + iZinsen
    iGeldmittelString = String(iGeldmittel)
    props.grid[props.height-2][5] = [iGeldmittelString, "_€"]

    return props.grid;
});


</script>

<template>
  <div >
      <h1>Abzahlungsdarlehen</h1>
      <Grid :input="props.input" :grid="aggregatedGrid" :width="props.width" :height="props.height" /> 
  </div>
</template>
