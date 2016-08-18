budgetBowlApp.factory("formatService", ['$log', '$filter', function($log, $filter) {

    return {
        money: money,
        dueText: dueText,
        ratio, ratio
    };

    // functions

    function dueText(amount) {
        var due = money(amount);

        due = due.replace("(", "");
        due = due.replace(")", "");
        due = due.replace("-", "");

        if (amount > 0) {
            due = "takes " + due + " from";
        }
        else {
            due = "adds " + due + " to";
        }

        return due;
    }

    function ratio(value) {
        fixedValue = value.toFixed(2);
        if (fixedValue.endsWith(".00")) {
           return value.toFixed(0);
        }
        return fixedValue;
    }

    function money(amount) {
        // var number = new Number(amount);
        // return number.toFixed(2) + "$";
        return $filter('currency')(amount);
    }

}]);
