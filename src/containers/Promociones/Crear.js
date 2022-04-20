import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { convertirDate, dateFormat } from "../../utils/Date";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";

import { registrar } from "../../utils/API/promociones";


import {  uploadFiles } from "../../utils/API/clientes";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../store/Initializer'

export default function Crear(props) {
    const initializer = useContext(Initializer);

    
    
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");


  
  
    const editar = () => {
   
        registrar({
    

            title: titulo,
            description:descripcion

        },atras, initializer);
  


    }

    const atras=()=>{
        props.history.push("/promociones")
    }
    const limpiar=()=>{
        setTitulo("")
        setDescripcion("")
    }
    return (
        <Box mt={2} ml={2} mr={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link color="inherit" onClick={() => props.history.push("dashboard")}>
                    Dashboard
        </Link>
                <Link color="inherit" onClick={() => props.history.push("/promociones")}>
                    Promociones
        </Link>
                <Typography color="textPrimary">Crear</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                  Crear Promoción
                </Typography>
            </Box>

            <Card>
                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={1}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    label="Título"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    value={titulo}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    label="Descripción"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    value={descripcion}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            </Grid>
                           </form>
                </CardContent>
                <CardActions>
                    <Button startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={() => editar()}>
                        Guardar
                    </Button>
                    <Button startIcon={<DeleteOutlineIcon />} variant="contained" color="default" onClick={() => limpiar()}>
                        Limpiar
                    </Button>
                    <Button startIcon={<ClearIcon />} variant="contained" color="default" onClick={() => atras()}>
                        Cancelar
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
