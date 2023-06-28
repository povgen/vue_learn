<template>
    <h1>Это страница с постом ID = {{ $route.params.id }}</h1>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "PostView"
})
</script>

<style scoped>

</style>