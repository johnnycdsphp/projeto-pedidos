import React from "react";
import "./ItensPedido.css";
import { FaRegTrashAlt } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";

const ItensPedido = ({ itensPedido, handleItemDeletion }) => {
  return (
    <>
      {itensPedido.map((item) => (
        <>
          <div className="Itens-container" key={item.id}>
            <div className="Itens-title">
              ( {("000000" + item.quantidade).slice(-6)} Und ) - {item.nome}
            </div>

            <div className="buttons-container">
              {item.rentabilidade === 1 ? (
                <Badge className="Badge" bg="success">
                  Rentabilidade ótima
                </Badge>
              ) : item.rentabilidade === 2 ? (
                <Badge className="Badge" bg="warning">
                  Rentabilidade boa
                </Badge>
              ) : (
                <Badge className="Badge" bg="danger">
                  Rentabilidade ruim
                </Badge>
              )}
              <button
                className="Item-button"
                onClick={() => handleItemDeletion(item.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default ItensPedido;
