
const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');

(async() => {
    
    const port =  process.env.PORT || 3000
    const app = express();
    app.use(bodyParser.json());
    
    app.use(function (req, res, next) {
        //Enabling CORS 
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
        next();
    });
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.get('/', (req, res) => {
        res.send('Welcome to API');
    });
    
    /*
        TODO : get data of JSON file
    */
    app.get('/incident', async(req, res) => {
        try {
            
            let fileContent = await fs.readFileSync('./data/incident.json', 'utf-8');
            let parsedContent = await JSON.parse(fileContent);
            res.status(201).send(parsedContent);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
    
    /*
        TODO : add new data to the JSON file
    */
    app.post('/incident', async(req, res) => {
        try {
            let fileContent = await fs.readFileSync('./data/incident.json', 'utf-8');
            let parsedContent = await JSON.parse(fileContent);
            let checkIsArray = Array.isArray(parsedContent);
            if(checkIsArray){
                if(req.body){
    
                    await parsedContent.push(req.body);
                    await fs.writeFileSync('./data/incident.json', JSON.stringify(parsedContent), 'utf-8')
                    res.sendStatus(200);
                }else{
                    throw new Error('Kindly pass some data in request body')
                }
            }else{
                throw new Error('content is not an array')
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
    
    app.listen(port, () => {
        //logging
        console.log(`DUMP JSON API listening on port ${port}`);
    });

})();