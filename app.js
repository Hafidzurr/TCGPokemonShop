var apiUrl = 'https://api.pokemontcg.io/v2/cards';
let itemsPerPage = 6;
let currentPage = 1;
let cards = [];

// Fungsi untuk mendapatkan data dari API
async function fetchPokemonCards() {
    try {
        const response = await axios.get(apiUrl);
        cards = response.data.data; // Simpan ke variabel global
        loadCurrentPage(); // menampilkan halaman yang disimpan
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fungsi untuk menampilkan kartu-kartu Pokemon
function displayPokemonCards(cards) {
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    const indexOfLastPage = currentPage * itemsPerPage;
    const indexFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = cards.slice(indexFirstPage, indexOfLastPage);

    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Hapus isi container

    const numbersOfProducts = document.querySelector('.numbersOfProducts li');
    const startItem = indexFirstPage + 1;
    const endItem = Math.min(indexOfLastPage, cards.length);
    numbersOfProducts.innerHTML = `(<span>${startItem}</span> - <span>${endItem}</span> of <span>${cards.length}</span>)`;

    currentItems.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('productCard');

        const imageElement = document.createElement('div');
        imageElement.classList.add('image');
        imageElement.innerHTML = `<img src="${card.images.small}" alt="${card.name}">`;

        const productText = document.createElement('div');
        productText.classList.add('productText');
        productText.innerHTML = `
            <h1 class="title">${card.name}</h1>
            <p class="price">$${card.cardmarket?.prices?.averageSellPrice || 'N/A'}</p>
            <p class="description">You are viewing one of the thousands of items in our 147th Weekly Sunday Auction, spanning all sports and genres, closing on the evening of November 10th 2024. Extended bidding starts at 7:00PM PT.</p>
            <div class="rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
            </div>
            <div class="location">
                <p class="bid"><span class="fa fa-hourglass-half"></span> 4H</p>
                <p class="cityInfo"><span class="fa fa-map-marker"></span> Depok</p>
            </div>
        `;

        cardElement.appendChild(imageElement);
        cardElement.appendChild(productText);
        productContainer.appendChild(cardElement);
    });
}

// Menyimpan currentPage ke LocalStorage
const saveCurrentPage = (page) => {
    localStorage.setItem('currentPage', page);
};

// Memuat currentPage dari LocalStorage
const loadCurrentPage = () => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        currentPage = parseInt(savedPage, 10);
    } else {
        currentPage = 1;
    }
    displayPokemonCards(cards);
};

//pagination

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        saveCurrentPage(currentPage);
        displayPokemonCards(cards);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < Math.ceil(cards.length / itemsPerPage)) {
        currentPage++;
        saveCurrentPage(currentPage);
        displayPokemonCards(cards);
    }
});

// Panggil fungsi untuk fetch dan menampilkan data kartu
fetchPokemonCards();
