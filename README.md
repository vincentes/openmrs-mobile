# openmrs-mobile
This is the repository for the *universal* OpenMRS Mobile app. The objective of this project is to make OpenMRS available to all mobile platforms using a single codebase to reduce maintainence time and increase efficiency and consistency. You can clone this repository and build it to Android, iOS, and Windows Phone.

# Features
- Search and view patients
- Local stored information for convenience
- Language support using angular-translate
- Spanish and english languages

# Installing on Chrome
You can test OpenMRS Mobile on the browser but please test it on a phone or emulator before comitting.

You will need:
  1. [Ionic](http://ionicframework.com/docs/guide/installation.html)
  2. [Chrome](http://www.google.com/chrome)
  3. [Chrome Allow-Control-Allow-Origin Plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

Clone the repository:

    $ git clone https://github.com/Vincentes/OpenMRS-Mobile.git

Change directory to the cloned folder:

    $ cd OpenMRS-Mobile

Running ionic:

    $ ionic serve
This will open a Chrome window with the app running. Make sure you have Allow-Control-Allow-Origin plugin installed and enabled. Without it, Chrome won't be able to make api calls to the OpenMRS host server.

# Installing on Android

You will need:
  1. [Android SDK (with lastest API)](http://developer.android.com/sdk/installing/index.html?pkg=tools)
  2. [Ionic](http://ionicframework.com/docs/guide/installation.html)
  3. (Optional) Gennymotion or any other emulator

Clone the repository

    $ git clone https://github.com/Vincentes/OpenMRS-Mobile.git

Change directory to the cloned folder

    $ cd OpenMRS-Mobile


Add Android platform support to the project

    $ ionic platform add android
    
Build the app

    $ ionic build android
    
Plug an Android device to your computer and run the app

    $ ionic run android
    
Or alternatively, you can emulate the app

    $ ionic emulate android
    
# Installing on iOS

You will need:
  1. OS X.
  2. [Ionic](http://ionicframework.com/docs/guide/installation.html)

Clone the repository

    $ git clone https://github.com/Vincentes/OpenMRS-Mobile.git

Change directory to the cloned folder

    $ cd OpenMRS-Mobile


Add iOS platform support to the project

    $ ionic platform add ios
    
Build the app

    $ ionic build ios
    
Plug an iOS device to your computer and run the app

    $ ionic run ios
    
Or alternatively, you can emulate the app

    $ ionic emulate ios

# Installing on Windows Phone

Installing an Ionic app on Windows Phone is a little more complicated, because Ionic doesn't support it. Don't worry, you can still install it. [This](http://www.badpenguin.org/how-to-make-your-ionic-cordova-app-to-run-under-windows-phone-8-1-and-desktop) website explains step by step how to install an Ionic app on Windows Phone. Every user won't have to go through this, we will build the project ourselves once it's ready to deploy.
