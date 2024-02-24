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
          <a-row>
            <a-col :lg="12"> </a-col>
            <a-col :lg="4">
              <h3 v-if="currentUser?.user1">
                {{ currentUser?.user1?.prenom }} {{ currentUser?.user1?.nom }}
              </h3>
            </a-col>
            <a-col :lg="6">
              <h3 v-if="currentUser?.user2.prenom">
                {{ currentUser?.user2?.prenom }} {{ currentUser?.user2?.nom }}
                <CloseOutlined
                  v-if="currentUser?.user1.can_invite"
                  @click="removeUser2"
                  class="icon-delete"
                />
              </h3>
              <a-row
                v-if="!currentUser?.user2.nom && currentUser?.user1.can_invite"
                justify="space-between"
              >
                <a-col :span="20">
                  <a-input v-model:value="user2" placeholder="Votre +1">
                  </a-input>
                </a-col>
                <a-col :span="3">
                  <a-button type="primary" @click="validUser2">
                    <CheckOutlined class="icon-valid"
                  /></a-button>
                </a-col>
              </a-row>
            </a-col>
            <a-col :lg="24" class="items">
              <a-form-item label="Vous serez présent au :">
                <a-row>
                  <a-col :lg="8">
                    <a-checkbox-group
                      v-model:value="formState.user1.participation"
                    >
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox
                            value="1"
                            name="vin"
                            v-if="currentUser?.user1.is_vin === 1"
                            >Vin d'honneur</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="2"
                            name="reception"
                            v-if="currentUser?.user1.is_reception === 1"
                            >Réception</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="3"
                            name="retour"
                            v-if="currentUser?.user1.is_retour === 1"
                            >Retour de noce</a-checkbox
                          >
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-col>
                  <a-col :span="6" v-if="currentUser.user2.prenom">
                    <a-checkbox-group
                      v-model:value="formState.user2.participation"
                      v-if="currentUser.user2"
                    >
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox
                            value="1"
                            name="vin"
                            v-if="currentUser?.user1.is_vin === 1"
                            >Vin d'honneur</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="2"
                            name="reception"
                            v-if="currentUser?.user1.is_reception === 1"
                            >Réception</a-checkbox
                          >
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox
                            value="3"
                            name="retour"
                            v-if="currentUser?.user1.is_retour === 1"
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
                  <a-col :span="8">
                    <a-switch
                      v-model:checked="formState.user1.vegetarien"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                  <a-col :span="12" v-if="currentUser.user2.prenom">
                    <a-switch
                      v-model:checked="formState.user2.vegetarien"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="Avez-vous besoin d'un logement ? (25 €/nuit/personne)"
                v-if="currentUser.user1.is_reception === 1"
              >
                <a-row>
                  <a-col :span="8">
                    <a-switch
                      v-model:checked="formState.user1.hebergement"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                  <a-col :span="12" v-if="currentUser.user2.prenom">
                    <a-switch
                      v-model:checked="formState.user2.hebergement"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="Vous en avez besoin pour quels jours ?"
                v-if="currentUser?.user1.is_reception === 1 && (formState.user2.hebergement || formState.user1.hebergement)"
              >
                <a-row>
                  <a-col :span="8">
                    <a-checkbox-group
                      v-model:value="formState.user1.jourHebergement"
                      v-if="formState.user1.hebergement"
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
                  <a-col :span="12" v-if="currentUser.user2.prenom">
                    <a-checkbox-group
                      v-model:value="formState.user2.jourHebergement"
                      v-if="currentUser?.user2 && formState.user2.hebergement"
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
                <!-- <a-button style="margin-right: 5px">Annuler</a-button> -->
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

        <a-row justify="center">
          <a-col>
            <a-button @click="cantCome" style="margin-left: 5px"
              >Je ne peux pas venir</a-button
            >
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
  <div class="container-mobile">
    <a-row justify="center">
      <a-col>
        <h1 class="text-center titre">Formulaire de réponse</h1>
      </a-col>
      <a-col v-if="currentUser">
        <a-form
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row>
            <a-col :span="12">
              <h3 v-if="currentUser?.user1">
                {{ currentUser?.user1?.prenom }} {{ currentUser?.user1?.nom }}
              </h3>
            </a-col>
            <a-col :span="12">
              <h3 v-if="currentUser?.user2.nom">
                {{ currentUser?.user2?.prenom }} {{ currentUser?.user2?.nom }}
                <CloseOutlined
                  v-if="currentUser?.user1.can_invite"
                  @click="removeUser2"
                  class="icon-delete"
                />
              </h3>
              <a-row
                v-if="!currentUser?.user2.nom && currentUser?.user1.can_invite"
                justify="space-between"
              >
                <a-col :span="20">
                  <a-input v-model:value="user2" placeholder="Votre +1">
                  </a-input>
                </a-col>
                <a-col :span="3">
                  <a-button type="primary" @click="validUser2">
                    <CheckOutlined class="icon-valid"
                  /></a-button>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="items">
              <a-form-item label="Vous serez présent au :">
                <a-row>
                  <a-col :span="12">
                    <a-checkbox-group
                      v-model:value="formState.user1.participation"
                    >
                      <a-row>
                        <a-col span="24">
                          <a-checkbox
                            value="1"
                            name="vin"
                            v-if="currentUser?.user1.is_vin === 1"
                            >Vin d'honneur</a-checkbox
                          >
                        </a-col>
                        <a-col span="24">
                          <a-checkbox
                            value="2"
                            name="reception"
                            v-if="currentUser?.user1.is_reception === 1"
                            >Réception</a-checkbox
                          >
                        </a-col>
                        <a-col span="24">
                          <a-checkbox
                            value="3"
                            name="retour"
                            v-if="currentUser?.user1.is_retour === 1"
                            >Retour de noce</a-checkbox
                          >
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-col>
                  <a-col :span="12" v-if="currentUser.user2.prenom">
                    <a-checkbox-group
                      v-model:value="formState.user2.participation"
                    >
                      <a-row>
                        <a-col span="24">
                          <a-checkbox
                            value="1"
                            name="vin"
                            v-if="currentUser?.user1.is_vin === 1"
                            >Vin d'honneur</a-checkbox
                          >
                        </a-col>
                        <a-col span="24">
                          <a-checkbox
                            value="2"
                            name="reception"
                            v-if="currentUser?.user1.is_reception === 1"
                            >Réception</a-checkbox
                          >
                        </a-col>
                        <a-col span="24">
                          <a-checkbox
                            value="3"
                            name="retour"
                            v-if="currentUser?.user1.is_retour === 1"
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
                  <a-col :span="12" v-if="currentUser.user2.prenom">
                    <a-switch
                      v-model:checked="formState.user2.vegetarien"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item v-if="currentUser.user1.is_reception === 1">
                <template #label
                  >Avez-vous besoin d\'un logement ? <br />(25
                  €/nuit/personne)</template
                >
                <a-row>
                  <a-col :span="12">
                    <a-switch
                      v-model:checked="formState.user1.hebergement"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                  <a-col :span="12" v-if="currentUser.user2.prenom">
                    <a-switch
                      v-model:checked="formState.user2.hebergement"
                      checked-children="Oui"
                      un-checked-children="Non"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="Vous en avez besoin pour quels jours ?"
                v-if="currentUser?.user1.is_reception === 1"
              >
                <a-row>
                  <a-col :span="12">
                    <a-checkbox-group
                      v-model:value="formState.user1.jourHebergement"
                    >
                      <a-row>
                        <a-col span="24">
                          <a-checkbox value="1" name="vin">Jeudi</a-checkbox>
                        </a-col>
                        <a-col span="24">
                          <a-checkbox value="2" name="reception"
                            >Vendredi</a-checkbox
                          >
                        </a-col>
                        <a-col span="24">
                          <a-checkbox value="3" name="retour"
                            >Samedi</a-checkbox
                          >
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-col>
                  <a-col :span="12" v-if="currentUser.user2.prenom">
                    <a-checkbox-group
                      v-model:value="formState.user2.jourHebergement"
                    >
                      <a-row>
                        <a-col span="24">
                          <a-checkbox value="1" name="vin">Jeudi</a-checkbox>
                        </a-col>
                        <a-col span="24">
                          <a-checkbox value="2" name="reception"
                            >Vendredi</a-checkbox
                          >
                        </a-col>
                        <a-col span="24">
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
                <!-- <a-button style="margin-right: 5px">Annuler</a-button> -->
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
        <a-row justify="center">
          <a-col>
            <a-button @click="cantCome" style="margin-left: 5px"
              >Je ne peux pas venir</a-button
            >
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
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

const user2 = ref("");

onMounted(() => {
  if (currentUser.value.id) {
    if (currentUser.value.user1.presence_vin_1)
      formState.user1.participation.push("1");
    if (currentUser.value.user1.presence_reception_1)
      formState.user1.participation.push("2");
    if (currentUser.value.user1.presence_retour_1)
      formState.user1.participation.push("3");

    if (currentUser.value.user2.presence_vin_2)
      formState.user2.participation.push("1");
    if (currentUser.value.user2.presence_reception_2)
      formState.user2.participation.push("2");
    if (currentUser.value.user2.presence_retour_2)
      formState.user2.participation.push("3");

    if (currentUser.value.user2.jeudi_2)
      formState.user2.jourHebergement.push("1");
    if (currentUser.value.user2.vendredi_2)
      formState.user2.jourHebergement.push("2");
    if (currentUser.value.user2.samedi_2)
      formState.user2.jourHebergement.push("3");

    if (currentUser.value.user1.jeudi_1)
      formState.user1.jourHebergement.push("1");
    if (currentUser.value.user1.vendredi_1)
      formState.user1.jourHebergement.push("2");
    if (currentUser.value.user1.samedi_1)
      formState.user1.jourHebergement.push("3");

    formState.user1.vegetarien =
      currentUser.value.user1.vegetarien_1 === 1 ? true : false;
    formState.user2.vegetarien =
      currentUser.value.user2.vegetarien_2 === 1 ? true : false;
    formState.user1.hebergement =
      currentUser.value.user1.logement_1 === 1 ? true : false;
    formState.user2.hebergement =
      currentUser.value.user2.logement_2 === 1 ? true : false;
  }
});

const validUser2 = () => {
  store.validUser2(user2.value);
};

const removeUser2 = () => {
  store.removeUser2();
};

const onSubmit = () => {
  store.sendFormResult(formState);
};

const cantCome = () => {
  formState.user1.participation = [];
  formState.user2.participation = [];
  formState.user1.vegetarien = false;
  formState.user2.vegetarien = false;
  formState.user1.hebergement = false;
  formState.user2.hebergement = false;
  formState.user1.jourHebergement = [];
  formState.user2.jourHebergement = [];
  
  store.sendFormResult2();
};

const labelCol = { lg: 12, sm: 24 };
const wrapperCol = { lg: 12, sm: 24 };

defineProps(["currentUser"]);
</script>

<style scoped>
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
  line-height: 40px;
  @media (min-width: 1024px) {
    margin-top: 32px;
    margin-bottom: 32px;
  }
  @media (max-width: 1023px) {
    margin-bottom: 18px;
    line-height: 40px;
  }
}

.container {
  @media (min-width: 1024px) {
    height: 100vh;
    width: 100vw;
    padding: 0 100px;
  }
  @media (max-width: 1023px) {
    display: none;
  }
}

.container-mobile {
  @media (min-width: 1024px) {
    display: none;
  }
  @media (max-width: 1023px) {
    padding: 0 0px;
  }
}

.items {
  margin-top: 18px;
}

.icon-delete,
.icon-valid {
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
}

.icon-delete {
  color: brown;
}
</style>
