import { createStore } from "vuex";
import type { State, UserEntity } from "@/common/interfaces";
import axios from "axios";

// Create a new store instance.
const store = createStore<State>({
  state() {
    return {
      count: 0,
      currentUser: {
        user1: null,
        user2: null,
      },
      listUser: null,
    };
  },
  mutations: {
    getListUser(state: State) {
      try {
        axios
          .get("http://localhost:4200/api/dataconnexions")
          .then((response) => {
            state.listUser = response.data;
          });
      } catch (error) {
        console.error(error);
      }
    },
    setCurrentUser(state: State, user: UserEntity) {
      state.currentUser = state.currentUser || { user1: null, user2: null };
      if (user.prenom.includes("&")) {
        let user1: UserEntity = { ...user };
        let user2: UserEntity = { ...user };
        user1.prenom = user.prenom.split("&")[0].trim();
        user1.nom = user.nom.split("&")[0].trim();
        user2.prenom = user.prenom.split("&")[1].trim();
        user2.nom = user.nom.split("&")[1].trim() ?? user.nom;

        state!.currentUser!.user1 = user1;
        state!.currentUser!.user2 = user2;
      } else {
        state!.currentUser!.user1 = user;
        state!.currentUser!.user2 = null;
      }

      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    getCurrentUser(state: State) {
      const currentUser = localStorage.getItem("currentUser") || "{}";
      state.currentUser = currentUser ? JSON.parse(currentUser) : null;
    },
    clearCurrentUser(state: State) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    sendFormResult(state: State, user1: UserEntity, user2: UserEntity) {
      const user: UserEntity = {
        ...user1,
        jeudi1: user1.jeudi1 ? 1 : 0,
        vendredi1: user1.vendredi1 ? 1 : 0,
        samedi1: user1.samedi1 ? 1 : 0,
        logement1: user1.logement1 ? 1 : 0,
        prenom: user1.prenom,
      };

      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
  },
  getters: {
    currentUser(state: State) {
      return state.currentUser;
    },
  },
});

const mapStateUserToUserEntity = (stateUser: { user1: UserEntity; user2: UserEntity; }) => {
  const user: UserEntity = {
    ...stateUser.user1!,
    prenom: stateUser.user1.prenom + (stateUser.user2?.prenom ?? ""),
    nom: stateUser.user1.nom + (stateUser.user2?.nom ?? ""),
    presenceVin1: stateUser.user1.presenceVin1,
    presenceReception1: stateUser.user1.presenceReception1,
    presenceRetour1: stateUser.user1.presenceRetour1,
    vegetarien1: stateUser.user1.vegetarien1,
    jeudi1: stateUser.user1.jeudi1,
    vendredi1: stateUser.user1.vendredi1,
    samedi1: stateUser.user1.samedi1,
    logement1: stateUser.user1.logement1,
    presenceVin2: stateUser.user2.presenceVin2 ?? 0,
    presenceReception2: stateUser.user2.presenceReception2 ?? 0,
    presenceRetour2: stateUser.user2.presenceRetour2 ?? 0,
    vegetarien2: stateUser.user2.vegetarien2 ?? 0,
    jeudi2: stateUser.user2.jeudi2 ?? 0,
    vendredi2: stateUser.user2.vendredi2 ?? 0,
    samedi2: stateUser.user2.samedi2 ?? 0,
    logement2: stateUser.user2.logement2 ?? 0,
  };

  return user;
};


const mapUserEntityToStateUser = (user: UserEntity) => {
  const stateUser: { user1: UserEntity | null; user2: UserEntity | null; } = {
    user1: {...user},
    user2: {...user},
  };

  if (user.prenom.includes("&")) {
    stateUser.user1!.prenom = user.prenom.split("&")[0].trim();
    stateUser.user2!.prenom = user.prenom.split("&")[1].trim();
    if (user.nom.includes("&")) {
      stateUser.user1!.nom = user.nom.split("&")[0].trim();
      stateUser.user2!.nom = user.nom.split("&")[1].trim();
    }
  } else {
    stateUser.user1 = user;
    stateUser.user2 = null;
  }

  return stateUser;
};

export default store;
