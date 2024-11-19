var apiUrl = 'https://api.pokemontcg.io/v2/cards';
let currentPage = localStorage.getItem('currentPage') 
  ? parseInt(localStorage.getItem('currentPage'), 10) 
  : 1;  
let pageSize = parseInt(document.querySelector('.dropDownContentPage a.active').textContent, 10);
let cards = [];

// Fungsi untuk mendapatkan data dari API
const fetchPokemonCards = async (page, size) => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                page: page,
                pageSize: size,
            },
        });

        cards = response.data.data;
        totalCards = response.data.totalCount;

        displayPokemonCards(cards);
        localStorage.setItem('currentPage', page);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


// Fungsi untuk menampilkan kartu-kartu Pokemon
function displayPokemonCards(cards) {

    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Hapus isi container

    const numbersOfProducts = document.querySelector('.numbersOfProducts li');
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCards);
    numbersOfProducts.innerHTML = `(<span>${startItem}</span> - <span>${endItem}</span> of <span>${totalCards}</span>)`;

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('productCard');

        const imageElement = document.createElement('div');
        imageElement.classList.add('image');
        imageElement.innerHTML = `<img src='${card.images.small}' alt='${card.name}'>`;

        const productText = document.createElement('div');
        productText.classList.add('productText');
        productText.innerHTML = `
            <h1 class='title'>${card.name}</h1>
            <p class='price'>$${card.cardmarket?.prices?.averageSellPrice || 'N/A'}</p>
            <p class='description'>You are viewing one of the thousands of items in our 147th Weekly Sunday Auction, spanning all sports and genres, closing on the evening of November 10th 2024. Extended bidding starts at 7:00PM PT.</p>
            <div class='rating'>
                <span class='fa fa-star checked'></span>
                <span class='fa fa-star checked'></span>
                <span class='fa fa-star checked'></span>
                <span class='fa fa-star checked'></span>
                <span class='fa fa-star'></span>
            </div>
            <div class='location'>
                <p class='bid'><span class='fa fa-hourglass-half'></span> 4H</p>
                <p class='cityInfo'><span class='fa fa-map-marker'></span> Depok</p>
            </div>
        `;

        cardElement.appendChild(imageElement);
        cardElement.appendChild(productText);
        productContainer.appendChild(cardElement);
    });
}

// Fungsi untuk memperbarui kelas active pada ukuran halaman
function updatePageSizeActive(size) {
    document.querySelectorAll('.dropDownContentPage a').forEach(link => {
        link.classList.remove('active');
    });

    const activeElement = document.getElementById(`size${size}`);
    if (activeElement) {
        activeElement.classList.add('active');
    }
}

document.getElementById('size10').addEventListener('click', (e) => {
    e.preventDefault();
    pageSize = 10;
    currentPage = 1; 
    updatePageSizeActive(pageSize);
    fetchPokemonCards(currentPage, pageSize);
});

document.getElementById('size20').addEventListener('click', (e) => {
    e.preventDefault();
    pageSize = 20;
    currentPage = 1; 
    updatePageSizeActive(pageSize);
    fetchPokemonCards(currentPage, pageSize);
});

document.getElementById('size30').addEventListener('click', (e) => {
    e.preventDefault();
    pageSize = 30;
    currentPage = 1; 
    updatePageSizeActive(pageSize);
    fetchPokemonCards(currentPage, pageSize);
});


updatePageSizeActive(pageSize);

//pagination

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPokemonCards(currentPage, pageSize);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
        currentPage++;
        fetchPokemonCards(currentPage, pageSize);
});

fetchPokemonCards(currentPage, pageSize);
