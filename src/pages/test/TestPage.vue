<template>
  <PageWithWidget class="match-content-height">
    <template slot="main-page">
      <ModalWindow
        :show-modal-prop="showModal"
      />
      <div class="dir">
        <h2>{{ dirName }}</h2>
      </div>
      <div class="message">
        <p>{{ message }}</p>
      </div>
      <div class="msg-div">
        <div class="input-group mb-3">
          <input
            v-model="typingMsg"
            type="text"
            class="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="sendMessage"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </template>
  </PageWithWidget>
</template>

<script>

import PageWithWidget from '@/components/Layout/PageWithWidget.vue';
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue';

export default {
  name: 'TestPage',
  components: {
    PageWithWidget,
    ModalWindow,
  },
  data() {
    return {
      dirName: '---',
      showModal: false,
      connection: null,
      message: '',
      typingMsg: '',
    };
  },
  created() {
    this.connectSocket();
  },
  methods: {
    extractData(event) {
      return JSON.parse(event.data);
    },
    connectionOpen() {
      this.message = 'Successfully connected to the websocket server...';
    },
    connectionClosed(event) {
      if (event.code === 1000) {
        this.message = `Connection closed normally ${event.code}`;
      } else {
        this.message = `There was a problem closing the connection: ${event.code}`;
      }
    },
    messageReceived(event) {
      const data = JSON.parse(event.data);
      this.dirName = data.message;
    },
    connectSocket() {
      this.connection = new WebSocket('ws://localhost:8000/ws/random');
      this.connection.onopen = this.connectionOpen;
      this.connection.onmessage = this.messageReceived;
      this.connection.onclose = this.connectionClosed;
    },
    sendMessage() {
      if (this.connection) {
        console.log(this.typingMsg);
        this.connection.send(JSON.stringify({ message: this.typingMsg }));
      }
    },
    disconnectSocket() {

    },
  },
};
</script>

<style>
.dir{
  margin-top: 10vh;
}
.dir h2{
  text-align: center;
  margin: 0 auto;
}

.message{
  margin: 20px auto;
  text-align: center;
}

.msg-div{
  width: 500px;
  margin: 20px auto;
}

</style>
