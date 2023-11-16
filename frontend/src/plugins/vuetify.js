// Styles
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
//import { icon } from "leaflet";

export default createVuetify({
  icons: {
    iconfont: "fa" || "md",
    values: {
      registerCrop: "assets/register_crop.svg",
    },
  }, // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
});
