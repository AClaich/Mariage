<template>

  <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item label="Identifiant" name="username"
      :rules="[{ required: true, message: 'Attention ! Vous devez entrer votre identifiant ! Sinon ça marche pas...' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item label="Mot de passe" name="password"
      :rules="[{ required: true, message: 'Attention ! Vous devez entrer votre mot de passe ! Sinon ça marche pas...' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" >Se connecter</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { LoginFormState, UserEntity } from '@/common/interfaces';
import { useStore } from 'vuex';

const store = useStore();

const formState = reactive<LoginFormState>({
  username: '',
  password: '',
});

const router = useRouter();

const listUsers = ref<UserEntity[] | undefined>(undefined);

onMounted(async () => {
  console.log(store.getters.listUsers);
  listUsers.value = store.getters.listUsers;
});

const onFinish = (values: LoginFormState) => {
  if (!values.username || !values.password) {
    return;
  }
  store.dispatch('login', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

defineProps(["listUsers"]);
</script>
