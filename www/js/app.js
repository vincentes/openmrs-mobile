// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('openmrs', ['ionic', 'openmrs.controllers', 'openmrs.services', 'pascalprecht.translate'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.previousState;
  $rootScope.currentState;
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;
  });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
  $translateProvider.translations('es', {
    // Lenguajes
    LANG_es : 'Español',
    LANG_en : 'Inglés',

    // Menú
    MENU_TITLE: 'Menú',
    MENU_DASHBOARD: 'Inicio',
    MENU_SEARCHPATIENTS : 'Búsqueda de pacientes',
    MENU_REGISTERPATIENT : 'Registrar un paciente',
    MENU_LOGOUT: 'Cerrar sesión',

    // Inicio de sesión
    LOGIN_TITLE : 'Sesión de OpenMRS',
    LOGIN_HOST_LABEL: 'Servidor',
    LOGIN_USERNAME_LABEL: 'Usuario',
    LOGIN_PASSWORD_LABEL: 'Cortaseña',

    // Inicio de sesión: errores
    LOGIN_ERROR_TITLE:'Error al iniciar sesión en el servidor',
    LOGIN_ERROR_WRONGUSERPASSWORD: 'Usuario o cortaseña inválida.',
    LOGIN_ERROR_WRONGHOST: 'Servidor inválido. ¿Haz incluido el directorio /openmrs/ del servidor?',
    LOGIN_ERROR_SESSION: '¡Usted ya está en una sesión! Si esto es incorrecto, intente reiniciar su navegador.',

    // Finalización de la sesión
    LOGOUT_CONFIRM_TITLE:'Cerrando sesión',
    LOGOUT_CONFIRM_MESSAGE: '¿Seguro que desea cerrar sesión?.',
    LOGOUT_CONFIRM_CANCEL: 'Cancelar',

    // Inicio
    DASH_TITLE: 'Inicio',
    DASH_WELCOME: 'Bienvenido',
    DASH_CONNECTED: 'Usted está actualmente conectado a',

    // Búsqueda de pacientes
    SEARCHPATIENTS_TITLE: 'Pacientes',
    SEARCHPATIENTS_AGE: 'Edad:',

    // Detalles de pacientes
    PATIENT_EXPIRED: 'Patient expired',

    // Traducción de palabras
    BASIC: 'Basico',
    BIRTHDATE: 'Fecha de nacimiento',
    ESTIMATED: 'Aproximada',
    AGE: 'Edad',
    GENDER: 'Sexo',
    MALE: 'Masculino',
    FEMALE: 'Femenino',
    LOCATION: 'Localización',
    COUNTRY: 'País',
    STATE: 'Estado',
    PROVINCE: 'Provincia',
    CITY: 'Ciudad',
    ADDRESS: 'Dirección',
    POSTAL: 'Código postal',
    CANCEL: 'Cancelar',
    ACTION_SEARCH: 'Buscar'
  }).translations('en', {
    // Languages
    LANG_es: 'Spanish',
    LANG_en: 'English',

    // Menu
    MENU_TITLE: 'Menu',
    MENU_DASHBOARD : 'Dashboard',
    MENU_SEARCHPATIENTS : 'Search patients',
    MENU_REGISTERPATIENT : 'Register a patient',
    MENU_LOGOUT: 'Logout',

    // Logging in
    LOGIN_TITLE: 'OpenMRS Login',
    LOGIN_HOST_LABEL: 'Host',
    LOGIN_USERNAME_LABEL: 'Username',
    LOGIN_PASSWORD_LABEL: 'Password',

    // Logging in: errors
    LOGIN_ERROR_TITLE:'Error logging in to',
    LOGIN_ERROR_WRONGUSERPASSWORD: 'Invalid username or password.',
    LOGIN_ERROR_WRONGHOST: 'Invalid host. Have you include?',
    LOGIN_ERROR_SESSION: 'You are already logged in! If this is incorrect, try restarting your browser.',

    // Logging out
    LOGOUT_CONFIRM_TITLE:'Logging out',
    LOGOUT_CONFIRM_MESSAGE: 'Are you sure you want to log out?.',

    // Dashboard
    DASH_WELCOME: 'Welcome',
    DASH_CONNECTED: 'You are currently connected to',

    // Search patients
    SEARCHPATIENTS_TITLE: 'Patients',
    SEARCHPATIENTS_AGE: 'Aged',

    // Patient details
    PATIENT_EXPIRED: 'Patient expired',

    // Word translations
    BASIC: 'Basic',
    ESTIMATED: 'Estimated',
    BIRTHDATE: 'Birthdate',
    AGE: 'Age',
    GENDER: 'Gender',
    MALE: 'Male',
    FEMALE: 'Female',
    LOCATION: 'Location',
    COUNTRY: 'Country',
    STATE: 'State',
    PROVINCE: 'Province',
    CITY: 'City',
    ADDRESS: 'Address',
    POSTAL: 'Postal',
    CANCEL: 'Cancel',
    ACTION_SEARCH: 'Search'
  })
  $translateProvider.preferredLanguage('en');

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    onEnter: function($state, AuthService, TranslationService) {
      TranslationService.setLangToStored();

      var loggedIn = AuthService.isLoggedIn();
      if(loggedIn) {
        $state.go('app.dashboard');
      }
    }
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    onEnter: function($state, $translate, AuthService, TranslationService) {
      TranslationService.setLangToStored();

      var loggedIn = AuthService.isLoggedIn();
      if(!loggedIn) {
        $state.go('login');
      }
    }
  })

  .state('app.searchpatients', {
    url: '/searchpatients',
    views: {
      'menuContent': {
        templateUrl: 'templates/searchpatients.html',
        controller: 'PatientsCtrl'
      }
    }
  })

    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })

  .state('app.patient', {
    url: '/patient/:uuid',
    views: {
      'menuContent': {
        templateUrl: 'templates/patient.html',
        controller: 'PatientCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/dashboard');
});
