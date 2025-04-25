import Categorias from "./Categorias/Categorias";
import Quantidade from "./Quantidade/Quantidade";

export default function Formulario({
  onClick,
  item,
  setItem,
  unidade,
  setUnidade,
  categoria,
  setCategoria,
  quantidade,
  setQuantidade,
}) {
  return (
    <form className="lg:flex lg:items-center">
      <div className="px-4 lg:pe-0">
        <label
          htmlFor="input-label"
          className="block font-medium  text-white text-lg"
        >
          Item
        </label>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          type="text"
          id="item"
          className="placeholder:text-white placeholder:font-quick border-1 border-black p-3 w-full rounded-xl bg-black/80 text-white outline-0"
          placeholder="Digite um item"
        />
      </div>
      <div className="flex mt-4 lg:mt-0 lg:justify-between">
        <Quantidade
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          unidade={unidade}
          setUnidade={setUnidade}
        />
        <Categorias
          onClick={onClick}
          categoria={categoria}
          setCategoria={setCategoria}
        />
      </div>
    </form>
  );
}
