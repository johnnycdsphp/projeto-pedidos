import React from "react";
import './ListaPedidos.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const ListaPedidos = ({ listaPedidos }) => {

	return (
		<>
			<div className="Pedidos-intens">
				<div className="Pedidos-head">
					<h4>Lista de pedidos</h4>
				</div>
				<div className="Lista-pedidos">
					{listaPedidos.map((item) => (
						<>
							<div className="Itens-container" key={item.id}>
								<div className="Itens-title">
									{item.documento} - {item.nome}
								</div>

								<div className="buttons-container">
									{("0000000000" + item.numeroPedidoCliente ).slice(-10) } ( { item.quantidade } Und )
								</div>

							</div>
						</>
					))}
				</div>
			</div>
		</>
	);
};

export default ListaPedidos;