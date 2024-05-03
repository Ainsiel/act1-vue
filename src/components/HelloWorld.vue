<script setup>
import { ref } from 'vue';

const title = "Tutorial Vue Especializacion Tecnologica 1"
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <p>Contador: {{ count }}</p>
      <button @click="increment">Incrementar</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
