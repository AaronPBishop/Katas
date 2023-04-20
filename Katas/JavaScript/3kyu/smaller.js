// This is a hard version of How many are smaller than me?. If you have troubles solving this one, have a look at the easier kata first.

// function smaller(arr)

// that given an array arr, you have to return the amount of numbers that are smaller than arr[i] to the right.

// For example:

// smaller([5, 4, 3, 2, 1]) === [4, 3, 2, 1, 0]
// smaller([1, 2, 0]) === [1, 1, 0]

// Given extremely large inputs (90k+), your code will have 12000 ms to complete execution.

const merge = (arr, indices, left, mid, right, res) => {
    const tmp = [];
    let i = left;
    let j = mid + 1;
    let k = 0;

    while (i <= mid && j <= right) {
      if (arr[indices[i]] <= arr[indices[j]]) {
        res[indices[i]] += j - mid - 1;
        tmp[k++] = indices[i++];
      } else tmp[k++] = indices[j++];
    };

    while (i <= mid) {
      res[indices[i]] += j - mid - 1;
      tmp[k++] = indices[i++];
    };

    while (j <= right) tmp[k++] = indices[j++];
    
    for (let l = 0; l < k; l++) indices[left + l] = tmp[l];
};

const mergeSort = (arr, indices, left, right, res) => {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        mergeSort(arr, indices, left, mid, res);
        mergeSort(arr, indices, mid + 1, right, res);
        merge(arr, indices, left, mid, right, res);
    };
};

const smaller = (arr) => {
    const res = Array(arr.length).fill(0);
    const indices = arr.map((_, i) => i);

    mergeSort(arr, indices, 0, arr.length - 1, res);
    return res;
};