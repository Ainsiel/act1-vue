<template>
    <div>
        <button @click="showMessage">Mostrar/Ocultar
            mensaje</button>
        <p v-if="mostrarMensaje">¡Hola, mundo!</p>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const mostrarMensaje = ref(false)

const showMessage = () => {
    mostrarMensaje.value = !mostrarMensaje.value
}
</script>