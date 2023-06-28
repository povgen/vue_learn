export const postModule = {
  state() {
    return {
      posts: [],
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', title: 'По названию'},
        {value: 'body', title: 'По описанию'},
      ],
      searchQuery: ''
    }
  },
  getters: {
    sortedPost(state) {
      return [...state.posts].sort((a, b) =>
        a[state.selectedSort]?.localeCompare(b[state.selectedSort])
      )
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPost.filter(el => el.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    setPosts: (state, posts) => state.posts = posts,
    setPage: (state, page) => state.page = page,
    setSelectedSort: (state, selectedSort) => state.selectedSort = selectedSort,
    setTotalPages: (state, totalPages) => state.totalPages = totalPages,
    setSearchQuery: (state, searchQuery) => state.searchQuery = searchQuery,
  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        const url = `https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`
        const response = await fetch(url)
        const total = response.headers.get('x-total-count')

        commit('setTotalPages', Math.ceil(total / state.limit))

        commit('setPosts', await response.json())

      } catch (e) {
        console.log(e)
      }
    },
    async loadMorePosts({state, commit}) {
      if (state.page < state.totalPage) {
        try {
          commit('setPage', state.page + 1)

          const url = `https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`
          const response = await fetch(url)

          const total = response.headers.get('x-total-count')

          commit('setTotalPages', Math.ceil(total / state.limit))

          commit('setPosts', [...state.posts, ...await response.json()])


        } catch (e) {
          console.log(e)
        }
      }

    }
  },
  namespaced: true

}