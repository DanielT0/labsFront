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
// import { labClearActiveLab, labSetActive, labStartAddNew, labStartUpdate } from "../../actions/labs";
import { proyectoStartUpdate, proyClearActiveProy, proyectoStartAddNew } from "../../actions/proyectos";
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

const initProy = {
    nombre: '',
    descripcion: '',
    laboratorioId: '',
}

// Modal

export const ProyectoModal = () => {
    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState(initProy);
    const { nombre, descripcion, laboratorioId } = formValues;
    const { activeProy, labId } = useSelector(state => state.proyecto);
    const { labs } = useSelector(state => state.lab);

    const [nombreValido, setNombreValido] = useState(true)
    const [descripcionValida, setDescripcionValida] = useState(true)


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(proyClearActiveProy())
        dispatch(uiCloseModal());
    }

    useEffect(()=>{

    },[])

    useEffect(() => {
        if (activeProy) {
            setFormValues(activeProy);
        }
        else {
            setFormValues(initProy);
        }
    }, [modalOpen])

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (validator.isEmpty(nombre)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese el nombre", "error")
            setNombreValido(false);
            setDescripcionValida(true);
            return;
        }
        if (validator.isEmpty(descripcion)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese la descripción", "error")
            setDescripcionValida(false);
            setNombreValido(true);
            return;
        }
        console.log(laboratorioId);
        // if (laboratorioId.trim().length < 1) {
        //     Swal.fire("Error", "Debe seleccionar un laboratorio", "error")
        //     return;
        // }
        if (activeProy) {
            dispatch(proyectoStartUpdate(formValues))
        } else {
            dispatch(proyectoStartAddNew(formValues))
        }
        setDescripcionValida(true);
        setNombreValido(true)
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
                <div><h3>{(activeProy) ? 'Editar proyecto' : 'Nuevo proyecto'} </h3></div>
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
                        Descripcion:
                    </label>
                    <input
                        className={`form-control ${!descripcionValida && 'is-invalid'}`}
                        name="descripcion"
                        type="text"
                        value={descripcion}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <label>Laboratorio</label>
                <select name="laboratorioId" id="laboratorioId" className="form-control" value={laboratorioId} onChange={handleInputChange}>
                    <option value="">-Seleccionar laboratorio-</option>
                    {labs.map((lab) => <option value={lab.id}>{lab.nombre}</option>)}
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