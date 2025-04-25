import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

const unis = [
  { id: 1, label: "Un." },
  { id: 2, label: "Kg" },
  { id: 3, label: "L" },
];

export default function Quantidade({
  quantidade,
  setQuantidade,
  unidade,
  setUnidade,
}) {
  return (
    <div className="ps-4 pe-2 lg:ps-2">
      <p className="text-white font-medium text-lg">Quantidade</p>
      <div className="flex group relative">
        <input
          onChange={(e) => setQuantidade(e.target.value)}
          className="p-3 bg-black/80 border-1 border-black rounded-l-xl w-full placeholder:text-white placeholder:font-quick text-white outline-0"
          type="text"
          placeholder="Qtd."
          value={quantidade}
        />
        <Listbox value={unidade} onChange={setUnidade}>
          <div className="relative">
            <Listbox.Button className="w-1/1 bg-black/80 text-white p-3 rounded-r-xl flex items-center justify-between border-1 border-black gap-4">
              <span className="flex items-center gap-2">
                {unidade?.label || "Unid."}
              </span>
              <FiChevronDown />
            </Listbox.Button>
            <Listbox.Options className="absolute w-full z-10  bg-black/90 rounded-md shadow-lg max-h-60 overflow-auto text-white mt-1">
              {unis.map((item) => (
                <Listbox.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 flex items-center gap-2 ${
                      active ? "bg-gray-900" : ""
                    }`
                  }
                >
                  <span>{item.label}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
