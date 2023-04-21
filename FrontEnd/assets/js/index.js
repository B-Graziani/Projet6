document.addEventListener("DOMContentLoaded", function (event) {

    async function init() {
        let getinfo = await getinfoworks();
        this.getinfo = getinfo;
        displaygallery(getinfo);

        let getcate = await getinfocate();
        displaycate(getcate);

        filter();
    }

    init();

    function getinfoworks() {
        return fetch('http://localhost:5678/api/works')
            .then(response => { return response.json(); })
            .catch(error => console.error(error));
    }

    function getinfocate() {
        return fetch('http://localhost:5678/api/categories')
            .then(response => { return response.json(); })
            .catch(error => console.error(error));
    }

    function displaygallery(getinfo) {

        let gallery = document.querySelector(".gallery");

        this.gallery = gallery;
        for (const info of getinfo) {
            gallery.insertAdjacentHTML(
                "beforeend",
                `
                <figure>
                    <img src="${info.imageUrl}" alt="${info.title}">
                    <figcaption>${info.title}</figcaption>
                </figure>
                `
            )
        }
    }

    function displaycate(getcate) {
        let listecate = document.querySelector(".list-category");
        for (const cate of getcate) {
            listecate.insertAdjacentHTML(
                "beforeend",
                `
                <li>${cate.name}</li>
                `
            )
        }
    }

    function filter() {
        let allfilter = document.querySelectorAll(".list-category li");

        allfilter.forEach(function (li) {
            li.addEventListener("click", function (e) {
                allfilter.forEach(li => li.classList.remove('active'));
                li.classList.add('active');

                let valeurcliked = e.target.innerText;
                gallery.innerHTML = " ";
                if (valeurcliked === "Tous") {
                    displaygallery(getinfo);
                } else {
                    let getfiltredinfo = getinfo.filter(info => info.category.name == valeurcliked);
                    displaygallery(getfiltredinfo);
                }

            })
        })
    }
})