#!/usr/bin/env node

const http = require('http');
const url  = require('url');
const fs   = require('fs');


const PORT = 8080;
const DIR  = 'out/'

let number_of_requests = 0;

const server = http.createServer(

	(req, res) => {

		++number_of_requests;

		console.log(
			"Received request number \033[1;32m" + number_of_requests +
			"\033[0m: \033[1m" + req.url + "\033[0m"
		);

		const url_object = url.parse(req.url);
		const file_id    = url_object.pathname.substring(1);
		const filename   = `${DIR}arq${file_id}.xml`;


		fs.readFile(

			filename,

			(err, data) => {

				if(err){

					res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});

					res.write(`Error loading file '${filename}': ${err.message}`);

					console.log(
						"\033[1;31mError\033[0m: Request '" + req.url +
						"' yielded an error: \033[1m" + err.message + "\033[0m"
					);
				}
				else{

					res.writeHead(200, {'Content-Type': 'text/xml; charset=utf-8'});
					res.write(data);
				}

				res.end();
			}
		);
	}
);

server.listen(PORT);

console.log(`Server now listening on port ${PORT}...`);
