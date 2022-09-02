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
import { categoriaClearActiveCategoria } from "../../actions/categoria";
// import { labClearActiveLab, labSetActive, labStartAddNew, labStartUpdate } from "../../actions/labs";
import { categoriaStartUpdate, categoriaClearActiveProy, categoriaStartAddNew } from "../../actions/categoria";
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

const initCategoria = {
    nombre: '',
}

// Modal

export const CategoriaModal = () => {
    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState(initCategoria);
    const { nombre } = formValues;
    const { activeCategoria } = useSelector(state => state.categoria);

    const [nombreValido, setNombreValido] = useState(true)


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(categoriaClearActiveCategoria())
        dispatch(uiCloseModal());
    }

    useEffect(()=>{

    },[])

    useEffect(() => {
        if (activeCategoria) {
            setFormValues(activeCategoria);
        }
        else {
            setFormValues(initCategoria);
        }
    }, [modalOpen])

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (validator.isEmpty(nombre)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese el nombre", "error")
            setNombreValido(false);
            return;
        }
        if (activeCategoria) {
            dispatch(categoriaStartUpdate(formValues))
        } else {
            dispatch(categoriaStartAddNew(formValues))
        }
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
                <div><h3>{(activeCategoria) ? 'Editar categoría' : 'Nueva categoría'} </h3></div>
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