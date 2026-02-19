const counterModule = (function () {
    let count = 0;

    function increment() {
        count ++;
    }

    function getCount() {
        return count;
    }
    return {
        increment,
        getCount,
    }
})();
