import { createStore } from "vuex";
import type {
  FormState,
  LoginFormState,
  State,
  UserAttributes,
  UserEntity,
} from "@/common/interfaces";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

// Create a new store instance.
const store = createStore<State>({
  state() {
    return {
      currentUser: null,
      listUsers: null,
    };
  },
  actions: {
    login(context: State, form: LoginFormState) {
      console.log(context.getters.listUsers);
      console.log(context);
      const user = context.listUsers!.find(
        (u) =>
          u.attributes.email === form.username &&
          u.attributes.password === form.password
      );

      if (user) {
        context.currentUser = context.currentUser || null;

        context.currentUser = mapUserEntityToStateUser(user);
        localStorage.setItem("currentUser", JSON.stringify(context.currentUser));
      } else {
        alert("Email ou mot de passe incorrect !");
      }
      router.push("/reponse");
    },
    sendFormResult(state: State, form: FormState) {
      if (state.currentUser === null) {
        return;
      }

      state.currentUser!.user1 = form.user1;
      state.currentUser!.user2 = form.user2;

      const user = mapStateUserToUserEntity(state.currentUser);

      try {
        axios
          .post(
            `http://localhost:4200/api/dataconnexions/${state.currentUser.id}`,
            {
              user,
            }
          )
          .then((response) => {
            console.log(response);

            localStorage.setItem(
              "currentUser",
              JSON.stringify(state.currentUser)
            );
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
  mutations: {
    setListUsers(state: State) {
      try {
        axios
          .get("http://localhost:4200/api/dataconnexions")
          .then((response) => {
            console.log(response.data.data);
            state.listUsers = (response.data.data as UserEntity[]);
          });
      } catch (error) {
        console.error(error);
      }
    },
    // login(state: State, form: LoginFormState) {
    //   console.log(state);
    //   const user = listUsers.find(
    //     (u) =>
    //       u.attributes.email === form.username &&
    //       u.attributes.password === form.password
    //   );

    //   if (user) {
    //     state.currentUser = state.currentUser || null;

    //     state.currentUser = mapUserEntityToStateUser(user);
    //     localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    //   } else {
    //     alert("Email ou mot de passe incorrect !");
    //   }
    // },
    setCurrentUser(state: State) {
      const currentUser = localStorage.getItem("currentUser") || "{}";
      state.currentUser = currentUser ? JSON.parse(currentUser) : null;
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
      prenom: stateUser.user1.prenom + (stateUser.user2?.prenom ?? ""),
      nom: stateUser.user1.nom + (stateUser.user2?.nom ?? ""),
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

  if (user.attributes.prenom.includes("&")) {
    stateUser.user1.prenom = user.attributes.prenom.split("&")[0].trim();
    stateUser.user2.prenom = user.attributes.prenom.split("&")[1].trim();
    if (user.attributes.nom.includes("&")) {
      stateUser.user1.nom = user.attributes.nom.split("&")[0].trim();
      stateUser.user2.nom = user.attributes.nom.split("&")[1].trim();
    }
  } else {
    stateUser.user1 = user.attributes;
  }

  return stateUser;
};

export default store;
