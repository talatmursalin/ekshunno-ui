<template>
  <div class="setting-modal">
    <div class="sett-header">
      <h4>Settings</h4>
      <span
        class="close-btn"
        @click="closeModal"
      >
        <i class="fas fa-times" />
      </span>
    </div>
    <hr>
    <div class="row no-gutters p-2">
      <div class="col-md-8">
        <h5>Time</h5>
        <p>Max execution time for the program</p>
      </div>
      <div class="setting-select col-md-4">
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
        <h5>Theme</h5>
        <p>Text editor color theme</p>
      </div>
      <div class="setting-select col-md-4">
        <v-selectize
          v-model="eTheme"
          :options="settings.eThemes"
          :disable-search="false"
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
