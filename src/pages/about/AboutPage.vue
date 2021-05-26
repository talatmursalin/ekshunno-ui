<template>
  <PageWithWidget>
    <div
      slot="main-page"
      class="about mt-5"
    >
      <section class="sub-section">
        <p>
          <a href="/"><img
            src="../../assets/logo.png"
            alt="ekShunno"
          ></a> is a simple online code editor and executor.
        </p>
      </section>
      <section class="sub-section mt-5 tech">
        <h5>Technologies</h5>
        <a href="https://codemirror.net/"><img
          src="../../assets/codeMirror.png"
          alt="codeMirror"
        ></a>
        <a href="https://www.docker.com/"><img
          src="../../assets/docker.png"
          alt="docker"
        ></a>
        <a href="https://www.djangoproject.com/"><img
          src="../../assets/django.png"
          alt="django"
        ></a>
      </section>
      <section class="sub-section list-padding mt-5">
        <h5>Instructions</h5>
        <ul>
          <li>
            Press <span class="bold">ctrl+e or cmd+e</span> for suggestion
            (it's quite limited so don't be disappointed).
          </li>
          <li>
            Press <span class="bold">ctrl+enter or cmd+enter</span> when cursor is
            in the editor to toggle full screen editing.<br>
            <span class="bold">Esc</span> can also be used to exit full screen editing.
          </li>
          <li>
            Press <span class="bold">ctrl+shift+enter or cmd+shift+enter</span> when cursor
            is in the editor to submit solution.
          </li>
          <li>
            The source code size must be less than <span class="bold">500 KB</span>.
          </li>
          <li>Inputs and outputs size must be less than <span class="bold">256 KB</span>.</li>
          <li>
            Default/Max time limit is <span class="bold">10 sec</span>. Setting time limit
            <span class="bold">0</span> means max time limit.
          </li>
          <li>
            Do <span class="bold">not</span> refresh the page while waiting for result.
            Wait for the loading screen to disappear. <br>If for some reason the submisson
            gets timed out, please re-submit.
          </li>
        </ul>
      </section>
      <section class="subsection list-padding mt-5">
        <h5>Verdicts</h5>
        <ul>
          <li>
            <span class="green bold">OK</span> - Code executed successfully.
          </li>
          <li>
            <span class="red bold">CE</span> - Compile Error.
          </li>
          <li>
            <span class="red bold">RE</span> - Runtime Error.
          </li>
          <li>
            <span class="red bold">TLE</span> - Time Limit Exceeded.
          </li>
          <li>
            <span class="red bold">MLE</span> - Memory Limit Exceeded.
          </li>
          <li>
            <span class="red bold">OLE</span> - Output Limit Exceeded (output size > 256kb).
          </li>
          <li><span class="red bold">UE</span> - Unknown Error (most probably server fault).</li>
          <li>
            <span class="red bold">IE</span> - Input Error
            (most probably input size too big must be &lt;= 256kb)
          </li>
        </ul>
      </section>
    </div>
  </PageWithWidget>
</template>

<script>

import PageWithWidget from '@/components/Layout/PageWithWidget.vue';

export default {
  name: 'ABoutPage',
  components: {
    PageWithWidget,
  },
};
</script>

<style scoped>

.about{
    height: 100vh;
}

.tech h5{
  margin-bottom: 20px;
}

.about p img{
    height: 30px;
}

.tech a{
    padding: 0px 10px;

}

.tech a img{
  height: 40px;
  padding: 0px 20px;
  /* border: 1px solid #eee; */
  /* border-radius: 4px; */
}

.list-padding ul li{
    padding: 10px 0px;
}

ul li {
  display: block;
  position: relative;
    margin-left: 30px;
}

/* ul li:not(:last-child) {
  margin-bottom: 16px;
} */

ul li:before {
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

.bold{
    font-weight: bold;
}

.green{
    color: seagreen;
}

.pink{
color:pink;
}

.violet{
    color:purple;
}
</style>
