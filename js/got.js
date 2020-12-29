const cards = document.querySelector('.cards');
const asideDetails = document.querySelector('.aside__details');
const searchForm = document.querySelector('.aside__form');

async function showImages(url) {
    const response = await fetch(url);
    const result = await response.json();
    const resultLive = result.filter(item => !item.dead);
    resultLive.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    createCardElements(resultLive);
}

function createCardElements(elements) {
    elements.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card__img">
                <img src="../${element.portrait}" alt="${element.name}">
            </div>
            <div class="card__name">${element.name}</div>
        `
        cards.append(card);

        card.addEventListener('click', () => {
            document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
            card.classList.add('active');
            createAsideElement(element);
        })
    });
}

function createAsideElement(element) {

    if (element) {
        asideDetails.innerHTML = `
    <div class="aside__details-img">
    ${(element.picture) ?
                `<img src="../${element.picture}" alt="${element.name}">` :
                `<img src="../assets/image-placeholder.svg">`
            }
    </aside__details-img>
    <div class="aside__details-name-arms">
        <span>${element.name}</span>
        ${(element.house || element.organization) ?
                `<img src="../assets/houses/${element.house ? element.house : element.organization}.png" alt="${element.name}">` :
                `<img src="../assets/image-placeholder.svg" style="width:50px;">`
            }
    </div>
    <div class="aside__details-short">${element.bio}</div>
    `
    } else {
        asideDetails.innerHTML = `
        <p>Character not found</p>
    `
    }

}

showImages('../json/got.json')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = document.querySelector('input').value;

    fetch('../json/got.json')
        .then(response => response.json())
        .then(data => {

            const searchArray = data.filter(item => item.name.toLocaleUpperCase() === search.toLocaleUpperCase());

            if (searchArray) {
                createAsideElement(searchArray[0]);
                document.querySelector('input').value = '';
            }
        })
})