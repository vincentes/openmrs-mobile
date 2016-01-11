# OpenMRS-Mobile
The is the repository for the *universal* OpenMRS Mobile app. You can clone this repository and build it to Android, iOS, and Windows Phone.

# Browser installation
Installing OpenMRS-Mobile for the browser is easy.

You will need:
  1. [Ionic](http://ionicframework.com/docs/guide/installation.html)
  2. [Chrome](http://www.google.com/chrome)
  3. [Chrome Allow-Control-Allow-Origin Plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

Clone the repository

    $ git clone https://github.com/Vincentes/OpenMRS-Mobile.git

Change directory to the cloned folder

    $ cd OpenMRS-Mobile

Running ionic

    $ ionic serve
This will open a Chrome window with the app running. Make sure you have Allow-Control-Allow-Origin plugin installed and enabled. Without it, Chrome won't be able to make api calls to the OpenMRS host server.
