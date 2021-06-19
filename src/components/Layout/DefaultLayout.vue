<template>
  <div class="encloser">
    <SimpleHeader />
    <div class="page-container">
      <transition name="router-animation">
        <router-view />
      </transition>
    </div>
    <Footer />
  </div>
</template>

<script>

import SimpleHeader from '@/components/Header/SimpleHeader.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    SimpleHeader,
    Footer,
  },
};
</script>

<style>

.encloser{
  min-height:100vh;
  position:relative;
  padding-bottom:60px;
}

.page-container {

   max-width: 1900px;
   margin : 0 auto;
}

</style>
