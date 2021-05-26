<template>
  <PageWithWidget class="match-content-height">
    <ModalWindow
      slot="main-page"
      :show-modal-prop="showModal"
    />
  </PageWithWidget>
</template>

<script>

import PageWithWidget from '@/components/Layout/PageWithWidget.vue';
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue';

export default {
  name: 'TestPage',
  components: {
    PageWithWidget,
    ModalWindow,
  },
  data() {
    return {
      showModal: true,
    };
  },
};
</script>

<style>

</style>
