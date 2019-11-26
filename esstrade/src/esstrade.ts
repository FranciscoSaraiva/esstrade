
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import clear from 'clear';
//local
import { MainMenu } from './menus/main_menu';
import { SeedDatabase } from './database/seed';

createConnection().then(connection => {
    //console.log(connection)
    console.log(connection);
    clear();
    console.log('Connected...')
    SeedDatabase()
        .then(() => {
            MainMenu(false);
        })
        .catch(error => {
            console.log(error);
            console.log('Error connecting to the database...');
        })
})
