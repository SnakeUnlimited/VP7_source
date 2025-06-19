



<template>
  
  <div class="grid-container">
    <div class="grid-row" v-for="iRow in range(height)" :key="iRow">
      <div class="grid-col" v-for="iCol in range(width)" :key="iCol">
        <Cell :row="iRow" 
          :col="iCol" 
          :value="aggregatedGrid[iRow][iCol][0]" 
          :format="aggregatedGrid[iRow][iCol][1]"
          :isGerman="props.input.isGerman"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Cell from './Cell.vue'
import '../styles/grid.css'

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

function onClick() {
  console.log("griiid", props.grid, "h:", props.height, "l:", props.width)
  console.log("tesst grid", props.grid[0][1][0])
}

const props = defineProps<{
  grid: any[][][],
  width: number,
  height: number,
  input: Record<string, any>,
}>()

const aggregatedGrid = computed<string[][][]>(() => {
   // Summen Makros
  let iSum = props.height - 1 // letze Zeile wo die Summen reinkommen
  let sumTilgung = 0
  let sumZinsen = 0
  let sumGesamt = 0
  
  for (let iRow = 1; iRow < props.height-2; iRow++) {
  // Tilgungssumme
    sumTilgung += Number(props.grid[iRow][3][0])
    
    // Zinsenssumme
    sumZinsen += Number(props.grid[iRow][4][0])
 
    // Geldmittelabfluss Gesamt
    sumGesamt += Number(props.grid[iRow][5][0])
  }
  
  // Summen
  sumTilgung += Number(props.grid[props.height-2][3][0])
  sumZinsen += Number(props.grid[props.height-2][4][0])
  sumGesamt += Number(props.grid[props.height-2][5][0])

  props.grid[iSum][3] = [String(sumTilgung), "_€"]
  props.grid[iSum][4] = [String(sumZinsen), "_€"]
  props.grid[iSum][5] = [String(sumGesamt), "_€"]
  
  
  return props.grid;
});


</script>
