angular.module('openmrs.controllers', ['openmrs.services'])

.controller('AppCtrl', function($scope, $state, $translate, $rootScope, AuthService, RestService) {
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
    $translate.use(lang);
    $scope.curlang = lang;
    AuthService.setLang($scope.curlang);
  }
})

.controller('LoginCtrl', function($scope, $state, $translate, $ionicPopup, RestService, AuthService) {
  $translate(['LOGIN_ERROR_TITLE', 'LOGIN_ERROR_USERANDPASS_MESSAGE', 'LOGIN_ERROR_HOST_MESSAGE', 'LOGIN_ERROR_SESSION_MESSAGE', 'LOGOUT_CONFIRM_TITLE', 'LOGOUT_CONFIRM_MESSAGE', 'LOGOUT_CONFIRM_CANCEL']).then(function (translations) {
    $scope.em_title = translations.LOGIN_ERROR_TITLE;
    $scope.em_userandpass = translations.LOGIN_ERROR_USERANDPASS_MESSAGE;
    $scope.em_host = translations.LOGIN_ERROR_HOST_MESSAGE;
    $scope.em_session = translations.LOGIN_ERROR_SESSION_MESSAGE;
    $scope.cm_title = translations.LOGOUT_CONFIRM_TITLE;
    $scope.cm_logout = translations.LOGOUT_CONFIRM_MESSAGE;
    $scope.cb_cancel = translations.LOGOUT_CONFIRM_BUTTON;
  });

  $scope.login = function(host, username, password) {
    console.log('Authenticating...');


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
        title: $scope.em_title + ' ' + host,
        template: $scope.em_session
      });
      $scope.loading = false;
    }

    RestService.verifyApi(host, function(passed) {
      if(!passed) {
        $ionicPopup.alert({
          title: $scope.em_title + ' ' + host,
          template: $scope.em_host
        });
      }
      $scope.loading = false;
    });

    if(username && password) {
      RestService.authenticate(host, username, password, function(result) {
        if(result.authenticated) {
          AuthService.setUsername(username);
          AuthService.setHost(host);
          AuthService.setSession(result.sessionId);
          AuthService.setPassword(password);
          $state.transitionTo('app.dashboard');
        } else {
          $ionicPopup.alert({
            title:  $scope.em_title + ' ' + host,
            template: $scope.em_userandpass
          });
        }
        console.log('Authenticated: ' + result.authenticated);
        $scope.loading = false;
      });
    } else {
      $scope.loading = false;
    }

  }

  $scope.logout = function() {
    var logout = $ionicPopup.confirm({
     title: $scope.cm_title,
     template: $scope.cm_logout
    });
    
    logout.then(function(result) {
      if(result) {
        AuthService.logout();
        $state.transitionTo('login');
      }
    });
  }
})

.controller('PatientsCtrl', function($scope, $state, SearchService) {
  // Should work without initializing.. for some reason it doesn't.
  $scope.searchpatients = [];

  $scope.searchpatients.query = '';
  $scope.search = function() {
    var search = function(res) {
      $scope.searchpatients.patientList = res;
      $scope.searchpatients.searching = false;
      $scope.$apply();
    }

    $scope.searchpatients.searching = true;
    if($scope.searchpatients.query) {
      SearchService.patients($scope.searchpatients.query, search);
    } else {
      $scope.searchpatients.patientList = [];
      $scope.searchpatients.searching = false;
    }
  }

  $scope.$watch('searchpatients.query', function(nVal, oVal) {
    if (nVal !== oVal) {
      $scope.search();
    }
  });
})

.controller('PatientCtrl', function($scope, $stateParams, PatientService) {
  $scope.patient = [];

  PatientService.getPatient($stateParams.uuid, function(res) {
    res.person.birthdate = new Date(res.person.birthdate).toString();
    $scope.patient = res;
    $scope.$apply();
  });
})

.controller('DashboardCtrl', function($scope) {

})