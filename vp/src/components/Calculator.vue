<script setup>
import { ref } from 'vue'

const equation = ref('')
const resultCalled = ref(false)

const handleClick = (num) => {
  if (num === 'C') {
    equation.value = ''
    resultCalled.value = false
  } else if (num === '=') {
    try {
      equation.value = eval(equation.value).toString()
      resultCalled.value = true
    } catch {
      equation.value = 'Error'
    }
  } else {
    if (resultCalled.value) {
      equation.value = num
      resultCalled.value = false
    } else {
      equation.value += num
    }
  }
}
</script>

<template>
  <h1>Taschenrechner</h1>
  <div class="calculator">
    <div class="display">{{ equation || '0' }}</div>
    <div class="buttons">
      <button v-for="num in ['7','8','9','+','4','5','6','-','1','2','3','*','C','0','=','/']"
              :key="num"
              @click="handleClick(num)">
        {{ num }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}
.display {
  background: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  text-align: right;
  font-size: 24px;
  border-radius: 4px;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
button {
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  border: none;
}
button:hover {
  background: #ddd;
}
</style>