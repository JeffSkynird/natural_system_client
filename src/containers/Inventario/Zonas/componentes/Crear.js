import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../../store/Initializer'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Slide from '@material-ui/core/Slide';
import { Avatar, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { editar as editarBodega, registrar as registrarBodega } from '../../../../utils/API/zones';
import { obtenerTodos as obtenerCiudades } from '../../../../utils/API/ciudades';
import { Autocomplete } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [jpcode, setJpcode] = React.useState("")
    const [supplierCode, setSupplirCode] = React.useState("")
    const [serie, setSerie] = React.useState("")
    const [zone, setZone] = React.useState("")
    const [zoneData, setZoneData] = React.useState([])
    const [image, setImage] = React.useState("")

    const [stock, setStock] = React.useState("")
    const [stockMin, setStockMin] = React.useState("")
    const [stockMax, setStockMax] = React.useState("")


    const [city, setCity] = React.useState("")
    const [cityData, setCityData] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {

            obtenerCiudades(setCityData,initializer)
        }
  
}, [initializer.usuario])
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.name)
            setCity(props.sistema.city_id)
        }
    },[props.sistema])
    const guardar=()=>{
        let data={ 
        'name': nombre,
        'city_id': city}
        if(props.sistema==null){
            registrarBodega(data,initializer)
            limpiar()
        }else{
            editarBodega(props.sistema.id,data,initializer)
            limpiar()

        }
        props.setOpen(false)
        props.carga()
    }
    const limpiar=()=>{
        setNombre("")
           

        setCity("")
        props.setSelected(null)
        props.carga()
    }
    const getName = (id) => {
        let object = null
        cityData.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
                limpiar()
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Zonas</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {props.sistema!=null?"Formulario de edición de zonas": "Formulario de creación de zonas"}
                </DialogContentText>
            
                <Grid container spacing={2}>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                   
                  
                    
                     <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete
                      
                            style={{ width: '100%'}}
                                options={cityData}
                                value={getName(city)}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => {
                                    if (value != null) {

                                        setCity(value.id)
                                    } else {

                                        setCity('')

                                    }

                                }} // prints the selected value
                                renderInput={params => (
                                    <TextField {...params} label="Seleccione una ciudad" variant="outlined" fullWidth />
                                )}
                            />
                           
                        </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
