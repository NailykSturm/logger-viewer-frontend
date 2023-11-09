<script setup lang="ts">
import "./index.css";

import NavBar from "./components/NavBar.vue";

import { theme } from './vuex-store/theme';
</script>

<template>
  <div class="flex flex-col h-screen bg-base-100" :data-theme="theme">
    <NavBar />
    <router-view></router-view>
  </div>
</template>
