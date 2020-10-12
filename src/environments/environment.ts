// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'https://yo-entro-a-la-u-backend.herokuapp.com',
  apiUrl: 'http://localhost:5020',
  googleApiFolder: '1BhyMhMXeYtJ7RvDxSWPZpIYG-eM9bxFv',
  firebaseConfig: {
    apiKey: "AIzaSyB6zXNY5TfFb0-s-58EMvsI3ANnxIM4hNg",
    authDomain: "yo-entro-a-la-u.firebaseapp.com",
    databaseURL: "https://yo-entro-a-la-u.firebaseio.com",
    projectId: "yo-entro-a-la-u",
    storageBucket: "yo-entro-a-la-u.appspot.com",
    messagingSenderId: "435312465793",
    appId: "1:435312465793:web:be708b142d8efd513dfa80",
    measurementId: "G-R98V5K3YSG"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
