<script setup lang="ts">


import { computed, ref } from 'vue'

import eingabe from './eingabe.vue'

import dAbzahlung from './dAbzahlung.vue'
import dFaelligkeit from './dFaelligkeit.vue'
import dAnnuitaet from './dAnnuitaet.vue'
import Grid from '../Grid.vue'
import CalcLine from './CalcLine.vue'

const currentDarlehen = ref<'0'|'A'|'B'|'C'>('0')

let eingabeParams = ref({
  loanAmount: 120000,
  interestRate: 8,
  term: 6,
  repaymentRate: 2,
  isGerman: false,
  isShowCalc: true,
})

type gridType = string[][][]

let calcLineAbzahlung = ref<gridType[]>([])

let calcLineAnnuitaet = ref<gridType[]>([])

let calcLineFaelligkeit = ref<gridType[]>([])




let grid = ref(getGrid(8))
let gridWidth = ref(6)
let gridHeight = ref(2)
let isDarlehenSelectionEnabled = ref(false)


function onEingabe(eingabe: any) {
  eingabeParams.value = eingabe;
  

  gridWidth.value = 6
  gridHeight.value = eingabe["term"] + 2;
  grid.value = getGrid(gridHeight.value)
  isDarlehenSelectionEnabled.value = true
  
  
}


function onAddCalcShowAbzahlung(grid: string[][][]) {
  calcLineAbzahlung.value.push(grid)
}

function onAddCalcShowAnnuitaet(grid: string[][][]) {
  calcLineAnnuitaet.value.push(grid)
}
function onAddCalcShowFaelligkeit(grid: string[][][]) {
  calcLineFaelligkeit.value.push(grid)
}


function getGrid(height : number) {
  
  let width = 6;
  
  let result =
    Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ["", ""])
  )
  // 1. Zeile
  let iZeile1 = 0
  result[0][iZeile1] = ["Jahr","_"]; iZeile1++;
  result[0][iZeile1] = ["Jahresanfang", "_"]; iZeile1++;
  result[0][iZeile1] = ["Jahresende", "_"]; iZeile1++;
  result[0][iZeile1] = ["Tilgung", "_"]; iZeile1++;
  result[0][iZeile1] = ["Zinsen", "_"]; iZeile1++;
  result[0][iZeile1] = ["Geldabfluss", "_"]; iZeile1++;
  

  // Jahres Spalte
  for (let iJahr = 1; iJahr < height-1;iJahr++) {
    result[iJahr][0] = [String(iJahr), "_"]
  }
  result[height-1][0] = ["Summe","_"]

  // Jahresanfangs- und Jahresendeschulden
  result[1][1] = [String(eingabeParams.value.loanAmount), "_€"]
  result[height-2][2] = ["0", "_€"]
  
  return result;
}

function onDarlehensChoice(choice : '0' | 'A' | 'B' | 'C') {
  currentDarlehen.value = choice
  switch (choice) {
    case 'A':
      calcLineAbzahlung.value = []
      
    case 'B':
      calcLineFaelligkeit.value = []
    
    case 'C':
      calcLineAnnuitaet.value = []
  }
}

</script>

<template>
  <div>
    <h1>Darlehensberechnungen</h1>

      <eingabe :eingabe="eingabeParams" :isAbsoluteTilgung="false" @update="onEingabe" v-if="currentDarlehen!='C'"/>
      <eingabe :eingabe="eingabeParams" :isAbsoluteTilgung="true" @update="onEingabe" v-else/>
      <button @click="onDarlehensChoice('A')">Abzahlungsdarlehen</button>
      <button @click="onDarlehensChoice('B')">Fälligkeitsdarlehen</button>
      <button @click="onDarlehensChoice('C')">Annuitätendarlehen</button>
    <div class="selection" v-if="isDarlehenSelectionEnabled">
      
      <div>
        
        <div v-if="currentDarlehen=='A'">
          <dAbzahlung    :input="eingabeParams" :grid="grid" :height="gridHeight" :width="gridWidth" @calc="onAddCalcShowAbzahlung" />
           </div>
        <div v-if="currentDarlehen=='B'">
          <dFaelligkeit  :input="eingabeParams" :grid="grid" :height="gridHeight" :width="gridWidth" @calc="onAddCalcShowFaelligkeit" />
         </div>
        <div v-if="currentDarlehen=='C'">
          <dAnnuitaet    :input="eingabeParams" :grid="grid" :height="gridHeight" :width="gridWidth" @calc="onAddCalcShowAnnuitaet" />
         </div>

        <div v-if="currentDarlehen == '0'">
          <p>Wählen Sie eine Darlehensart aus</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

