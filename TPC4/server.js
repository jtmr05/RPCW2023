#!/usr/bin/env node

const fs       = require('fs');
const url      = require('url');
const http     = require('http');
const axios    = require('axios');
const querystr = require('querystring');


const PORT          = 8000;
const DB_CONNECTION = 'http://localhost:3000/tasks';

let taskIdCounter   = 1;

const writePage = (code, res) => {

    const page = require('./htmlPage.js');

    axios.get(`${DB_CONNECTION}?_sort=date&_order=asc`)
		.then(

			response => {

				let pendingTasks   = response.data.filter(e => !e.isCompleted);
				let completedTasks = response.data.filter(e => e.isCompleted);

				res.writeHead(code, {'Content-Type' : 'text/html; charset=utf-8'});
				res.write(page.getPage(pendingTasks, completedTasks));
				res.end();
			}
		)
        .catch(err => console.log(err));
};

const handleGetRequest = (reqUrl, res) => {

    const urlObject = url.parse(reqUrl);

    if(urlObject.pathname === '/')
        writePage(200, res);

    else {

        const path = urlObject.pathname.substring(1);

        fs.readFile(

            path,

            (err, data) => {

                if(!err){
                    //TODO get correct mimetype
                    res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
                    res.write(data);
                }
                else {
                    res.writeHead(404, {'Content-Type' : 'text/plain; charset=utf-8'});
                    res.write(`Error reading file ${path}: ${err}`);

                    console.log(`${err} for request ${reqUrl}`);
                }

                res.end();
            }
        );
    }
};

const handlePostRequest = (req, res) => {

    let body = '';

    req.on(

        'data',

        chunk => body += chunk.toString()
    );

    req.on(

        'end',

        () => {

            let task = querystr.parse(body);

            let isValid = true;

            for(const [k, v] of Object.entries(task))

                if(v === ''){
                    isValid = false;
                    break;
                }

            if(isValid){
                task.isCompleted = false;
                task.id = taskIdCounter++;

                axios.post(DB_CONNECTION, task)
                    .then(resp => console.log(resp.status))
                    .catch(err => console.log(`Error: ${err}`));
            }

            writePage(201, res);
        }
    );
};

const handleRequest = (req, res) => {

    switch(req.method){

        case 'GET':
            handleGetRequest(req.url, res);
            break;

        case 'POST':
            handlePostRequest(req, res);
            break;

        case 'DELETE':
            break;

        default: {}
    }
};


http.createServer(

    (req, res) => {

        console.log(`Got request ${req.url} @ ${new Date().toISOString()}`);

        handleRequest(req, res);
    }
).listen(

    PORT,

    () =>
        console.log(`Server now listening on port ${PORT}`)
);
