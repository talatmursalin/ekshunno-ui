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
  padding-bottom: 160px;
}

@media only screen and (max-width: 700px) {
  .encloser {
    padding-bottom: 60px;
  }
}

</style>
