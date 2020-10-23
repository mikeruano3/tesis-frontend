## Comandos ANGULAR
```
npm install -g @angular/cli

ionic start yoentroalau --type=angular
npm i @ionic/lab --save-dev

ionic serve -l

ng generate page add-course
ng generate page edit-course
```
## Comandos cordova
```
npm install -g cordova ionic
ionic -v

npm update -g cordova ionic
```
## Comandos Capacitor
#### New Ionic Project
```
ionic start myApp tabs --capacitor
```
#### Existing Ionic Project
```
ionic integrations enable capacitor
```
#### Initialize Capacitor with your app information
```
npx cap init [appName] [appId]
```
#### Build your Ionic App
##### You must build your Ionic project at least once before adding any native platform
```
ionic build
```
#### Add Platforms
```
npx cap add android
```

## Production Build CAPACITOR
#### Ionic Build
```
ionic build --prod
```
#### Copy built files
```
npx cap copy android
```
#### Open IDE to build, run, and deploy
```
npx cap open android
```

## Production Build CORDOVA
```
ionic cordova build browser --release
ionic cordova build android --prod
ionic cordova build android
```

## DOCS

https://capacitorjs.com/docs/getting-started/with-ionic

https://www.positronx.io/build-ionic-cordova-angular-crud-mobile-app/

https://bezkoder.com/angular-10-jwt-auth/

https://angular.io/guide/dynamic-form