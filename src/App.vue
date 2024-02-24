<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref, onUnmounted, onMounted, computed } from "vue";
import {
  MenuOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
import type { DrawerProps } from "ant-design-vue";
import type { UserAttributes } from "@/common/interfaces";
import router from "./router";
import { useStore } from "./store";

const selectedKeys = ref<string[]>(["4"]);
const store = useStore();

const placement = ref<DrawerProps["placement"]>("left");
const open = ref<boolean>(false);
const currentUser = computed(
  (): { id: number; user1: UserAttributes; user2: UserAttributes } =>
    store.getCurrentUser!
);

onMounted(async () => {
  store.setListUsers();
  store.setCurrentUser();
});

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

const logout = () => {
  store.logout();
  router.push("/login");
};

onUnmounted(() => {
  store.logout();
});

defineProps(["currentUser"]);
</script>

<template>
  <div class="drawer-handle" :onClick="showDrawer">
    <MenuOutlined />
  </div>
  <a-drawer :placement="placement" :open="open" @close="onClose">
    <a-menu v-model:selectedKeys="selectedKeys">
      <a-menu-item key="1">
        <span class="nav-text" @click="open = !open">
          <RouterLink to="/accueil">Accueil</RouterLink>
        </span>
      </a-menu-item>
      <a-menu-item key="2">
        <span class="nav-text" @click="open = !open">
          <RouterLink to="/prog">Programmation</RouterLink>
        </span>
      </a-menu-item>
      <a-menu-item key="3">
        <span class="nav-text" @click="open = !open">
          <RouterLink to="/hebergement">Hébergement</RouterLink>
        </span>
      </a-menu-item>
      <a-menu-item key="4">
        <span class="nav-text" @click="open = !open">
          <RouterLink to="/reponse">Réponse faire-part</RouterLink>
        </span>
      </a-menu-item>
    </a-menu>
    <template #extra>
      <span v-if="currentUser && currentUser.user1"
        >{{ currentUser.user1.prenom }} {{ currentUser.user1.nom }}</span
      >
      <span v-if="currentUser && currentUser.user2.prenom">
        & {{ currentUser.user2.prenom }} {{ currentUser.user2.nom }}</span
      >
      <a-popover trigger="hover" placement="bottom" v-if="currentUser">
        <template #title>
          <a :onClick="logout"> <LoginOutlined /> Se déconnecter </a>
        </template>
        <UserOutlined class="icon-compte" />
      </a-popover>
    </template>
  </a-drawer>
  <header>
    <nav>
      <RouterLink to="/accueil" class="lien">Accueil</RouterLink>
      <RouterLink to="/prog" class="lien">Programmation</RouterLink>
      <RouterLink to="/hebergement" class="lien">Hébergement</RouterLink>
      <RouterLink to="/cagnotte" class="lien">Cagnotte</RouterLink>
      <RouterLink to="/reponse" class="lien">Réponse faire-part</RouterLink>
      <a-popover trigger="hover" placement="bottom" v-if="currentUser">
        <template #title>
          <h3 class="text-center">
            <span v-if="currentUser?.user1"
              >{{ currentUser.user1.prenom }} {{ currentUser.user1.nom }}
            </span>
            <span v-if="currentUser?.user2.prenom">
              & {{ currentUser.user2.prenom }} {{ currentUser.user2.nom }}</span
            >
          </h3>
          <a :onClick="logout"> <LoginOutlined /> Se déconnecter </a>
        </template>
        <UserOutlined class="icon-compte" />
      </a-popover>
      <UserOutlined class="icon-compte" v-if="!currentUser" />
    </nav>
  </header>

  <div class="main-container">
    <RouterView />
  </div>
</template>

<style scoped>
.main-container {
  @media (max-width: 1024px) {
    padding: 3rem;
  }
}

.user-icon {
  margin: 8px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100vw;
  background-color: antiquewhite;
}

.lien {
  font-size: 25px;
  font-family: Parisienne, serif;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  width: 100%;
  padding: 1rem 0;

  @media (max-width: 1024px) {
    display: none;
  }
}

ul {
  border-inline-end: 0px !important;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 3rem;
  /* border-left: 1px solid var(--color-border); */
}

nav a:first-of-type {
  border: 0;
}

a-popover {
  width: 800px;
}

.icon-compte {
  margin-left: 16px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout-sub-header-background {
  background: #141414;
}

.drawer-handle {
  position: fixed;
  top: 100px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 100;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 2px 0 8px #00000026;
  border-radius: 0 4px 4px 0;
  color: black;

  @media (min-width: 1024px) {
    display: none;
  }
}
</style>
