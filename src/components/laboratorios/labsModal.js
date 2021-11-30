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
import { labStartAddNew, labStartUpdate } from "../../actions/labs";
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

const initLab = {
    nombre: '',
    descripcion: '',
}

// Modal

export const LabModal = () => {
    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState(initLab)
    const { nombre, descripcion } = formValues
    const { activeLab, labId } = useSelector(state => state.lab);

    const [nombreValido, setNombreValido] = useState(true)
    const [descripcionValida, setDescripcionValida] = useState(true)

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    useEffect(() => {
        if (activeLab) {
            setFormValues(activeLab);
        } else {
            setFormValues(initLab);
        }
    }, [activeLab, setFormValues])

    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        setFormValues(initLab);
    }

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
        if (activeLab) {
            dispatch(labStartUpdate(formValues))
        } else {
            dispatch(labStartAddNew(formValues))
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
                <div><h3>{(activeLab) ? 'Editar laboratorio' : 'Nuevo laboratorio'} </h3></div>
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