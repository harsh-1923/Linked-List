const connectToMongo = require('./db');
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const path = require('path');
connectToMongo();


app.use(cors())
app.use(express.json())// middleware to deal with json

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/workspace', require('./routes/workspace'));

app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Note X server listening on port ${port}`)
})