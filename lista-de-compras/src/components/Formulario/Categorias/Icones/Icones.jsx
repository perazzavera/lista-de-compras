import { FaCarrot, FaCheese, FaFish, FaBreadSlice } from "react-icons/fa";

FaCarrot.displayName = "FaCarrot";
FaCheese.displayName = "FaCheese";
FaFish.displayName = "FaFish";
FaBreadSlice.displayName = "FaBreadSlice";

export const categoriasDisponiveis = [
  {
    label: "Verduras",
    corDeFundo: "#A8E6CF",
    corDaFonte: "#344E41",
    Icon: FaCarrot,
  },
  {
    label: "Laticínios",
    corDeFundo: "#FFD3B6",
    corDaFonte: "#5D3A00",
    Icon: FaCheese,
  },
  {
    label: "Peixes",
    corDeFundo: "#B5EAD7",
    corDaFonte: "#004D40",
    Icon: FaFish,
  },
  {
    label: "Pães",
    corDeFundo: "#FFB6B9",
    corDaFonte: "#6A040F",
    Icon: FaBreadSlice,
  },
];
