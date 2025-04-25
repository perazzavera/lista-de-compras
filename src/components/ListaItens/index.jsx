import Checkbox from "@mui/material/Checkbox";
import React from "react";
import clsx from "clsx";
import { LuTrash2 } from "react-icons/lu";

export default function ListaItens({ itensLista, setItensLista }) {
  function toggleItemCheck(index) {
    const novaLista = [...itensLista];
    novaLista[index].checked = !novaLista[index].checked;

    // Reordenar a lista: não checkados primeiro, checkados depois
    const ordenada = [
      ...novaLista.filter((item) => !item.checked),
      ...novaLista.filter((item) => item.checked),
    ];

    setItensLista(ordenada);
    localStorage.setItem("itensLista", JSON.stringify(ordenada));
  }

  function handleDeletarItem(index) {
    const novaLista = itensLista.filter((_, i) => i !== index);
    setItensLista(novaLista);
    localStorage.setItem("itensLista", JSON.stringify(novaLista));
  }

  return (
    <div>
      <ul className="px-4 space-y-4 my-4">
        {itensLista.map((item, index) => (
          <li
            key={index}
            className={clsx(
              "flex items-center text-white bg-black/80 py-4 ps-2 pe-4 text-xl rounded-xl justify-between",
              item.categoria && "border-l-4 border-solid",
              item.checked && "opacity-60"
            )}
            style={{
              borderLeftColor: item.categoria?.corDaFonte || "transparent",
            }}
          >
            <div className="flex items-center">
              <Checkbox
                sx={{
                  color: "#d5d5d5",
                }}
                color="success"
                checked={item.checked || false}
                onChange={() => toggleItemCheck(index)}
              />
              <div>
                <h3
                  className={clsx(
                    "text-lg font-bold font-quick leading-3",
                    item.checked && "line-through"
                  )}
                >
                  {item.item}
                </h3>
                <div className="flex items-center gap-1">
                  <h4 className="text-sm">{item.quantidade}</h4>
                  <p className="text-sm">{item.unidade?.label}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className=" flex items-center gap-2 py-2 px-4 rounded-full"
                style={{
                  backgroundColor: `${item.categoria.corDeFundo}`,
                  color: item.categoria?.corDaFonte,
                }}
              >
                {/* Aqui, certifique-se de que item.icone tenha o caminho correto */}
                {item.categoria.icone && (
                  <img
                    src={item.categoria.icone} // Caminho da imagem
                    alt={item.categoria?.label} // Texto alternativo para acessibilidade
                    className="w-6 h-6" // Tamanho do ícone ajustável
                  />
                )}
                <p className="text-lg font-quick font-bold">
                  {item.categoria.label}
                </p>
              </div>
              <LuTrash2
                onClick={() => handleDeletarItem(index)}
                className="text-red-600 w-6 h-6"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
