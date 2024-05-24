<template>
    <div class="container">
        <h2 v-if="mensaje">{{ mensaje }}</h2>
        <h3>{{ appStore.dato }}</h3>
        <router-link to="/pinia" class="btn btn-primary mt-3">Ir a
            Pinia</router-link>
        <router-link to="/admin" class="btn btn-primary mt-3 mx-4">Ir a
            Admin</router-link>
        <h1 class="text-center my-4">Componente Padre</h1>
        <Hijo :mensaje="mensajePadre" @actualizarMensaje="mensajePadre =
            $event" />
        <button class="btn btn-primary mt-3" v-on:click="resetearMensaje">Resetear Mensaje</button>
        <p v-if="mensajePadre === 'Hola desde el padre'" class="mt-3">El
            mensaje está en su estado original</p>
        <p v-else class="mt-3 text-warning">El mensaje ha sido cambiado por
            el hijo</p>
        <div class="mt-5">
            <h2>Lista de tareas</h2>
            <div v-for="(tarea, index) in tareas" :key="index" class="form-check">
                <input type="checkbox" v-model="tarea.completada" :id="'tarea' +
            index" class="form-check-input" @change="actualizarTarea(index)">
                <label :for="'tarea' + index" class="form-check-label">{{
            tarea.nombre }}</label>
                <p v-if="tarea.completada" class="text-success">¡Tarea
                    completada!</p>
            </div>
        </div>
    </div>
</template>

<script>
import Hijo from './Hijo.vue';
import { useAppStore } from "../stores/index.js";

export default {
    components: {
        Hijo
    },
    name: 'Base',
    data() {
        return {
            mensajePadre: 'Hola desde el padre',
            tareas: [
            ],
            mensaje: ''
        }
    },
    methods: {
        resetearMensaje() {
            this.mensajePadre = 'Hola desde el padre';
        },
        obtenerMensaje() {
            fetch('http://localhost:3000/hello')
                .then(response => response.text())
                .then(data => {
                    this.mensaje = data;
                });
        },
        fetchTareas() {
            fetch('http://localhost:3000/tareas')
                .then(response => response.json())
                .then(data => {
                    this.tareas = data;
                });
        },
        actualizarTarea(index) {
            fetch('http://localhost:3000/tareas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    index: index,
                    completada: this.tareas[index].completada
                }),
            })
                .then(response => response.json())
                .then(data => { console.log(`Tarea ${index} actualizada:${data.completada}`); });
        }
    },
    created() {
        this.obtenerMensaje();

    },
    setup() {
        // Acceder a la store de la app
        const appStore = useAppStore();
        return {
            appStore
        };
    }
}    
</script>