
const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function carregarDetalhes() {

    const container = document.getElementById("details-container");

    if (!id) {
        container.innerHTML = "<h2>ID não informado.</h2>";
        return;
    }

    try {

        const response =
            await fetch(`http://localhost:3000/vinis/${id}`);

        if (!response.ok) {
            throw new Error();
        }

        const vinil = await response.json();

        container.innerHTML = `
            <div class="detalhes">

                <h2 class="text-center">${vinil.titulo}</h2>

                <img
                    src="${vinil.imagem}"
                    class="img-fluid detalhe-img"
                    alt="${vinil.titulo}"
                >

                <p><strong>Artista:</strong> ${vinil.artista}</p>

                <p><strong>Categoria:</strong> ${vinil.categoria}</p>

                <p><strong>Preço:</strong> R$ ${vinil.preco}</p>

                <p>${vinil.descricaoCompleta}</p>

                <p>
                    <strong>Tags:</strong>
                    ${vinil.tags.join(", ")}
                </p>
                    <a id="comprar" class="btn btn-dark">
                    Comprar
                    </a>
            </div>
        `;

    } catch {

        container.innerHTML =
            "<h2>Vinil não encontrado.</h2>";
    }
}

carregarDetalhes();

