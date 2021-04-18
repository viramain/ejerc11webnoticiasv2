import React, { Fragment } from "react";
import {useEffect, useState } from "react";
import Spinner from "./Spinner";
import ListaNoticias from "./ListaNoticias";


const SelectCategorias = () => {
  // crear state personaje que es un arreglo [] de objetos
    const [noticias, setNoticias] = useState([]);
    const [categoria, setCategoria] = useState('general');
    const [pais, setPais] = useState('ar');
    const [cargando, setCargando] = useState(false);

  // uso useeffect porque quiero que se cargue en el montaje y cada vez que se actualiza
    useEffect(() => {consultarAPI();},[categoria,pais]);

    const consultarAPI = async () => {
        // mostrar spinner
        setCargando(true);
        // constante RESPUESTA recibe la respuesta de la API. con fetch paso la URL de la pag 
        const respuesta = await fetch(`https://newsapi.org/v2/top-headlines?category=${categoria}&country=${pais}&apiKey=55bea24272f54108aa49ca5ce2bb3b60`);
        
        //extraigo resultados de formato json
        const {articles} = await respuesta.json();
        // para que muestre un poco mas de tiempo el spinner se usa settimeout
        setTimeout(() => {
          setNoticias(articles);
          setCargando(false);
        }, 3000);
    };

  //operador ternario: alternativa a un IF (se usa cuando es una linea corta)
  // (condicion logica)?(lo que quiero que haga si es true la condicion):(lo que quiero que suceda si es false)
  const mostrarComponente = (cargando === true) ? (<Spinner></Spinner>) : (<ListaNoticias arregloNoticias={noticias}></ListaNoticias>);

    return (
        <Fragment>
        <section className="container shadow text-center w-75 mt-5 pb-3">
            <form className="my-3 mx-5 text-center">
                <label className="lead fw-bold my-3">Buscar por categoría:</label>
                <select defaultValue={'DEFAULT'}  className="form-select lead fw-bold ml-4" onChange={(e) => setCategoria(e.target.value)}>
                    <option value="DEFAULT" disabled>Seleccione una Categoría...</option>
                    <option value="general">General</option>
                    <option value="business">Negocios</option>
                    <option value="health">Salud</option>
                    <option value="science">Ciencia</option>
                    <option value="sports">Deportes</option>
                    <option value="technology">Tecnología</option>
                </select>

                <label className="lead fw-bold my-3">Buscar por País:</label>
                <select defaultValue={'DEFAULT'}  className="form-select lead fw-bold ml-4" onChange={(e) => setPais(e.target.value)}>
                    <option value="DEFAULT" disabled>Seleccione un País...</option>
                    <option value="ar">Argentina</option>
                    <option value="us">Estados Unidos</option>
                    <option value="mx">Mexico</option>
                    <option value="fr">Francia</option>
                    <option value="ca">Canada</option>
                    <option value="gb">Reino Unido</option>
                    <option value="ru">Rusia</option>
                </select>

                {/* <button type='submit' className='btn btn-secondary'>Buscar Noticias</button> */}
            </form>    
        </section>

        <section>
          {
          mostrarComponente
          }
        </section>
        </Fragment>
    );
};

export default SelectCategorias;
