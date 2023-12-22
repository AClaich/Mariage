<!-- <template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

 -->


 <style>
 a-button{
   cursor: pointer;
 }
</style>

<template>
 <a-form @submit="handleSubmit">
   <!-- Ajoutez ici les champs du formulaire pour le Faire-Part -->
   <a-form-item>
     <a-button type="primary" html-type="submit">Envoyer la réponse</a-button>
   </a-form-item>
 </a-form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Form, FormItem, Input, Button } from 'ant-design-vue';

const handleSubmit = (item: any) => {
  console.log('handleSubmit')
}
</script>
