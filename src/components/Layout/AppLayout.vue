<template>
  <div class="encloser">
    <AppHeader />
    <transition name="router-animation">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
import AppHeader from '@/components/Header/AppHeader.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    Footer,
  },
};
</script>

<style>
.encloser {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.page-container {
  max-width: 1900px;
  margin: 0 auto;
}
</style>
