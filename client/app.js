const express = require('express');
const app = express();

app.use(express.static(__dirname + '/static'));

app.listen(3001, function () {
    console.log('Example app listening on port http://localhost:3001/');
});
