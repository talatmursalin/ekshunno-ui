<template>
  <div class="noborderinput">
    <b-form-group>
      <slot />
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'NoborderInput',
};
</script>

<style>
.noborderinput .form-group .input-group-prepend {
  margin-right: 0;
}

.noborderinput .input-group-append {
  margin-left: 0px;
}

.noborderinput .form-group input,
.noborderinput .form-group select,
.noborderinput .form-group input:focus {
  /* background: rgba(0, 0, 0, 0.1); */
  background-color: var(--inputBackground);
  border: none;
  box-shadow: none;
}

.noborderinput .form-group input,
.noborderinput .form-group select {
  text-align: right;
}

.noborderinput .form-group .input-group-text {
  border: none;
  /* background-color: rgba(0, 0, 0, 0.1); */
  background-color:var(--inputBackground);
  transition: background-color ease-in-out 0.15s;
}

.bv-no-focus-ring {
  display: flex;
}

/* specific*/

.noborderinput .first .input-group-append {
  border-right: 1px solid #bbb;
}

.noborderinput .first .input-group-append .input-group-text {
  border-radius: 0%;
}

.noborderinput .middle .input-group-prepend .input-group-text {
  border-radius: 0%;
}

.noborderinput .middle .input-group-append .input-group-text {
  border-radius: 0%;
}

.noborderinput .middle .input-group-append  {
  border-right: 1px solid #bbb;
}

.noborderinput .last .input-group-prepend .input-group-text {
  border-radius: 0%;
}

/*specific-lg*/

</style>
