
const API_URL = "http://localhost:3000/vinis";

async function fetchItems() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar vinis");
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        return [];
    }
}

function createCard(item) {

    const card = document.createElement("article");

    card.className = "col-md-3 col-sm-6 sub-destaque";

    card.innerHTML = `
        <h4 class="text-center">${item.titulo}</h4>

        <img
            class="img-fluid"
            src="${item.imagem}"
            alt="${item.titulo}"
        >

        <p class="text-center">
            <strong>${item.artista}</strong>
        </p>

        <p>${item.descricaoCurta}</p>

        <p>
            <strong>Categoria:</strong>
            ${item.categoria}
        </p>

        <p>
            <strong>Preço:</strong>
            R$ ${item.preco}
        </p>

        <a
            href="detalhes.html?id=${item.id}"
            class="btn btn-dark w-100"
        >
            Ver detalhes
        </a>
    `;

    return card;
}

function renderCards(items) {

    const container = document.getElementById("lista-vinis");

    container.innerHTML = "";
    const categorias = [
        "MPB",
        "Samba",
        "Rock Nacional",
        "Forró"
    ];
        categorias.forEach(categoria => {

        const titulo = document.createElement("h2");
        titulo.className = "text-center mt-5";
        titulo.textContent = categoria;

        container.appendChild(titulo);

        const row = document.createElement("div");
        row.className = "row justify-content-center";

        const itensCategoria = items.filter(
            item => item.categoria === categoria
        );

        itensCategoria.forEach(item => {
            row.appendChild(createCard(item));
        });

        container.appendChild(row);
    });
}

async function init() {

    const items = await fetchItems();

    renderCards(items);
}

init();

