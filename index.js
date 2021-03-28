// dependencies
const express = require('express');
const app = express();


// create route
app.get('/', (req, res) => {
    res.send('I am form node js');
});
app.get('/test', (req, res) => {
    res.send('I am form test js');
});
app.get('*', (req, res) => {
    res.send('404 Not Found');
});
// create server
app.listen(3000, () => {
    console.log('Server run on the port 3000');
});