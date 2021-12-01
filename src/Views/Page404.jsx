import React from "react"
import { Link } from 'react-router-dom';
import img404 from '../images/404.png';
import './Page404.css'

const Page404 = () => {

    return ( 

        <>
            <div className="Page404">
                <div className="image-container">
                    <img src={img404} alt="Página não encontrada"/>
                </div>
                <h2>A página solicitada não existe ou você não tem permissão de acesso</h2>
                <Link style={{ color: '#FFF' }} to="/">Voltar para o login</Link>
            </div>
        </>
        
     );
}
 
export default Page404;