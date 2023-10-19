window.addEventListener("load", () => {
    // load content on scroll
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
            Array.prototype.forEach.call(articles, (el, ind) => {
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

    // toggle selector
    document.querySelector('div.link h1')?.addEventListener('click', (event) => {
        event.target.parentElement.querySelector('ul.select').classList.toggle('active');
    });
    document.addEventListener('mouseup', (event) => {
        const search = document.querySelector('div.search');
        const link = document.querySelector('div.link');
        const menu__odds = document.querySelector('.menu__odds');

        if(search && !search?.contains(event.target)) {
            search.style.display = 'none';
        }
        if(link && !link?.contains(event.target)) {
            link.querySelector('ul.select').classList.remove('active');
        }
        if(menu__odds && !menu__odds?.contains(event.target)) {
            menu__odds.querySelector('.menu__odds-content').classList.remove('active');
        }
    });

    // switch calculators
    const choices = document.getElementsByClassName('choice')
    Array.prototype.forEach.call(choices, (item, index) => {
        item.addEventListener('click', (event) => {
            if (event.target.className === 'indicator')
                return;
            if (event.target.tagName.toLowerCase() === 'li' || event.target.tagName.toLowerCase() === 'span') {
                var content = item.querySelector('.hidden').innerHTML;
                document.getElementsByClassName('changing_area')[0].innerHTML = content;
                Array.prototype.forEach.call(choices, (item, ind) => {
                    if(ind != index) item.classList.remove('active');
                    else item.classList.add('active');
                })
                resizeIndicator();
            }
        })
        if(index === 0) {
            item.click();
        }
    })

    function resizeIndicator() {
        const choices = document.getElementsByClassName("choices");
        if (!choices.length)
            return;

        var ulWidth = choices[0].offsetWidth;
        const choice = document.querySelector('.choice.active');
        const indicator = document.querySelector('.indicator');

        var left = choice.offsetLeft;
        var width = choice.offsetWidth;
        indicator.style.left = `${left}px`;
        indicator.style.right = `${ulWidth - width - left}px`;
    }

    window.addEventListener("resize", () => {
        resizeIndicator();
    })
})