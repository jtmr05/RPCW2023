#!/usr/bin/env node

const axios = require('axios');

axios.get("http://localhost:3000/pessoas")
	.then(

		resp => {

			const people = resp.data;
			console.log(typeof(people));
			console.dir(people[3].nome);
			console.log(`Recovered ${people.length} people`);
		}

	)
	.catch(

		error => {

			console.log(`Error: ${error}`);
		}
	);



