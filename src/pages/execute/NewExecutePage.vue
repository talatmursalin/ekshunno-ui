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
            @themeSelChange="eThemeChanged"
            @closeSettModal="modalMakerClosed"
          />
        </template>
      </ModalMaker>
    </template>
    <template #main-page>
      <Alert
        class="mt-4"
        :show="showLocalMsg"
        :variant="msgVariant"
        @alertClosed="hideLocalMessage"
      >
        {{ message }}
      </Alert>
      <div class="row no-gutters editor">
        <div class="col-md-8 editor-block">
          <div class="editor-controlls">
            <div class="lang-select">
              <select v-model="submission.lang">
                <option
                  v-for="(lang, i) in langOptions"
                  :key="i"
                  :value="lang.value"
                >
                  {{ lang.text }}
                </option>
              </select>
            </div>
            <div class="play-sett-btns">
              <span
                class="icon-btn run-btn"
                @click="codeSubmitted"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="sett-icon"
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
                class="icon-btn"
                @click="uploadFile"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="sett-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1
                   0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg></span>
              <span
                class="icon-btn"
                @click="showSettingsModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="sett-icon"
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
          <CodeEditor
            :editor-lang-mode="langMode"
            :precode="langPrecode"
            :e-theme="settings.selEditorTheme"
            @codeSubmitted="codeSubmitted"
            @codeEdited="codeEdited"
          />
        </div>
        <div class="col-md-4 io-block">
          <div class="input-block">
            <div class="input-block-header">
              stdin
            </div>
            <div class="input-block-body">
              <textarea
                id="inputTextArea"
                v-model="submission.input"
                name="inputTextArea"
              />
            </div>
          </div>
          <div class="output-block">
            <div class="output-block-header">
              output
            </div>
            <div class="output-block-body">
              <textarea
                id="outputTextArea"
                v-model="result.output"
                name="outputTextArea"
                readonly
              />
            </div>
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
import Alert from '@/components/Alert/Alert.vue';
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
    Alert,
  },
  mixins: [executeMixin],

  data() {
    return {
      message: null,
      msgVariant: 'success',
      showLocalMsg: false,
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
        memory: 256,
        time: 3.0,
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
        // return 'green-color';
        return 'success';
      }
      if (this.result.verdict === 'NULL') {
        return 'info';
      }
      return 'danger';
    },
    hasResult() {
      return this.result.verdict !== 'NULL';
    },
  },
  created() {
    this.connectSocket();
    this.reloadSettings();
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
      if (this.submission.time < 0 || this.submission.time > this.settings.mxTime) {
        this.showMessage('Invalid execution time provided', 'danger');
        return false;
      }
      if (this.submission.memory < 0 || this.submission.memory > this.settings.mxMemory) {
        this.showMessage('Invalid memory provided', 'danger');
        return false;
      }
      return true;
    },
    codeSubmitted() {
      this.hideLocalMessage();
      this.submission.time = this.settings.selTime;
      this.submission.memory = this.settings.selMemory;
      if (this.validateSubmission() === false) {
        return;
      }
      const cloneSubmission = {
        ...this.submission,
        src: btoa(this.submission.src),
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
      this.showMessage(`${this.result.verdict} - execution took ${this.result.time}s
       and ${this.result.memory} mb`, this.verdictColor);
    },
    showMessage(msg, type) {
      this.hideLocalMessage();
      this.message = msg;
      this.msgVariant = type;
      this.showLocalMsg = true;
    },
    hideLocalMessage() {
      this.showLocalMsg = false;
      this.message = null;
    },
    showSettingsModal() {
      this.showSettModal = true;
    },
    eThemeChanged(themeName) {
      this.settings.selEditorTheme = themeName;
    },
    modalMakerClosed(sett) {
      this.settings.selTime = sett.time;
      this.settings.selMemory = sett.memory;
      //   save settings to local storage
      this.saveSettings(sett);
      this.showSettModal = false;
    },
    saveSettings(settings) {
      localStorage.setItem('editorSettings',
        this.base64encode(JSON.stringify(settings)));
      console.log(settings);
    },
    reloadSettings() {
      const settings = localStorage.getItem('editorSettings');
      if (settings) {
        console.log('setting', this.base64decode(settings));
        const jsonSettings = JSON.parse(this.base64decode(settings));
        console.log(jsonSettings);
        this.settings.selTime = jsonSettings.time;
        this.settings.selMemory = jsonSettings.memory;
        this.settings.selEditorTheme = jsonSettings.eTheme;
      }
    },
    uploadFile() {

    },
  },
};
</script>

<style src="./executePageStyle.css" />
