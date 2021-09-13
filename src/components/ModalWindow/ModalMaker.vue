<template>
  <div id="appModal">
    <div v-if="showModal">
      <transition name="modal">
        <div class="mm-modal-mask">
          <div
            class="mm-popup"
            role="alert"
          >
            <div class="mm-popup-container">
              <slot name="modal-content" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    showModalProp: { type: Boolean, default: false },
  },
  data() {
    return {
      showModal: false,
    };
  },
  watch: {
    showModalProp() {
      this.showModal = this.showModalProp;
    },
  },
  methods: {
    closeModal() {
      this.emitModalClose(false);
    },
    confirmClicked() {
      this.emitModalClose(true);
    },
    emitModalClose(choice) {
      this.showModal = false;
      this.$emit('modalClosed', choice);
    },
  },
};
</script>

<style lang="scss" src="./modalMaker.scss" />
