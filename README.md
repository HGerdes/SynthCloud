# Synthcloud

<br/>

## Introduction
Synthcloud is a synthwave-themed Souncloud-ish type website.  Users are encouraged to upload their own synthwave tracks.  Users can also comment on other tracks, as well as edit and delete their tracks and comments. 

So futuristic.  It's like 1986 up in here.


To start code >>>

Navigate to react-app

npm start > starts front end

pipenv shell > flash run > starts back end

<br/>

## Link: https://synthcloud.herokuapp.com/

<br/>

## Technologies
* Docker
* PostgresQL
* Flask-SQLAlchemy
* React
* Redux

<br/>

# How to Use
## Splash Page
![Splash Page](https://i.imgur.com/Vz3Dxqx.png)
* From the splash page, users can either sign up for a new account, log into a created account, or just use the demo account.  All fields are validated.  A real email is not required.

<br/>

## Home Page
![Page](https://i.imgur.com/usL6P6c.png)
* All uploaded tracks are available from the homepage.  You can scroll left and right using the arrows to see all available tracks.

<br/>

## Upload Page
![Page](https://i.imgur.com/Gt3jbYj.png)
* Here you can upload your track.  You can upload your own sound file directly, but images need to be hosted elsewhere (this will change as the site grows).  Working images are optional (this was intentional).  You can get by with just putting ".jpg" in the form.  It won't break the site.  All fields are validated.

<br/>

## Profile Page
![Page](https://i.imgur.com/gKfRQp1.png)
* The profile page contains all your uploaded tracks.  From here you can edit and delete your tracks.

## Search Bar
* You can use the search bar to search for any track. Just click on a result and you'll be taken to that track page.  Right now you can only search track names.  

## Future Plans
* Sort by Genre and artist
* Likes (obviously)
* Search by genre and artist
* Search will take you to a page rather than have results you have to click 
* The home page will have a lot more than recently uploaded tracks.  It should have your likes, tracks by genre, random tracks, etc.  
