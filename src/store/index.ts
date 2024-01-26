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
        axios.get("http://localhost:4200/api/dataconnexions").then((response) => {
          state.listUser = response.data;
        });
      } catch (error) {
        console.error(error);
      }
    },
    setCurrentUser(state: State, user: UserEntity) {
      state.currentUser = state.currentUser || { user1: null, user2: null };
      if (user.prenom.includes("&")) {
        let user1: UserEntity = {...user};
        let user2: UserEntity = {...user};
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
    sendFormResult(state: State, user: UserEntity) {
      state.currentUser = state.currentUser || { user1: null, user2: null };
      if (user.prenom.includes("&")) {
        let user1: UserEntity = {...user};
        let user2: UserEntity = {...user};
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
    }
  },
  getters: {
    currentUser(state: State) {
      return state.currentUser;
    },
  },
});

export default store;
