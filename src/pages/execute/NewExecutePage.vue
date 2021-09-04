<template>
  <DefaultPageLayout>
    <template #page-top>
      <ModalLoader :activate-loader="activateLoader" />
      <ModalWindow
        :modal-title="warningModalContent"
        :show-modal-prop="showWaringModal"
        @modalClosed="warnModalClosed"
      />
      <ModalMaker
        :show-modal-prop="showSettModal"
      >
        <template #modal-content>
          <SettingsModal
            :settings="settings"
            @closeSettModal="modalMakerClosed"
          />
        </template>
      </ModalMaker>
    </template>
    <template #main-page>
      <b-alert
        class="alert-sm"
        :variant="msgVariant"
        :show="!!message"
        fade
        dismissible
      >
        {{ message }}
      </b-alert>

      <div class="row no-gutters editor">
        <div class="col-md-8 editor-block">
          <div class="editor-controlls">
            <div class="lang-select">
              <select>
                <option selected>
                  Choose...
                </option>
                <option value="1">
                  One
                </option>
                <option value="2">
                  Two
                </option>
                <option value="3">
                  Three
                </option>
              </select>
            </div>
            <div class="play-sett-btns">
              <span class="run-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="sett"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1
                    0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span
                class="sett-btn"
                @click="showSettingsModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="sett"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573
                  1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426
                   1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37
                    2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724
                    1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0
                     00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0
                     001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <codeEditor />
        </div>
        <div class="col-md-4 io-block">
          <div class="input-block">
            <div class="input-block-header">
              stdin
            </div>
            <textarea
              name="stdin"
              rows="20"
            />
          </div>
          <div class="output-block">
            <div class="output-block-header">
              stdout
            </div>
            <textarea
              name="stdout"
              rows="20"
              readonly
            />
          </div>
        </div>
      </div>
    </template>
  </DefaultPageLayout>
</template>

<script>
import io from 'socket.io-client';
import CodeEditor from '@/components/codeeditor/CodeEditor.vue';
import ModalLoader from '@/components/ModalLoader/ModalLoader.vue';
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue';
import ModalMaker from '@/components/ModalWindow/ModalMaker.vue';
import DefaultPageLayout from '@/components/Layout/DefaultPageLayout.vue';
import SettingsModal from '@/components/SettingsModal/SettingsModal.vue';
import executeMixin from '@/mixins/execute';
import request from '@/request';

export default {
  name: 'ExecutePage',

  components: {
    DefaultPageLayout,
    CodeEditor,
    ModalLoader,
    ModalWindow,
    ModalMaker,
    SettingsModal,
  },
  mixins: [executeMixin],

  data() {
    return {
      message: null,
      msgVariant: 'success',
      activateLoader: false,
      showWaringModal: false,
      showSettModal: false,
      warningModalContent: '',
      socket: null,
      settings: {
        mxTime: 3.0,
        selTime: 3.0,
        mxMemory: 512,
        selMemory: 256,
        eThemes: ['cmaterial', 'neo', 'material'],
        selEditorTheme: 'cmaterial',
      },
      submission: {
        memory: 512,
        time: 0,
        input: '',
      },
      result: {
        output: '',
        verdict: 'NULL',
        time: 0,
        memory: 0,
      },
    };
  },
  computed: {
    verdictColor() {
      if (this.result.verdict === 'OK' || this.result.verdict === 'AC') {
        return 'green-color';
      }
      if (this.result.verdict === 'NULL') {
        return 'black-color';
      }
      return 'red-color';
    },
  },
  created() {
    this.connectSocket();
  },
  methods: {
    connectSocket() {
      this.socket = io(request.defaults.socketEndPoint);
      this.socket.on('stateUpdateEvent', (msg) => {
        this.updateState(msg);
        // socket.disconnect();
      });
    },
    validateSubmission() {
      if (this.submission.src.trim().length === 0) {
        this.showMessage('Source is empty!', 'danger');
        return false;
      }
      if (this.submission.time < 0 || this.submission.time > 10) {
        this.showMessage('Time limit must be between 0 to 10', 'danger');
        return false;
      }
      return true;
    },
    codeSubmitted(src) {
      this.message = null;
      this.submission.src = src;
      this.submission.time = parseFloat(this.submission.time);
      if (this.validateSubmission() === false) {
        return;
      }
      const cloneSubmission = {
        ...this.submission,
        src: btoa(src),
      };
      this.activateLoader = true;
      this.saveEditorState();
      this.$store
        .dispatch('postCode', { submission: cloneSubmission })
        .then((room) => {
          if (this.socket.disconnected) {
            this.connectSocket();
          }
          this.socket.emit('joinRoomEvent', room);
        })
        .catch((err) => {
          this.activateLoader = false;
          this.showMessage(err, 'danger');
        });
    },
    updateState(msg) {
      const data = JSON.parse(msg);
      this.result.verdict = data.Verdict;
      this.result.time = data.Time;
      this.result.memory = (data.Memory).toFixed(2);
      this.result.output = data.Output;
      this.activateLoader = false;
    },
    showMessage(msg, type) {
      this.message = msg;
      this.msgVariant = type;
    },
    showSettingsModal() {
      this.showSettModal = true;
    },
    modalMakerClosed(sett) {
      this.settings.selTime = sett.time;
      this.settings.selMemory = sett.memory;
      this.settings.selEditorTheme = sett.eTheme;
      //   save settings to local storage
      this.showSettModal = false;
    },
  },
};
</script>

<style lang='css'>

.editor{
    margin-top: 40px;
    border: 1px solid var(--primary);
}

.editor-header{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid var(--primary)
}

.editor-block{
    height: 100%;
}

.io-block{
    border-left: 1px solid var(--primary);
}

.io-block textarea{
    width: 100%;
    height: 100%;
    background:inherit;
    border: none;
    padding: 10px;
}

.input-block-header, .output-block-header{
    padding-left: 5px;
    border: 1px solid var(--primary);
}

.editor-controlls{
    display:flex;
    height: 45px;
    position: relative;
    padding: 0px 10px;
    border-bottom: 1px solid var(--primary);
    margin-bottom: 10px;
}

.play-sett-btns{
    margin-left: auto;
    background: red;
    position: relative;
}

.run-btn, .sett-btn{
    margin: 0 10px;
    position: absolute;
    top: 50%;
     -ms-transform: translateY(-45%);
    transform: translateY(-40%);
    cursor: pointer;
}

.run-btn{
    margin-left: -100px;
    color: var(--green);
}

.sett-btn{
    margin-left: -50px;
}

.sett{
    width: 23px;
    height: auto;
    /* padding: 4px 0px; problemo */
}

.lang-select select{
    width: 200px;
    background: transparent;
    border: 1px solid var(--primary);
    border-radius: 4px;
    color: darkgray;
    position: absolute;
    top: 47%;
    -ms-transform: translateY(-47%);
    transform: translateY(-47%);
    padding: 3px;
}

.input-group .verdict-text {
  font-weight: bold;
}

.input-group .green-color {
  color: green;
  font-weight: bold;
}

.input-group .red-color {
  color: red;
  font-weight: bold;
}

@media only screen and (max-width:700px) {
  .noborderinput .input-group-lg .input-group-prepend {
    display: none;
  }

  .noborderinput .input-group-lg .input-group-append{
   display: none;
  }
}

</style>
