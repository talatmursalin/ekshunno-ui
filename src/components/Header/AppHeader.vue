<template>
  <nav class="custom-container navbar navbar-expand-lg navbar-dark bg-dark">
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

export default {
  name: 'AppHeader',
};
</script>

<style scoped>

.logo{
    height: 30px;
    width: auto;
}

.reverse-flex-dir{
    flex-direction: row-reverse;
}

.navbar {
    border: none;
}

.navbar-brand{
    border: none;
}

.custom-container .container-fluid{
    max-width: var(--mx-page-width);
}

</style>
