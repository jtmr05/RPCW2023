#!/usr/bin/env node

const http    = require('http');
const fs      = require('fs');
const url     = require('url');
const axios   = require('axios');
const myPages = require('./myPages');

const W3CSS_PATH = 'resources/w3.css';
const PORT       = 8000;

http.createServer(

	(req, res) => {

		console.log(`${req.method} ${req.url} ${new Date().toISOString().substring(0,16)}`);

		const dictUrl = url.parse(req.url, true);

		if(dictUrl.pathname === '/'){

			axios.get('http://localhost:3000/pessoas')
				.then(

					resp => {

						const people = resp.data;

						res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
						res.end(myPages.pessoasPage(people));
					}

				)
				.catch(

					error => {

						console.log(`Error: ${error}`);
						res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
						res.end(`Error: ${error}`);
					}
				);
		}
		else if(dictUrl.pathname === '/ordenada'){

			axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
				.then(

					resp => {

						const people = resp.data;

						res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
						res.end(myPages.pessoasPage(people));
					}

				)
				.catch(

					error => {

						console.log(`Error: ${error}`);
						res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
						res.end(`Error: ${error}`);
					}
				);
		}
		else if(dictUrl.pathname === '/ordenadaV2'){

			axios.get('http://localhost:3000/pessoas')
				.then(

					resp => {

						const people = resp.data.sort(
							(p1, p2) => (p1.nome < p2.nome) ? -1 : (p1.nome > p2.nome ? 1 : 0)
						);

						res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
						res.end(myPages.pessoasPage(people));
					}

				)
				.catch(

					error => {

						console.log(`Error: ${error}`);
						res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
						res.end(`Error: ${error}`);
					}
				);
		}
		else if(dictUrl.pathname === '/w3.css'){

			fs.readFile(

				W3CSS_PATH,

				(error, data) => {

					res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});

					if(error)
						res.write(`Error: ${error}`);
					else
						res.write(data);

					res.end();
				}
			);
		}
		else {
			res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
			res.end(`Error: Operation not supported`);
		}
	}
).listen(PORT);


console.log("Listening on port 8000...");
