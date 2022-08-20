<template>
  <div class="tooltip-box">
    <slot />
    <div
      class="tooltip"
      :style="{ 'left': leftPosition }"
    >
      <span
        class="text"
      >{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    text: {
      type: String,
      required: true,
    },
    positionLeft: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    leftPosition() {
      return `${this.positionLeft}%`;
    },
  },
};
</script>

<style scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip{
  opacity: 1;
  transition-property: opacity;
  transition-duration: 1s;
  transition-delay: 0.5s;
}

.tooltip {
  color: var(--text-in-primary);
  text-align: center;
  padding: 3px 0;
  border-radius: 4px;
  width: 160px;
  bottom: 160%;
  /* margin-left: -100%; */

  opacity: 0;
  transition: opacity 1s;

  position: absolute;
  z-index: 1;

  background: var(--primary);
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--primary) transparent transparent transparent;
}
</style>
