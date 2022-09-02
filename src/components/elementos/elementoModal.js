import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import Swal from "sweetalert2";
import validator from "validator";
import { elementoClearActiveelemento, elementoStartUpdate, elementoStartAddNew } from "../../actions/elements";
// import { labClearActiveLab, labSetActive, labStartAddNew, labStartUpdate } from "../../actions/labs";
import { uiCloseModal } from "../../actions/ui";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const initElemento = {
    referencia: '',
    nombre: '',
    descripcion: '',
    estado: '',
    observaciones: '',
    proyectoId: '',
    categoriumId: '',
    grupoId: '',
}

const estados = ['Completo', 'Dañado']

// Modal

export const ElementoModal = () => {
    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState(initElemento);
    const { nombre, descripcion, referencia, estado, observaciones, proyectoId, categoriumId, grupoId } = formValues;
    const { activeElemento } = useSelector(state => state.elemento);
    const { proyectos } = useSelector(state => state.proyecto);
    const { categorias } = useSelector(state => state.categoria);
    const { gruposE } = useSelector(state => state.grupoE);

    const [nombreValido, setNombreValido] = useState(true);
    const [descripcionValida, setDescripcionValida] = useState(true);
    const [referenciaValida, setReferenciaValida] = useState(true);
    // const [estadoValido, setEstadoValido] = useState(true);
    const [observacionesValidas, setObservacionesValidas] = useState(true);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(elementoClearActiveelemento())
        dispatch(uiCloseModal());
    }

    useEffect(() => {
        if (activeElemento) {
            setFormValues(activeElemento);
        }
        else {
            setFormValues(initElemento);
        }
    }, [modalOpen])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setNombreValido(true);
        setDescripcionValida(true);
        setReferenciaValida(true);
        setObservacionesValidas(true);
        if (validator.isEmpty(nombre)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese el nombre", "error")
            setNombreValido(false);
            return;
        }
        if (validator.isEmpty(descripcion)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese la descripción", "error")
            setDescripcionValida(false);
            return;
        }
        if (!categoriumId) {
            Swal.fire("Error", "Seleccione una categoría", "error")
            return;
        }
        if(!proyectoId){
            Swal.fire("Error", "Seleccione un proyecto", "error")
            return;
        }
        if(!grupoId){
            Swal.fire("Error", "Seleccione un grupo", "error")
            return;
        }
        if(!estado){
            Swal.fire("Error", "Seleccione un estado del elemento", "error")
            return;
        }
        // if (laboratorioId.trim().length < 1) {
        //     Swal.fire("Error", "Debe seleccionar un laboratorio", "error")
        //     return;
        // }
        if (activeElemento) {
            dispatch(elementoStartUpdate(formValues))
        } else {
            dispatch(elementoStartAddNew(formValues))
        }
        setNombreValido(true)
        setDescripcionValida(true);
        closeModal()
    }

    return (
        <Modal isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >

            <ModalHeader>
                <div><h3>{(activeElemento) ? 'Editar elemento' : 'Nuevo elemento'} </h3></div>
            </ModalHeader>

            <ModalBody>

                <FormGroup>
                    <label>
                        Nombre:
                    </label>
                    <input
                        className={`form-control ${!nombreValido && 'is-invalid'}`}

                        name="nombre"
                        type="text"
                        value={nombre}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                        Referencia:
                    </label>
                    <input
                        className={`form-control ${!referenciaValida && 'is-invalid'}`}
                        name="referencia"
                        type="text"
                        value={referencia}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Descripción
                    </label>
                    <textarea
                        className={`form-control ${!descripcionValida && 'is-invalid'}`}
                        name="descripcion"
                        value={descripcion}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <label> Proyecto</label>
                <select name="proyectoId" id="proyectoId" className="form-control" value={proyectoId} onChange={handleInputChange}>
                    <option value="">-Seleccionar proyecto-</option>
                    {proyectos.map((proyecto) => <option value={proyecto.id}>{proyecto.nombre}</option>)}
                </select>

                <label> Categoría</label>
                <select name="categoriumId" id="categoriumId" className="form-control" value={categoriumId} onChange={handleInputChange}>
                    <option value="">-Seleccionar categoría-</option>
                    {categorias.map((categoria) => <option value={categoria.id}>{categoria.nombre}</option>)}
                </select>

                <label> Grupo </label>
                <select name="grupoId" id="grupoId" className="form-control" value={grupoId} onChange={handleInputChange}>
                    <option value="">-Seleccionar grupo-</option>
                    {gruposE.map((grupo) => <option value={grupo.id}>{grupo.nombre}</option>)}
                </select>

                <label> Estado </label>
                <select name="estado" id="estado" className="form-control" value={grupoId} onChange={handleInputChange}>
                    <option value="">-Seleccionar estado-</option>
                    {estados.map((estado) => <option value={estado}>{estado}</option>)}
                </select>
            </ModalBody>

            <ModalFooter>
                <Button
                    color="primary"
                    onClick={handleSubmitForm}
                >
                    Insertar
                </Button>
                <Button
                    className="btn btn-danger"
                    onClick={closeModal}
                >
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}