import HomePage from "./components/HomePage.vue";
import RegisterForm from "./components/RegisterForm.vue";
import LogIn from "./components/LogIn.vue";
import SessionPage from "./components/SessionPage";
import CropNew from "./components/CropNew.vue";
import FollowGrowth from "./components/FollowGrowth.vue";
import CheckNumber from "./components/CheckNumber.vue";
import PasswordrstForm from "./components/PasswordrstForm.vue";
import ResetToken from "./components/ResetToken.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    component: HomePage,
    path: "/",
  },
  {
    name: "LogIn",
    component: LogIn,
    path: "/login",
  },
  {
    name: "RegisterForm",
    component: RegisterForm,
    path: "/register",
  },
  {
    name: "SessionPage",
    component: SessionPage,
    path: "/session",
  },
  {
    name: "CropNew",
    component: CropNew,
    path: "/cropNew",
  },
  {
    name: "FollowGrowth",
    component: FollowGrowth,
    path: "/followGrowth",
  },
  {
    name: "CheckNumber",
    component: CheckNumber,
    path: "/begin_password_reset"
  },
  {
    name: "PasswordrstForm",
    component: PasswordrstForm,
    path: "/password_reset"
  },
  {
    name: "ResetToken",
    component: ResetToken,
    path: "/resetToken"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
