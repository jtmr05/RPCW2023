
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
								<th>Sexo</th>
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
					</tr>
				</a>`
	);

	const htmlEnd = `
					</table>
				</div>

			<footer class="w3-containter w3-blue">
				<h5>Rodapé</h5>
			</footer>
		</div>
	</body>
</html>`;

	return `${htmlBegin}${htmlEnd}`;
};
