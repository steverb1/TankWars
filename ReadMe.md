# Get your tank shooting in minutes

Ah, well... first you need [Docker](https://www.docker.com/community-edition) installed. Do that before the workshop

* Download the files for the starter kit and unzip them in suitable folder `/Projects/tankwars-starter-kit` for example

* Open an editor to that folder and open the `tank.js`-file.
  * Edit the name and description of your tank to match your mob
  * Save the file

* Also open a terminal window into the folder where you unzipped the files.
  * Leave this terminal window running for the duration of the workshop
  * Run this in a terminal window:

 ```
  docker build -t tankwars . &&
  docker run -it --name tankwars --mount type=bind,source="$(pwd)",target=/tank tankwars /bin/bash
 ```

* Wait a few minutes, but before long you will find yourself in the container. It will look something like this `root@11111111:/tank#`

* Let's create the tank for you by running this command in the container: `npm run create`
* This will take a minute or two, since we need to install stuff before we deploy. But soon...
* **Much success!** Your tank is deployed on the internet. You need to copy the URL to the tank from the output of the last command. It looks something like this:

```
"api": {
    "id": "dijyb021g4",
    "module": "api",
    "url": "https://dijyb021g4.execute-api.us-east-1.amazonaws.com/latest" // <== copy this URL
  }
```

This tank works... but honestly it's pretty stupid. It just fires all the time. You need to improve the code in `tank.js`-file.
But test it in a [match](http://www.marcusoft.net/tankwars/pages/match.html) and you'll see how it works.

Better hurry up to make it better. We will run matches every 20 minutes.

# Other useful tricks

## Edit and redeploy
* Edit the files via your editor
* Save the files
* Redeploy with `npm run deploy`
* [Test the API here](http://www.marcusoft.net/tankwars/pages/test.html) or run a [match against others here](http://www.marcusoft.net/tankwars/pages/match.html)

## Get hold of the URL
* Open the `claudia.json`-file
* Copy the `URL`-field

## Test your tank
Use the [test page](http://www.marcusoft.net/tankwars/pages/test.html) and paste the URL into the `API URL`-field on the page

## Run a match
Go to the [match page](http://www.marcusoft.net/tankwars/pages/match.html) and paste the URL into one of the `Tank API URL`-fields

## Take the tankwars off my computer!
* First exit the container with `exit` at the container prompt.

* Clean up the docker images with these commands

```
docker kill tankwars
docker rmi tankwars -f
docker system prune -f
```
