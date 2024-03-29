<template>
  <DefaultPageLayout>
    <template #page-top>
      <ModalLoader :activate-loader="activateLoader" />
      <ModalAlert
        :show-alert-modal="alertModalFlag"
        alert-title="Are you sure?"
        alert-text="Your code will be discarded and reset to the default code!"
        @alertModalClosed="alertModalClosed"
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
              <v-selectize
                :value="submission.lang"
                :options="langOptions"
                :disable-search="true"
                key-by="value"
                label="text"
                @input="langSelChanged"
              />
            </div>
            <div class="play-sett-btns">
              <ToolTip
                text="Execute program"
                :position-left="-235"
              >
                <span
                  class="icon-btn run-btn"
                  @click="codeSubmitted"
                ><font-awesome-icon icon="fa-play" />
                </span>
              </ToolTip>
              <!-- <span
                class="icon-btn"
                @click="uploadFile"
              ><font-awesome-icon icon="fa-file-import" />
              </span> -->
              <ToolTip
                text="Reset to default code"
                :position-left="-200"
              >
                <span
                  class="icon-btn"
                  @click="resetCodeBtnPressed"
                ><font-awesome-icon icon="fa-arrow-rotate-right" />
                </span>
              </ToolTip>
              <ToolTip
                text="Open editor settings"
                :position-left="-200"
              >
                <span
                  class="icon-btn"
                  @click="showSettingsModal"
                >
                  <font-awesome-icon icon="fa-solid fa-sliders" />
                </span>
              </ToolTip>
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
          <div
            class="input-block"
            :class="stdinClass"
          >
            <div
              class="input-block-header"
              @click="stdInFlagToggle"
            >
              <span class="cv-pull-right">
                <font-awesome-icon icon="fa-solid fa-chevron-down" />
              </span>
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
          <div
            class="output-block"
            :class="stdoutClass"
          >
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
import ModalMaker from '@/components/ModalWindow/ModalMaker.vue';
import ModalAlert from '@/components/ModalWindow/ModalAlert.vue';
import DefaultPageLayout from '@/components/Layout/DefaultPageLayout.vue';
import SettingsModal from '@/components/SettingsModal/SettingsModal.vue';
import Alert from '@/components/Alert/Alert.vue';
import executeMixin from '@/mixins/execute';
import request from '@/request';
import VSelectize from '@isneezy/vue-selectize';
import ToolTip from '@/components/Tooltip/ToolTip.vue';
// eslint-disable-next-line import/extensions
import { editorThemeList } from '@/utils/utils.js';

export default {
  name: 'ExecutePage',

  components: {
    DefaultPageLayout,
    CodeEditor,
    ModalLoader,
    ModalMaker,
    ModalAlert,
    SettingsModal,
    Alert,
    VSelectize,
    ToolTip,
  },
  mixins: [executeMixin],

  data() {
    return {
      message: null,
      msgVariant: 'success',
      showLocalMsg: false,
      activateLoader: false,
      showSettModal: false,
      alertModalFlag: false,
      socket: null,
      stdInFlag: true,
      settings: {
        mxTime: 3.0,
        selTime: 3.0,
        mxMemory: 512,
        selMemory: 256,
        eThemes: editorThemeList, // ['cmaterial', 'neo', 'material'],
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
        return 'success';
      }
      if (this.result.verdict === 'NULL') {
        return 'info';
      }
      return 'danger';
    },
    stdinClass() {
      if (this.stdInFlag) {
        return 'half-div';
      }
      return 'half-div-close';
    },
    stdoutClass() {
      if (this.stdInFlag) {
        return 'half-div';
      }
      return 'full-div';
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
      if (Buffer.byteLength(this.submission.src, 'utf8') > 500 * 1024) {
        this.showMessage('Source too long!', 'danger');
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
    },
    reloadSettings() {
      const settings = localStorage.getItem('editorSettings');
      if (settings) {
        const jsonSettings = JSON.parse(this.base64decode(settings));
        this.settings.selTime = jsonSettings.time;
        this.settings.selMemory = jsonSettings.memory;
        this.settings.selEditorTheme = jsonSettings.eTheme;
      }
    },
    langSelChanged(lang) {
      this.submission.lang = lang.value;
    },
    stdInFlagToggle() {
      this.stdInFlag = !this.stdInFlag;
    },
    uploadFile() {

    },
    alertModalClosed(choice) {
      this.alertModalFlag = false;
      if (choice) {
        this.resetCode();
      }
    },
    resetCodeBtnPressed() {
      this.langPrecode = this.submission.src;
      this.alertModalFlag = true;
    },
    resetCode() {
      const langConf = this.languageConf[this.submission.lang];
      this.langPrecode = langConf.precode;
    },
  },
};
</script>

<style lang="css" src="./executePageStyle.css" scoped/>
