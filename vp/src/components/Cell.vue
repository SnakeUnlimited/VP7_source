



<template>
  <input v-if="format.includes('_')"
    :value="getTextValue()"
    class="cell"
    readonly
  />
  <input v-else
    :value="getTextValue()"
    class="cell"
    
  />
  
</template>

<script setup lang="ts">

const props = defineProps<{
  value : String,
  format : String, 
  row : number,
  col : number,
  isGerman : boolean,
}>()

  function getTextValue() {
      if (props.value == '') {
        return '';
      }

      // Remove all _
      let formatRelevant = props.format.replace(new RegExp('_','g'), () => '');

      let valueRelevant = props.value
      if (props.format != '_') {
        if (props.isGerman) {
          valueRelevant = new Intl.NumberFormat('de-DE').format(Number(props.value));
        } else {
          valueRelevant = new Intl.NumberFormat('en-US').format(Number(props.value));
        } 
      }



      switch (formatRelevant) {
        case '':
          // TODO: GUISwitch Komma/Punkt+ hier string.replace  // NON-WRITE format _
          return valueRelevant;
      }
      return valueRelevant + formatRelevant;
    }


</script>

<style scoped>
.cell {
  border: 1px solid #ccc;
  padding: 5px;
  min-width: 100px;
}
</style>