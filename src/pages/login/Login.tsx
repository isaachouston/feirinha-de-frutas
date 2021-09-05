import { Button, Input } from '@material-ui/core'
import React from 'react'
import styles from './Login.module.scss'
import logo from '../../assets/feirinha-de-frutas.png'
import { useAuth } from '../../contexts/auth/AuthContext'



export const Login = () => {

    const {
        values,
        handleSubmit,
        changeHandle,
    } = useAuth();

    return (
        <div id={styles.Login}>
            <div className={styles.container} >
                <div className={styles.logo} >
                    <img width={200} height={100} src={logo} />
                </div>
                <form className={styles.form} onSubmit={(ev) => handleSubmit(ev)}>
                    <div className={styles.input} >
                        <label>
                            E-mail
                        </label>
                        <Input
                            name={"userName"}
                            fullWidth
                            value={values?.userName}
                            onChange={(ev) => changeHandle(ev)}
                        ></Input>
                    </div>
                    <div className={styles.input} >
                        <label>
                            Senha
                        </label>
                        <Input
                            name={"password"}
                            fullWidth
                            value={values?.password}
                            onChange={(ev) => changeHandle(ev)}
                            type="password"
                        ></Input>
                    </div>

                    <div className={styles.button} >
                        <button type={"submit"}>Entrar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
