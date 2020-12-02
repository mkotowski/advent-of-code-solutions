const fs = require('fs');

var properPasswordsCount = 0;
var secondCount = 0;

class Record {
	constructor(min, max, letter, password) {
		this.min = min;
		this.max = max;
		this.letter = letter;
		this.password = password;
	}
}

fs.readFile("input.txt", 'utf8', function (err, data) {
        if (err) {
                return console.log(err);
        }

	let rawRecords = data.trim().split('\n');

	let records = [];

	for (let rawRecord of rawRecords) {
		let requirementsAndPassword = rawRecord.split(/[: \-\n]+/);
		let min = parseInt(requirementsAndPassword[0], 10);
		let max = parseInt(requirementsAndPassword[1], 10);
		let letter = requirementsAndPassword[2];
		let password = requirementsAndPassword[3];

		records.push(new Record(min, max, letter, password));
	}
	
	for (let record of records) {
		let regex = new RegExp(record.letter, 'g');
		let count = (record.password.match(regex) || []).length

		if (count >= record.min && count <= record.max) {
			properPasswordsCount++;
		}
		
		// the second part
		let firstPosition = (record.password[record.min-1] == record.letter);
		let secondPosition = (record.password[record.max-1] == record.letter);

		if ((firstPosition != secondPosition) && (firstPosition || secondPosition)) {
			secondCount++;
		}
	}

	console.log(properPasswordsCount);
	console.log(secondCount);
});
