<template>
  <div class="tab-view">
    <div class="worko-tabs">
      <input v-if="tabs.tabOne.show" class="state"
      type="radio" title="tab-one" name="tabs-state" id="tab-one"
      checked/>
      <input v-if="tabs.tabTwo.show" class="state"
      type="radio" title="tab-two" name="tabs-state" id="tab-two"/>
      <input v-if="tabs.tabThree.show" class="state"
      type="radio" title="tab-three" name="tabs-state" id="tab-three"/>

      <div class="tabs flex-tabs">
        <label v-if="tabs.tabOne.show" for="tab-one" id="tab-one-label"
        class="tab">{{tabs.tabOne.title}}</label>
        <label v-if="tabs.tabTwo.show" for="tab-two" id="tab-two-label"
        class="tab">{{tabs.tabTwo.title}}</label>
        <label v-if="tabs.tabThree.show" for="tab-three" id="tab-three-label"
        class="tab">{{tabs.tabThree.title}}</label>

        <div class="mt-4">
          <div v-if="tabs.tabOne.show" id="tab-one-panel" class="panel active">
              <slot name="tab-one"></slot>
          </div>
          <div v-if="tabs.tabTwo.show" id="tab-two-panel" class="panel">
              <slot name="tab-two"></slot>
          </div>
          <div v-if="tabs.tabThree.show" id="tab-three-panel" class="panel">
              <slot name="tab-three"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabView',
  props: {
    tabs: { type: Object },
    selected: { type: String, default: '' },
  },
};
</script>

<style src="./TabView.css"/>
