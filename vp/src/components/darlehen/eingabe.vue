<template>
  <div>
    <div>
      <label>Darlehenssumme (€): </label>
      <input v-model="loanAmount" type="number"/>
    </div>
    <div>
      <label>Zinssatz (%): </label>
      <input v-model="interestRate" type="number"/>
    </div>
    <div>
      <label>Laufzeit (Jahre): </label>
      <input v-model="term" type="number"/>
    </div>
    <div v-if="!props.isAbsoluteTilgung">
      <label>Tilgung (%): </label>
      <input v-model="repaymentRate" type="number" value="2" />
    </div>
    <div v-else>
      <label>Annuität (€ p.a.): </label>
      <input v-model="repaymentRate" type="number" value="33000"/>
    </div>
    <div>
      <label>Zahlen-Format: An = DE | Aus = US </label>
      <input v-model="isGerman" type="checkbox"/>
    </div>
    <div>
    </div>
    <div>
      <button @click="calculate">Berechnen</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'


// Define the event you want to emit
const emit = defineEmits<{
  (e: 'update', value: Record<string, any>): void
}>()


const loanAmount = ref(120000)
const interestRate = ref(8)
const term = ref(6) // Laufzeit
const repaymentRate = ref(2)
const isGerman = ref(false)
const isShowCalc = ref(true)


const props = defineProps<{
  eingabe: Record<string, any>,
  isAbsoluteTilgung: boolean,
}>()



const calculate = () => {
  let eingabe = {
    loanAmount: loanAmount.value,
    interestRate: interestRate.value,
    term: term.value,
    repaymentRate: repaymentRate.value,
    isGerman: isGerman.value,
    calcLine: ref<string[][][]>(Array.from({ length: term.value+2}, () =>
    Array.from({ length: 6 }, () => ["", ""]))),
  }


  // Zum Parent!
  emit('update', eingabe)
}

</script>