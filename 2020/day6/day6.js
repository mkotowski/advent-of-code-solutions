const fs = require('fs');

// https://stackoverflow.com/a/37320681
function intersection() {
	var result = [];
  var lists;
  
  if(arguments.length === 1) {
  	lists = arguments[0];
  } else {
  	lists = arguments;
  }
  
  for(var i = 0; i < lists.length; i++) {
  	var currentList = lists[i];
  	for(var y = 0; y < currentList.length; y++) {
    	var currentValue = currentList[y];
      if(result.indexOf(currentValue) === -1) {
        if(lists.filter(function(obj) { return obj.indexOf(currentValue) == -1 }).length == 0) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
}

var sumOfYes = 0;
var sumOfAllYes = 0;

function createSubsetOfAnswers(element, index, array) {
	let tmp = new Set(
		element.replace(/\s+/g, '').split(''));

	sumOfYes += tmp.size;

	sumOfAllYes += intersection(element.split('\n')).length
}

fs.readFile('input.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let answers = data.trim().split('\n\n');

	answers.forEach(createSubsetOfAnswers);

	console.log(sumOfYes);
	console.log(sumOfAllYes);
});
