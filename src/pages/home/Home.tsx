import React from 'react'
import { CardFruit } from './components/cardFruit/CardFruit';
import styles from './Home.module.scss';
import { UseHome } from './UseHome';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IFruitsResponse } from '../../interfaces/IFruits'
import { useAuth } from '../../contexts/auth/AuthContext';
import { MdExitToApp } from 'react-icons/md';

export const Home = () => {

    const { handleAddFruit, cartItemsAmount, filteredFruits } = UseHome();
    const {
        handleLogout
    } = useAuth();

    return (
        <div id={styles.Home}>
            <div>
                <div className={styles.logout}>
                    <button onClick={handleLogout}>
                        sair
                        <MdExitToApp />
                    </button>
                </div>
                {/* <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={filteredFruits}
                    getOptionLabel={(option: IFruitsResponse) => option.title}
                   // getOptionSelected={}
                    renderInput={(params) => (
                        <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
                    )}
                /> */}
            </div>
            <CardFruit
                fruitList={filteredFruits}
                handleAddFruit={handleAddFruit}
                cartItemsAmount={cartItemsAmount}
            />
        </div>
    );
}
