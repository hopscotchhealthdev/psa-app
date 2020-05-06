
## Prerequisites
Install following tools
* node (v10.16.3)

#### Merging all 4 mini app

1. psa-app is recording app(current repo)
2. login app in psa-app/web-login-app copy this outside the repo and create new project and follow same steps as for recording app
3. clone home app from covid19 outside the repo. follow step 3
4. Clone react app for share. Follow step 4.


###  1. Install Node for recorder
https://nodejs.org/en/download/
After installation go to command prompt and run below command to check the version
```ssh
$ node -v
```
##### Install dependencies
```ssh
$ npm install
```
##### Update the config file.
create file `src/config/config.ts`
You can find it in firebase
<!-- ```ssh
var firebase_config = {
  apiKey: "AIzaSyCQ_ZkJp4psTGgga4Wl-D6VmunSQ053tsk",
  authDomain: "recordingmechanic.firebaseapp.com",
  databaseURL: "https://recordingmechanic.firebaseio.com",
  projectId: "recordingmechanic",
  storageBucket: "recordingmechanic.appspot.com",
  messagingSenderId: "882960539505",
  appId: "1:882960539505:web:e64c497c539b619496e0d0"
};
export { firebase_config }
``` -->
```javascript
var firebase_config = {
  apiKey: "*********************************",
  authDomain: "*******.firebaseapp.com",
  databaseURL: "https://*******.firebaseio.com",
  projectId: "***********",
  storageBucket: "********.appspot.com",
  messagingSenderId: "**************",
  appId: "*****************"
};
export { firebase_config }
```

#### Run the app in browser
Run below command to run the code in browser, it will setup local server and run the app in browser
```ssh
$ ng serve
```

#### Build Angular app
```ssh
$ ng build --prod
```

#### Build
copy dist in build
```
$ cp -R dist/ build/recorder/
```

###  2. Install Node for login 
Project path `psa-app/web-login-app`
https://nodejs.org/en/download/
After installation go to command prompt and run below command to check the version
```ssh
$ node -v
```

##### Install dependencies
```ssh
$ npm install
```
##### Update the config file.
create file `src/config/config.ts`
You can find it in firebase
<!-- ```ssh
var firebase_config = {
  apiKey: "AIzaSyCQ_ZkJp4psTGgga4Wl-D6VmunSQ053tsk",
  authDomain: "recordingmechanic.firebaseapp.com",
  databaseURL: "https://recordingmechanic.firebaseio.com",
  projectId: "recordingmechanic",
  storageBucket: "recordingmechanic.appspot.com",
  messagingSenderId: "882960539505",
  appId: "1:882960539505:web:e64c497c539b619496e0d0"
};
export { firebase_config }
``` -->
```javascript
var firebase_config = {
  apiKey: "*********************************",
  authDomain: "*******.firebaseapp.com",
  databaseURL: "https://*******.firebaseio.com",
  projectId: "***********",
  storageBucket: "********.appspot.com",
  messagingSenderId: "**************",
  appId: "*****************"
};
export { firebase_config }
```

#### Run the app in browser

Run below command to run the code in browser, it will setup local server and run the app in browser
```ssh
$ ng serve
```

#### Build Angular app
```ssh
$ ng build --prod
```

#### Build
copy dist in build
```
$ cp -R dist/ psa-app/build/login/
```

###  3. Install Node for home
Project path
```
$ git clone https://github.com/avanish-hopscotch/covid19.git
```

Update the config file.
create file `static/js/config.js`
You can find it in firebase
<!-- ```ssh
var firebase_config = {
    apiKey: "AIzaSyCQ_ZkJp4psTGgga4Wl-D6VmunSQ053tsk",
    authDomain: "recordingmechanic.firebaseapp.com",
    databaseURL: "https://recordingmechanic.firebaseio.com",
    projectId: "recordingmechanic",
    storageBucket: "recordingmechanic.appspot.com",
    messagingSenderId: "882960539505",
    appId: "1:882960539505:web:e64c497c539b619496e0d0"
      };
firebase.initializeApp(firebase_config);
``` -->
```javascript
var firebase_config = {
    apiKey: "****************************",
    authDomain: "**************.firebaseapp.com",
    databaseURL: "https://************.firebaseio.com",
    projectId: "************",
    storageBucket: "**********.appspot.com",
    messagingSenderId: "*************",
    appId: "*******************"
      };
firebase.initializeApp(firebase_config);


```

#### Build
copy dist in build
```
$ cp -R static/ psa-app/build/home/
```


###  4. Install Node for share

Project path
```
$ git clone https://github.com/sub0-l3/covid-video-share.git
```


Update the config file.
create file `.env`
You can find it in firebase
<!-- ```ssh
REACT_APP_API_KEY="AIzaSyCQ_ZkJp4psTGgga4Wl-D6VmunSQ053tsk"
REACT_APP_AUTH_DOMAIN="recordingmechanic.firebaseapp.com"
REACT_APP_DATABASE_URL= "https://recordingmechanic.firebaseio.com"
REACT_APP_PROJECT_ID="recordingmechanic"
REACT_APP_STORAGE_BUCKET="recordingmechanic.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="882960539505"
REACT_APP_APP_ID="1:882960539505:web:e64c497c539b619496e0d0"
REACT_APP_LINK_REDIRECT_UNAUTHORIZED= /logout
REACT_APP_LINK_LOGOUT=/logout
REACT_APP_LINK_HOME=/home
REACT_APP_LINK_PROFILE=/profile
REACT_APP_LINK_VIDEO_LIB=/lib

``` -->
```javascript
REACT_APP_API_KEY="***********************"
REACT_APP_AUTH_DOMAIN="************.firebaseapp.com"
REACT_APP_DATABASE_URL= "https://***********.firebaseio.com"
REACT_APP_PROJECT_ID="**********"
REACT_APP_STORAGE_BUCKET="*********.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="************"
REACT_APP_APP_ID="**********************"
REACT_APP_LINK_REDIRECT_UNAUTHORIZED= /logout
REACT_APP_LINK_LOGOUT=/logout
REACT_APP_LINK_HOME=/home
REACT_APP_LINK_PROFILE=/profile
REACT_APP_LINK_VIDEO_LIB=/lib
```

https://nodejs.org/en/download/
After installation go to command prompt and run below command to check the version
```ssh
$ node -v
```

##### Install dependencies
```ssh
$ npm install
```

#### Run the app in browser
Run below command to run the code in browser, it will setup local server and run the app in browser
```ssh
$ npm run start
```

#### Build Angular app
```ssh
$ npm run build --prod
```

#### Remove all the leading `/` for `static` folder from `build/index.html`
For example `/static/js/2.7bd4f46e.chunk.js` to `static/js/2.7bd4f46e.chunk.js`

#### Build
copy dist in build
```
$ cp -R build/ psa-app/build/share/
```



## Email Auth validation 
 Enabled Providers

## Phone Auth validation 
Phone- Enabled Providers

## Google Auth validation 
Google - When creating a new project on firebase and enabled web project, it will automatically add one 
google web project, no need for extra configuration

## Facebook Auth validation 
Facebook- Enabled facebook Provider
https://developers.facebook.com/apps/919768958466815/settings/basic/
 Create one new app under developer account,create website platform add add hosting url.
 Facebook Login--->Settigns--> update your valid  OAuth Redirect URIs

Go to Project Root---->src--->index.html
```
 <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId: "*********",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v4.0"
        });
      };
    </script>
```
Update your facebook app Id here
Add App ID and app secret in firebase account

## Twitter Auth validation 
Twitter- Create one app under develper account
https://developer.twitter.com/en/apps
Add Api key and Api secret in firebase account

## Github Auth validation 
Github- Create one app under develper account
https://developer.github.com/
Add Client Id and Client Secret in firebase account

## Apple Auth validation 
Apple- Create one app under develper account
https://developer.apple.com/
Add new app idenfier and upload the key in firebase project


## Firebase Hosting 
# Build Settings-
Build the Recorder ann and Login app with this command 
```
ng build --prod
```
Create recorder folder inside the build folder and paste your recorder build code

Create login folder inside build folder and paste your login build code

Create share folder inside build folder and paste your share(react) build code
update index.html file removed "/" forard slash for all static folder path

Create home folder inside build folder and paste your static (corvid-19)  static folder code

So the final build folder structure like-

```
├── build
│   ├── home
|   ├── login
│   ├── share
│   ├── recorder
```
