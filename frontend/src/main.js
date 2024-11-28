import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import pt from 'vuetify/lib/locale/pt'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', 
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
  theme: {
    options: {
      customProperties: true,
    },
    defaultFont: 'Roboto', // Definindo Roboto como a fonte padrão
  },
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')