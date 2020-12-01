const fs = require('fs');

var targetSumValue = 2020;

function toNumber(string) {
	return parseInt(string, 10);
}

fs.readFile("input.txt", 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	data = data
		.trim()
		.split('\n')
		.map(toNumber);
	
	let numbers = new Set(data);

	// the first part -- 2 numbers == 2020
	for (const entry of numbers.values()) {
		let difference = targetSumValue - entry;

		if (numbers.has(difference)) {
			return console.log(entry * difference);
		}
	}

	console.log("No match found.");
});

fs.readFile('input.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	
	data = data
		.trim()
		.split('\n')
		.map(toNumber);
	
	let numbers = new Set(data);

	// the second part -- 3 numbers == 2020
	for (const entry of numbers.values()) {
		let targetSum = targetSumValue - entry;
		
		let possibleValues = new Set(numbers);
		possibleValues.delete(entry);

		for (const value of possibleValues) {
			let remaining = targetSum - value;
			if (possibleValues.has(remaining)) {
				return console.log(remaining * value * entry);
			}
		}
	}
});
