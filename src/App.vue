<script setup lang="ts">
import "./index.css";

import NavBar from "./components/NavBar.vue";

import { theme } from './vuex-store/theme';

console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_API_URL);
console.log(import.meta.env.VITE_LOGGER_URL);
console.log(import.meta.url);
</script>

<template>
  <div class="flex flex-col h-screen bg-base-100 items-center text-center" :data-theme="theme">
    <NavBar />
    <div class="grow">
      <router-view></router-view>
    </div>
  </div>
</template>
