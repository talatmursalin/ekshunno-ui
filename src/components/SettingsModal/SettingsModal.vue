<template>
  <div class="setting-modal">
    <div class="sett-header">
      <h4>settings</h4>
      <span
        class="close-btn"
        @click="closeModal"
      >
        <!-- <svg
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
        </svg> -->
        <i class="fas fa-times" />
      </span>
    </div>
    <hr>
    <div class="row no-gutters p-2">
      <div class="col-md-8">
        <h5>time</h5>
        <p>Max execution time for the program</p>
      </div>
      <div class="setting-select col-md-4">
        <!-- <select v-model="time">
          <option
            v-for="(t, i) in timeOptions"
            :key="i"
            :value="t"
            :selected="t==ctime"
          >
            {{ t }}s
          </option>
        </select> -->
        <v-selectize
          v-model="time"
          :options="timeOptions"
          :disable-search="true"
        />
      </div>
    </div>
    <div class="row no-gutters p-2">
      <div class="col-md-8 desc">
        <h5>Memory</h5>
        <p>Max memory provided to the program including heap and stack</p>
      </div>
      <div class="setting-select col-md-4">
        <!-- <select v-model="memory">
          <option
            v-for="(m, i) in memoryOptions"
            :key="i"
            :value="m"
            :selected="m==cmemory"
          >
            {{ m }} mb
          </option>
        </select> -->
        <v-selectize
          v-model="memory"
          :options="memoryOptions"
          :disable-search="true"
        />
      </div>
    </div>
    <hr>
    <div class="row no-gutters p-2">
      <div class="col-md-8">
        <h5>theme</h5>
        <p>Text editor color theme</p>
      </div>
      <div class="setting-select col-md-4">
        <!-- <select
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
        </select> -->
        <v-selectize
          v-model="eTheme"
          :options="settings.eThemes"
          :disable-search="true"
          @input="themeSelChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>

import VSelectize from '@isneezy/vue-selectize';

export default {
  name: 'SettingsModal',
  components: {
    VSelectize,
  },
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
    themeSelChanged(themeName) {
      this.$emit('themeSelChange', themeName);
    },
  },
};
</script>

<style src="./settingsModal.css" scoped/>
