<template>
  <form @submit.prevent>
    <h2>Создание поста</h2>
    <my-input
      v-model="post.title"
      placeholder="Заголовок"
      v-focus
    />
    <my-input
      v-model="post.body"
      placeholder="Описание"
    />
    <my-button
      @click="createPost"
      style="align-self: flex-end; margin-top: 15px;"
    >
      Создать пост
    </my-button>
  </form>
</template>

<script>


export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)

      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}

</style>