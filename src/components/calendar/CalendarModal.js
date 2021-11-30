import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';
import Swal from 'sweetalert2';
import { usersStartLoading } from '../../actions/users';
import { elementsStartLoading } from '../../actions/elements';

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

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    cantidad: '',
    idUsuario: '',
    idElemento: '',
    observaciones: '',
    fechaPrestamo: moment().toDate(),
    fechaDevolucion: moment().add(2, 'hours').toDate(),
    user: {
        _id: '123',
        name: 'fernando'
    }
}

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const [dateStart, setdateStart] = useState(now.toDate());
    const [dateEnd, setdateEnd] = useState(nowPlus1.toDate());
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initEvent);
    const { observaciones, cantidad, idUsuario, idElemento, fechaPrestamo, fechaDevolucion } = formValues
    const [cantidadValida, setCantidadValida] = useState(true)
    const { users } = useSelector(state => state.user);
    const { elements } = useSelector(state => state.element);

    const [isOpen, setisOpen] = useState(true);

    useEffect(() => {
        dispatch(usersStartLoading())
        dispatch(elementsStartLoading())
        if (activeEvent) {
            setFormValues(activeEvent);
            setdateStart(fechaPrestamo)
            setdateEnd(fechaDevolucion)
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment(fechaPrestamo)
        const momentEnd = moment(fechaDevolucion)

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire("Error", "La fecha de devolución debe de ser mayor a la de préstamo", "error")
            return;
        }

        if (!cantidad) {
            setCantidadValida(false);
            return
        }

        if(idUsuario.trim().length<1 || idElemento.trim().length<1){
            Swal.fire("Error", "Debe seleccionar un usuario y un elemento", "error")
            return;
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {
            dispatch(eventStartAddNew(formValues))
        }

        setCantidadValida(true);
        closeModal();
    }

    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }

    const handleStartDateChange = (e) => {
        setdateStart(e);
        setFormValues({
            ...formValues,
            fechaPrestamo: e
        })
    }

    const handleEndDateChange = (e) => {
        setdateEnd(e);
        setFormValues({
            ...formValues,
            fechaDevolucion: e
        })
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {(activeEvent) ? 'Editar Préstamo' : 'Nuevo préstamo'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Usuario</label>
                    <select name="idUsuario" id="idUsuario" className="form-control" value={idUsuario} onChange={handleInputChange}>
                    <option value="">-Seleccionar usuario-</option>
                        {users.map((user) => <option value={user._id}>{user.name}</option>)}
                    </select>
                    <label>Elemento</label>
                    <select name="idElemento" id="idElemento" className="form-control" value={idElemento} onChange={handleInputChange}>
                        <option value="">-Seleccionar elemento--</option>
                        {elements.map((elemento) => <option value={elemento._id}>{elemento.nombre}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha y hora del préstamo</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={fechaPrestamo}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora devolución</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={fechaDevolucion}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        className={`form-control ${!cantidadValida && 'is-invalid'}`}
                        placeholder="Cantidad"
                        name="cantidad"
                        value={cantidad}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Observaciones</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Observaciones"
                        rows="2"
                        name="observaciones"
                        value={observaciones}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
