budgetBowlApp.controller('TableController', [
    '$scope', '$log', 'dataService', 'modalService',
    function($scope, $log, dataService, modalService) {

    $log.info("init TableController");

    angular.extend(this, {
        deleteRow: deleteRow
    });

    // functions

    function deleteRow(index) {
        modalService.confirm("Are you sure?").then(function() {
            dataService.deleteBill(index);
        });
    }

}]);
