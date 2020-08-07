<template>
    <div id="app" class="bg-light h-screen">
        <Navigation />
        <div class="py-5">
            <router-view />
        </div>
    </div>
</template>
<script>
import Navigation from "../components/Navigation.vue";

export default {
  components: {
    Navigation
  }
};
</script>

<style>
.h-screen {
  height: 100vh;
}
</style>
