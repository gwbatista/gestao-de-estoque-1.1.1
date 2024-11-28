<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
      <v-list-item
        title="Admin"
        nav
      >

        <template v-slot:prepend>
          <v-avatar left class="avatar-custom">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>

      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
        <v-list-item to="/produtos" prepend-icon="mdi-database" title="Produtos" value="produtos"></v-list-item>
      </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    
    data () {
      return {
        drawer: true,
        rail: true,
      }
    },
  }
</script>

<style scoped>
  .avatar-custom {
    margin-left: 5px;
  }
</style>