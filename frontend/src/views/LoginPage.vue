<template>
  <div class="login-page d-flex">
    <!-- Metade da tela com o fundo degradê e texto central -->
    <div class="left-side d-flex align-center justify-center">
      <h1 class="system-title text-white text-center">
        Sistema de Gestão de Estoque
      </h1>
    </div>

    <!-- Metade da tela com o formulário diretamente no fundo -->
    <div class="right-side d-flex align-center justify-center">
      <div class="form-content text-center">
        <v-img
          class="mx-auto my-6"
          max-width="150"
          src="../assets/logo.jpg"
        ></v-img>

        <div class="text-h6 text-medium-emphasis my-4">
          Login
        </div>

        <v-text-field
          density="compact"
          placeholder="Entre com o usuário"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <div class="text-h6 text-medium-emphasis my-4">
          Senha
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Entre com a senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          class="mb-4"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          color="blue"
          size="large"
          variant="tonal"
          block
          to="/dashboard"
        >
          Log In
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false,
  }),
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}

.left-side {
  flex: 1;
  background: linear-gradient(to bottom right, #003c8f, #1e88e5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.system-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.form-content {
  max-width: 418px;
  width: 100%;
}
</style>
