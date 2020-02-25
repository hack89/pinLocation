const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const helmet = require('helmet');
const logs = require('./src/api/logs')
const app = express();
const cors = require('cors');
// const path = require('path')
const middlewaes = require('./src/middleware')
const port = process.env.PORT || 8080;
require('dotenv/config')

app.use(cors());

app.use(express.json())
app.use(morgan('common'));
app.use(helmet());


app.get('/', (req, res) => {
    res.json({
        message: 'this is the root'
    })
})

app.use('/api/logs', logs)




app.use(middlewaes.notFound)
app.use(middlewaes.errorHandler)


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => console.log('DB connectded!'))





// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
//     })
// }

app.listen(port, () => console.log(`Server listening at port ${port}`));