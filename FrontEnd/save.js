fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        const listeCategories = document.querySelectorAll('.list-category li');
        const galerie = document.querySelector('.gallery');

        listeCategories.forEach(categorie => {
            categorie.addEventListener('click', () => {
                listeCategories.forEach(li => li.classList.remove('active'));
                categorie.classList.add('active');
                const categorieSelectionnee = categorie.innerText;
                galerie.innerHTML = '';

                data.forEach(objet => {
                    if (categorieSelectionnee === 'Tous' ||
                        (categorieSelectionnee === 'Objets' && objet.category.name === 'Objets') ||
                        (categorieSelectionnee === 'Appartements' && objet.category.name === 'Appartements') ||
                        (categorieSelectionnee === 'Hotels & restaurants' && objet.category.name === 'Hotels & restaurants')
                    ) {
                        const figure = document.createElement('figure');
                        const img = document.createElement('img');
                        const figcaption = document.createElement('figcaption')

                        img.src = objet.imageUrl;
                        img.alt = objet.title;
                        figcaption.innerText = objet.title;

                        figure.appendChild(img);
                        figure.appendChild(figcaption);

                        galerie.appendChild(figure);
                        console.log("test")
                    }
                });
            });
        });
    })
    .catch(error => console.error(error));