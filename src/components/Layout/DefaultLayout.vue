<template>
  <div class="page-container">
    <SimpleHeader />
    <transition name="router-animation">
      <router-view />
    </transition>
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

.page-container {
   min-height:100%;
   position:relative;
   padding-bottom:60px;
}

</style>
