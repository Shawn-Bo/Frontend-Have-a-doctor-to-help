import { createRouter, createWebHashHistory } from "vue-router";
import ExportedSessionGoInquiryDetail from "../views/ExportedSessionGoInquiryDetail.vue";
import ExportedSessions from "../views/ExportedSessions.vue";
import Graph from "../views/Graph.vue";
import Home from "../views/Home.vue";
import Inquary from "../views/Inquary.vue";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Me from "../views/Me.vue";
import Query from "../views/Query.vue";
import PublicSessionDetail from "../views/QueryPublicSessionDetail.vue";
import QuerySessionDetail from "../views/QuerySessionDetail.vue";
import Register from "../views/Register.vue";
import SessionNotViewed from "../views/SessionNotViewed.vue";
import AsADoctor from "../views/forms/AsADoctor.vue";
import PickAvator from "../views/forms/PickAvator.vue";
import PickBirth from "../views/forms/PickBirth.vue";
import PickInfo from "../views/forms/PickInfo.vue";
import PickPhone from "../views/forms/PickPhone.vue";
const routes = [
    { 
      path: "/", 
      redirect: "/home",
      component: Main,
      children: [
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/inquary",
          name: "inquary",
          component: Inquary
        },
        {
          path: "/graph",
          name: "graph",
          component: Graph
        },
        {
          path: "/me",
          name: "me",
          component: Me
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/query",
      name: "query",
      component: Query
    },
    {
      path: "/me/pick_birth",
      component: PickBirth
    },
    {
      path: "/me/pick_phone",
      component: PickPhone
    },
    {
      path: "/me/pick_info",
      component: PickInfo
    },
    {
      path: "/me/pick_avator",
      component: PickAvator
    },
    {
      path: "/exported_sessions",
      name: "exported_sessions",
      component: ExportedSessions
    },
    {
      path: "/query/session_detail",
      component: QuerySessionDetail
    },
    {
      path: "/query/public_session_detail",
      component: PublicSessionDetail
    },
    {
      path: "/as_a_doctor",
      component: AsADoctor
    },{
      path: "/inquiry/exported_session_go_detail",
      component: ExportedSessionGoInquiryDetail
    },
    {
      path: "/inquiry/session_not_viewed",
      component: SessionNotViewed
    }
  ]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  })