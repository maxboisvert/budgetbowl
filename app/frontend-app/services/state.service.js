// var state = {
//     due: -105,
//     members: [
//         {amount:5, done: false},
//         {amount:0, done: true},
//         {amount:-10, done: false}
//     ],
//     dueLabel: "label label-danger",
// };
budgetBowlApp.factory("stateService", [
    '$log', 'dataService',
    function($log, dataService) {

    var state = emptyState();

    return {
        state: state,
        update: update
    };

    // functions

    function update() {
        $log.info("Updating the bucket status");

        var bucket = dataService.bucket;
        var bills = dataService.bills;
        var newState = emptyState();

        angular.forEach(bills, function(bill) {

            newState.members[bill.paidBy].amount += bill.price;

            var sum = 0;

            angular.forEach(bill.contributions, function(contribution, memberIndex) {
                sum += contribution;
            });

            angular.forEach(bill.contributions, function(contribution, memberIndex) {
                var realContribution = (contribution/sum) * bill.price;
                newState.members[memberIndex].amount -= realContribution;
            });

        });

        var doneCount = 0;

        angular.forEach(bucket.members, function(member, i) {
            if (bucket.paidMembers[i]) {
                newState.due -= newState.members[i].amount;
                doneCount++;
            }
        });

        // Set the bucket due label
        if (doneCount == bucket.members.length) {
            newState.dueLabel = "label label-success";
        }
        else if (newState.due < 0) {
            newState.dueLabel = "label label-danger";
        }
        else {
            newState.dueLabel = "label label-warning";
        }

        newState.frozen = doneCount > 0;

        // update the state
        angular.extend(state, newState);
    }

    function emptyState() {

        var emptyState = {
            due: 0,
            members: [],
            dueLabel: "label label-default",
            frozen: false
        };

        angular.forEach(dataService.bucket.members, function(member) {
            emptyState.members.push({amount:0});
        });

        return emptyState;
    }

}]);
