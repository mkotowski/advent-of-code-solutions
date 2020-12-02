const fs = require('fs');

var sledRentalPassCount = 0;
var tobogganRentalPassCount = 0;

fs.readFile("input.txt", 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let records = data.trim().split('\n');

	for (let record of records) {
		let requirementsAndPassword = record.split(/[: \-\n]+/);
		
		let min = parseInt(requirementsAndPassword[0], 10);
		let max = parseInt(requirementsAndPassword[1], 10);
		let letter = requirementsAndPassword[2];
		let password = requirementsAndPassword[3];

		// the sled rental password policy check
		let regex = new RegExp(letter, 'g');
		let count = (password.match(regex) || []).length

		if (count >= min && count <= max) {
			sledRentalPassCount++;
		}
		
		// the North Pole Toboggan Rental Shop password policy check
		let firstPosition  = (password[min-1] == letter);
		let secondPosition = (password[max-1] == letter);

		let doLetterExists      = (firstPosition || secondPosition)
		let isLetterNotRepeated = (firstPosition != secondPosition)

		if (doLetterExists && isLetterNotRepeated) {
			tobogganRentalPassCount++;
		}
	}

	console.log(sledRentalPassCount);
	console.log(tobogganRentalPassCount);
});
