const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(80, function(){
    console.log("Server running on port %d", this.address().port);
});