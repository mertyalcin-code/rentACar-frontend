const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/rent-acar'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/rent-acar/'}),
);

ngApp.listen(process.env.PORT || 8080);