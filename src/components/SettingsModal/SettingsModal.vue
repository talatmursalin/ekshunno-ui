<template>
  <div class="setting-modal">
    <div class="sett-header">
      <h4>settings</h4>
      <div
        class="close-btn"
        @click="closeModal"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
    <hr>
    <div class="row no-gutters p-2">
      <div class="col-md-8">
        <h5>time</h5>
        <p>Max execution time for the program</p>
      </div>
      <div class="col-md-4">
        <select v-model="time">
          <option
            v-for="(t, i) in timeOptions"
            :key="i"
            :value="t"
            :selected="t==ctime"
          >
            {{ t }}s
          </option>
        </select>
      </div>
    </div>
    <div class="row no-gutters p-2">
      <div class="col-md-8 desc">
        <h5>Memory</h5>
        <p>Max memory provided to the program including heap and stack</p>
      </div>
      <div class="col-md-4">
        <select v-model="memory">
          <option
            v-for="(m, i) in memoryOptions"
            :key="i"
            :value="m"
            :selected="m==cmemory"
          >
            {{ m }} mb
          </option>
        </select>
      </div>
    </div>
    <hr>
    <div class="row no-gutters p-2">
      <div class="col-md-8">
        <h5>theme</h5>
        <p>Text editor color theme</p>
      </div>
      <div class="col-md-4">
        <select
          v-model="eTheme"
          @change="themeSelChanged"
        >
          <option
            v-for="(th, i) in settings.eThemes"
            :key="i"
            :value="th"
            :selected="th==cetheme"
          >
            {{ th }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsModal',
  props: {
    settings: {
      type: Object,
      default() {
        return {
          mxTime: 3.0,
          selTime: 3.0,
          mxMemory: 512,
          selMemory: 256,
          eThemes: ['cmaterial', 'neo', 'material'],
          selEditorTheme: 'cmaterial',
        };
      },
    },
  },
  data() {
    return {
      time: this.settings.selTime,
      memory: this.settings.selMemory,
      eTheme: this.settings.selEditorTheme,
    };
  },
  computed: {
    ctime() {
      return this.settings.selTime;
    },
    cmemory() {
      return this.settings.selMemory;
    },
    cetheme() {
      console.log('sel', this.settings.selEditorTheme);
      return this.settings.selEditorTheme;
    },
    timeOptions() {
      const t = [];
      for (let i = 0.5; i <= this.settings.mxTime; i += 0.5) {
        t.push(i);
      }
      return t;
    },
    memoryOptions() {
      const m = [];
      for (let i = 64; i <= this.settings.mxMemory; i *= 2) {
        m.push(i);
      }
      return m;
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeSettModal', {
        time: this.time,
        memory: this.memory,
        eTheme: this.eTheme,
      });
    },
    themeSelChanged(event) {
      this.$emit('themeSelChange', event.target.value);
    },
  },
};
</script>

<style>

.sett-header{
    display: flex;
}

.sett-header h4{
    margin-bottom: 0px;
}

.sett-header .close-btn{
    margin-left: auto;
    cursor: pointer;
}

.setting-modal{
    padding: 20px;
    background: var(--primary);
    width: 100%;
    /* height: 30px; */
    border-radius: 4px;
}

.setting-modal h5{
    text-align: left;
}

.setting-modal p{
   color:dimgray;
}

.setting-modal .col-md-4{
    text-align: right;
}

.setting-modal select{
    background: transparent;
    border: 1px solid var(--secondary);
    border-radius: 4px;
    padding: 5px;
    color: var(--secondary);
    width: 150px;
    margin-top: 3px;
}

</style>
