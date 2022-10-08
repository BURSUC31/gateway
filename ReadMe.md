DESCRIPTION:
This Api redirects the user to the URL that it's set by the dev, each request comes with a counter that has a limit, if the requests reach the maximum number of suported by the counter there will be a 'ban' period in which user can't send requests to get the url ( path to redirect /api/user ).
All the requests per user can be seen in ( /api )

ENVS:
`APP`:

- `DEV_APP_PORT`- main port used by http server (default-`3001`)

`DB`:

- `DEV_DB_HOST` - host of the mongoDB cluster (defaults to -"mongodb://localhost:27017/USERS?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")

`MAX_NUMBER_OF_TRIES` - number of requests that a user is allowed to make (defaults to `5`)

`BAN_TIME` - time spent after a user reaches the maxim number of requests and to restart the counter request limit to 0 (defaults to 5000ms)

`REDIRECT_URL` - URL forwarded by gateway (defaults to "https://api.openweathermap.org/data/2.5/onecall?lat=46&lon=24&appid=6d1e142d613e4ec502ed5838528f683e&units=metric&lang=ro")
