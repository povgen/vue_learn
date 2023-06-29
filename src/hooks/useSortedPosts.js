import {computed, ref} from "vue";

export default function useSortedPosts(posts) {
  const selectedSort = ref('')

  const sortedPosts =
    computed(() => posts.value.toSorted((a, b) =>
      a[selectedSort.value]?.localeCompare(b[selectedSort.value])
    ))

  return {
    selectedSort, sortedPosts
  }

}