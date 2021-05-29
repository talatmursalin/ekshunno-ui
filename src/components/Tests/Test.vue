<template>
  <div class="test">
    <div class="noborderinput">
      <b-form
        class="d-sm-down-none ml-5"
        inline
      >
        <b-form-group>
          <b-input-group class="input-group input-group-no-border">
            <template v-slot:prepend>
              <b-input-group-text>
                <i class="la la-search" />
              </b-input-group-text>
            </template>
            <b-form-input
              id="search-input"
              placeholder="Search Dashboard"
            />
          </b-input-group>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
};
</script>

<style>
.test {
  width: 100%;
  height: 400px;
  background: #fff;
}

/* .noborderinput .form-group .input-group-prepend {
    margin-right: 0;
}

.noborderinput .form-group input, .noborderinput .form-group input:focus {
    background: rgba(0, 0, 0, 0.1);
    border: none;
}

.noborderinput .form-group .input-group-text {
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color ease-in-out 0.15s;
} */

</style>
