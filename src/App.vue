<template>
  <div class="app">
    <h1>Страница с постами</h1>

    <my-button @click="showDialog" style="margin: 15px 0;">Создать пост</my-button>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list
      @remove="removePost"
      :posts="posts"
    />
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false
    }
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        const responsePromise = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = await responsePromise.json();
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>