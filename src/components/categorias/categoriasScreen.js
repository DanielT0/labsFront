import { Navbar } from "../ui/Navbar"
import React, { useEffect } from "react";
import "./categoria.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
} from "reactstrap";
import { CategoriaModal, ProyectoModal } from "./categoriasModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { categoriaClearActiveCategoria, categoriaClearActiveProy, categoriaSetActive, categoriasStartLoading, categoriaStartDelete} from "../../actions/categoria";
import { Grid } from "@material-ui/core";
import { CardCategoria, CardProy } from "./CardCategoria";
import { labsStartLoading } from "../../actions/labs";


export const CategoriasScreen = () => {
    const state = {
        modalActualizar: false,
        modalInsertar: false,
    };

    const { categorias } = useSelector(state => state.categoria);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(categoriasStartLoading());
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
        dispatch(categoriaClearActiveCategoria())
    };

    const mostrarModalActualizar = (e) =>{
        dispatch(uiOpenModal())
        dispatch(categoriaSetActive(e))
    }

    const cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    const handleDelete = (lab) => {
        dispatch( categoriaStartDelete(lab) );
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
            {<Navbar />
            /*
            <form class="form">
                <br></br><label style={{ color: 'white', fontSize: '30px', text_shadow: '2px 2px 5px black' }}>Registro de Laboratorio</label>
                <input type="id" class="inputT" />
                <br></br>
                <label class="labels">Nombre</label>
                <input type="nombre" class="inputT" />
                <br></br>
                <label class="labels">Descripcion</label>
                <input type="password" class="inputT" />
                <br></br>
                <br></br>
            </form>
            <div style={{ float: 'left', width: '15%', height: '15%' }}> </div>

            <button type="submit" class="boton" style={{ float: 'left' }}>Atras</button>
            <div style={{ float: 'right', width: '15%', height: '1%' }}> </div>
            <button type="submit" class="boton" style={{ float: 'right' }}>Enviar</button>
            <div class="container"></div>
            <div class="mx-auto col-sm-8 main-section" id="myTab" role="tablist"></div>
            <ul class="nav nav-tabs justify-content-end"></ul>
            <li class="nav-item"></li>
            <a class="nav-link active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>

            <li class="nav-item"></li>
            <a class="nav-link" id="form-tab" data-toggle="tab" href="#form" role="tab" aria-controls="form" aria-selected="true">Form</a>


            <div class="tab-content" id="myTabContent"></div>
            <div class="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab"></div>

            <div class="tab-pane fade" id="form" role="tabpanel" aria-labelledby="form-tab"></div> */}
            <Container>
                <Button color="success"
                 onClick={mostrarModalInsertar}
                 >Crear</Button>
                <br />
                <br />
                <Grid container>
                    {categorias.map(dato=>(
                        <Grid item xs={6}>
                            <CardCategoria 
                            key={dato.id}
                            dato = {dato}/>
                        </Grid>
                    ))}
                </Grid>
                {/*<Table>
                    <thead>
                        <tr>
                        <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {labs.map((dato) => (
                            <tr key={dato._id}>
                                <td>{dato._id}</td>
                                <td>{dato.nombre}</td>
                                <td>{dato.descripcion}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => mostrarModalActualizar(dato)}
                                    >
                                        Editar
                    </Button>{" "}
                                    <Button color="danger" 
                                        onClick={() => handleDelete(dato)}
                                    >Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                        */}
            </Container>

            
            <CategoriaModal/>

        </div>

        //         <div class="Div">

        //             <form class="form">
        //                 <br><br> <label style="color: white; font-size: 30px; text-shadow: 2px 2px 5px black;">Registro de Laboratorio</label>
        //                     <br><br>
        //                         <label class="labels">Id de Laboratorio</label>
        //                         <input type="id" class="inputT" />
        //                         <br><br>
        //                             <label class="labels">Nombre</label>
        //                             <input type="nombre" class="inputT" />
        //                             <br><br>
        //                                 <label class="labels">Descripcion</label>
        //                                 <input type="password" class="inputT" />
        //                                 <br><br>

        //                                     <br><br>
        //   </form>
        //                                         <div style="float:left; width:15%; height:1%;"> </div>

        //                                         <button type="submit" class="boton" style=" float:left;">Atras</button>
        //                                         <div style="float:right; width:15%; height:1%;
        // "> </div>
        //                                         <button type="submit" class="boton" style=" float:right;">Enviar</button>

        // </div>
    )
}