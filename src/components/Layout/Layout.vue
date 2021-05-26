<template>
  <div :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard']">
    <Sidebar />
    <Helper />
    <div class="wrap">
      <Header />
      <v-touch
        class="content"
        :swipe-options="{direction: 'horizontal'}"
        @swipe="handleSwipe"
      >
        <breadcrumb-history />
        <transition name="router-animation">
          <router-view />
        </transition>
        <Footer />
      </v-touch>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Sidebar from '@/components/Sidebar/Sidebar.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import Helper from '@/components/Helper/Helper.vue';
import BreadcrumbHistory from '@/components/BreadcrumbHistory/BreadcrumbHistory.vue';

import './Layout.scss';

const { mapState, mapActions } = createNamespacedHelpers('layout');

export default {
  name: 'Layout',
  components: {
    Sidebar, Header, Helper, BreadcrumbHistory, Footer,
  },
  methods: {
    ...mapActions([
      'switchSidebar',
      'handleSwipe',
      'changeSidebarActive',
      'toggleSidebar',
    ]),
    handleWindowResize() {
      const width = window.innerWidth;

      if (width <= 768 && this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      }
    },
  },
  computed: {
    ...mapState(['sidebarClose', 'sidebarStatic']),
  },
  created() {
    const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

    if (staticSidebar) {
      this.$store.state.layout.sidebarStatic = true;
    } else if (!this.sidebarClose) {
      setTimeout(() => {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }, 2500);
    }

    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
};
</script>

<style src="./Layout.scss" lang="scss" />
