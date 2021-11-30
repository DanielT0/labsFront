import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { labClearActiveLab, labSetActive, labsStartLoading, labStartDelete } from "../../actions/labs";
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
    console.log(dato);
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
        dispatch(labStartDelete(lab));
    }

    const mostrarModalActualizar = (e) =>{
        dispatch(uiOpenModal())
        dispatch(labSetActive(e))
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    {dato.nombre}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {dato.descripcion}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    color="primary"
                    onClick={() => mostrarModalActualizar(dato)}
                >
                    Editar
                </Button>{" "}
                <Button color="danger"
                    onClick={() => handleDelete(dato)}
                >Eliminar</Button>
            </CardActions>
        </Card>
    );
}
