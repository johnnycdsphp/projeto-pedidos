import React from "react";
import { FaRegSave } from "react-icons/fa";
import "../Views/Pedidos"

const BotaoFinalizar = ({ handleFinishOrder }) => {
  return (
    <div className="Flex4 Pedidos-opcoes">
      <button
        className="Pedido-Btn"
        onClick={handleFinishOrder}
        type="button"
      >
        <FaRegSave /> Finalizar Pedido
      </button>
    </div>
  );
};

export default BotaoFinalizar;
