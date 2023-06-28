<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post_list">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <div v-else>
    <h3 style="color: red;">Список постов пуст </h3>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post_list-item {
  display: inline-block;
  margin-right: 10px;
}

.post_list-enter-active,
.post_list-leave-active {
  transition: all .3s ease;
}

.post_list-enter-from,
.post_list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post_list-move {
  transition: transform 0.4s ease;
}
</style>