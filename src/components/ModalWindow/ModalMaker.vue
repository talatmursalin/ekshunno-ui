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
      console.log(choice);
      this.$emit('modalClosed', choice);
    },
  },
};
</script>

<style>
.mm-modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.0);
  display: table;
  /* transition: opacity 0.3s ease; */
  -webkit-transition: opacity 0.3s 0s, visibility 0s 0.3s;
  -moz-transition: opacity 0.3s 0s, visibility 0s 0.3s;
  transition: opacity 0.3s 0s, visibility 0s 0.3s;
}

.mm-popup-container {
  position: relative;
  max-width: 650px;
  margin:0 auto;
  margin-top: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  -webkit-transform: translateY(-40px);
  -moz-transform: translateY(-40px);
  -ms-transform: translateY(-40px);
  -o-transform: translateY(-40px);
  transform: translateY(-40px);
  /* Force Hardware Acceleration in WebKit */
  -webkit-backface-visibility: hidden;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

.mm-popup-container .cd-popup-close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.mm-popup-container .cd-popup-close::before,
.mm-popup-container .cd-popup-close::after {
  content: "";
  position: absolute;
  top: 12px;
  width: 14px;
  height: 3px;
  background-color: #8f9cb5;
}

.mm-popup-container .cd-popup-close::before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 8px;
}
.mm-popup-container .cd-popup-close::after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 8px;
}
/* .is-visible .cd-popup-container {
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
} */

@media only screen and (min-width: 1170px) {
  .mm-popup-container {
    margin: 20em auto;
  }
}
</style>
