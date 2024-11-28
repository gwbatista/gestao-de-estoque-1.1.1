<template>
  <v-app-bar class="custom-background" :elevation="3">
    <template v-slot:prepend>
      <v-img src="../assets/logo.jpg" width="70" height="70"></v-img>
    </template>

    <v-app-bar-title>Sistema de Estoque</v-app-bar-title>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleItemClick(item.title)"
        >
        <v-list-item-icon>
            <v-icon small>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="font-size: 14px;">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  import { VAppBar, VImg, VBtn } from 'vuetify';
  import { useRouter } from 'vue-router';

  export default {
    components: {
      VAppBar,
      VImg ,
      VBtn
    },
    setup() {
    const router = useRouter();

    const items = [
      { title: 'Dashboard', route: '/dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Produtos', route: '/produtos', icon: 'mdi-database' },
      { title: 'Sair', route: '/login', icon: 'mdi-logout' }, 
    ];

    const handleItemClick = (title) => {
      const item = items.find(item => item.title === title);
      if (item.route) {
        router.push(item.route);
      } else if (item.action) {
        item.action();
      }
    };

    return {
      items,
      handleItemClick,
    };
  }
  }
</script>

<style scoped>
 #app .v-app-bar.custom-background {
    background-color: #444;
    color: white;
  }

  .v-img {
    margin-left: 17px; 
  }

</style>
