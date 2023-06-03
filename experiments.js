console.log("Hello world!!! ");
const timesToRepeat = 10;
const character = "🕺🏾";

//some loop that takes the char an repeats N times.
//code here

let answer = "";
for (let i = 0; i < timesToRepeat; i++) {
    answer += character;
}
// console.log(answer);

var twoSum = function (nums, target) {
    const mp = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (mp.has(diff)) {
            return [i, mp.get(diff)];
        }
        mp.set(nums[i], i);
    }

    return output;
};

// output = twoSum([3, 2, 3], 6);
// console.log(output);

output2 = twoSum([2, 7, 11, 15], 9);
console.log(output2);
