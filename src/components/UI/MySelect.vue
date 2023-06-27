<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
    >
      {{ option.title }}
    </option>
  </select>
</template>


<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MySelect",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
})
</script>


<style scoped>

</style>