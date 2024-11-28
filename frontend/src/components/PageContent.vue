<template>
  <v-main class="custom-background">
    <v-container fluid>
      <div class="content-wrapper">
        <router-view />
      </div>
    </v-container>
  </v-main>
</template>

<script>
  export default {
    // Código do componente
  }
</script>

<style scoped>
  .custom-background {
    background-color: #eee;
  }

  .v-container {
    padding-top: 0;

  }

  .content-wrapper {
    background-color: white;
    padding: 15px; /* Adicione o padding desejado */
    border-radius: 5px; /* Adicione borda arredondada se desejar */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Adicione uma sombra suave */
    width: 100%; /* Defina a largura desejada */
    height: calc(91vh - 80px); /* Altura é 100vh (viewport height) menos 70px */
    max-height: calc(91vh - 80px); /* Altura máxima é 100vh (viewport height) menos 70px */
    margin-top: -47px;
    overflow-y: auto;
  }
</style>
