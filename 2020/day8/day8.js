const fs = require('fs');

function test(instructions, accumulator = 0) {
	let timesOfExecution = new Array(instructions.length).fill(0);

	for (let i = 0; i < instructions.length; i++) {

		if (timesOfExecution[i] >= 1) {
			process.stdout.write('Second execution! Acc value: ');
			return accumulator;
		}

		switch (instructions[i][0]) {
			case 'nop':
				// do nothing
				break;
			case 'acc':
				accumulator += parseInt(instructions[i][1], 10);
				break;
			case 'jmp':
				i += parseInt(instructions[i][1], 10) - 1;
				break;
			default:
				console.log('Unknown command!');
				break;
		}
		timesOfExecution[i]++;
	}

	process.stdout.write('Location outside the boot sector! Acc value: ');
	return accumulator;
}

fs.readFile('input.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let instructions = data.trim().split('\n');

	instructions.forEach((element, index, array) => {
		array[index] = element.split(' ');
	});

	console.log('Part 1:')
	console.log(test(instructions));

	let instructionsToTest = [];

	instructions.forEach((e, i) => {
		if ((e[0] === 'nop') || (e[0] === 'jmp')) {
			instructionsToTest.push(i);
		}
	});

	console.log('\nPart 2:')

	for (let i = 0; i < instructionsToTest.length; i++) {
		let j = instructionsToTest[i];
		instructions[j][0] = instructions[j][0] === 'nop' ? 'jmp' : 'nop';
		console.log(test(instructions));
		instructions[j][0] = instructions[j][0] === 'nop' ? 'jmp' : 'nop';
	}
});
