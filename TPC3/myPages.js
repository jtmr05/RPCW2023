exports.pessoasPage = list => {

	let htmlBegin = `

		<!DOCTYPE html>
		<html>

			<head>

				<meta charset="utf-8" />
				<title>About People...</title>
				<link rel="stylesheet" href="w3.css" />

			</head>

			<body>

				<div class="w3-card-4">

					<header class="w3-container w3-blue">
						<h1>Lista de Pessoas</h1>
					</header>

					<div class="w3-container">

						<table class="w3-table-all">

							<tr>
								<th>Id</th>
								<th>Nome</th>
								<th>Idade</th>
								<th>
									<a href="/sexo" class="w3-button">
										Sexo
									</a>
								</th>
								<th>Cidade</th>
							</tr>`;


	list.forEach(
		(elem, _, __) =>

			htmlBegin += `
					<tr>
						<td>${elem.id}</td>
						<td>
							<a href="${elem.id}.html" class="w3-button ">
								${elem.nome}
							</a>
						</td>
						<td>${elem.idade}</td>
						<td>${elem.sexo}</td>
						<td>${elem.morada.cidade}</td>
					</tr>`
	);

	const htmlEnd = `
					</table>
				</div>
		</div>
	</body>
</html>`;

	return `${htmlBegin}${htmlEnd}`;
};


exports.perSex = list => {

	let entryToOccurrences = {};

	list.map(elem => elem.sexo)
		.forEach(

			(elem, _, __) => {

				if(!(elem in entryToOccurrences))
					entryToOccurrences[elem] = 1;
				else 
					++entryToOccurrences[elem];
			}
		);



	let htmlBegin = `

		<!DOCTYPE html>
		<html>

			<head>

				<meta charset="utf-8" />
				<title>Sex Statistics</title>
				<link rel="stylesheet" href="w3.css" />

			</head>

			<body>

				<div class="w3-card-4" style="width:30%;margin:auto">

					<header class="w3-container w3-blue">
						<h1>Distribuição por Sexo</h1>
					</header>

					<div class="w3-container">

						<table class="w3-table-all">

							<tr>
								<th>Id</th>
								<th>Número</th>
							</tr>`;


	for(const [key, value] of Object.entries(entryToOccurrences))

		htmlBegin += `
				<tr>
					<td>
						<a href="/?sexo=${key}" class="w3-button"> 
							${key}
						</a>
					</td>
					<td>${value}</td>
				</tr>`


	const htmlEnd = `
					</table>
				</div>
		</div>
	</body>
</html>`;

	return `${htmlBegin}${htmlEnd}`;
};
