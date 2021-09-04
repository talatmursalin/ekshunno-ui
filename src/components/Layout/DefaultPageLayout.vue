<template>
  <div class="page-width">
    <slot name="page-top" />
    <b-alert
      class="alert-sm"
      :variant="globalMessageType"
      :show="!!globalMessage"
      fade
      dismissible
    >
      {{ globalMessage }}
    </b-alert>
    <slot name="main-page" />
  </div>
</template>

<script>
export default {
  name: 'DefaultPageLayout',
  data() {
    return {
      globalMessage: null,
      globalMessageType: '',
    };
  },
  created() {
    const msg = this.$store.getters.message;
    if (msg.msg !== null) {
      this.globalMessage = msg.msg;
      this.globalMessageType = msg.type;
      this.clearGlobalMsg();
    }
  },
  methods: {
    clearGlobalMsg() {
      this.$store.commit('SET_MSG', { msg: null, type: '' });
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
