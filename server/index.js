require('dotenv').config()
const express = require('express') 
const fileupload = require('express-fileupload')
const path = require('path')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    } catch (error) {
        console.log(error);
    }
}

start()