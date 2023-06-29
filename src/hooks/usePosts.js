import {onMounted, ref} from "vue";

export function usePosts(limit) {
  const posts = ref([])
  const page = ref(0)
  const totalPages = ref(0)

  async function fetching() {
    try {
      const responsePromise = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page.value}`)
      const total = responsePromise.headers.get('x-total-count')
      totalPages.value = Math.ceil(total / limit)

      posts.value = await responsePromise.json();

    } catch (e) {
      console.log(e)
    }
  }

  onMounted(fetching)

  return {
    posts, page, totalPages
  }
}