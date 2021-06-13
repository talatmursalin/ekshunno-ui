<template>
  <PageWithWidget class="match-content-height mt-5 mb-5">
    <template slot="above-widget">
      <ModalLoader :activate-loader="activateLoader" />
      <ModalWindow
        :modal-title="warningModalContent"
        :show-modal-prop="showWaringModal"
        @modalClosed="warnModalClosed"
      />
    </template>
    <template slot="main-page">
      <b-alert
        class="alert-sm"
        :variant="msgVariant"
        :show="!!message"
        fade
        dismissible
      >
        {{ message }}
      </b-alert>
      <div class="mt-3">
        <div class="row justify-content-between">
          <div class="col-md-5">
            <NoborderInput>
              <b-input-group class="input-group input-group-no-border first">
                <template v-slot:prepend>
                  <b-input-group-text>
                    <span>Language</span>
                  </b-input-group-text>
                </template>
                <b-form-select
                  v-model="submission.lang"
                  :options="langOptions"
                />
                <template v-slot:append>
                  <b-input-group-text>
                    <span />
                  </b-input-group-text>
                </template>
              </b-input-group>
              <b-input-group class="input-group input-group-no-border last">
                <template v-slot:prepend>
                  <b-input-group-text>
                    <span>Compiler</span>
                  </b-input-group-text>
                </template>
                <b-form-select
                  v-model="submission.compiler"
                  :options="compOptions"
                />
              </b-input-group>
            </NoborderInput>
          </div>
          <div class="col-md-5">
            <NoborderInput>
              <b-input-group class="input-group input-group-no-border first">
                <template v-slot:prepend>
                  <b-input-group-text>
                    <i
                      class="fa fa-stopwatch"
                      aria-hidden="true"
                    />
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="submission.time"
                  placeholder="Time Limit"
                />
                <template v-slot:append>
                  <b-input-group-text>
                    <span>sec</span>
                  </b-input-group-text>
                </template>
              </b-input-group>
              <b-input-group class="input-group input-group-no-border last">
                <template v-slot:prepend>
                  <b-input-group-text>
                    <i class="fa fa-memory" />
                  </b-input-group-text>
                </template>
                <b-form-select
                  v-model="submission.memory"
                  :options="memOptions"
                />
                <template v-slot:append>
                  <b-input-group-text>
                    <span>mb</span>
                  </b-input-group-text>
                </template>
              </b-input-group>
            </NoborderInput>
          </div>
        </div>
        <div class="row mt-10">
          <div class="col-md-6">
            <CodeEditor
              :editor-lang-mode="langMode"
              :precode="langPrecode"
              @codeSubmitted="codeSubmitted"
              @codeEdited="codeEdited"
            />
          </div>
          <div class="col-md-6 mt-custom-3">
            <NoborderInput>
              <b-input-group class="input-group-lg input-group-no-border first">
                <template v-slot:prepend>
                  <b-input-group-text>
                    <i
                      class="fas fa-terminal"
                      aria-hidden="true"
                    />
                  </b-input-group-text>
                </template>
                <b-form-input
                  placeholder="NULL"
                  class="verdict-text"
                  :class="verdictColor"
                  :value="result.verdict"
                  disabled
                />
                <template v-slot:append>
                  <b-input-group-text>
                    <span />
                  </b-input-group-text>
                </template>
              </b-input-group>
              <b-input-group class="input-group-lg input-group-no-border middle">
                <template v-slot:prepend>
                  <b-input-group-text>
                    <i
                      class="fa fa-stopwatch"
                      aria-hidden="true"
                    />
                  </b-input-group-text>
                </template>
                <b-form-input
                  placeholder="Time Limit"
                  :value="result.time"
                  disabled
                />
                <template v-slot:append>
                  <b-input-group-text>
                    <span>sec</span>
                  </b-input-group-text>
                </template>
              </b-input-group>
              <b-input-group class="input-group-lg input-group-no-border last">
                <template v-slot:prepend>
                  <b-input-group-text>
                    <i class="fa fa-memory" />
                  </b-input-group-text>
                </template>
                <b-form-input
                  :value="result.memory"
                  disabled
                />
                <template v-slot:append>
                  <b-input-group-text>
                    <span>mb</span>
                  </b-input-group-text>
                </template>
              </b-input-group>
            </NoborderInput>
            <div class="form-group">
              <label for="exampleFormControlTextarea3">Input</label>
              <textarea
                id="exampleFormControlTextarea3"
                v-model="submission.input"
                class="form-control no-border"
                rows="12"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea3">Output</label>
              <textarea
                id="exampleFormControlTextarea3"
                v-model="result.output"
                class="form-control no-border"
                rows="13"
                readonly
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageWithWidget>
</template>

<script>
import io from 'socket.io-client';
import CodeEditor from '@/components/codeeditor/CodeEditor.vue';
import ModalLoader from '@/components/ModalLoader/ModalLoader.vue';
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue';
import PageWithWidget from '@/components/Layout/PageWithWidget.vue';
import NoborderInput from '@/components/NoborderInput/NoborderInput.vue';
import executeMixin from '@/mixins/execute';
import request from '@/request';

export default {
  name: 'ExecutePage',

  components: {
    PageWithWidget,
    CodeEditor,
    ModalLoader,
    NoborderInput,
    ModalWindow,
  },
  mixins: [executeMixin],

  data() {
    return {
      message: null,
      msgVariant: 'success',
      activateLoader: false,
      showWaringModal: false,
      warningModalContent: '',
      socket: null,
      memOptions: [
        { text: '512', value: 512 },
        { text: '256', value: 256 },
      ],
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
  },
};
</script>

<style lang='css'>

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

.mt-custom-3{
  margin-top: 32px;
}

</style>
