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
<!--    <div class="observer" v-intersection="loadMorePosts">Загрузка...</div>-->

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
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', title: 'По названию'},
        {value: 'body', title: 'По описанию'},
      ],
    }
  },
  setup(props) {
    const {posts, page, totalPages} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts,
      page,
      totalPages,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
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