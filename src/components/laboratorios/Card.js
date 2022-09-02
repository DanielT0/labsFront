import * as React from 'react';
import Swal from "sweetalert2"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { labClearActiveLab, labSetActive, labsStartLoading, labStartDelete } from "../../actions/labs";
import { proySetActive } from "../../actions/proyectos";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
    Button,
} from "reactstrap";


import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const CardAct = ({ dato }) => {
    // console.log(dato);
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    const dispatch = useDispatch()

    const handleDelete = (lab) => {
        Swal.fire({
            title: '¿Seguro que quieres eliminiar este laboratorio?',
            text: "La información eliminada no podrá ser recuperada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(labStartDelete(lab));
            }
        })
    }

    const mostrarModalActualizar = (e) => {
        dispatch(uiOpenModal())
        dispatch(labSetActive(e))
        dispatch(proySetActive(e))
    }

    return (
        <div class="card-lab">
            <div class="card__content">
                <h4 class="tarjeta-lab-title">{dato.nombre}</h4>
                <span class="card-description">
                        {dato.descripcion}
                    </span>
            </div>
        </div>
    );
}
