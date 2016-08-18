budgetBowlApp.controller('ToolbarController', [
    '$scope', '$log', '$window', 'modalService', 'dataService',
    function($scope, $log, $window, modalService, dataService) {

    $log.info("init ControlController");

    angular.extend(this, {
        print: print,
        addMember: addMember,
        addBill: addBill,
        clear: clear
    });

    // functions

    function print(index) {
        $window.print();
    }

    function clear() {
        modalService.confirm("Are you sure?").then(function() {
            dataService.clear();
        });
    }

    function addBill() {
        modalService.addBill().then(function(bill) {
            $log.info("adding bill : " + bill);
            dataService.addBill(bill);
        });
    }

    function addMember() {
        modalService.addMember().then(function(name) {
            $log.info("adding member : " + name);
            dataService.addMember(name);
        });
    }

}]);
