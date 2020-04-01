
## Prerequisites
Install following tools
* node (v10.16.3)

###### Install Node
https://nodejs.org/en/download/
After installation go to command prompt and run below command to check the version
```ssh
$ node -v
```

##### Install dependencies
```ssh
$ npm install
```
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
