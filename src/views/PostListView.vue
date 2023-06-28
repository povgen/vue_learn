<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
    />
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
      :posts="sortedAndSearchedPosts"
    />
    <div class="observer" v-intersection="loadMorePosts">Загрузка...</div>

    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--        v-for="pageNum in totalPage"-->
    <!--        :key="pageNum"-->
    <!--        class="page"-->
    <!--        :class="{-->
    <!--          'current-page':pageNum === page-->
    <!--        }"-->
    <!--        @click="page = pageNum"-->
    <!--      >{{pageNum}}</div>-->
    <!--    </div>-->
  </div>
</template>


<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

export default {
  components: {PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        {value: 'title', title: 'По названию'},
        {value: 'body', title: 'По описанию'},
      ],
      searchQuery: ''
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
    },
    sortedAndSearchedPosts() {
      return this.sortedPost.filter(el => el.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page(newValue) {
    //   this.fetchPosts()
    // }
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
        const responsePromise = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`)
        const total = responsePromise.headers.get('x-total-count')
        this.totalPage = Math.ceil(total / this.limit)

        this.posts = await responsePromise.json();

      } catch (e) {
        console.log(e)
      }
    },
    async loadMorePosts() {
      if (this.page < this.totalPage) {
        try {
          this.page += 1
          const responsePromise = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`)
          const total = responsePromise.headers.get('x-total-count')
          this.totalPage = Math.ceil(total / this.limit)
          this.posts.push(...await responsePromise.json())

        } catch (e) {
          console.log(e)
        }
      }

    }
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