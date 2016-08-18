
// enable ECMAScript 5's strict mode
"use strict"

//
// Application
//

var budgetBowlApp = angular.module('budgetBowlApp', [
    'ui.bootstrap',
    'ngMessages',
    // 'ngTouch',
    'ngStorage',
    'ui.validate']);


budgetBowlApp.config([
    '$modalProvider',
    function($modalProvider) {

    $modalProvider.options.animation = false;

}]);

budgetBowlApp.run([
    '$log',
    '$rootScope',
    'dataService',
    'stateService',
    'formatService',
    'validationService',
    'modalService',
    '$http',
    '$templateCache',
    function($log, $rootScope, dataService, stateService, formatService, validationService, modalService, $http, $templateCache) {

    $log.info("budgetBowlApp run");

    // $modalProvider.options.animation = false;

    // public api
    angular.extend($rootScope, {
        bucket: dataService.bucket,
        bills: dataService.bills,
        state: stateService.state,
        format: formatService,
        validationService: validationService,
        ask: modalService.ask,
        currentYear: new Date().getFullYear()
    });

    $rootScope.$watch('bills', function(newValue, oldValue) {
        stateService.update();
    }, true);

    $rootScope.$watch('bucket', function(newValue, oldValue) {
        stateService.update();
    }, true);

    // preload templates
    var formMessagesFile = '/frontend-app/forms/form-messages.html';
    $http.get(formMessagesFile).then(function(result) {
        $templateCache.put(formMessagesFile, result.data);
    });

}]);

