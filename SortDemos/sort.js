//properties on the screen
const WIDTH = 800;
const CANV_WIDTH = 600;
const INSTRUCTIONS = 200;
const HEIGHT = 600;

//properties of the each bar and the grid
const LINE_GAP = 1;
const LINE_W = 6;
const EACH_LINE = LINE_GAP + LINE_W;
var lineHeight;


// optional code used to color bars as it sorts
const WHITE = 1;
const ORANGE = 2;

// create an array of random sizes
var lineLayout = new Array((WIDTH - INSTRUCTIONS) / LINE_W);
console.log(lineLayout.length);
for (let i = 0; i < lineLayout.length; i++) {
  lineLayout[i] = Math.floor(Math.random() * 600);
}

// bubble sort
async function bubbleSort(arr) {
  var swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        await swap(arr, i, i + 1, 1000);
        swapped = true;
      }
    }
  }
  return arr;
}

// insertion sort
async function insertionSort(arr) {
  if (arr.length == 1) {
    return arr;
  }
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
    await sleep(1000 / 30);
  }
  return arr;
}

// selection sort
async function selectionSort(arr) {
  var smallest;
  for (let i = 0; i < arr.length; i++) {
    smallest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[smallest]) {
        smallest = j;
      }
    }
    if (smallest !== i) {
      await swap(arr, smallest, i, 30);
    }
  }
  return arr;
}

// quick sort
async function quickSort(items, left, right) {
  var index;

  if (items.length > 1) {
    left = typeof left != "number" ? 0 : left;
    right = typeof right != "number" ? items.length - 1 : right;

    index = await partition(items, left, right);

    if (left < index - 1) {
      await quickSort(items, left, index - 1);
    }

    if (index < right) {
      await quickSort(items, index, right);
    }
  }

  return items;
}

// helper function for quick sort
async function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }

    while (items[j] > pivot) {
      j--;
    }

    if (i <= j) {
      await swap(items, i, j, 30);
      i++;
      j--;
    }
  }

  return i;
}

// helper function for several of the sorts
async function swap(arr, idx1, idx2, speed) {
  await sleep(1000 / speed);
  var temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// used to slow down the execution of the functions so it can be shown on screen
function sleep(fps) {
  return new Promise((resolve) => setTimeout(resolve, fps));
}

// a function that does nothing except log swapped on the screen
function doNothing() {
  console.log("swapped");
  return;
}

// radix sort
async function radixSort(nums) {
  var maxDigits = mostDigits(nums);

  for (let k = 0; k < maxDigits; k++) {
    let buckets = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      buckets[digit].push(nums[i]);
    }
    nums = [].concat(...buckets);
    await sleep(1000 / 2);
    lineLayout = nums;
  }
  return nums;
}

// returns the number of the given digit-place of a number
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

//returns the number of digits in a number given
function digitCount(num) {
  if (num === 0) {
    return 1;
  }
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

//given an array of numbers, returns the number of digits in the largest number(s) in the list
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

// merge sort
async function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = await mergeSort(arr.slice(0, mid));
  let right = await mergeSort(arr.slice(mid));
  // lineLayout = await merge(left, right);
  return await merge(left, right);
}

// helper function for merge sort
async function merge(arr1, arr2) {
  await sleep(1000 / 20);
  var newArr = [];
  var index = 0;
  var index2 = 0;
  var j = 0;
  while (index < arr1.length && index2 < arr2.length) {
    if (arr1[index] < arr2[index2]) {
      newArr.push(arr1[index++]);
    } else {
      newArr.push(arr2[index2++]);
    }
    lineLayout[newArr.length - 1] = newArr[newArr.length - 1];
  }

  while (index < arr1.length) {
    newArr.push(arr1[index++]);
    lineLayout[newArr.length - 1] = newArr[newArr.length - 1];
  }

  while (index2 < arr2.length) {
    newArr.push(arr2[index2++]);
    lineLayout[newArr.length - 1] = newArr[newArr.length - 1];
  }

  return newArr;
}