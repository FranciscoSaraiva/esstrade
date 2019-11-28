
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import clear from 'clear';
//local
import { MainMenu } from './views/main_menu';
import { SeedDatabase } from './database/seed';
import { Asset } from './classes/asset';

//run constant updates to the assets...
async function SynchAssets() {
    var assets = await getRepository(Asset).find();
    for (let index = 0; index < assets.length; index++) {
        var asset = assets[index];
        await asset.UpdateAsset();
        await asset.save();
    }
}

createConnection().then(connection => {
    //console.log(connection)
    console.log(connection);
    clear();
    console.log('Connecting...')
    SeedDatabase()
        .then(() => {
            MainMenu(false);

            setInterval(SynchAssets, 10000) //run assets on the side...
        })
        .catch(error => {
            console.log(error);
            console.log('Error connecting to the database...');
        })
})
