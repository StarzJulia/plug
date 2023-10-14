window.addEventListener("load", () => {
    const infList = document.getElementById('infinite_list');

    if(infList) {
        const limit = 3;
        let index = 0;

        var articles = document.getElementsByClassName("article");

        const io = new IntersectionObserver(([outer]) => {
            if (!outer.isIntersecting) {
                return;
            }
            showMore();
        });

        const showMore = () => {
            Array.prototype.forEach.call(articles, function(el, ind) {
                if(ind < index + limit) {
                   el.style.display = 'block';
                }
            });

            if(index >= articles.length) {
                io.disconnect();
                return;
            }

            index += limit;
        }

        io.observe(document.getElementById("infinite_scroll-helper--outer"));
    }
})