import Vuelidate from "vuelidate";
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./routers";

import "@fontsource/koho/200.css";
import "@fontsource/koho/300.css";
import "@fontsource/koho/400.css";
import "@fontsource/koho/500.css";
import "@fontsource/koho/600.css";
import "@fontsource/koho/700.css";
import "./assets/global.css";

loadFonts();

const app = createApp(App);

app.use(router);
app.use(Vuelidate);
app.use(vuetify);

app.mount("#app");
