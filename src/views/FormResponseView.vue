

<style>
a-form {
  width: fit-content;
}

a-row {
  width: 100%;
}

a-button {
  cursor: pointer;
}
</style>

<template>
  <a-row justify="center">
    <a-col :xxl="24">
      <h1 class="text-center">Formulaire de réponse</h1>
    </a-col>
    <a-col :xxl="24" v-if="currentUser">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row justify="center">
          <a-col :xxl="12">
          </a-col>
          <a-col :xxl="6">
            <span v-if="currentUser?.user1">{{ currentUser?.user1.prenom }} {{ currentUser?.user1.nom }}</span>
          </a-col>
          <a-col :xxl="6">
            <span v-if="currentUser?.user2">{{ currentUser?.user2?.prenom }} {{ currentUser?.user2?.nom }}</span>
          </a-col>
          <a-col :xxl="24">
            <a-form-item label="Vous serez présent au :">
              <a-row>
                <a-col :span="12">
                  <a-checkbox-group v-model:value="formState.user1.participation">
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox value="1" name="vin" v-if="currentUser?.user1.isVin === 1">Vin d'honneur</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="2" name="reception"
                          v-if="currentUser?.user1.isReception === 1">Réception</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="3" name="retour" v-if="currentUser?.user1.isRetour === 1">Retour de
                          noce</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>
                </a-col>
                <a-col :span="12">
                  <a-checkbox-group v-model:value="formState.user2.participation" v-if="currentUser.user2">
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox value="1" name="vin" v-if="currentUser?.user1.isVin === 1">Vin d'honneur</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="2" name="reception"
                          v-if="currentUser?.user1.isReception === 1">Réception</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="3" name="retour" v-if="currentUser?.user1.isRetour === 1">Retour de
                          noce</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label="Végétarien ?">
              <a-row>
                <a-col :span="12">
                  <a-switch v-model:checked="formState.user1.vegetarien" checked-children="Oui"
                    un-checked-children="Non" />
                </a-col>
                <a-col :span="12">
                  <a-switch v-model:checked="formState.user2.vegetarien" v-if="currentUser?.user2" checked-children="Oui"
                    un-checked-children="Non" />
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label="Avez-vous besoin d'un logement ?" v-if="currentUser.user1.isReception === 1">
              <a-row>
                <a-col :span="12">
                  <a-switch v-model:checked="formState.user1.hebergement" checked-children="Oui"
                    un-checked-children="Non" />
                </a-col>
                <a-col :span="12">
                  <a-switch v-model:checked="formState.user2.hebergement" v-if="currentUser?.user2 !== null"
                    checked-children="Oui" un-checked-children="Non" />
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label="Vous en avez besoin pour quels jours ?" v-if="currentUser?.user1.isReception === 1">
              <a-row>
                <a-col :span="12">
                  <a-checkbox-group v-model:value="formState.user1.jourHebergement">
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox value="1" name="vin">Jeudi</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="2" name="reception">Vendredi</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="3" name="retour">Samedi</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>
                </a-col>
                <a-col :span="12">
                  <a-checkbox-group v-model:value="formState.user2.jourHebergement" v-if="currentUser?.user2">
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox value="1" name="vin">Jeudi</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="2" name="reception">Vendredi</a-checkbox>
                      </a-col>
                      <a-col :span="24">
                        <a-checkbox value="3" name="retour">Samedi</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 24 }" class="text-center">
              <a-button style="margin-right: 5px">Annuler</a-button>
              <a-button type="primary" @click="onSubmit" style="margin-left: 5px">Valider</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Papa from 'papaparse';
import type { UnwrapRef } from 'vue';
import type { FormState, UserEntity } from '@/common/interfaces';
import { useStore } from 'vuex';

const store = useStore();

const formState: UnwrapRef<FormState> = reactive({
  user1: {
    participation: [],
    vegetarien: false,
    hebergement: false,
    jourHebergement: [],
  },
  user2: {
    participation: [],
    vegetarien: false,
    hebergement: false,
    jourHebergement: [],
  },
});

let users: UserEntity[] = [];
const currentUser = ref<{ user1: UserEntity; user2: UserEntity } | undefined>(undefined);

onMounted(async () => {
  currentUser.value = store.getters.currentUser;
  console.log(currentUser);

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
    if (user.email === currentUser.value?.user1.email) {
      user.presenceVin1 = formState.user1.participation.includes('1') ? 1 : 0;
      user.presenceReception1 = formState.user1.participation.includes('2') ? 1 : 0;
      user.presenceRetour1 = formState.user1.participation.includes('3') ? 1 : 0;
      user.vegetarien1 = formState.user1.vegetarien ? 1 : 0;
      user.logement1 = formState.user1.hebergement ? 1 : 0;
      user.jeudi1 = formState.user1.jourHebergement.includes('1') ? 1 : 0;
      user.vendredi1 = formState.user1.jourHebergement.includes('2') ? 1 : 0;
      user.samedi1 = formState.user1.jourHebergement.includes('3') ? 1 : 0;

      user.presenceVin2 = formState.user2.participation.includes('1') ? 1 : 0;
      user.presenceReception2 = formState.user2.participation.includes('2') ? 1 : 0;
      user.presenceRetour2 = formState.user2.participation.includes('3') ? 1 : 0;
      user.vegetarien2 = formState.user2.vegetarien ? 1 : 0;
      user.logement2 = formState.user2.hebergement ? 1 : 0;
      user.jeudi2 = formState.user2.jourHebergement.includes('1') ? 1 : 0;
      user.vendredi2 = formState.user2.jourHebergement.includes('2') ? 1 : 0;
      user.samedi2 = formState.user2.jourHebergement.includes('3') ? 1 : 0;
    }
    return user;
  });
  const csvContent = Papa.unparse(users, { delimiter: ',' });

  console.log(csvContent);

  
  
  // const filePath = path.join(__dirname, '../assets/DataConnexion.csv');

  // const blob = new Blob([csvContent], { type: 'text/csv' });

  // const downloadLink = document.createElement('a');
  // downloadLink.href = URL.createObjectURL(blob);
  // downloadLink.download = 'src/assets/DataConnexion.csv';

  // // Trigger a click on the link to start the download
  // downloadLink.click();
};

const labelCol = { span: 12 };
const wrapperCol = { span: 12 };

// onUnmounted(() => {
//   localStorage.clear();
// });

defineProps(['currentUser']);
</script>
