<template>
  <div class="flat-switch">
    <input
      id="cb4"
      v-model="switchValue"
      class="tgl tgl-flat"
      type="checkbox"
      @change="valueChanged"
    >
    <label
      class="tgl-btn"
      for="cb4"
    />
  </div>
</template>

<script>
export default {
  name: 'FlatSwitch',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      switchValue: this.value,
    };
  },
  methods: {
    valueChanged() {
      this.$emit('input', this.switchValue);
    },
  },
};
</script>

<style lang='scss' scoped>
.flat-switch{
  .tgl {
    display: none;
    $sw-height:25px;
    // add default box-sizing for this scope
    &,
    &:after,
    &:before,
    & *,
    & *:after,
    & *:before,
    & + .tgl-btn {
      box-sizing: border-box;
      &::selection {
        background: none;
      }
    }

    + .tgl-btn {
      outline: 0;
      display: block;
      width: 100%;
      height: $sw-height;
      position: relative;
      cursor: pointer;
      user-select: none;
      &:after,
      &:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
      }

      &:after {
        left: 0;
      }

      &:before {
        display: none;
      }
    }

    &:checked + .tgl-btn:after {
      left: 50%;
    }
  }

  // themes

  .tgl-flat {
    $sw-border-width:1px;
    + .tgl-btn {
      padding: 2px;
      transition: all .3s ease;
      background: var(--primary);
      border: $sw-border-width solid var(--secondary);
      border-radius: 4px;
      &:after {
        transition: all .2s ease;
        background: #d55050;
        content: "";
        border-radius: 3px;
      }
    }

    &:checked + .tgl-btn {
      border: $sw-border-width solid var(--secondary);
      background: var(--secondary);
      &:after {
        left: 50%;
        background: #7FC6A6;
      }
    }
  }
}
</style>
