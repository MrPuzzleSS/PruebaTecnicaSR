const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

class Server {
    constructor(){
        this.app = express()
        this.app.use(morgan('dev'));
        this.app.use(cookieParser());
        this.port = process.env.PORT;
        this.path = '/api';
        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.port,()=>{
          console.log(`Está escuchando por el puerto ${this.port}`);

        }
    )}

    middlewares() {
        this.app.use(express.static(__dirname + '/public'));
        this.app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }));
        this.app.use(bodyParser.json());
    }

    routes(){
        this.app.use(this.path,require('../routes/usuario.routes'))
        this.app.use(this.path,require('../routes/auth.routes'))
    }
}

module.exports = Server