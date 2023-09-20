let time = '19:30';

let timeNumbers = [];
let timeStr = '';
timeStr += time.charAt(0);
timeStr += time.charAt(1);

timeNumbers.push(parseInt(timeStr));

timeStr = '';
timeStr += time.charAt(3);
timeStr += time.charAt(4);

timeNumbers.push(parseInt(timeStr));

console.log(timeNumbers);