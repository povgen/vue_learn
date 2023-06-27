<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <slot/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MyDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  }
})
</script>


<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  max-width: 300px;
  padding: 20px;
}
</style>