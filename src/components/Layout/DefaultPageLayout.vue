<template>
  <div class="page-width">
    <slot name="page-top" />
    <Alert
      :variant="globalMessageType"
      :show="showGlobalMessage"
    >
      {{ globalMessage }}
    </Alert>
    <slot name="main-page" />
  </div>
</template>

<script>

import Alert from '@/components/Alert/Alert.vue';

export default {
  name: 'DefaultPageLayout',
  components: {
    Alert,
  },
  data() {
    return {
      showGlobalMessage: false,
      globalMessage: null,
      globalMessageType: '',
    };
  },
  created() {
    const msg = this.$store.getters.message;
    if (msg.msg !== null) {
      this.showGlobalMessage = true;
      this.globalMessage = msg.msg;
      this.globalMessageType = msg.type;
      this.$store.commit('SET_MSG', { msg: null, type: '' });
    } else {
      this.showGlobalMessage = false;
    }
  },
  methods: {
    closeGlobalMsg() {
      this.showGlobalMessage = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-width{
    max-width: var(--mx-page-width);
    margin: 0 auto;
}
</style>
