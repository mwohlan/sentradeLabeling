

export default (root, target,callback) => {
    

    let firstCall = true;
    let observer = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting && !firstCall) {
           callback()
        }
        firstCall = false;
    }, {
        root: document.querySelector(root),
        rootMargin: '400px'
  })

    observer.observe(document.querySelector(target));

    return observer
}