exports.getPage = (pendingTasks, completedTasks) => {

	let htmlString = `

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>To Do List</title>
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
	</head>

	<body>

		<div class="w3-container w3-cell-middle w3-green">

			<div class="w3-center">

				<h1>New task...</h1>
				<h5>Create a new task</h5>

				<form class="w3-container" method="POST">

					<fieldset>
						<legend>Responsável:</legend>
						<input class="w3-input w3-round" type="text" name="name">
					</fieldset>

					<fieldset>
						<legend>Descrição:</legend>
						<input class="w3-input w3-round" type="text" name="description">
					</fieldset>

					<fieldset>
						<legend>Data limite:</legend>
						<input class="w3-input w3-round" type="date" name="date">
					</fieldset>

					<br/>
					<br/>

					<div class="w3-left-align">
						<button class="w3-btn w3-round w3-white w3-left-align" type="submit">
							Register
						</button>
						<button class="w3-btn w3-round w3-white w3-left-align" type="reset">
							Clear
						</button>
					</div>

					<br/>

				</form>

			</div>

		</div>


		<div class="w3-cell-row">

			<div class="w3-container w3-blue w3-cell w3-mobile">
				<div class="w3-center">
					<h3>Pending Tasks</h3>

					<table class="w3-table w3-border w3-striped">

						<tr>
							<th>Responsável</th>
							<th>Descrição</th>
							<th>Data limite</th>
						</tr>`;


	for(const task of pendingTasks)

		htmlString +=
		`<tr style="color:black;">
			<td>${task.name}</td>
			<td>${task.description}</td>
			<td>${task.date}</td>
			<td>
				<button class="w3-button w3-round w3-ripple" type="button">
					✔️
				</button>
			</td>
		</tr>`;


	htmlString += `</table>

				<br/>
				<br/>

				</div>
			</div>

			<div class="w3-container w3-red w3-cell w3-mobile">
				<div class="w3-center">
					<h3>Completed Tasks</h3>

					<table class="w3-table w3-border w3-striped">

						<tr>
							<th>Responsável</th>
							<th>Descrição</th>
							<th>Data limite</th>
						</tr>`;

	for(const task of completedTasks)

		htmlString +=
		`<tr style="color:black;">
			<td>${task.name}</td>
			<td>${task.description}</td>
			<td>${task.date}</td>
			<td>
				<button class="w3-button w3-round w3-ripple" type="button" >
					🗙
				</button>

			</td>
		</tr>`;


	htmlString += `</table>
				<br/>
				<br/>
				</div>
			</div>
		</div>
	</body>
</html>`;

	return htmlString;
};
