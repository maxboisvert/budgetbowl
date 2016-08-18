budgetBowlApp.directive('formDefault', ['$log', '$timeout', '$compile', '$templateCache', function ($log, $timeout, $compile, $templateCache) {
	return {
		require: '^form',
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function(scope, element, attrs) {
                        $log.info("PRE");

                        var currentForm = element[0];
            			var currentNgForm = angular.element(currentForm);

                        // disable html5 validation
                        currentNgForm.attr("novalidate", "novalidate");

                        // return;

                        // Setup default validation

        				var formGroups = angular.element(
        						currentForm.getElementsByClassName("form-group"));

        				angular.forEach(formGroups, function(formGroup, key) {

        					var inputInGroup = angular.element(
        							formGroup.querySelector('.form-control'))[0];

        					if (inputInGroup && currentForm.name && inputInGroup.name) {

                                var template = $templateCache.get("/frontend-app/forms/form-messages.html");

                                var htmlTemplate = document.createElement("div");
                                htmlTemplate.innerHTML = template;

                                var subMessageElement = angular.element(htmlTemplate);

        						var messagesElement = angular.element(document.createElement("div"));
        						messagesElement.attr("ng-messages", currentForm.name + "." + inputInGroup.name + ".$error");
                                messagesElement.append(subMessageElement);

                                // compile
        						var messagesNgElement = $compile(messagesElement)(scope);
        						angular.element(inputInGroup.parentElement).append(messagesNgElement);

        					}

        				}, scope);
                },
                post: function(scope, element, attrs) {
                    $log.info("POST");

                    var currentForm = element[0];
        			var currentNgForm = angular.element(currentForm);



    				// find the first invalid element
                    var elements = angular.element(
                        currentForm.querySelector('input, [type=submit]'));

    				if (elements.length > 0) {
    					$timeout(function() {
    						elements[0].focus();
    					}, 100);
    				}



                }
            };
        }
	};

}]);
