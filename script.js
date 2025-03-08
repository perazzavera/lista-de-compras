<<<<<<< HEAD
const botaoQuantidade = document.querySelector(".btn-quantidade");
const listaUnidades = document.querySelector(".lista-unidades");
const flechaQuantidade = document.querySelector(".flecha-quantidade");
const inputQuantidade = document.getElementById("quantidade");

const listaCategorias = document.querySelector(".lista-categorias");
const botaoCategorias = document.querySelector(".btn-categoria");
const flechaCategoria = document.querySelector(".flecha-categoria");

const listaContainer = document.querySelector(".lista-de-itens");
const inputItem = document.getElementById("item");

const botaoSalvarAlteracoes = document.querySelector(".btn-salvar");
const botaoAdicionarItem = document.querySelector(".btn-adicionar");

// Variáveis para armazenar os valores selecionados
let itemUnidade = "";
let itemCategoria = "";
let itemIndexParaEdicao = -1; // Armazena o índice do item que está sendo editado

const categorias = {
  Padaria: { corFundo: "#211E12", corTexto: "#BB9F3A" },
  Fruta: { corFundo: "#261A17", corTexto: "#E07B67" },
  Legume: { corFundo: "#1C2015", corTexto: "#8CAD51" },
  Bebida: { corFundo: "#1A1D23", corTexto: "#7B94CB" },
  Carne: { corFundo: "#251622", corTexto: "#DB5BBF" },
  Higiene: { corFundo: "#41200C", corTexto: "#FF873C" },
  Pets: { corFundo: "#4E562D", corTexto: "#CDEE47" },
  Café: { corFundo: "#4D2A15", corTexto: "#9A4B1A" },
  Graos: { corFundo: "#9A9494", corTexto: "#E0D9D9" },
  Frios: { corFundo: "#644242", corTexto: "#D68585" },
};

// Função para alterar a cor da borda conforme foco
function alterarBorda(event, cor) {
  event.target.style.border = `1px solid ${cor}`;
}

const inputs = [inputQuantidade, inputItem];
inputs.forEach((input) => {
  input.addEventListener("focus", (event) => alterarBorda(event, "#A881E6"));
  input.addEventListener("blur", (event) => alterarBorda(event, "#252529"));
});

const botoes = [botaoQuantidade, botaoCategorias];
botoes.forEach((botao) => {
  botao.addEventListener("focus", (event) => alterarBorda(event, "#A881E6"));
  botao.addEventListener("blur", (event) => alterarBorda(event, "#252529"));
});

// Função para alternar a visibilidade e a imagem da setinha
function alternarVisibilidade(botao, lista, flecha) {
  botao.addEventListener("click", (event) => {
    event.preventDefault();
    const oculto = lista.classList.toggle("oculto");
    flecha.src = oculto ? "./assets/ver-lista.svg" : "./assets/ver-menos.svg";
  });
}

// Aplicando a função para os dois casos
alternarVisibilidade(botaoQuantidade, listaUnidades, flechaQuantidade);
alternarVisibilidade(botaoCategorias, listaCategorias, flechaCategoria);

// Selecionar a unidade de medida
listaUnidades.addEventListener("click", (event) => {
  const unidadeSelecionada = event.target.closest(".item-unidade");
  if (!unidadeSelecionada) return;

  itemUnidade = unidadeSelecionada.textContent.trim();
  botaoQuantidade.querySelector(".texto-unidade").textContent =
    unidadeSelecionada.textContent.trim();
  listaUnidades.classList.add("oculto");
  flechaQuantidade.src = "./assets/ver-lista.svg";
});

// Selecionar a categoria
listaCategorias.addEventListener("click", (event) => {
  const categoriaSelecionada = event.target.closest(".item-categoria");
  if (!categoriaSelecionada) return;

  itemCategoria = categoriaSelecionada.textContent.trim();
  botaoCategorias.querySelector(".texto-categoria").textContent =
    categoriaSelecionada.textContent.trim();
  listaCategorias.classList.add("oculto");
  flechaCategoria.src = "./assets/ver-lista.svg";
});

// Função para obter itens do localStorage
function obterItens() {
  return JSON.parse(localStorage.getItem("itens")) || [];
}

// Função para salvar itens no localStorage
function salvarItens(itens) {
  localStorage.setItem("itens", JSON.stringify(itens));
}

// Função para limpar os campos e restaurar botões
function limparCampos() {
  document.getElementById("item").value = "";
  document.getElementById("quantidade").value = "";
  itemUnidade = "";
  itemCategoria = "";

  // Restaurar os botões para o estado inicial
  botaoQuantidade.querySelector(".texto-unidade").textContent = "UN.";
  botaoCategorias.querySelector(".texto-categoria").textContent = "Selecione";
}

// Adicionar novo item na lista
botaoAdicionarItem.addEventListener("click", (event) => {
  event.preventDefault();

  const itemNome = document.getElementById("item").value;
  const itemQuantidade = document.getElementById("quantidade").value;

  if (!itemNome || !itemQuantidade || !itemUnidade || !itemCategoria) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Criar um novo item
  const novoItem = {
    nome: itemNome,
    quantidade: itemQuantidade,
    unidade: itemUnidade,
    categoria: itemCategoria,
    checked: false, // Inicialmente, o item não está marcado
  };

  // Obter a lista de itens e adicionar o novo item
  const listaItens = obterItens();
  listaItens.push(novoItem);

  // Salvar a lista de itens no LocalStorage
  salvarItens(listaItens);

  // Atualizar a lista na interface
  atualizarLista();

  // Limpar os campos
  limparCampos();
});

// Função para atualizar a lista de itens na interface
function atualizarLista() {
  const listaContainer = document.querySelector(".lista-de-itens");
  listaContainer.innerHTML = ""; // Limpar a lista atual

  // Obter a lista de itens atualizada do localStorage
  const listaItens = obterItens();

  // Reordenar a lista colocando os itens checkados no final
  const listaOrdenada = listaItens.sort((a, b) => a.checked - b.checked);

  // Adicionar cada item à lista
  listaOrdenada.forEach((item, index) => {
    const { categoria, nome, quantidade, unidade, checked = false } = item;
    const { corFundo, corTexto } = categorias[categoria] || {
      corFundo: "#FFFFFF",
      corTexto: "#000000",
    };

    // Criar o item da lista
    const li = document.createElement("li");
    li.classList.add("novo-item");

    li.innerHTML = `
            <div class="novo-item-descricao">
                <input type="checkbox" id="checkbox-${index}" class="input-novo-item" ${
      checked ? "checked" : ""
    }>
                <label class="label-checkbox" for="checkbox-${index}"></label>
                <span class="descricao-texto">
                    <h2 class="descricao-texto-titulo">${nome}</h2>
                    <p>${quantidade} ${unidade}</p>
                </span>
            </div>
            <div class="categoria-container">
                <div class="novo-item-categoria" style="background-color: ${corFundo}">
                    <img src="./assets/${categoria}.svg" alt="icone ${categoria}">
                    <p class="categoria-nome" style="font-size: 12px; font-weight: 600; color: ${corTexto}">${categoria}</p>
                </div>
                <button class="botao-menu"><img src="./assets/menu-editar.svg" alt="menu-edicao"></button>
            </div>
            <div class="menu-editar oculto">
                <button><img src="./assets/editar.svg" alt="editar" class="editar-item"></button>
                <button><img src="./assets/deletar.svg" alt="deletar" class="deletar-item"></button>
            </div>
        `;

    // Adicionar o item à lista
    listaContainer.appendChild(li);

    // Adicionar o evento de clique para o ícone de menu
    const botaoMenu = li.querySelector(".botao-menu");
    const listaMenu = li.querySelector(".menu-editar");
    botaoMenu.addEventListener("click", (event) => {
      listaMenu.classList.toggle("oculto");
    });

    // Adicionar o evento de clique para o botão de editar
    const botoesEditar = li.querySelectorAll(".editar-item");
    botoesEditar.forEach((botao) => {
      botao.addEventListener("click", (event) => {
        const itemLi = event.target.closest(".novo-item");
        const descricaoTexto = itemLi.querySelector(".descricao-texto");
        const nomeItem = descricaoTexto.querySelector("h2");
        const quantidadeItem = descricaoTexto.querySelector("p");
        const categoriaItem = itemLi
          .querySelector(".categoria-nome")
          .textContent.trim();

        // Verificar se os valores não estão vazios
        if (
          !nomeItem.textContent ||
          !quantidadeItem.textContent ||
          !categoriaItem
        ) {
          alert("Erro: Item sem nome, quantidade ou categoria.");
          return;
        }

        // Dividir a quantidade e a unidade
        const partesQuantidade = quantidadeItem.textContent.split(" ");
        if (partesQuantidade.length < 2) {
          alert("Erro: Formato de quantidade inválido.");
          return;
        }

        // Preencher os campos de edição
        inputItem.value = nomeItem.textContent; // Preenche o nome no input
        inputQuantidade.value = partesQuantidade[0]; // Preenche a quantidade no input
        itemUnidade = partesQuantidade[1]; // Armazena a unidade no item unidade

        // Atualizar o botão de unidade
        botaoQuantidade.querySelector(".texto-unidade").textContent =
          itemUnidade;

        // Atualizar o botão de categoria
        botaoCategorias.querySelector(".texto-categoria").textContent =
          categoriaItem;

        // Atualizar o índice do item para edição
        itemIndexParaEdicao = Array.from(itemLi.parentNode.children).indexOf(
          itemLi
        );

        // Exibir o botão salvar e ocultar o botão adicionar
        botaoSalvarAlteracoes.classList.remove("oculto");
        botaoAdicionarItem.classList.add("oculto");

        // Depuração
        console.log("Nome do item:", nomeItem.textContent);
        console.log("Quantidade do item:", quantidadeItem.textContent);
        console.log("Unidade do item:", itemUnidade);
        console.log("Categoria do item:", categoriaItem);
        console.log("Índice do item para edição:", itemIndexParaEdicao);
      });
    });

    // Adicionar o evento de clique para o botão de deletar
    const botoesDeletar = li.querySelectorAll(".deletar-item");
    botoesDeletar.forEach((botao) => {
      botao.addEventListener("click", (event) => {
        // Confirmar se o usuário realmente quer deletar o item
        const confirmacao = confirm(
          "Tem certeza que deseja excluir este item?"
        );
        if (!confirmacao) return;

        // Obter a lista de itens do localStorage
        const listaItens = obterItens();

        // Remover o item da lista
        listaItens.splice(index, 1);

        // Salvar a lista atualizada no localStorage
        salvarItens(listaItens);

        // Atualizar a interface
        atualizarLista();

        // Fechar o menu de edição
        listaMenu.classList.add("oculto");
      });
    });

    // Manipulação do estilo dependendo do estado do checkbox
    const nomeItem = li.querySelector(".descricao-texto h2");
    nomeItem.style.textDecoration = checked ? "line-through" : "none";
    nomeItem.style.color = checked ? "#AFABB6" : "#FBF9FE";

    // Adicionar o evento de clique para o checkbox
    const checkbox = li.querySelector(".input-novo-item");
    checkbox.addEventListener("click", (event) => {
      // Alterar o estado no localStorage
      item.checked = event.target.checked;
      localStorage.setItem("itens", JSON.stringify(listaItens));

      // Modificar o estilo baseado no estado do checkbox
      nomeItem.style.textDecoration = event.target.checked
        ? "line-through"
        : "none";
      nomeItem.style.color = event.target.checked ? "#AFABB6" : "#FBF9FE";

      // Adicionar ou remover opacidade
      if (event.target.checked) {
        li.style.opacity = "0.5"; // Aplica opacidade ao item quando checked
      } else {
        li.style.opacity = "1"; // Restaura a opacidade quando unchecked
      }

      // Reordenar a lista após a alteração do estado
      atualizarLista(); // Atualiza a lista após reordenar os itens
    });

    // Aplicando a opacidade ao item marcado
    if (checked) {
      li.style.opacity = "0.5";
    } else {
      li.style.opacity = "1";
    }
  });
}

// Quando o botão salvar for clicado
botaoSalvarAlteracoes.addEventListener("click", () => {
  // Verificar se há um item sendo editado
  if (itemIndexParaEdicao === -1) {
    alert("Nenhum item selecionado para edição.");
    return;
  }

  // Obter os novos valores
  const novoNome = inputItem.value.trim();
  const novaQuantidade = inputQuantidade.value.trim();
  const novaUnidade = itemUnidade; // Já foi atualizada ao clicar em editar
  const novaCategoria = botaoCategorias
    .querySelector(".texto-categoria")
    .textContent.trim();

  // Verificar se os campos estão vazios
  if (
    novoNome === "" ||
    novaQuantidade === "" ||
    novaCategoria === "Selecione"
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Obter a lista de itens do localStorage
  const listaItens = obterItens();

  // Verificar se o índice do item é válido
  if (itemIndexParaEdicao < 0 || itemIndexParaEdicao >= listaItens.length) {
    alert("Erro: Índice do item inválido.");
    return;
  }

  // Depuração: Verificar o índice antes de salvar
  console.log("Índice do item antes de salvar:", itemIndexParaEdicao);

  // Atualizar o item no localStorage
  listaItens[itemIndexParaEdicao].nome = novoNome;
  listaItens[itemIndexParaEdicao].quantidade = novaQuantidade;
  listaItens[itemIndexParaEdicao].unidade = novaUnidade;
  listaItens[itemIndexParaEdicao].categoria = novaCategoria;

  // Salvar os itens atualizados no localStorage
  salvarItens(listaItens);

  // Depuração: Verificar a lista de itens após salvar
  console.log("Lista de itens após salvar:", listaItens);

  // Atualizar a interface com os novos valores
  const itemLi = listaContainer.children[itemIndexParaEdicao];
  const descricaoTexto = itemLi.querySelector(".descricao-texto");
  const nomeItem = descricaoTexto.querySelector("h2");
  const quantidadeItem = descricaoTexto.querySelector("p");
  const categoriaItem = itemLi.querySelector(".categoria-nome");

  nomeItem.textContent = novoNome;
  quantidadeItem.textContent = `${novaQuantidade} ${novaUnidade}`;
  categoriaItem.textContent = novaCategoria;

  // Limpar os campos e restaurar os botões
  limparCampos();

  // Esconder o botão salvar e mostrar o botão Adicionar Item novamente
  botaoSalvarAlteracoes.classList.add("oculto");
  botaoAdicionarItem.classList.remove("oculto");

  // Resetar o índice de edição
  itemIndexParaEdicao = -1;
});

// Chamar a função ao carregar a página
window.addEventListener("load", atualizarLista);
=======
const botaoQuantidade = document.querySelector(".btn-quantidade");
const listaUnidades = document.querySelector(".lista-unidades");
const flechaQuantidade = document.querySelector(".flecha-quantidade");
const inputQuantidade = document.getElementById("quantidade");

const listaCategorias = document.querySelector(".lista-categorias");
const botaoCategorias = document.querySelector(".btn-categoria");
const flechaCategoria = document.querySelector(".flecha-categoria");

const listaContainer = document.querySelector(".lista-de-itens");
const inputItem = document.getElementById("item");

const botaoSalvarAlteracoes = document.querySelector(".btn-salvar");
const botaoAdicionarItem = document.querySelector(".btn-adicionar");

// Variáveis para armazenar os valores selecionados
let itemUnidade = "";
let itemCategoria = "";
let itemIndexParaEdicao = -1; // Armazena o índice do item que está sendo editado

const categorias = {
  Padaria: { corFundo: "#211E12", corTexto: "#BB9F3A" },
  Fruta: { corFundo: "#261A17", corTexto: "#E07B67" },
  Legume: { corFundo: "#1C2015", corTexto: "#8CAD51" },
  Bebida: { corFundo: "#1A1D23", corTexto: "#7B94CB" },
  Carne: { corFundo: "#251622", corTexto: "#DB5BBF" },
  Higiene: { corFundo: "#41200C", corTexto: "#FF873C" },
  Pets: { corFundo: "#4E562D", corTexto: "#CDEE47" },
  Café: { corFundo: "#4D2A15", corTexto: "#9A4B1A" },
  Graos: { corFundo: "#9A9494", corTexto: "#E0D9D9" },
  Frios: { corFundo: "#644242", corTexto: "#D68585" },
};

// Função para alterar a cor da borda conforme foco
function alterarBorda(event, cor) {
  event.target.style.border = `1px solid ${cor}`;
}

const inputs = [inputQuantidade, inputItem];
inputs.forEach((input) => {
  input.addEventListener("focus", (event) => alterarBorda(event, "#A881E6"));
  input.addEventListener("blur", (event) => alterarBorda(event, "#252529"));
});

const botoes = [botaoQuantidade, botaoCategorias];
botoes.forEach((botao) => {
  botao.addEventListener("focus", (event) => alterarBorda(event, "#A881E6"));
  botao.addEventListener("blur", (event) => alterarBorda(event, "#252529"));
});

// Função para alternar a visibilidade e a imagem da setinha
function alternarVisibilidade(botao, lista, flecha) {
  botao.addEventListener("click", (event) => {
    event.preventDefault();
    const oculto = lista.classList.toggle("oculto");
    flecha.src = oculto ? "./assets/ver-lista.svg" : "./assets/ver-menos.svg";
  });
}

// Aplicando a função para os dois casos
alternarVisibilidade(botaoQuantidade, listaUnidades, flechaQuantidade);
alternarVisibilidade(botaoCategorias, listaCategorias, flechaCategoria);

// Selecionar a unidade de medida
listaUnidades.addEventListener("click", (event) => {
  const unidadeSelecionada = event.target.closest(".item-unidade");
  if (!unidadeSelecionada) return;

  itemUnidade = unidadeSelecionada.textContent.trim();
  botaoQuantidade.querySelector(".texto-unidade").textContent =
    unidadeSelecionada.textContent.trim();
  listaUnidades.classList.add("oculto");
  flechaQuantidade.src = "./assets/ver-lista.svg";
});

// Selecionar a categoria
listaCategorias.addEventListener("click", (event) => {
  const categoriaSelecionada = event.target.closest(".item-categoria");
  if (!categoriaSelecionada) return;

  itemCategoria = categoriaSelecionada.textContent.trim();
  botaoCategorias.querySelector(".texto-categoria").textContent =
    categoriaSelecionada.textContent.trim();
  listaCategorias.classList.add("oculto");
  flechaCategoria.src = "./assets/ver-lista.svg";
});

// Função para obter itens do localStorage
function obterItens() {
  return JSON.parse(localStorage.getItem("itens")) || [];
}

// Função para salvar itens no localStorage
function salvarItens(itens) {
  localStorage.setItem("itens", JSON.stringify(itens));
}

// Função para limpar os campos e restaurar botões
function limparCampos() {
  document.getElementById("item").value = "";
  document.getElementById("quantidade").value = "";
  itemUnidade = "";
  itemCategoria = "";

  // Restaurar os botões para o estado inicial
  botaoQuantidade.querySelector(".texto-unidade").textContent = "UN.";
  botaoCategorias.querySelector(".texto-categoria").textContent = "Selecione";
}

// Adicionar novo item na lista
botaoAdicionarItem.addEventListener("click", (event) => {
  event.preventDefault();

  const itemNome = document.getElementById("item").value;
  const itemQuantidade = document.getElementById("quantidade").value;

  if (!itemNome || !itemQuantidade || !itemUnidade || !itemCategoria) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Criar um novo item
  const novoItem = {
    nome: itemNome,
    quantidade: itemQuantidade,
    unidade: itemUnidade,
    categoria: itemCategoria,
    checked: false, // Inicialmente, o item não está marcado
  };

  // Obter a lista de itens e adicionar o novo item
  const listaItens = obterItens();
  listaItens.push(novoItem);

  // Salvar a lista de itens no LocalStorage
  salvarItens(listaItens);

  // Atualizar a lista na interface
  atualizarLista();

  // Limpar os campos
  limparCampos();
});

// Função para atualizar a lista de itens na interface
function atualizarLista() {
  const listaContainer = document.querySelector(".lista-de-itens");
  listaContainer.innerHTML = ""; // Limpar a lista atual

  // Obter a lista de itens atualizada do localStorage
  const listaItens = obterItens();

  // Reordenar a lista colocando os itens checkados no final
  const listaOrdenada = listaItens.sort((a, b) => a.checked - b.checked);

  // Adicionar cada item à lista
  listaOrdenada.forEach((item, index) => {
    const { categoria, nome, quantidade, unidade, checked = false } = item;
    const { corFundo, corTexto } = categorias[categoria] || {
      corFundo: "#FFFFFF",
      corTexto: "#000000",
    };

    // Criar o item da lista
    const li = document.createElement("li");
    li.classList.add("novo-item");

    li.innerHTML = `
            <div class="novo-item-descricao">
                <input type="checkbox" id="checkbox-${index}" class="input-novo-item" ${
      checked ? "checked" : ""
    }>
                <label class="label-checkbox" for="checkbox-${index}"></label>
                <span class="descricao-texto">
                    <h2 class="descricao-texto-titulo">${nome}</h2>
                    <p>${quantidade} ${unidade}</p>
                </span>
            </div>
            <div class="categoria-container">
                <div class="novo-item-categoria" style="background-color: ${corFundo}">
                    <img src="./assets/${categoria}.svg" alt="icone ${categoria}">
                    <p class="categoria-nome" style="font-size: 12px; font-weight: 600; color: ${corTexto}">${categoria}</p>
                </div>
                <button class="botao-menu"><img src="./assets/menu-editar.svg" alt="menu-edicao"></button>
            </div>
            <div class="menu-editar oculto">
                <button><img src="./assets/editar.svg" alt="editar" class="editar-item"></button>
                <button><img src="./assets/deletar.svg" alt="deletar" class="deletar-item"></button>
            </div>
        `;

    // Adicionar o item à lista
    listaContainer.appendChild(li);

    // Adicionar o evento de clique para o ícone de menu
    const botaoMenu = li.querySelector(".botao-menu");
    const listaMenu = li.querySelector(".menu-editar");
    botaoMenu.addEventListener("click", (event) => {
      listaMenu.classList.toggle("oculto");
    });

    // Adicionar o evento de clique para o botão de editar
    const botoesEditar = li.querySelectorAll(".editar-item");
    botoesEditar.forEach((botao) => {
      botao.addEventListener("click", (event) => {
        const itemLi = event.target.closest(".novo-item");
        const descricaoTexto = itemLi.querySelector(".descricao-texto");
        const nomeItem = descricaoTexto.querySelector("h2");
        const quantidadeItem = descricaoTexto.querySelector("p");
        const categoriaItem = itemLi
          .querySelector(".categoria-nome")
          .textContent.trim();

        // Verificar se os valores não estão vazios
        if (
          !nomeItem.textContent ||
          !quantidadeItem.textContent ||
          !categoriaItem
        ) {
          alert("Erro: Item sem nome, quantidade ou categoria.");
          return;
        }

        // Dividir a quantidade e a unidade
        const partesQuantidade = quantidadeItem.textContent.split(" ");
        if (partesQuantidade.length < 2) {
          alert("Erro: Formato de quantidade inválido.");
          return;
        }

        // Preencher os campos de edição
        inputItem.value = nomeItem.textContent; // Preenche o nome no input
        inputQuantidade.value = partesQuantidade[0]; // Preenche a quantidade no input
        itemUnidade = partesQuantidade[1]; // Armazena a unidade no item unidade

        // Atualizar o botão de unidade
        botaoQuantidade.querySelector(".texto-unidade").textContent =
          itemUnidade;

        // Atualizar o botão de categoria
        botaoCategorias.querySelector(".texto-categoria").textContent =
          categoriaItem;

        // Atualizar o índice do item para edição
        itemIndexParaEdicao = Array.from(itemLi.parentNode.children).indexOf(
          itemLi
        );

        // Exibir o botão salvar e ocultar o botão adicionar
        botaoSalvarAlteracoes.classList.remove("oculto");
        botaoAdicionarItem.classList.add("oculto");

        // Depuração
        console.log("Nome do item:", nomeItem.textContent);
        console.log("Quantidade do item:", quantidadeItem.textContent);
        console.log("Unidade do item:", itemUnidade);
        console.log("Categoria do item:", categoriaItem);
        console.log("Índice do item para edição:", itemIndexParaEdicao);
      });
    });

    // Adicionar o evento de clique para o botão de deletar
    const botoesDeletar = li.querySelectorAll(".deletar-item");
    botoesDeletar.forEach((botao) => {
      botao.addEventListener("click", (event) => {
        // Confirmar se o usuário realmente quer deletar o item
        const confirmacao = confirm(
          "Tem certeza que deseja excluir este item?"
        );
        if (!confirmacao) return;

        // Obter a lista de itens do localStorage
        const listaItens = obterItens();

        // Remover o item da lista
        listaItens.splice(index, 1);

        // Salvar a lista atualizada no localStorage
        salvarItens(listaItens);

        // Atualizar a interface
        atualizarLista();

        // Fechar o menu de edição
        listaMenu.classList.add("oculto");
      });
    });

    // Manipulação do estilo dependendo do estado do checkbox
    const nomeItem = li.querySelector(".descricao-texto h2");
    nomeItem.style.textDecoration = checked ? "line-through" : "none";
    nomeItem.style.color = checked ? "#AFABB6" : "#FBF9FE";

    // Adicionar o evento de clique para o checkbox
    const checkbox = li.querySelector(".input-novo-item");
    checkbox.addEventListener("click", (event) => {
      // Alterar o estado no localStorage
      item.checked = event.target.checked;
      localStorage.setItem("itens", JSON.stringify(listaItens));

      // Modificar o estilo baseado no estado do checkbox
      nomeItem.style.textDecoration = event.target.checked
        ? "line-through"
        : "none";
      nomeItem.style.color = event.target.checked ? "#AFABB6" : "#FBF9FE";

      // Adicionar ou remover opacidade
      if (event.target.checked) {
        li.style.opacity = "0.5"; // Aplica opacidade ao item quando checked
      } else {
        li.style.opacity = "1"; // Restaura a opacidade quando unchecked
      }

      // Reordenar a lista após a alteração do estado
      atualizarLista(); // Atualiza a lista após reordenar os itens
    });

    // Aplicando a opacidade ao item marcado
    if (checked) {
      li.style.opacity = "0.5";
    } else {
      li.style.opacity = "1";
    }
  });
}

// Quando o botão salvar for clicado
botaoSalvarAlteracoes.addEventListener("click", () => {
  // Verificar se há um item sendo editado
  if (itemIndexParaEdicao === -1) {
    alert("Nenhum item selecionado para edição.");
    return;
  }

  // Obter os novos valores
  const novoNome = inputItem.value.trim();
  const novaQuantidade = inputQuantidade.value.trim();
  const novaUnidade = itemUnidade; // Já foi atualizada ao clicar em editar
  const novaCategoria = botaoCategorias
    .querySelector(".texto-categoria")
    .textContent.trim();

  // Verificar se os campos estão vazios
  if (
    novoNome === "" ||
    novaQuantidade === "" ||
    novaCategoria === "Selecione"
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Obter a lista de itens do localStorage
  const listaItens = obterItens();

  // Verificar se o índice do item é válido
  if (itemIndexParaEdicao < 0 || itemIndexParaEdicao >= listaItens.length) {
    alert("Erro: Índice do item inválido.");
    return;
  }

  // Depuração: Verificar o índice antes de salvar
  console.log("Índice do item antes de salvar:", itemIndexParaEdicao);

  // Atualizar o item no localStorage
  listaItens[itemIndexParaEdicao].nome = novoNome;
  listaItens[itemIndexParaEdicao].quantidade = novaQuantidade;
  listaItens[itemIndexParaEdicao].unidade = novaUnidade;
  listaItens[itemIndexParaEdicao].categoria = novaCategoria;

  // Salvar os itens atualizados no localStorage
  salvarItens(listaItens);

  // Depuração: Verificar a lista de itens após salvar
  console.log("Lista de itens após salvar:", listaItens);

  // Atualizar a interface com os novos valores
  const itemLi = listaContainer.children[itemIndexParaEdicao];
  const descricaoTexto = itemLi.querySelector(".descricao-texto");
  const nomeItem = descricaoTexto.querySelector("h2");
  const quantidadeItem = descricaoTexto.querySelector("p");
  const categoriaItem = itemLi.querySelector(".categoria-nome");

  nomeItem.textContent = novoNome;
  quantidadeItem.textContent = `${novaQuantidade} ${novaUnidade}`;
  categoriaItem.textContent = novaCategoria;

  // Limpar os campos e restaurar os botões
  limparCampos();

  // Esconder o botão salvar e mostrar o botão Adicionar Item novamente
  botaoSalvarAlteracoes.classList.add("oculto");
  botaoAdicionarItem.classList.remove("oculto");

  // Resetar o índice de edição
  itemIndexParaEdicao = -1;
});

// Chamar a função ao carregar a página
window.addEventListener("load", atualizarLista);
>>>>>>> ab00f33dc0e1043f3764c22c4f8dd9f90650baa6
