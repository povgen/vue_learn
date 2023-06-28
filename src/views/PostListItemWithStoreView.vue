<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class="app__buttons">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list
      @remove="removePost"
      :posts="sortedAndSearchedPosts"
    />
    <!--    <div class="observer" v-intersection="loadMorePosts">Загрузка...</div>-->
  </div>
</template>


<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      selectedSort: state => state.post.selectedSort,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery
    }),
    ...mapGetters({
      sortedPost: 'post/sortedPost',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {

    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: "post/setSelectedSort"
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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
  }
}
</script>


<style>
.app__buttons {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  cursor: pointer;
  border: 1px solid black;
  padding: 10px;
}


.page:hover {
  background: whitesmoke;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: whitesmoke;
  text-align: center;
  padding: 5px;
}
</style>