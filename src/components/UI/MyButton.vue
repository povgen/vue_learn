<template>
  <button class="btn">
    <slot/>
  </button>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MyButton"
})
</script>


<style scoped>

.btn {
  cursor: pointer;
  padding: 10px 15px;
  border: 1px solid teal;
  color: teal;
  background: none;
  border-radius: 3px;
}

.btn:hover {
  background: whitesmoke;
}
</style>