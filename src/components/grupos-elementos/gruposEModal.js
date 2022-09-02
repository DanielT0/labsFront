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
import { grupoEClearActivegrupoE, grupoEStartUpdate, grupoEStartAddNew } from "../../actions/grupoElemento";
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

const initGrupoE = {
    nombre: '',
    foto: '',
    minimo: '',
    laboratorioId: '',
}

// Modal

export const GrupoEModal = () => {
    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState(initGrupoE);
    const { nombre, laboratorioId, foto, minimo } = formValues;
    const { activeGrupoE} = useSelector(state => state.grupoE);
    const { labs } = useSelector(state => state.lab);

    const [nombreValido, setNombreValido] = useState(true);
    const [fotoValida, setFotoValida] = useState(true);
    const [minimoValido, setMinimoValido] = useState(true);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(grupoEClearActivegrupoE())
        dispatch(uiCloseModal());
    }

    useEffect(() => {
        if (activeGrupoE) {
            setFormValues(activeGrupoE);
        }
        else {
            setFormValues(initGrupoE);
        }
    }, [modalOpen])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setNombreValido(true);
        setFotoValida(true);
        setMinimoValido(true);
        if (validator.isEmpty(nombre)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese el nombre", "error")
            setNombreValido(false);
            return;
        }
        if (validator.isEmpty(foto)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese la foto", "error")
            setFotoValida(false);
            return;
        }
        if (validator.isEmpty(minimo)) {
            Swal.fire("Error", "No pueden haber campos vacíos, ingrese la cantidad mínima de productos deseados en inventario", "error")
            setMinimoValido(false);
            return;
        }
        if (validator.isEmpty(laboratorioId)) {
            Swal.fire("Error", "Seleccione un laboratorio", "error")
            return;
        }
        console.log(laboratorioId);
        // if (laboratorioId.trim().length < 1) {
        //     Swal.fire("Error", "Debe seleccionar un laboratorio", "error")
        //     return;
        // }
        if (activeGrupoE) {
            dispatch(grupoEStartUpdate(formValues))
        } else {
            dispatch(grupoEStartAddNew(formValues))
        }
        setNombreValido(true)
        setFotoValida(true);
        setMinimoValido(true);
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
                <div><h3>{(activeGrupoE) ? 'Editar grupo' : 'Nuevo grupo'} </h3></div>
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
                        Foto:
                    </label>
                    <input
                        className={`form-control ${!fotoValida && 'is-invalid'}`}
                        name="foto"
                        type="text"
                        value={foto}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Cantidad mínima en inventario:
                    </label>
                    <input
                        className={`form-control ${!minimoValido && 'is-invalid'}`}
                        name="minimo"
                        type="text"
                        value={minimo}
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