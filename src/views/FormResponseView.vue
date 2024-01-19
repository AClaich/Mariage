

<style>
a-form {
  width: fit-content;
}

a-row {
  width: 100%;
}

.container-button {
  text-align: center;
}

.text-align {
  text-align: center;
}
</style>



<style>
a-button {
  cursor: pointer;
}
</style>

<template>
  <a-row justify="center">
    <a-col :xxl="24">
      <h1 class="text-align">Formulaire de réponse</h1>
    </a-col>
    <a-col :xxl="24">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Vous serez présent au :">
          <a-checkbox-group v-model:value="formState.participation1">
            <a-checkbox value="1" name="vin" v-if="currentUser?.isVin === 1">Vin d'honneur</a-checkbox>
            <a-checkbox value="2" name="reception" v-if="currentUser?.isReception === 1">Réception</a-checkbox>
            <a-checkbox value="3" name="retour" v-if="currentUser?.isRetour === 1">Retour de noce</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="Végétarien ?">
          <span>
            Personne 1
            <a-switch v-model:checked="formState.vegetarien1" />
          </span>
          <span>
            Personne 2
            <a-switch v-model:checked="formState.vegetarien2" />
          </span>
        </a-form-item>
        <a-form-item label="Avez-vous besoin d'un logement ?" v-if="currentUser?.isReception === 1">
          <span>
            Personne 1
            <a-switch v-model:checked="formState.hebergement1" />
          </span>
          <span>
            Personne 2
            <a-switch v-model:checked="formState.hebergement2" />
          </span>
        </a-form-item>
        <a-form-item label="Vous en avez besoin pour quels jours ?" v-if="currentUser && currentUser.isReception === 1">
          <a-checkbox-group v-model:value="formState.jourHebergement1">
            <a-checkbox value="1" name="vin">Jeudi</a-checkbox>
            <a-checkbox value="2" name="reception">Vendredi</a-checkbox>
            <a-checkbox value="3" name="retour">Samedi</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 24 }" class="container-button">
          <a-button style="margin-right: 5px">Annuler</a-button>
          <a-button type="primary" @click="onSubmit" style="margin-left: 5px">Valider</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { onUnmounted, onMounted, reactive, ref } from 'vue';
import Papa from 'papaparse';
import type { UnwrapRef } from 'vue';
import type { FormState, UserEntity } from 'src/common/interfaces.ts';

const formState: UnwrapRef<FormState> = reactive({
  participation1: [],
  participation2: [],
  vegetarien1: false,
  vegetarien2: false,
  hebergement1: false,
  hebergement2: false,
  jourHebergement1: [],
  jourHebergement2: [],
});

let users: UserEntity[] = [];
const currentUser = ref<UserEntity | undefined>(undefined);

onMounted(async () => {
  const user = localStorage.getItem('user') || '{}';
  currentUser.value = user ? JSON.parse(user) : null;

  try {
    const response = await fetch('src/assets/DataConnexion.csv');
    const csvData = await response.text();

    Papa.parse(csvData, {
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      complete: (results: any) => {
        users = results.data as UserEntity[];
      },
    });
  } catch (error) {
    console.error('Error parsing CSV:', error);
  }
});

const onSubmit = () => {
  users = users.map((user: UserEntity) => {
    if (user.email === currentUser.value?.email) {
      user.presenceVin1 = formState.participation1.includes('1') ? 1 : 0;
      user.presenceReception1 = formState.participation1.includes('2') ? 1 : 0;
      user.presenceRetour1 = formState.participation1.includes('3') ? 1 : 0;
      user.vegetarien1 = formState.vegetarien1 ? 1 : 0;
      user.logement1 = formState.hebergement1 ? 1 : 0;
      user.jeudi1 = formState.jourHebergement1.includes('1') ? 1 : 0;
      user.vendredi1 = formState.jourHebergement1.includes('2') ? 1 : 0;
      user.samedi1 = formState.jourHebergement1.includes('3') ? 1 : 0;

      user.presenceVin2 = formState.participation2.includes('1') ? 1 : 0;
      user.presenceReception2 = formState.participation2.includes('2') ? 1 : 0;
      user.presenceRetour2 = formState.participation2.includes('3') ? 1 : 0;
      user.vegetarien2 = formState.vegetarien2 ? 1 : 0;
      user.logement2 = formState.hebergement2 ? 1 : 0;
      user.jeudi2 = formState.jourHebergement2.includes('1') ? 1 : 0;
      user.vendredi2 = formState.jourHebergement2.includes('2') ? 1 : 0;
      user.samedi2 = formState.jourHebergement2.includes('3') ? 1 : 0;
    }
    return user;
  });
  const csvContent = Papa.unparse(users, { delimiter: ',' });

  console.log(csvContent);

  const blob = new Blob([csvContent], { type: 'text/csv' });

  // const downloadLink = document.createElement('a');
  // downloadLink.href = URL.createObjectURL(blob);
  // downloadLink.download = 'src/assets/DataConnexion.csv';

  // Trigger a click on the link to start the download
  // downloadLink.click();
  // Papa.unparse(users, {
  //   delimiter: ',',
  //   header: true,
  //   complete: async (results: any) => {

  //   },
  // });
};

const labelCol = { span: 12 };
const wrapperCol = { span: 12 };

onUnmounted(() => {
  localStorage.clear();
});

defineProps(['currentUser']);
</script>
