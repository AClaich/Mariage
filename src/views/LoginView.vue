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
  <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item label="Identifiant" name="username" :rules="[{ required: true, message: 'Attention ! Vous devez entrer votre identifiant ! Sinon ça marche pas...' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="Mot de passe" name="password" :rules="[{ required: true, message: 'Attention ! Vous devez entrer votre mot de passe ! Sinon ça marche pas...' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Se connecter</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
