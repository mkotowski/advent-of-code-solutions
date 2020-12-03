const fs = require('fs');


function countTrees(data, stepRight = 3, stepDown = 1) {
	let treeCount = 0;
	let position = 0;
	for (let i = 0; i < data.length; i = i + stepDown) {
		if (data[i][position % data[i].length] === '#') {
			treeCount++;
		}
		position = position + stepRight;
	}
	return treeCount;
}

fs.readFile('input.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	data = data.trim().split('\n');

	// part 1
	console.log(countTrees(data));

	// part 2
	console.log(
		countTrees(data, 1, 1)
		* countTrees(data)
		* countTrees(data, 5, 1)
		* countTrees(data, 7, 1)
		* countTrees(data, 1, 2)
	);
});
