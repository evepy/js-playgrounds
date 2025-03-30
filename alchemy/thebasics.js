
//Conditionals
function isEqual(a, b) {
    if(a===b){
        console.log("true");
        return true;
    }
}
function isNotEqual(a, b) {
    if(a !== b){
        return true
    } else{
        return false
    }
 }
//Loops
function summation(n) {
    let sum = 0;
    for (let i = 1;i<=n;i++ ) {
        sum=sum+i;
    }
    return sum;
}
//Factorial
/*
Let's take a look at a few examples of factorials:

5! = 5 * 4 * 3 * 2 * 1 = 120
Taking in some integer value n, find the factorial for that number and return it.
*/
function factorial(n) {
    let result = 1;

    for (i = 1; i <= n;i++){
        result *= i;
    }
    return result;
}











function main(){
    isEqual()
}
main();