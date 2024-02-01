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

.titre {
  font-family: Parisienne, serif;
  font-size: 50px;
}

.container {
  height: 100vh;
  width: 100vw;
  padding: 0 100px;
}

.items{
  margin-top: 18px;
}

.icon-delete, .icon-valid{
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
}

.icon-delete {
  color: brown;
}

.icon-valid{ 
  color: chartreuse;
}

</style>

<template>
  <div class="container">
    <a-row justify="center">
      <a-col :xxl="24">
        <h1 class="text-center titre">Formulaire de réponse</h1>
      </a-col>
      <a-col :xl="22" :xxl="20" v-if="currentUser">
        <a-form
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row justify="center">
            <a-col :lg="12"> </a-col>
            <a-col :lg="6">
              <h3 v-if="currentUser?.user1"
                >{{ currentUser?.user1?.prenom }}
                {{ currentUser?.user1?.nom }}</h3
              >
            </a-col>
            <a-col :lg="6">
              <h3 v-if="currentUser?.user2"
                >{{ currentUser?.user2?.prenom }}
                {{ currentUser?.user2?.nom }} <CloseOutlined v-if="currentUser?.user1.canInvite" class="icon-delete"/></h3
              >
              <h3 v-if="!currentUser?.user2 && currentUser?.user1.canInvite"
                >{{ currentUser?.user2?.prenom }}
                {{ currentUser?.user2?.nom }} <CheckOutlined class="icon-valid"/></h3
              >
            </a-col>
            <a-col :lg="24" class="items">
              <a-form-item label="Vous serez présent au :">
                <a-row>
                  <a-col :lg="12">
                    <a-checkbox-group
                      v-model:value="formState.user1.participation"
                    >
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox
                            value="1"
                            name="vin"
                            v-if="currentUser?.user1.isVin === 1"
                            >Vin d'honneur</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="2"
                            name="reception"
                            v-if="currentUser?.user1.isReception === 1"
                            >Réception</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="3"
                            name="retour"
                            v-if="currentUser?.user1.isRetour === 1"
                            >Retour de noce</a-checkbox
                          >
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-col>
                  <a-col :span="6">
                    <a-checkbox-group
                      v-model:value="formState.user2.participation"
                      v-if="currentUser.user2"
                    >
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox
                            value="1"
                            name="vin"
                            v-if="currentUser?.user1.isVin === 1"
                            >Vin d'honneur</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="2"
                            name="reception"
                            v-if="currentUser?.user1.isReception === 1"
                            >Réception</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="3"
                            name="retour"
                            v-if="currentUser?.user1.isRetour === 1"
                            >Retour de noce</a-checkbox
                          >
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item label="Végétarien ?">
                <a-row>
                  <a-col :span="12">
                    <a-switch
                      v-model:checked="formState.user1.vegetarien"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                  <a-col :span="12">
                    <a-switch
                      v-model:checked="formState.user2.vegetarien"
                      v-if="currentUser?.user2"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="Avez-vous besoin d'un logement ? (35 €/nuit/personne)"
                v-if="currentUser.user1.isReception === 1"
              >
                <a-row>
                  <a-col :span="12">
                    <a-switch
                      v-model:checked="formState.user1.hebergement"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                  <a-col :span="12">
                    <a-switch
                      v-model:checked="formState.user2.hebergement"
                      v-if="currentUser?.user2 !== null"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="Vous en avez besoin pour quels jours ?"
                v-if="currentUser?.user1.isReception === 1"
              >
                <a-row>
                  <a-col :span="12">
                    <a-checkbox-group
                      v-model:value="formState.user1.jourHebergement"
                    >
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox value="1" name="vin">Jeudi</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="2" name="reception"
                            >Vendredi</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="3" name="retour"
                            >Samedi</a-checkbox
                          >
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-col>
                  <a-col :span="12">
                    <a-checkbox-group
                      v-model:value="formState.user2.jourHebergement"
                      v-if="currentUser?.user2"
                    >
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox value="1" name="vin">Jeudi</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="2" name="reception"
                            >Vendredi</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="3" name="retour"
                            >Samedi</a-checkbox
                          >
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 24 }" class="text-center">
                <a-button style="margin-right: 5px">Annuler</a-button>
                <a-button
                  type="primary"
                  @click="onSubmit"
                  style="margin-left: 5px"
                  >Valider</a-button
                >
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import type { UnwrapRef } from "vue";
import type { FormState, UserAttributes } from "@/common/interfaces";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons-vue";
import { useStore } from "@/store";


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

const currentUser = computed(
  (): { id: number; user1: UserAttributes; user2: UserAttributes } =>
    store.getCurrentUser!
);

onMounted(() => {
  if (currentUser.value.id) {
    if (currentUser.value.user1.presenceVin1)
      formState.user1.participation.push("1");
    if (currentUser.value.user1.presenceReception1)
      formState.user1.participation.push("2");
    if (currentUser.value.user1.presenceRetour1)
      formState.user1.participation.push("3");

    if (currentUser.value.user2.presenceVin2)
      formState.user2.participation.push("1");
    if (currentUser.value.user2.presenceReception2)
      formState.user2.participation.push("2");
    if (currentUser.value.user2.presenceRetour2)
      formState.user2.participation.push("3");

    if (currentUser.value.user2.jeudi2)
      formState.user2.jourHebergement.push("1");
    if (currentUser.value.user2.vendredi2)
      formState.user2.jourHebergement.push("2");
    if (currentUser.value.user2.samedi2)
      formState.user2.jourHebergement.push("3");

    if (currentUser.value.user1.jeudi1)
      formState.user1.jourHebergement.push("1");
    if (currentUser.value.user1.vendredi1)
      formState.user1.jourHebergement.push("2");
    if (currentUser.value.user1.samedi1)
      formState.user1.jourHebergement.push("3");

    formState.user1.vegetarien =
      currentUser.value.user1.vegetarien1 === 1 ? true : false;
    formState.user2.vegetarien =
      currentUser.value.user2.vegetarien2 === 1 ? true : false;
    formState.user1.hebergement =
      currentUser.value.user1.logement1 === 1 ? true : false;
    formState.user2.hebergement =
      currentUser.value.user2.logement2 === 1 ? true : false;
  }
});

const onSubmit = () => {
  store.sendFormResult(formState);
};

const labelCol = { span: 12 };
const wrapperCol = { span: 12 };

defineProps(["currentUser"]);
</script>
