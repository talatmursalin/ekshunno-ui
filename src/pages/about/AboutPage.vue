<template>
  <DefaultPageLayout class="p-5">
    <template slot="main-page">
      <section class="about">
        <p>
          <a href="/">ekshunno</a> is a simple open source online code editor and executor.
        </p>
      </section>
      <section class="sub-section tech">
        <h5>Technologies</h5>
        <a href="https://codemirror.net/"><img
          src="../../assets/codeMirror.png"
          alt="codeMirror"
        ></a>
        <a href="https://vuejs.org/"><img
          src="../../assets/vue.png"
          alt="vue"
        ></a>
        <a href="https://nodejs.org/en/"><img
          src="../../assets/node.png"
          alt="nodejs"
        ></a>
        <a href="https://www.docker.com/"><img
          src="../../assets/docker.png"
          alt="docker"
        ></a>
        <a href="https://golang.org/"><img
          src="../../assets/golang.svg"
          alt="golang"
        ></a>
        <a href="https://www.rabbitmq.com/"><img
          src="../../assets/rabbitmq.svg"
          alt="rabbitmq"
        ></a>
      </section>
      <section class="sub-section rounded-list">
        <h5>Instructions</h5>
        <ul>
          <li>
            Press <strong>ctrl+e or cmd+e</strong> for suggestion
            (it's quite limited so don't be disappointed).
          </li>
          <li>
            Press <strong>ctrl+enter or cmd+enter</strong> when cursor is
            in the editor to toggle full screen editing.<br>
            <strong>Esc</strong> can also be used to exit full screen editing.
          </li>
          <li>
            Press <strong>ctrl+shift+enter or cmd+shift+enter</strong> when cursor
            is in the editor to submit solution.
          </li>
          <li>
            Both request(input size + source size) and Output size
            must be less than <strong>256 KB</strong>.
          </li>
          <li>
            Default/Max time limit is <strong>3 sec</strong>.
          </li>
          <li>
            Do <strong>not</strong> refresh the page while waiting for result.
            Wait for the loading screen to disappear. <br>If for some reason the submisson
            gets timed out, please re-submit.
          </li>
        </ul>
      </section>
      <section class="sub-section rounded-list">
        <h5>Verdicts</h5>
        <ul>
          <li>
            <strong class="green">OK</strong> - Code executed successfully.
          </li>
          <li>
            <strong class="red">CE</strong> - Compile Error.
          </li>
          <li>
            <strong class="red">RE</strong> - Runtime Error.
          </li>
          <li>
            <strong class="red">TLE</strong> - Time Limit Exceeded.
          </li>
          <li>
            <strong class="red">MLE</strong> - Memory Limit Exceeded.
          </li>
          <li>
            <strong class="red">OLE</strong> - Output Limit Exceeded (output size > 256kb).
          </li>
          <li>
            <strong class="red">IS</strong> - Invalid submission
            (missing or corrupted submission params)
          </li>
          <li><strong class="red">UE</strong> - Unknown Error (most probably server fault).</li>
          <li>
            <strong class="red">IE</strong> - Internal Error
          </li>
        </ul>
      </section>
      <section class="sub-section rounded-list">
        <h5>Bug Report</h5>
        <p>
          The project is still under development and tends to have several bugs.
          Please feel free to report <a href="https://github.com/talatmursalin/ekshunno-ui/issues">here</a> if you found any. TIA.
        </p>
      </section>
    </template>
  </DefaultPageLayout>
</template>

<script>

import DefaultPageLayout from '@/components/Layout/DefaultPageLayout.vue';

export default {
  name: 'ABoutPage',
  components: {
    DefaultPageLayout,
  },
};
</script>

<style scoped>

.sub-section{
  margin-top: 50px;
}

.sub-section:first-child{
  margin-top: 0px;
}

.about p a{
  text-decoration: none;
  color: var(--cyan);
  font-weight: bold;
  font-size: 20px;
}

.about p a:hover{
  color: var(--purple);
  transition: color 1s;
}

.tech h5{
  margin-bottom: 20px;
}

.tech a{
    padding: 0px 10px;

}

.tech a img{
  max-width: 120px;
  max-height: 35px;
  margin: 10px;
  /* padding: 20px; */
  /* border: 1px solid #eee; */
  /* border-radius: 4px; */
}

.rounded-list ul li{
  padding: 10px 0px;
  display: block;
  position: relative;
  margin-left: 30px;
}

/* ul li:not(:last-child) {
  margin-bottom: 16px;
} */

.rounded-list ul li:before {
  content: "";
  position: absolute;
  top: 1.2em;
  left: -30px;
  margin-top: -2px;
  background:gray;
  height: 12px;
  width: 12px;
  border-radius: 50%;
}

.green{
    color: var(--success);
}

.pink{
color:pink;
}

.violet{
    color:purple;
}

@media only screen and (max-width: 700px) {
  .sub-section{
    margin-top: 30px;
  }
}
</style>
