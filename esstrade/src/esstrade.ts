/****************
 * REQUIRES
 ****************/
import "reflect-metadata";
import express, { Application } from 'express';
import { createConnection, Connection, ConnectionOptions } from "typeorm";

const esstrade: Application = express();

/****************
 * SQLITE
 ****************/

const db_options: ConnectionOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "esstrade",
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/models/*.ts"
    ]
}

createConnection(db_options)
    .then(connection => {
        //console.log(connection); 
        console.log('Database connected...!');
        console.log(connection.manager)
    })
    .catch(error => { console.log(error) });


/****************
 * ROUTERS
 ****************/
const indexRouter = require('./routes/indexRouter');

/****************
* MIDDLEWARES
****************/

//views
esstrade.set('views', ['./src/views', './src/views/auth']);
esstrade.set('view engine', 'pug');

//static public folder
esstrade.use(express.static('./src/public'));
//express json
esstrade.use(express.json())

/****************
* SERVER
****************/

esstrade.use('/', indexRouter);

esstrade.listen(7777, () => {
    console.log('Server running at port: ' + 7777)
});