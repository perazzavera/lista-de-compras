import { useEffect, useState } from "react";
import "./App.css";
import ListaItens from "./components/ListaItens";
import Formulario from "./components/Formulario/Formulario";

function App() {
  const [item, setItem] = useState("");
  const [unidade, setUnidade] = useState(null);
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState(null);
  const [itensLista, setItensLista] = useState([]);

  useEffect(() => {
    const itensSalvos = localStorage.getItem("itensLista");
    if (itensSalvos) {
      const lista = JSON.parse(itensSalvos);
      setItensLista(lista);
    }
  }, []);

  function handleAdicionarItem(e) {
    e.preventDefault();
    console.log("Botão de adicionar clicado"); // Verifique se está sendo acionado

    if (!item || !quantidade || !unidade || !categoria) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Garantir que a quantidade seja um número positivo
    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Quantidade inválida.");
      return;
    }

    const novoItem = {
      item,
      quantidade,
      unidade,
      categoria,
      checked: false, // adiciona controle de checkbox
    };

    const novaLista = [...itensLista, novoItem];
    setItensLista(novaLista);
    localStorage.setItem("itensLista", JSON.stringify(novaLista));

    // Limpar campos após o envio
    setItem("");
    setCategoria(null);
    setUnidade(null);
    setQuantidade("");
  }

  return (
    <section className="h-screen w-full bg-[url(/bg.jpeg)] bg-cover bg-center bg-no-repeat pt-10 lg:bg-[url(/bg - desktop.jpeg)] lg:bg-contain lg:bg-repeat lg:px-80">
      <div className="bg-black/60 backdrop-blur-xs pb-10 pt-4 lg:rounded-4xl">
        <h1 className="text-center text-4xl text-white font-ita font-bold py-3">
          Lista de Compras
        </h1>
        <Formulario
          onClick={handleAdicionarItem}
          item={item}
          setItem={setItem}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          unidade={unidade}
          setUnidade={setUnidade}
          categoria={categoria}
          setCategoria={setCategoria}
        />
        <ListaItens itensLista={itensLista} setItensLista={setItensLista} />
      </div>
    </section>
  );
}

export default App;
