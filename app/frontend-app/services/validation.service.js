budgetBowlApp.factory("validationService", ['$log', function($log) {

    return {
        amount: amount
    };

    // functions

    function amount(value) {
        return /^\d+(.\d{1,2})?$/.test(value);
    }

}]);
