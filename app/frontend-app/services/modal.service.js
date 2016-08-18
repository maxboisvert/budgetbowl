budgetBowlApp.factory("modalService", ['$log', '$q', '$modal', '$rootScope',
    function($log, $q, $modal, $rootScope) {

    return {
        confirm: confirm,
        prompt: prompt,
        addMember: addMember,
        addBill: addBill,
        ask: ask
    };

    // functions

    function ask(message, data, key, options) {
        $log.info("ask value");

        var scope = $rootScope.$new();
        scope.message = message;
        scope.value = data[key];
        scope.uiValidate = {};

        if (options) {
            if (options.amount) {
                scope.uiValidate = {amount: 'validationService.amount($value)'};
            }
        }

        var modal = $modal.open({
            templateUrl: 'frontend-app/modals/prompt.html',
            scope: scope
        });

        modal.result.then(function(newValue) {
            if (data[key].toFixed) {
                data[key] = Number(newValue);
            } else{
                data[key] = newValue;
            }
        });

        return modal.result;

    }

    function addBill() {
        var scope = $rootScope.$new();
        scope.members = $rootScope.bucket.members;
        // scope.paidBy = scope.members[0];

        var modal = $modal.open({
            templateUrl: 'frontend-app/modals/add-bill.html',
            scope: scope
        });

        return modal.result;
    }

    function addMember() {
        var scope = $rootScope.$new();

        var modal = $modal.open({
            templateUrl: 'frontend-app/modals/add-member.html',
            scope: scope
        });

        return modal.result;
    }

    function confirm(message) {

        var scope = $rootScope.$new();
        scope.message = message;

        var modal = $modal.open({
            templateUrl: 'frontend-app/modals/confirm.html',
            scope: scope
        });

        return modal.result;
    }


}]);
