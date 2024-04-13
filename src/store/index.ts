import type {
  FormState,
  LoginFormState,
  State,
  UserAttributes,
  UserEntity,
} from "@/common/interfaces";
import axios from "axios";
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "state",
  state: () =>
    ({
      currentUser: null as {
        id: number;
        user1: UserAttributes;
        user2: UserAttributes;
      } | null,
      listUsers: null as UserEntity[] | null,
    } as State),
  actions: {
    async logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    async login(form: LoginFormState) {
      try {
        const users = this.listUsers!;

        const user = users.find(
          (u: UserEntity) =>
            u.attributes.email.toLowerCase().trim() === form.username.toLocaleLowerCase().trim() &&
            u.attributes.password.toLocaleLowerCase().trim() === form.password.toLocaleLowerCase().trim()
        );

        if (user) {
          const currentUser = mapUserEntityToStateUser(user);

          this.currentUser = currentUser;
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
          alert("Email or password is incorrect!");
        }
      } catch (error) {
        console.error(error);
      }
    },
    validUser2(value: string) {
      if (value) {
        this.currentUser!.user2 = {
          ...this.currentUser!.user1,
          prenom: value.trimEnd().trimStart().split(" ")[0],
          nom: value.trimEnd().trimStart().split(" ").length > 1 ? value.trimEnd().trimStart().split(" ")[1] : this.currentUser!.user1.nom,
        };
      } else {
        this.currentUser!.user2 = {} as UserAttributes;
      }
    },
    removeUser2() {
      this.currentUser!.user2 = {} as UserAttributes;
    },
    async sendFormResult(form: FormState) {
      try {
        if (this.currentUser === null) {
          return;
        }

        const currentUser = {
          id: this.currentUser.id,
          user1: {
            ...this.currentUser.user1,
            presence_vin_1: form.user1.participation.includes("1") ? 1 : 0,
            presence_reception_1: form.user1.participation.includes("2") ? 1 : 0,
            presence_retour_1: form.user1.participation.includes("3") ? 1 : 0,
            vegetarien_1: form.user1.vegetarien ? 1 : 0,
            logement_1: form.user1.hebergement ? 1 : 0,
            jeudi_1: form.user1.jourHebergement.includes("1") ? 1 : 0,
            vendredi_1: form.user1.jourHebergement.includes("2") ? 1 : 0,
            samedi_1: form.user1.jourHebergement.includes("3") ? 1 : 0,
          },
          user2: {
            ...this.currentUser.user2,
            presence_vin_2: form.user2.participation.includes("1") ? 1 : 0,
            presence_reception_2: form.user2.participation.includes("2") ? 1 : 0,
            presence_retour_2: form.user2.participation.includes("3") ? 1 : 0,
            vegetarien_2: form.user2.vegetarien ? 1 : 0,
            logement_2: form.user2.hebergement ? 1 : 0,
            jeudi_2: form.user2.jourHebergement.includes("1") ? 1 : 0,
            vendredi_2: form.user2.jourHebergement.includes("2") ? 1 : 0,
            samedi_2: form.user2.jourHebergement.includes("3") ? 1 : 0,
          },
        } as { id: number; user1: UserAttributes; user2: UserAttributes };

        const user = mapStateUserToUserEntity(currentUser);

        await axios.put(`https://www.fonkbox.fr/api/dataconnexions/${user.id}`, {
          data: user.attributes,
        });

        this.currentUser = currentUser;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        alert("Bravo ! Nous sommes fiers de vous compter parmi nous ! ;) \n Vous pouvez changer vos réponses à tout moment.");
      } catch (error) {
        console.error(error);
      }
    },
    async sendFormResult2() {
      try {
        if (this.currentUser === null) {
          return;
        }

        const currentUser = {
          id: this.currentUser.id,
          user1: {
            ...this.currentUser.user1,
            presence_vin_1: 0,
            presence_reception_1: 0,
            presence_retour_1: 0,
            vegetarien_1:  0,
            logement_1:  0,
            jeudi_1: 0,
            vendredi_1: 0,
            samedi_1: 0,
          },
          user2: {
            ...this.currentUser.user2,
            presence_vin_2: 0,
            presence_reception_2:  0,
            presence_retour_2:  0,
            vegetarien_2:  0,
            logement_2:  0,
            jeudi_2: 0,
            vendredi_2: 0,
            samedi_2:  0,
          },
        } as { id: number; user1: UserAttributes; user2: UserAttributes };

        const user = mapStateUserToUserEntity(currentUser);

        await axios.put(`https://www.fonkbox.fr/api/dataconnexions/${user.id}`, {
          data: {...user.attributes, published_at: '0'},
        });

        this.currentUser = currentUser;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        alert("Quel dommage ! :'( \nMais ce n'est que partie remise ! \nVous pouvez changer vos réponses à tout moment.");
      } catch (error) {
        console.error(error);
      }
    },
    async setListUsers() {
      try {
        const response = await axios.get(
          "https://www.fonkbox.fr/api/dataconnexions"
        );
        this.listUsers = response.data.data as UserEntity[];
      } catch (error) {
        console.error(error);
      }
    },
    async setCurrentUser() {
      try {
        const currentUser = JSON.parse(
          localStorage.getItem("currentUser")!
        ) as {
          id: number;
          user1: UserAttributes;
          user2: UserAttributes;
        };

        if (currentUser) this.currentUser = currentUser;
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getListUsers: (state) => {
      return state.listUsers;
    },
  },
});

const mapStateUserToUserEntity = (stateUser: {
  id: number;
  user1: UserAttributes;
  user2: UserAttributes;
}) => {
  const user: UserEntity = {
    id: stateUser.id,
    attributes: {
      ...stateUser.user1,
      prenom:
        stateUser.user1.prenom +
        (stateUser.user2?.prenom ? " & " + stateUser.user2?.prenom : ""),
      nom:
        stateUser.user1.nom +
        (stateUser.user2?.nom ? " & " + stateUser.user2?.nom : ""),
      presence_vin_2: stateUser.user2?.presence_vin_2 ?? 0,
      presence_reception_2: stateUser.user2?.presence_reception_2 ?? 0,
      presence_retour_2: stateUser.user2?.presence_retour_2 ?? 0,
      vegetarien_2: stateUser.user2?.vegetarien_2 ?? 0,
      jeudi_2: stateUser.user2?.jeudi_2 ?? 0,
      vendredi_2: stateUser.user2?.vendredi_2 ?? 0,
      samedi_2: stateUser.user2?.samedi_2 ?? 0,
      logement_2: stateUser.user2?.logement_2 ?? 0,
    },
  };

  return user;
};

const mapUserEntityToStateUser = (user: UserEntity) => {
  const stateUser: {
    id: number;
    user1: UserAttributes;
    user2: UserAttributes;
  } = {
    id: user.id,
    user1: { ...user.attributes },
    user2: { ...user.attributes },
  };

  if (user.attributes.prenom.includes(" & ")) {
    stateUser.user1.prenom = user.attributes.prenom.split(" & ")[0].trim();
    stateUser.user2.prenom = user.attributes.prenom.split(" & ")[1].trim();
    if (user.attributes.nom.includes(" & ")) {
      stateUser.user1.nom = user.attributes.nom.split(" & ")[0].trim();
      stateUser.user2.nom = user.attributes.nom.split(" & ")[1].trim();
    }
  } else {
    stateUser.user1 = user.attributes;
    stateUser.user2 = {} as UserAttributes;
  }

  return stateUser;
};
