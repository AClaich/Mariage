<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onUnmounted, onMounted } from 'vue';
import { MenuOutlined, UserOutlined } from '@ant-design/icons-vue';
import type { DrawerProps } from 'ant-design-vue';
import type { UserEntity } from 'src/common/interfaces.ts';

const selectedKeys = ref<string[]>(['4']);

const placement = ref<DrawerProps['placement']>('left');
const open = ref<boolean>(false);
const currentUser = ref<UserEntity | undefined>(undefined);

onMounted(async () => {
  const user = localStorage.getItem('user') || '{}';
  currentUser.value = user ? JSON.parse(user) : null;
});

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

onUnmounted(() => {
  localStorage.clear();
});


defineProps(['currentUser']);
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
          <RouterLink to="/reponse">Réponse</RouterLink>
        </span>
      </a-menu-item>
    </a-menu>
    <template #extra>
      <span v-if="currentUser">{{ currentUser.prenom }} {{ currentUser.nom }}</span><UserOutlined />
    </template>
  </a-drawer>
  <header>
    <nav>
      <RouterLink to="/accueil">Accueil</RouterLink>
      <RouterLink to="/prog">Programmation</RouterLink>
      <RouterLink to="/hebergement">Hébergement</RouterLink>
      <RouterLink to="/reponse">Réponse</RouterLink>
      <UserOutlined />
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

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  text-align: center;
  margin-top: 2rem;

  margin-left: -1rem;
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

[data-theme='dark'] .site-layout-sub-header-background {
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
