

import React from "react";
import { FaSignOutAlt } from "react-icons/fa"

const BotaoIniciar = ({ handleLogOut }) => {
  return (
    <div className="Pedidos-cabecalho">
			<div className="Pedidos-titulo">
				<h2>Pedidos</h2>
			</div>
			<div className="Pedidos-opcoes">
				<button className="button" onClick={handleLogOut}>
					<FaSignOutAlt /> Sair
				</button>
			</div>
      	</div>
  );
};

export default BotaoIniciar;
