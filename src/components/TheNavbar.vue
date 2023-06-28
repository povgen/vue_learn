<template>
  <nav class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__buttons">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 10px;">О сайте</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 10px;">Store</my-button>
      <my-button @click="$router.push('/composition')" style="margin-left: 10px;">Composition</my-button>
    </div>
  </nav>
</template>



<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TheNavbar",
})
</script>


<style scoped>
.navbar {
  height: 50px;
  background: lightgrey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__buttons {
  margin-left: auto;
}
</style>