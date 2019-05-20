if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// --Inizializations
const app = express();
require('./database');

// --Settings
app.set('port', process.env.PORT || 3000);

// --Middlewares
app.use(morgan('dev'));
// Configure folder where the images will be saved
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, callback) {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('image'));
// Permitir interpretar los datos de un formulario como JSON
app.use(express.urlencoded({ extended: false }));
// Reconocer las peticiones AJAX
app.use(express.json());
// Hacer que dos servidores se puedan comunicar para consultar la API
app.use(cors());

// --Routes
app.use('/api/books', require('./routes/books'));

// --Static Files
app.use(express.static(path.join(__dirname, 'public')));

// --Start the server
app.listen(app.get('port'), () => {
    console.log('Serve on port', app.get('port'));
});
