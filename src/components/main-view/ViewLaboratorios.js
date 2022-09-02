import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Sidebar } from '../sidebar/sidebar';
import { LabRegister } from '../laboratorios/labRegister';


moment.locale('es');

// const events = [
//     {
//         cantidad: '',
//         usuario: '',
//         elemento: '',
//         observaciones: '',
//         start: moment().toDate(),
//         end: moment().add(2, 'hours').toDate(),
//         user:{
//             _id:'123',
//             name: 'fernando'
//         }
//     }
// ]

export const ViewLaboratorios = () => {


    return (
        <div className="calendar-screen">
            <Navbar />
            <div>
                <Sidebar />
            </div>
        </div>
    )
}
