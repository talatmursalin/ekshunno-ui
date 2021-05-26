<template>
  <header class="site-header">
    <div class="wrapper site-header__wrapper">
      <router-link
        class="brand"
        :to="{name:'Execute'}"
      >
        <img
          src="../../assets/logo.png"
          alt="ekshunno"
        >
      </router-link>

      <nav class="nav">
        <button
          class="nav__toggle"
          aria-expanded="false"
          type="button"
        >
          menu
        </button>
        <ul class="nav__wrapper">
          <li class="nav__item">
            <router-link
              class="nav-link"
              :to="{name:'About'}"
              exact
            >
              About
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SimpleHeader',
};
</script>

<style>
.brand {
  font-weight: bold;
  font-size: 20px;
}

.brand img {
  height: 40px;
  width: auto;
  /* line-height: 60px; */
  margin-top:-5px;
}

.site-header {
  position: relative;
  background-color: #222;
  height: 60px;
}

.site-header__wrapper {
  width: 85%;
  /* padding-top: 1rem; */
  /* padding-bottom: 1rem; */
  margin: 0 auto;
}

.nav__wrapper li{
  text-decoration: none;
  color: #fff;
}

.nav__wrapper .nav__item a {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  padding-top: 15px;
  font-size: 16px;
}

.nav__wrapper .nav__item a:hover{
  color: var(--yellow);
  /* transform: scale(1.02); */
  /* font-size: 19px; */
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
}

.nav__toggle {
  display: none;
}

@media (min-width: 600px) {
  .site-header__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
  }
}
@media (min-width: 600px) {
  .nav__wrapper {
    display: flex;
  }
}

@media (max-width: 599px) {
  .nav__wrapper {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  .nav__wrapper.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 599px) {
  .nav__toggle {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}
</style>
