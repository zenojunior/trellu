'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {

  let html = `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Trellu</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body classes="assa">
        <h1>Trellu</h1>
        <script>
          window.fbAsyncInit = function() {
            FB.init({
              appId      : '{your-app-id}',
              cookie     : true,
              xfbml      : true,
              version    : '{api-version}'
            });
              
            FB.AppEvents.logPageView();   
              
          };
          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
        </script>
      </body>
    </html>
  `;

  return html;
})
Route.get('login/facebook', 'UserController.redirect')
Route.get('facebook/callback', 'UserController.callback')
