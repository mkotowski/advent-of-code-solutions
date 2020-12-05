const fs = require('fs');

fs.readFile('input.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let boardingPasses = data.trim().split('\n');

	let highestSeatID = 0;

	// first 7 chars: F|B -- 128 rows [0...127]
	let highestRow = 127 + 1;
	//  last 3 chars: L|R --   8 cols [0...7]
	let highestCol = 7 + 1;

	let targetRow = 0;
	let targetCol = 0;

	let seatIDs = [];
	
	for (let boardingPass of boardingPasses) {
		let minRow = 0   + 1;
		let maxRow = highestRow;

		// rows
		for (let c = 0; c < 7; c++) {
			// lower half
			if (boardingPass[c] === 'F') {
				maxRow = ((maxRow+minRow+1)/2)-1;
			}
			// upper half
			else if (boardingPass[c] === 'B') {
				minRow += (maxRow-minRow+1)/2;
			}
		}

		targetRow = minRow-1;

		let minCol = 0   + 1;
		let maxCol = highestCol;

		// columns
		for (let c = 7; c < 10; c++) {
			// lower half
			if (boardingPass[c] === 'L') {
				maxCol = ((maxCol+minCol+1)/2)-1;
			}
			// upper half
			else if (boardingPass[c] === 'R') {
				minCol += (maxCol-minCol+1)/2;
			}
		}

		targetCol = minCol-1;

		let seatID = (targetRow * 8) + targetCol;
		seatIDs.push(seatID);

		if (seatID > highestSeatID)
		{
			highestSeatID = seatID;
		}
	}

	let santaID = undefined;

	let frontRowMaxID = highestCol - 1;
	let backRowMinID = ((highestRow - 1) * 8);

	for (let id of seatIDs) {
		if (id > frontRowMaxID && id < backRowMinID) {
			if (seatIDs.includes(id - 2) && !seatIDs.includes(id - 1)) {
				santaID = id - 1;
			}
			else if (seatIDs.includes(id + 2) && !seatIDs.includes(id + 1)) {
				santaID = id + 1;
			}
		}
	}

	console.log(highestSeatID);
	console.log(santaID);
});
