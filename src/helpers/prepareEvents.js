import moment from "moment"

export const prepareEvents = ( events=[] )=>{
    
    return events.map(
        (e) => ({
            ...e,
            fechaDevolucion : moment(e.fechaDevolucion).toDate(),
            fechaPrestamo: moment(e.fechaPrestamo).toDate(),
            start: moment(e.fechaPrestamo).toDate(),
            end: moment(e.fechaDevolucion).toDate(),
            title: e.observaciones
        })
    )
}