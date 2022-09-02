import { Navbar } from "../ui/Navbar"
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Container,
} from "reactstrap";
import { LabModal } from "./labsModal";
import { CardAct } from './Card';
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { labClearActiveLab, labSetActive, labsStartLoading, labStartDelete, updateLabsFiltrados } from "../../actions/labs";
import { Grid } from "@material-ui/core";

const initFilter = {
    tipo: '',
}

export const LabRegister = () => {
    const state = {
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            personaje: "",
            anime: "",
        },
    };

    const { labs, labsFiltrados } = useSelector(state => state.lab);
    const [formValues, setFormValues] = useState(initFilter);
    var labsF = labs;

    const handleInputChange = ({ target }) => {
        // if (target.name == "tipo") {
            // labsF = labs.filter((lab) => { if (target.value=="") { if(target.value){lab.tipo.includes(target.value) } } else{}});
        // }
        // else if (target.name == "nombre") {
            labsF = labs.filter((lab) => lab.nombre.includes(target.value))
        // }
        dispatch(updateLabsFiltrados(labsF));
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(labsStartLoading());
    }, [dispatch])

    // const mostrarModalActualizar = (dato) => {
    //     setState({
    //         form: dato,
    //         modalActualizar: true,
    //     });
    // };

    // const cerrarModalActualizar = () => {
    //     setState({ modalActualizar: false });
    // };

    const mostrarModalInsertar = (e) => {
        dispatch(uiOpenModal())
        dispatch(labClearActiveLab())
    };

    const mostrarModalActualizar = (e) => {
        dispatch(uiOpenModal())
        dispatch(labSetActive(e))
    }

    const cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    const handleDelete = (lab) => {
        dispatch(labStartDelete(lab));
    }

    // const editar = (dato) => {
    //     var contador = 0;
    //     var arreglo = state.data;
    //     arreglo.map((registro) => {
    //         if (dato.id == registro.id) {
    //             arreglo[contador].personaje = dato.personaje;
    //             arreglo[contador].anime = dato.anime;
    //         }
    //         contador++;
    //     });
    //     setState({ data: arreglo, modalActualizar: false });
    // };

    // const eliminar = (dato) => {
    //     var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    //     if (opcion == true) {
    //         var contador = 0;
    //         var arreglo = state.data;
    //         arreglo.map((registro) => {
    //             if (dato.id == registro.id) {
    //                 arreglo.splice(contador, 1);
    //             }
    //             contador++;
    //         });
    //         setState({ data: arreglo, modalActualizar: false });
    //     }
    // };

    // const insertar = () => {
    //     var valorNuevo = { ...state.form };
    //     valorNuevo.id = state.data.length + 1;
    //     var lista = state.data;
    //     lista.push(valorNuevo);
    //     setState({ modalInsertar: false, data: lista });
    // }

    // const handleChange = (e) => {
    //     setState({
    //         form: {
    //             ...state.form,
    //             [e.target.name]: e.target.value,
    //         },
    //     });
    // };
    return (
        <div class="Div">
            {
                <Navbar />}
            <div class="contenedor__central">
                <div class="upper__section__container">
                    <div class="section__title">
                        Laboratorios
                    </div>
                    <button class="button__crear"
                        onClick={mostrarModalInsertar}
                    >Crear</button>
                    <div class="upper-right">
                        <input type="text" class="search-bar" placeholder="Buscar" name="nombre" onChange={handleInputChange} />
                        <a><i class="uil uil-filter button__icon"></i></a>
                        <select name="tipo" id="tipo" class="filterTipo" onClick={handleInputChange}>
                            <option value="">Tipo</option>
                            <option value="Investigacion">Investigación</option>
                            <option value="Docencia">Docencia</option>
                        </select>
                    </div>

                </div>
                <div class="contenedor__laboratorios">
                    {labsFiltrados.map(dato => (
                        <CardAct
                            key={dato.id}
                            dato={dato} />
                    ))}
                </div>
            </div>
            <LabModal />
        </div>
    )
}