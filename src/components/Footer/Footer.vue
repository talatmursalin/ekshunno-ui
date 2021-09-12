<template>
  <footer class="contentFooter">
    crafted with <span class="red">&hearts;</span> by
    <a
      href="https://github.com/talatmursalin"
      rel="nofollow noopener noreferrer"
      target="_blank"
    >Mursalin</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.contentFooter {
    position:absolute;
    bottom:0;
    width:100%;
    height:60px;
    color: #6c757d;
    line-height: 60px;
    padding-left: 15px;
}

.red{
  color: red
}

.contentFooter a{
  color: var(--info);
}

.contentFooter a:hover{
  color: var(--info);
  filter: brightness(80%);
}

</style>
