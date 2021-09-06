<template>
  <div
    v-if="show"
    class="alert alert-dismissible fade show"
    :class="findVariant"
    role="alert"
  >
    <slot />
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="closeClicked"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    findVariant() {
      if (this.variant === 'primary') {
        return 'alert-primary';
      }
      if (this.variant === 'secondary ') {
        return 'alert-secondary';
      }
      if (this.variant === 'success') {
        return 'alert-success';
      }
      if (this.variant === 'danger') {
        return 'alert-danger';
      }
      if (this.variant === 'warning') {
        return ' alert-warning';
      }
      if (this.variant === 'info') {
        return 'alert-info';
      }
      if (this.variant === 'light') {
        return 'alert-light';
      }
      if (this.variant === 'dark') {
        return 'alert-dark';
      }
      return 'alert-primary';
    },
  },
  methods: {
    closeClicked() {
      this.$emit('alertClosed');
    },
  },
};
</script>

<style>

</style>
