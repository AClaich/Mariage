<template>
  <div class="container">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ xxl: 6, sm: 24 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Identifiant"
        name="username"
        :rules="[
          {
            required: true,
            message:
              'Attention ! Vous devez entrer votre identifiant ! Sinon ça marche pas...',
          },
        ]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item
        label="Mot de passe"
        name="password"
        :rules="[
          {
            required: true,
            message:
              'Attention ! Vous devez entrer votre mot de passe ! Sinon ça marche pas...',
          },
        ]"
      >
        <a-input-password v-model:value="formState.password" id="password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Se connecter</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import type { LoginFormState } from "@/common/interfaces";
import { useStore } from "@/store";

const store = useStore();

const formState = reactive<LoginFormState>({
  username: "",
  password: "",
});

const router = useRouter();

onMounted(async () => {
  store.setListUsers();
});

const onFinish = (values: LoginFormState) => {
  if (!values.username || !values.password) {
    return;
  }
  store.login(values);
  router.push("/reponse");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

defineProps(["listUsers"]);
</script>

<style scoped>
#password {
  -webkit-text-security: disc;
}
.container {
  @media (min-width: 1024px) {
    padding-top: 36px;
    padding-left: 300px;
    padding-right: 300px;
    width: 100vw;
    height: 100vw;
  }

  @media (max-width: 1023px) {
    padding-top: 36px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

.box-shadow {
  box-shadow: 10px 5px 5px #00000026;
}
</style>
