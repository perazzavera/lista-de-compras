import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";

const categorias = [
  {
    id: 1,
    label: "Padaria",
    corDeFundo: "var(--color-yellow-80)",
    corDaFonte: "var(--color-yellow)",
    icone: "/padaria.png",
  },
  {
    id: 2,
    label: "Frutas",
    corDeFundo: "var(--color-orange-80)",
    corDaFonte: "var(--color-orange)",
    icone: "/apple.png",
  },
  {
    id: 3,
    label: "Legumes",
    corDeFundo: "var(--color-green-80)",
    corDaFonte: "var(--color-green)",
    icone: "/legume.png",
  },
  {
    id: 4,
    label: "Carnes",
    corDeFundo: "var(--color-pink-80)",
    corDaFonte: "var(--color-pink)",
    icone: "/carne.png",
  },
  {
    id: 5,
    label: "Bebidas",
    corDeFundo: "var(--color-blue-80)",
    corDaFonte: "var(--color-blue)",
    icone: "/bebidas.png",
  },
  {
    id: 6,
    label: "Massas",
    corDeFundo: "var(--color-red-80)",
    corDaFonte: "var(--color-red)",
    icone: "/massa.png",
  },
  {
    id: 7,
    label: "Grãos",
    corDeFundo: "var(--color-brown-80)",
    corDaFonte: "var(--color-brown)",
    icone: "/graos.png",
  },
  {
    id: 8,
    label: "Higiene",
    corDeFundo: "var(--color-purple-80)",
    corDaFonte: "var(--color-purple)",
    icone: "/higiene.png",
  },
  {
    id: 9,
    label: "Pets",
    corDeFundo: "var(--color-cyan-80)",
    corDaFonte: "var(--color-cyan)",
    icone: "/pets.png",
  },
  {
    id: 10,
    label: "Variados",
    corDeFundo: "var(--color-teal-80)",
    corDaFonte: "var(--color-teal)",
    icone: "/variados.png",
  },
];

export default function Categorias({ onClick, categoria, setCategoria }) {
  return (
    <div className="pe-4">
      <p className="text-white font-medium text-lg">Categorias</p>
      <Listbox value={categoria} onChange={setCategoria}>
        <div className="relative flex gap-2">
          <Listbox.Button className="w-[133px] bg-black/80 text-white p-3 rounded-xl flex items-center justify-between border-1 border-black">
            <span className="flex items-center gap-2">
              {categoria?.icone && (
                <img
                  src={categoria.icone}
                  className="shadow-2xl"
                  style={{ color: categoria.corDaFonte }}
                  size={20}
                />
              )}
              {categoria?.label || "Selecione"}
            </span>
            <FiChevronDown />
          </Listbox.Button>
          <button
            onClick={onClick}
            className="bg-black/80 py-3 px-4 rounded-full text-white"
          >
            <LuPlus />
          </button>
          <Listbox.Options className="absolute top-11 z-10 w-[133px] bg-black/80 rounded-md shadow-lg overflow-auto text-white mt-2">
            {categorias.map((item) => (
              <Listbox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 flex items-center gap-2 ${
                    active ? "bg-gray-900" : ""
                  }`
                }
              >
                <img src={item.icone} alt={item.label} />

                <span>{item.label}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
