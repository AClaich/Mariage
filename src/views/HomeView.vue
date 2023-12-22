<!-- <script>
import { defineProps } from 'vue';
import { Form, FormItem, Input, Button } from 'ant-design-vue';
</script> -->

<!-- <template>
  <main>
    <TheWelcome />
  </main>
</template> -->


<template>
  <a-form @submit="handleSubmit()">
    <a-form-item label="Nom d'utilisateur">
      <a-input :v-bind="username" />
    </a-form-item>
    <a-form-item label="Mot de passe">
      <a-input type="password" :v-model="password" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Se connecter</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
defineProps<{
      username: '',
      password: '',
}>()

const handleSubmit = () => {
  // Ajoutez ici la logique de gestion de la connexion avec Vuex ou une requête HTTP
  // Enregistrez l'état de connexion dans votre store Vuex si nécessaire
}
</script>
