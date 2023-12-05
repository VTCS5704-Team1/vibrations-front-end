# vibrations-front-end
Project for CS 5704 - Software Engineering (Fall 2023)

# Instructions for Grader
- Access the front end of the app here: http://dev-vib-ui-final-eb-env.eba-xvyd3ppt.us-east-2.elasticbeanstalk.com/ 
# Steps for Registering
As of right now, unless I am provided with your spotify email and full first and last name, unfortunately you won't be able to pull your top data. The app is technically in developer mode on Spotify and to allow anyone to use the app with their Spotify log in credentials, I would have to request extended quota mode which could take up to 6 weeks. 
- Select "Sign Up"
- Sign up by filling out all the fields
- Create a profile by searching and selecting up to 5 artists and songs, uploading a profile picture, and writing a bio
  - Since there is a limited amount of data in the database right now, it is unlikely you will have any matches.
- Select the settings page in the navbar
  - if you would like to experiment with other features, you may try changing your password or deleting your account
- Select log out

# Steps for Viewing Matches
- Select log in
- Log in with email "davidfc@vt.edu" and password HelloWorld123!
- You can view matches generated for said profile on the home screen
- You can select the like button on the profile
- If you select the matches tab on the navbar, you can see the liked matches for the user
- You can view this users profile by clicking the my profile tab

# Unit Tests
Unit tests are primarily written in the back end repository

# Acceptance Testing
Features that correctly function: 
- Sign up
  - searching artists and songs through spotifys api
  - adding songs and artists to selected
  - spotify log in works, if you click it it will take you to the spotify page asking if you want to allow the app to access your data, unfortunately it won't generate anything for any users not predesignated in the spotify for developers platform
  - uploading a pfp
  - writing a bio, changing distance radius
- Log in
- Change password
- Delete account
- Like a user, view them in matches tab

Features that don't function: 
- Send message
