const http = require('http');
const express = require('express');
const { mainRouter } = require('./routers');

const PORT = 8080
const app = express();
app.use('/api/', mainRouter);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});