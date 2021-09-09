
export default (root, target,filterTerm,emit) => {
    

 
  let  observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && filterTerm.value === "") {
            emit('scrollReload')
        }
    }, {
        root: document.querySelector(root),
        rootMargin: '400px'
  })

    observer.observe(document.querySelector(target));

    return observer
}