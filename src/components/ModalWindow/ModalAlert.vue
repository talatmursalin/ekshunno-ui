<template>
  <div id="appModal">
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div
            class="cd-popup"
            role="alert"
          >
            <div class="cd-popup-container">
              <p class="alert-modal-title">
                {{ alertTitle }}
              </p>
              <p class="alert-modal-body">
                {{ alertText }}
              </p>
              <ul class="cd-buttons">
                <li>
                  <a
                    type="buttton"
                    @click="confirmClicked"
                  >Yes</a>
                </li>
                <li>
                  <a
                    type="buttton"
                    @click="closeModal"
                  >No</a>
                </li>
              </ul>
              <a
                type="buttton"
                class="cd-popup-close img-replace"
                @click="closeModal"
              />
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
    showAlertModal: { type: Boolean, default: false },
    alertTitle: { type: String, default: 'Modal Title' },
    alertText: { type: String, default: 'Modal body text' },
  },
  data() {
    return {
      showModal: false,
    };
  },
  watch: {
    showAlertModal() {
      this.showModal = this.showAlertModal;
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
      this.$emit('alertModalClosed', choice);
    },
  },
};
</script>

<style >
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.0);
  display: table;
  /* transition: opacity 0.3s ease; */
  -webkit-transition: opacity 1s 0s, visibility 0s 1s;
  -moz-transition: opacity 1s 0s, visibility 0s 1s;
  transition: opacity 1s 0s, visibility 0s 1s;
}

.cd-popup-container {
  position: relative;
  width: 100%;
  max-width: 460px;
  margin:10em auto;
  margin-top: 50%;
  background: var(--primary);
  border-radius: 0.25em 0.25em 0.4em 0.4em;
  text-align: center;
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

.alert-modal-title{
  padding: 10px 15px;
  font-size: 20px;
  text-align: left;
  margin-bottom: 0px;
}

.alert-modal-body{
  padding: 5px 15px;
  text-align: left;
}

.divider{
  border-top: 1px solid var(--secondary);
  width: 85%;
}

.cd-popup-container .cd-buttons {
  padding: 0;
  border-top: 1px solid var(--secondary)
}

.cd-popup-container .cd-buttons:after {
  content: "";
  display: table;
  clear: both;
}
.cd-popup-container .cd-buttons li {
  float: left;
  width: 50%;
  list-style: none;
  cursor: pointer;
}
.cd-popup-container .cd-buttons a {
  display: block;
  height: 50px;
  line-height: 50px;
  text-transform: uppercase;
}

.cd-popup-container .cd-buttons li:first-child a:hover{
  color: var(--warning);
  -webkit-transition: background-color 0.5s;
  -moz-transition: background-color 0.5s;
  transition: background-color 0.5s;
}

.cd-popup-container .cd-buttons li:last-child a:hover{
  color: var(--success);
  -webkit-transition: background-color 0.5s;
  -moz-transition: background-color 0.5s;
  transition: background-color 0.5s;
}

.cd-popup-container .cd-buttons li:first-child a {
  /* background: #fc7169; */
  border-radius: 0 0 0 0.25em;
}

.cd-popup-container .cd-buttons li:last-child a {
  /* background: #b6bece; */
  border-radius: 0 0 0.25em 0;
  border-left: 1px solid var(--secondary);
}

.cd-popup-container .cd-popup-close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.cd-popup-container .cd-popup-close::before,
.cd-popup-container .cd-popup-close::after {
  content: "";
  position: absolute;
  top: 12px;
  width: 14px;
  height: 3px;
  background-color: #8f9cb5;
}

.cd-popup-container .cd-popup-close::before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 8px;
}
.cd-popup-container .cd-popup-close::after {
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
  .cd-popup-container {
    margin: 20em auto;
  }
}
</style>
