const fs = require('fs');

fs.readFile('input.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let requiredFields = new Map();

	// bad for maintability, but lets be a little lazy here...
	requiredFields.set('byr', /^(19[2-9][0-9]|200[0-2])$/);
	requiredFields.set('iyr', /^(201[0-9]|2020)$/);
	requiredFields.set('eyr', /^(202[0-9]|2030)$/);
	requiredFields.set('hgt', /^(1[5-8][0-9]cm|19[0-3]cm|[5-6][0-9]in|7[0-6]in)$/);
	requiredFields.set('hcl', /^(#[0-9a-f]{6})$/);
	requiredFields.set('ecl', /^(amb|blu|brn|gry|grn|hzl|oth)$/);
	requiredFields.set('pid', /^([0-9]{9})$/);

	let validPassportCount = 0;
	let validatedPassportCount = 0;

	let passports = data.trim().split('\n\n');

	for (let i = 0; i < passports.length; i++) {
		let fields = new Map();
		passports[i] = passports[i].split(/[ \n]/);

		for (let j = 0; j < passports[i].length; j++) {
			let tmpSplit = passports[i][j].split(':');
			fields.set(tmpSplit[0], tmpSplit[1]);
			passports[i][j] = tmpSplit[0];
		}

		if (passports[i].length == 8) {
			validPassportCount++;
		}
		else if (passports[i].length == 7 && !passports[i].includes('cid')) {
			validPassportCount++;
		}

		let tmpValidFields = 0;

		for (let [key, value] of fields.entries()) {
			if (requiredFields.has(key) && 
				requiredFields.get(key).test(value)) {
				tmpValidFields++;
			}
		}

		if (tmpValidFields == 7) {
			validatedPassportCount++;
		}
	}

	console.log(validPassportCount);
	console.log(validatedPassportCount);
});
