<template>
  <nav class="custom-container navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        :to="{ name: 'Execute' }"
      >
        <img
          src="../../assets/logo.png"
          alt="ekshunno"
          class="logo"
        >
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="navbarColor02"
        class="collapse navbar-collapse reverse-flex-dir"
      >
        <ul
          class="navbar-nav me-auto"
        >
          <!-- <li class="nav-item">
            <a
              class="nav-link active"
              href="#"
            >Home
              <span class="visually-hidden">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Features</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Pricing</a>
          </li> -->
          <li class="nav-item nav-custom-select">
            <!-- <span><i class="fas fa-palette" /></span> -->
            <!-- <select
              v-model="selected"
              class="nav-item-select"
              @change="themeChanged"
            >
              <option
                v-for="(name, i) in themeNames"
                :key="i"
                :value="name"
              >
                {{ name }}
              </option>
            </select> -->
            <v-selectize
              v-model="selected"
              :options="themeNames"
              :disable-search="true"
              @input="themeChanged"
            />
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'About' }"
              exact
            >
              About
            </router-link>
          </li>
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >Dropdown</a>
            <div class="dropdown-menu">
              <a
                class="dropdown-item"
                href="#"
              >Action</a>
              <a
                class="dropdown-item"
                href="#"
              >Another action</a>
              <a
                class="dropdown-item"
                href="#"
              >Something else here</a>
              <div class="dropdown-divider" />
              <a
                class="dropdown-item"
                href="#"
              >Separated link</a>
            </div>
          </li> -->
        </ul>
        <!-- <form class="d-flex">
          <input
            class="form-control me-sm-2"
            type="text"
            placeholder="Search"
          >
          <button
            class="btn btn-secondary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<script>

import VSelectize from '@isneezy/vue-selectize';

export default {
  name: 'AppHeader',
  components: {
    VSelectize,
  },
  data() {
    return {
      selected: 'slate',
      themeNames: ['mint', 'slate', 'sketchy', 'flaty', 'dumty'],
    };
  },
  created() {
    const theme = localStorage.getItem('sTheme');
    this.selected = this.base64decode(theme);
    this.themeChanged(this.selected);
  },
  methods: {
    themeChanged(themeName) {
      document.body.setAttribute('theme', themeName);
      localStorage.setItem('sTheme', this.base64encode(themeName));
    },
    base64encode(str) {
      return Buffer.from(str).toString('base64');
    },
    base64decode(str) {
      return Buffer.from(str, 'base64').toString('utf-8');
    },
  },
};
</script>

<style lang="css" src="./appheader.css" scoped></style>
