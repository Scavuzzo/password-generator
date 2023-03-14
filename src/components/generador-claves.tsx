import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import  Collapse  from '@mui/material/Collapse';
import Close from '@mui/icons-material/Close';
import styles from 'styles/generador-claves.module.scss'
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const PassGen = () => {
    const simb = "0123456789qwertyuiopasdfghj!@#$%?klñzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%?";
    const alfanum = "0123456789qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    const alfa = "qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    const num = "0123456789";
    const [open, setOpen] = useState<boolean>(false);

    const [password, setPass] = useState<string>("");

    const select = useRef<HTMLSelectElement>(null);
    const number = useRef<HTMLInputElement>(null);

    const Generador = () => {
        const n = Number(number?.current?.value);
        const format = select?.current?.value;
        let pass = "";
        let f;

        if (format === "Alfa-simb") {
            f = simb;
        } else if (format === "Alfa-num") {
            f = alfanum;
        } else if (format === "Alfa") {
            f = alfa;
        } else {
            f = num;
        }
        
        n > 0 ? setOpen(true) : setOpen(false);

        for (let i = 0; i < n; i++) {
            pass += f[Math.floor(Math.random() * f.length)];
        }
        setPass(pass);
    }

    navigator.clipboard.writeText(password);

    return (
        <main className={styles.generador}>
            <Box sx={{
                    maxWidth: {xs: '100%', sm: 550},
                    margin: 'auto',
                }} 
                className={styles.container} 
            >
                <h2>GENERADOR DE CLAVES</h2>
                <Box 
                    className={styles.options}
                    sx={{
                        '& div': {
                            flexDirection: {xs: 'column', sm: 'row'}    
                        },
                        '& label' :{
                            marginBottom: {xs: '10px', md: 0},
                            fontSize: { xs: '14px', md: '16px' }
                        }
                    }}    
                >
                    <div className={styles.options__select}>
                        <label htmlFor="format">Formato:</label>
                        <select name="format" ref={select}>
                            <option value="Alfa-simb">Alfanum + Simbolos</option>
                            <option value="Alfa-num">Alfanumérico</option>
                            <option value="Alfa">Alfabeto</option>
                            <option value="Num">Numérico</option>
                        </select>
                    </div>
                    <div className={styles.options__num}>
                        <label htmlFor="num">Cantidad de caracteres:</label>
                        <input type="number" name="num" min="1" max="32" ref={number} defaultValue={8} />
                    </div>
                </Box>
                <Typography 
                    className={styles.input}
                    sx={{
                        width: {xs: '100%'},
                        minWidth: {xs: 'auto', sm: 520},
                        marginBottom: '25px',
                        whiteSpace: {xs: 'wrap', sm: 'nowrap'}
                    }}
                >{password || 'Presiona empezar'}</Typography>
                <Collapse 
                    className={styles.collapse} 
                    in={open}
                    sx={{
                        position: 'absolute',
                        bottom: {xs: -80, sm: -60}
                    }}
                >
                    <Alert className={styles.alert} action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}>
                            <Close fontSize="inherit" />
                        </IconButton>
                    }>
                        La contraseña se ha copiado al portapapeles
                    </Alert>
                </Collapse>
                <Button
                    style={{
                        backgroundColor: '#53315E',
                        fontFamily: 'Press Start 2P',
                        fontSize: 14,
                        color: '#000',
                        display: 'block'
                    }}
                    onClick={() => { Generador(); }} 
                    variant="contained" 
                    className={styles.button}>EMPEZAR</Button>

            </Box>
        </main>
    )
}
    

export default PassGen;
// ReactDOM.render(< PassGen selectid="sel" numberid="num" passid="pass"/>, document.getElementById('root'));

// (select.current.value === null ? <p>Elige la cantidad de caracteres</p> : <p>Toca para empezar</p>)