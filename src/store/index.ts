
import type {
  FormState,
  LoginFormState,
  State,
  UserAttributes,
  UserEntity,
} from "@/common/interfaces";
import axios from "axios";
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore<State>({
  state() {
    return {
      currentUser: null,
      listUsers: null,
    };
  },
  actions: {
    logout(context: any) {
      context.commit("clearCurrentUser");
    },
    login(context: any, form: LoginFormState) {
      const users = context.state.listUsers;

      const user = users.find(
        (u: UserEntity) =>
          u.attributes.email === form.username &&
          u.attributes.password === form.password
      );

      if (user) {
        const currentUser = mapUserEntityToStateUser(user);
        console.log(currentUser);
        context.commit("setCurrentUser", currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        alert("Email ou mot de passe incorrect !");
      }
    },
    sendFormResult(context: any, form: FormState) {
      if (context.state.currentUser === null) {
        return;
      }
      const currentUser = {
        id : context.state.currentUser.id,
        user1 : {
          ...context.state.currentUser.user1,
          presenceVin1: form.user1.participation.includes("1") ? 1 : 0,
          presenceReception1: form.user1.participation.includes("2") ? 1 : 0,
          presenceRetour1: form.user1.participation.includes("3") ? 1 : 0,
          vegetarien1: form.user1.vegetarien ? 1 : 0,
          logement1: form.user1.hebergement ? 1 : 0,
          jeudi1: form.user1.jourHebergement.includes("1") ? 1 : 0,
          vendredi1: form.user1.jourHebergement.includes("2") ? 1 : 0,
          samedi1: form.user1.jourHebergement.includes("3") ? 1 : 0,
        },
        user2 : {
          ...context.state.currentUser.user2,
          presenceVin2: form.user2.participation.includes("1") ? 1 : 0,
          presenceReception2: form.user2.participation.includes("2") ? 1 : 0,
          presenceRetour2: form.user2.participation.includes("3") ? 1 : 0,
          vegetarien2: form.user2.vegetarien ? 1 : 0,
          logement2: form.user2.hebergement ? 1 : 0,
          jeudi2: form.user2.jourHebergement.includes("1") ? 1 : 0,
          vendredi2: form.user2.jourHebergement.includes("2") ? 1 : 0,
          samedi2: form.user2.jourHebergement.includes("3") ? 1 : 0,
        },
      } as {id: number; user1: UserAttributes; user2: UserAttributes;}

      try {
        const user = mapStateUserToUserEntity(currentUser);

        axios
          .put(
            `http://localhost:4200/api/dataconnexions/${user.id}`,
            {
              data: user.attributes,
            }
          )
          .then((response) => {
            context.commit("setCurrentUser", currentUser);

            localStorage.setItem(
              "currentUser",
              JSON.stringify(currentUser)
            );
          });
      } catch (error) {
        console.error(error);
      }
    },
    setListUsers({ commit }: any) {
      try {
        axios
          .get("http://localhost:4200/api/dataconnexions")
          .then((response) => {
            commit('setListUsers', response.data.data as UserEntity[]);
          });
      } catch (error) {
        console.error(error);
      }
    },
    setCurrentUser({ commit }: any) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser")!) as { id: number; user1: UserAttributes; user2: UserAttributes; };
      commit('setCurrentUser', currentUser);
    },
  },
  mutations: {
    setListUsers(state: State, data: UserEntity[]) {
      state.listUsers = data;
    },
    setCurrentUser(state: State, currentUser: {id: number; user1: UserAttributes; user2: UserAttributes;}) {
      state.currentUser = currentUser;
    },
    clearCurrentUser(state: State) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },   
  },
  getters: {
    currentUser(state: State) {
      return state.currentUser;
    },
    listUsers(state: State): UserEntity[] | null {
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
      prenom: stateUser.user1.prenom + (stateUser.user2?.prenom ? ' & ' + stateUser.user2?.prenom : ""),
      nom: stateUser.user1.nom + (stateUser.user2?.nom ? ' & ' + stateUser.user2?.nom : ""),
      presenceVin2: stateUser.user2?.presenceVin2 ?? 0,
      presenceReception2: stateUser.user2?.presenceReception2 ?? 0,
      presenceRetour2: stateUser.user2?.presenceRetour2 ?? 0,
      vegetarien2: stateUser.user2?.vegetarien2 ?? 0,
      jeudi2: stateUser.user2?.jeudi2 ?? 0,
      vendredi2: stateUser.user2?.vendredi2 ?? 0,
      samedi2: stateUser.user2?.samedi2 ?? 0,
      logement2: stateUser.user2?.logement2 ?? 0,
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
  console.log(stateUser)
  if (user.attributes.prenom.includes(" & ")) {
    stateUser.user1.prenom = user.attributes.prenom.split(" & ")[0].trim();
    stateUser.user2.prenom = user.attributes.prenom.split(" & ")[1].trim();
    if (user.attributes.nom.includes(" & ")) {
      stateUser.user1.nom = user.attributes.nom.split(" & ")[0].trim();
      stateUser.user2.nom = user.attributes.nom.split(" & ")[1].trim();
    }
  } else {
    stateUser.user1 = user.attributes;
  }

  return stateUser;
};

export default store;
