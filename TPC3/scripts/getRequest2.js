#!/usr/bin/env node

const axios = require('axios');

const CC_ID = '91258224-5-FV5';

axios.get(`http://localhost:3000/pessoas?CC=${CC_ID}`)
	.then(

		resp => {

			const people = resp.data;

			console.log(people[0].nome);
		}

	)
	.catch(

		error => {

			console.log(`Error: ${error}`);
		}
	);



