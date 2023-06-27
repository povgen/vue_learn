<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__buttons">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list
      @remove="removePost"
      :posts="sortedPost"
    />
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";

export default {
  components: {MySelect, MyButton, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', title: 'По названию'},
        {value: 'body', title: 'По описанию'},
      ]
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      )
    }
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

.app__buttons {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>