const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');



const hostname = 'localhost';
const port = 3000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.all('/dishes',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
});
app.get('/dishes',(req,res,next)=>{
    res.end('Will Send all dishes to You!');
});
app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish: '+req.body.name + 'with detail :' + req.body.description);
});
app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403;
    res.end('Put Operation Not Supported on Dishes');
});
app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting All the Dishes');
});

app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will Send Details of the dish: '+ req.params.dishId+' to You!');
});
app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end('Post Operation is not supported on /dishesh' + req.params.dishId);
});
app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish'+ req.params.dishId+ '\n');
    res.end('Will Update The dish' + req.body.name + 'with detail :' + req.body.description);
});
app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Deleting The dish'+ req.params.dishId);
});

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    res.statusCode =200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is Express Server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`Server Runnig at http://${hostname}: ${port}`);
})