<template>
  <div class="base">
    <div class="box">
      <div>close !</div>
      <p>
        <span>error 404 !</span> sorry page isn't found for one of the reformes
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>

<style>

.base {
  min-height: 1080px;
  background: sandybrown;
  margin: 0;
  padding: 20px;
}

.box {
  text-align: center;
  position: relative;
}

.box div {
  width: 250px;
  height: 80px;
  line-height: 80px;
  color: #ffc900;
  background-color: #fff;
  font-size: 280%;
  position: absolute;
  top: 450px;
  left: 40%;
  text-transform: capitalize;
  animation: moving 8s linear infinite;
  -webkit-animation: moving 8s linear infinite;
  -moz-animation: moving 8s linear infinite;
  -o-animation: moving 8s linear infinite;

  transform-origin: 50% -400%;
  -webkittransform-origin: 50% -400%;
  -moz-transform-origin: 50% -400%;
  -o-transform-origin: 50% -400%;
}

.box div:before {
  content: "";
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  display: block;
  position: absolute;
  left: 45%;
  top: -350px;
}

.box div:after {
  content: "";
  width: 3px;
  height: 335px;
  background-color: #fff;
  display: block;
  position: absolute;
  left: 50%;
  top: -330px;
}

.box p {
  position: absolute;
  top: 560px;
  left: 38%;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  width: 300px;
}

.box p span {
  display: block;
  font-size: 300%;
}

@keyframes moving {
  0%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
}

@-webkit-keyframes moving {
  0%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
}

@-moz-keyframes moving {
  0%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
}

@-o-keyframes moving {
  0%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
}
</style>
