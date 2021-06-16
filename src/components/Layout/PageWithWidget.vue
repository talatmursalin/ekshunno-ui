<template>
  <div class="match-content-height">
    <slot name="above-widget" />
    <div>
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
  </div>
</template>

<script>
export default {
  name: 'PageWithWidget',
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

<style>
.match-content-height {
  width: 85%;
  margin: 0 auto;
}
</style>
