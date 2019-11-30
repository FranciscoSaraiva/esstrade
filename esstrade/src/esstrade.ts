
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import clear from 'clear';
//local
import { MainMenu } from './presentation/main/main_menu';
import { SeedDatabase } from './database/seed';
import { Asset } from './entities/asset';


createConnection().then(async connection => {
    //console.log(connection)
    console.log(connection);
    clear();
    console.log('Connecting...')
    SeedDatabase()
        .then((assets: Asset[]) => {

            setInterval(function () {
                synchAssets(assets);
            }, 10000) //run assets on the side... 

            MainMenu(false, assets);
        })
        .catch(error => {
            console.log(error);
            console.log('Error connecting to the database...');
        })
}).catch(error => {
    console.log('An error occured creating the connection...')
    console.log(error)
})

async function synchAssets(assets: Asset[]) {
    for (let index = 0; index < assets.length; index++) {
        var asset = assets[index];
        await asset.UpdateAsset();
        await asset.save();
    }
}