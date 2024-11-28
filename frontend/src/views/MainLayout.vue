<template>
  <v-app>
    <MainNavbar />
    <div class="container">
      <MainSidebar />

      <PageContent>
      </PageContent>
    </div>

    <MainFooter/>

  </v-app>
</template>

<script>
  import MainNavbar from "@/components/MainNavbar.vue";
  import MainSidebar from "@/components/MainSidebar.vue";
  import PageContent from "@/components/PageContent.vue";
  import MainFooter from '@/components/MainFooter.vue';

  export default {
    components: {
      MainNavbar,
      MainSidebar,
      PageContent,
      MainFooter
    }
  }
</script>

<style>
  .container {
    display: flex;
    height: calc(100vh - 70px);
    margin-top: 70px;
  }

  .MainSidebar {
    width: 200px; /* Ou a largura desejada */
  }

  .PageContent {
    flex-grow: 1; /* Faz com que o conteúdo preencha todo o espaço restante */
  }

</style>
