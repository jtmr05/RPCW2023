#!/usr/bin/env node

const http = require('http');
const url  = require('url');
const fs   = require('fs');


const PORT = 8080;
const DIR  = 'out/'


function annotate(str, ...ansiEscapeCodes){

	if(ansiEscapeCodes.length === 0)
		return str;

	let result = '\033[' + ansiEscapeCodes.at(0);

	for(let i = 1; i < ansiEscapeCodes.length; ++i){
		result += ';' + ansiEscapeCodes.at(i);
	}

	result += 'm' + str + '\033[0m';

	return result;
}


let numberOfRequests = 0;

const server = http.createServer(

	(req, res) => {

		++numberOfRequests;

		console.log(
			"Received request number " + annotate(numberOfRequests, 1, 32) +
			": " + annotate(req.url, 1)
		);

		const urlObject = url.parse(req.url);
		const fileId    = urlObject.pathname.substring(1);
		const filename  = (fileId === '') ? 'index.html' : `${DIR}arq${fileId}.xml`;
		const mimeType  = (fileId === '') ? 'text/html'  : 'text/xml';


		fs.readFile(

			filename,

			(err, data) => {

				if(err){

					res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});

					res.write(`Error loading file '${filename}': ${err.message}`);

					console.log(
						annotate("Error", 1, 31) +
						`: Request '${req.url}' yielded an error: ` +
						annotate(err.message, 1)
					);
				}
				else{

					res.writeHead(200, {'Content-Type': `${mimeType}; charset=utf-8`});
					res.write(data);
				}

				res.end();
			}
		);
	}
);

server.listen(PORT);

console.log(`Server now listening on port ${PORT}...`);
