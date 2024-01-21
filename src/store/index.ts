import { createStore } from "vuex";
import type { State, UserEntity } from "@/common/interfaces";

// Create a new store instance.
const store = createStore<State>({
  state() {
    return {
      count: 0,
      currentUser: {
        user1: {} as UserEntity,
        user2: {} as UserEntity,
      },
    };
  },
  mutations: {
    setCurrentUser(state: any, user: UserEntity) {
        console.log(user);
      if (user.prenom.includes("&")) {
        let user1: UserEntity = {...user};
        let user2: UserEntity = {...user};
        user1.prenom = user.prenom.split("&")[0].trim();
        user1.nom = user.nom.split("&")[0].trim();
        user2.prenom = user.prenom.split("&")[1].trim();
        user2.nom = user.nom.split("&")[1].trim() ?? user.nom;
        
        state.currentUser.user1 = user1;
        state.currentUser.user2 = user2;
      } else {
        state.currentUser.user1 = user;
      }

      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    getCurrentUser(state: any) {
      const currentUser = localStorage.getItem("currentUser") || "{}";
      state.currentUser = currentUser ? JSON.parse(currentUser) : null;
    },
  },
  getters: {
    currentUser(state: any) {
      return state.currentUser;
    },
  },
});

export default store;
