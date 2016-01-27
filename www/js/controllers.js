angular.module('openmrs.controllers', ['openmrs.services'])

.controller('AppCtrl', function($scope, $state, $translate, $rootScope, AuthService, TranslationService) {

  $scope.curlang = $translate.use();

  $scope.getUsername = function() {
    return AuthService.getUsername();
  }

  $scope.getHost = function() {
    return AuthService.getHost();
  }

  $scope.goHome = function() {
    $state.go('app.dashboard');
  }

  $scope.switchLanguage = function(lang) {
    TranslationService.setLang(lang);
  }

})

.controller('LoginCtrl', function($scope, $state, $translate, $ionicPopup, ApiService, AuthService, TranslationService) {

  $scope.login = function(host, username, password) {
    if(!host) {
      host = 'http://demo.openmrs.org/openmrs/'
    }
    var prefix = 'http://';
    if (host.substr(0, prefix.length) !== prefix) {
      host = prefix + host;
    }

    $scope.loading = true;
    if(AuthService.isLoggedIn()) {
      $ionicPopup.alert({
        title: TranslationService.login_error_title + ' ' + host,
        template: TranslationService.login_error_session
      });
      $scope.loading = false;
    }

    ApiService.isHostValid(host, function(passed) {
      if(!passed) {
        $ionicPopup.alert({
          title: TranslationService.login_error_title + ' ' + host,
          template: TranslationService.login_error_host
        });
      }
      $scope.loading = false;
    });

    if(username && password) {
      ApiService.authenticate(host, username, password, function(result) {
        if(result.authenticated) {
          AuthService.setUsername(username);
          AuthService.setHost(host);
          AuthService.setSession(result.sessionId);
          AuthService.setPassword(password);
          $state.transitionTo('app.dashboard');
        } else {
          $ionicPopup.alert({
            title:  TranslationService.login_error_title + ' ' + host,
            template: TranslationService.login_error_userpass
          });
        }
        $scope.loading = false;
      });
    } else {
      $scope.loading = false;
    }

  }

  $scope.logout = function() {
    var logout = $ionicPopup.confirm({
     title: TranslationService.logout_confirm_title,
     template: TranslationService.logout_confirm_message,
     cancelText: TranslationService.logout_confirm_cancel
    });
    
    logout.then(function(result) {
      if(result) {
        AuthService.logout();
        $state.transitionTo('login');
      }
    });
  }
})

.controller('PatientsCtrl', function($scope, $state, ApiService) {
  // Should work without initializing.. for some reason it doesn't.
  $scope.searchpatients = [];
  $scope.searchpatients.query = '';


  $scope.searchpatients.searching = true;
  ApiService.getLastViewedPatients(function(res) {
    $scope.searchpatients.searching = false;
    $scope.searchpatients.patientList = res;
    $scope.$apply();
  });

  var search = function(res) {
    $scope.searchpatients.patientList = res;
    $scope.searchpatients.searching = false;
    $scope.$apply();
  }

  $scope.$watch('searchpatients.query', function(nVal, oVal) {
    if (nVal !== oVal) {
      $scope.searchpatients.searching = true;
      if(!$scope.searchpatients.query) {
        ApiService.getLastViewedPatients(search);
      } else {
        ApiService.getPatients($scope.searchpatients.query, search);
      }
    }
  });
})

.controller('PatientCtrl', function($scope, $stateParams, ApiService) {
  $scope.patient = [];

  $scope.loading = true;
  ApiService.getPatient($stateParams.uuid, function(res) {
    res.person.birthdate = new Date(res.person.birthdate).toString();
    $scope.patient = res;
    $scope.loading = false;
    $scope.$apply();
  });
})

.controller('ActiveVisitsCtrl', function($scope) {
  $scope.visits = [];
})

.controller('DashboardCtrl', function($scope) {

})