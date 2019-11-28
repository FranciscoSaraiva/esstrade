
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import clear from 'clear';
//local
import { MainMenu } from './views/main_menu';
import { SeedDatabase } from './database/seed';
import { Asset } from './classes/asset';

//run constant updates to the assets...


createConnection().then(async connection => {
    //console.log(connection)
    console.log(connection);
    clear();
    console.log('Connecting...')
    SeedDatabase()
        .then((assets: Asset[]) => {
            MainMenu(false, assets);

/*             setInterval(async function (assets: Asset[]) {
                console.log(assets);
                for (let index = 0; index < assets.length; index++) {
                    var asset = assets[index];
                    await asset.UpdateAsset();
                    await asset.save();
                }
            }, 10000) //run assets on the side... */
        })
        .catch(error => {
            console.log(error);
            console.log('Error connecting to the database...');
        })
})
