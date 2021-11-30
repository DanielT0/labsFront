import userEvent from '@testing-library/user-event';
import React from 'react'

export const CalendarEvent = ({event}) => {
    const {idUsuario, observaciones} = event;
    return (
        <div>
            <span>{idUsuario}</span>
            <strong>- {observaciones}</strong>
        </div>
    )
}
