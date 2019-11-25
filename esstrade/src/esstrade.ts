
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import clear from 'clear';
//local
import { MainMenu } from './menus/mainmenu';

console.log('');
clear();

createConnection()
    .then(async connection => {
        console.log(connection);

        let queryR = connection.createQueryRunner();
        let hasDB = await queryR.hasDatabase("esstrade");
        console.log(hasDB);
        MainMenu();
    })
    .catch(error => {
        console.log("An error connecting to the database occured...");
        console.log(error)
    })
