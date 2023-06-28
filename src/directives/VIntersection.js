export default {
  mounted(el, binding) {
    binding.value
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) binding.value()
    }, {
      rootMargin: '0px',
      threshold: 1.0
    })

    observer.observe(el)
  }
}