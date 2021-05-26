<template>
  <div>
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
  name: 'SimpleLayout',
  components: {
    SimpleHeader,
    Footer,
  },

};
</script>
