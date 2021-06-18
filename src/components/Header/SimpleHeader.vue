<template>
  <div class="navbar">
    <div class="navbar-wrapper">
      <router-link
        class="brand"
        :to="{name:'Execute'}"
      >
        <img
          src="../../assets/logo.png"
          alt="ekshunno"
          class="logo"
        >
      </router-link>
      <nav>
        <ul :class="{showMenu:dropDown}">
          <li>
            <router-link
              class="nav-link"
              :to="{name:'About'}"
              exact
              @click.native="hideMenu"
            >
              About
            </router-link>
          </li>
        </ul>
      </nav>
      <img
        src="../../assets/burger2.svg"
        alt="menu"
        class="menu-icon"
        @click="showMenu"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'SimpleHeader',
  data() {
    return {
      dropDown: false,
    };
  },
  methods: {
    showMenu() {
      this.dropDown = !this.dropDown;
    },
    hideMenu() {
      this.dropDown = false;
    },
  },
};
</script>

<style lang="css" scoped>

.navbar{
    width: 100%;
    align-items: center;
    background: #28282B;
}

.navbar-wrapper{
    width: 85%;
    margin: 0 auto;
    display: flex;
    height: 100%;
}

.logo{
    width: 85px;
    cursor: pointer;
    margin: 10px 0;
}

.menu-icon{
    width:40px;
    height: auto;
    cursor: pointer;
    display: none;
}

nav{
    flex: 1;
    text-align: right;
}

nav ul{
    margin: 0px;
    margin-top:12px;
}

nav ul li{
    list-style: none;
    display: inline-block;
    margin-right: 30px;
}

nav ul li a{
    text-decoration: none;
    color: white;
    font-size: 14px;
}

nav ul li a:hover{
    color: var(--yellow);
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
}

@media only screen and (max-width:700px) {
    .menu-icon{
        display: block;
    }

    .showMenu{
        transition: all 0.5s ease;
        height: 60px;
        border-radius: 4px;
    }

    nav ul{
        width: 100%;
        position: absolute;
        top: 45px;
        right: 0;
        z-index: 5;
        background: #28282B;
        /* display: none; */
        height: 0px;
        transition: all 0.5s ease;
    }

    nav ul li{
        display: block;
        margin-top: 10px;
        margin-bottom: 10px;
    }

}

</style>
