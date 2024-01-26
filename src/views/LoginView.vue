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
import axios from "axios";

const store = useStore();

const formState = reactive<LoginFormState>({
  username: '',
  password: '',
});

const router = useRouter();

const listUsers = ref<UserEntity[] | undefined>(undefined);

onMounted(async () => {
  // try {
  //   const response = await fetch('src/assets/DataConnexion.csv');
  //   const csvData = await response.text();

  //   Papa.parse(csvData, {
  //         header: true,
  //         delimiter: ',',
  //         dynamicTyping: true,
  //         complete: (results: any) => {
  //           users = results.data as UserEntity[];
  //         },
  //       });
  // } catch (error) {
  //   console.error('Error parsing CSV:', error);
  // }
  listUsers.value = store.getters.listUsers;
});

const onFinish = (values: LoginFormState) => {
  const user: UserEntity | undefined = users.find((user: UserEntity) => {
    if (!user.email || !user.password) {
      return false;
    }
    return user.email.toLowerCase() === values.username.toLowerCase() && user.password.toLowerCase() === values.password.toLowerCase();
  });

  if (user) {
    store.commit('setCurrentUser', user);
    router.push('/reponse');
  } else {
    alert('Identifiant ou mot de passe incorrect !');
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
