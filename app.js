const form = document.querySelector('#searchForm');

form.addEventListener('submit', async (e) => {
    // agar saat button di click, tidak menimbulkan refresh atau lari ke halaman lain
    e.preventDefault();


    // menghapus img sebelumnya 
    document.querySelectorAll('img').forEach((img) => img.remove());
    document.querySelectorAll('h1').forEach((nameElement) => nameElement.remove());
    document.querySelectorAll('h2').forEach((priceList) => priceList.remove());

    // mengambil data dari value input 
    const keyword = form.elements.query.value;

    // query string atau url
    const config = {
        params: { q: `name:${keyword}` },
    };
    const res = await axios.get(`https://api.pokemontcg.io/v2/cards`, config);
    getImages(res.data.data);
    form.elements.query.value = '';

});


const getImages = (cards) => {
    for (let result of cards) {
        if (result.images) {
            const img = document.createElement('img');
            img.src = result.images.small;
            img.alt = result.name;

            const nameElement = document.createElement('h1');
            nameElement.textContent = result.name

            const priceList = document.createElement('h2');
            priceList.textContent = `$${result.cardmarket.prices.averageSellPrice}`;

            
            document.body.append(nameElement);
            document.body.append(priceList);
            document.body.append(img);
        }
    }
};