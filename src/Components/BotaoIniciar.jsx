import React from "react";
import { FaRegStickyNote } from "react-icons/fa"

const BotaoIniciar = ({ handleNewOrder }) => {
  return (
    <div className="Pedidos-opcoes-pedido">
      <button className="button" onClick={handleNewOrder} type="button">
        <FaRegStickyNote /> Iniciar novo Pedido
      </button>
    </div>
  );
};

export default BotaoIniciar;
