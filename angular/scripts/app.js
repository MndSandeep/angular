
angular.module('core', []);

angular.module('core').service('testService', function(){
    return true;
}).controller('test', testController)

angular.module('core').service('sharedDataService',function() {
    return {
        data : {},
        getApi: function(){}
    }
});

angular.module('core').factory('authInterceptor', function() {
    return {
        'request': function(config) {
            console.log('Request intercepted');
            return config;
        }
    }
});

function Employee(name, salary) {
    this.name = name;
    this.salary = salary;
    getName = function() {
        return this.name + this.salary;
    } 
}


testController.$inject = ['$scope', 'testService','sharedDataService'];
function testController(s, ts, sharedDataService){
    s.firstParam = "hello";
    s.secondParam = "second";
    var e = new Employee();
    s.$on('setName', function(event, args) {
         s.test=sharedDataService.data.name;
    })
//   s.$scope.$watch('')
    s.testClick = function(){
        return function(a){
            console.log(a);
        }
    }
}

(function() {
	'use strict';
	
    angular
		.module('core')
		.controller('kgmController', function($scope,sharedDataService){
            var vm = this;
            sharedDataService.data.name='Sandy';
            $scope.$emit('setName',sharedDataService.data);
            vm.testing = "something";

            vm.click = function(){
                alert('child');
                var callBackFn = $scope.click();

                callBackFn("test");
            }


        });
    
    angular
		.module('core')
		.directive('testContainer', kgmContainer);

	function kgmContainer() {
		return {
			restrict: 'E',
			scope : {
                input: '=',
                click: '&'
            },
			templateUrl : 'scripts/container/container.html',
			link: linkFunc,
			controller: 'kgmController',
			controllerAs: 'vm'
		}
    }
    function linkFunc(scope, element, attrs, ctrl) {

	}
})();

angular.module('core').directive('testCard', function() {
    return {
       template:'<div> <input ng-model=test></input></div>'
    } 
});


angular.module('app', ['core', function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
}]);