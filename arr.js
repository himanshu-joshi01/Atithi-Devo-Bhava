function manipulateArray(arr) {
    let arr1=[1,2,3,4,5,6];
arr.push(5,6);
console.log(arr);
arr=[1];
console.log(arr);
return arr;
}

let list=[1,2,3,4];
manipulateArray(list);
console.log(list);   // [1]  -----> should print [1] instead of [1,5].

    list=manipulateArray(list);     
console.log(list);  //[1, 5]
