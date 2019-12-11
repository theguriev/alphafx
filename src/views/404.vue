<template>
  <div class="form-page flex items-center justify-center">
    <main class="center">
      <h1>404</h1>
      <h2 class="mb2">The link you clicked may be broken or the page may have been removed.</h2>
      <h3>Visit the <el-link href="/" :underline="false" target="_blank">home page</el-link> or <el-link href="mailto:eg@beagl.in" :underline="false" target="_blank">contact me</el-link></h3>
    </main>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
h1{
  font-size: 144px;
}

.form-page{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  color: var(--white);
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  animation: gradientBG 15s ease infinite;

  main{
    width: 500px;
  }
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
