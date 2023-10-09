import React, { useEffect, useState } from "react";
import ListGroups from "../components/listGroups";
import Form from "../components/forms";
import Notas from "../components/notas";
/* Archivo principal de la app */
function Index() {
/* Aqui van las peticiones para modificar las notas */
    const [notas, setNotas] = useState([])
    const [oldNota, setOldNota] = useState([]) 
    /* Esta es la peticion a la db para recuperar toda la data */
    const getNotas = async() => {
        const response = await fetch('http://localhost:5000/api/notas')
        const result = await response.json()
        setNotas(result)
    }
    useEffect(() => {
        getNotas();
    },[notas])
/* Esta es la función para eliminar las notas */
    const deleteNota = async(id) => { //Selecciono el id de la nota
        await fetch('http://localhost:5000/api/notas/'+id, {
            method: 'DELETE',
            mode: 'cors'
        })
    }
    /* Función para editar una nota existente */
    const getNota = async(id) =>{
        const nota = await fetch('http://localhost:5000/api/notas/'+id)
        const result = await nota.json()
        setOldNota(result)
    }

/* Esto es el render del formulario de notas y el listado de notas */
    return (
        <div className="content-app">
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <Form oldNota={oldNota} />
                </div>
                <div className="col-sm-12 col-md-8">
                    <ListGroups>
                        {notas.map((nota, index) => (
                            <Notas key={index} deleteNota={deleteNota} getNota={getNota} id={nota._id} title={nota.title} content={nota.content} />
                            ))}
                    </ListGroups>
                </div>
            </div>
        </div>
    )
}
export default Index;