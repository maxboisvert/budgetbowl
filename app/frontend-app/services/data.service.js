budgetBowlApp.factory("dataService", ['$log', '$localStorage', function($log, $localStorage) {

    var bucket = $localStorage.bb_bucket;
    var bills = $localStorage.bb_bills;

    // emptyBucket();

    if (!bucket) {
        bucket = {
            name: "My Budget Bowl",
            members: ["Maxime", "Sébastien", "Karine"],
            paidMembers: [false, false, false]
        };
        $localStorage.bb_bucket = bucket;
    }

    if (!bills) {
        bills = [
            {
                paidBy: 0,
                description: "Pizza",
                price: 30,
                contributions: [10, 10, 10]
            }
        ];

        $localStorage.bb_bills = bills;
    }


    // TODO localStorage here?

    return {
        bucket: bucket,
        bills: bills,
        deleteBill: deleteBill,
        addMember: addMember,
        addBill: addBill,
        clear: clear
    };

    // functions

    function clear() {
        angular.extend(bucket, emptyBucket());
        bills.length = 0;
    }

    function emptyBucket() {
        return {
            name: "My Budget Bowl",
            members: [],
            paidMembers: []
        };
    }

    function addMember(name) {
        bucket.members.push(name);
        angular.forEach(bills, function(bill) {
            bill.contributions.push(0);
        });
    }

    function addBill(bill) {

        var contributions = [];

        var contribution = bill.price / bucket.members.length;
        contribution = Number(contribution.toFixed(2));

        angular.forEach(bucket.members, function() {
            contributions.push(contribution);
        });

        bills.push({
            price: bill.price,
            description: bill.description,
            contributions: contributions,
            paidBy: bucket.members.indexOf(bill.paidBy)
        });
    }

    function setBucketName(name) {
        bucket.name = name;
    }

    function deleteBill(index) {
        bills.splice(index, 1);
    }

}]);

