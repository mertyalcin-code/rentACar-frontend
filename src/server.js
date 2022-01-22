const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/rentACar'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/rentACar/index.html'));
});
ngApp.listen(process.env.PORT || 8080);