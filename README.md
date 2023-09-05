# PulseVibe, A MERN Stack Application 
 ## Introduction
 The objective of this project was to create a MERN stack application using MongoDB, Express.js, React.js, and Node.js. 
 This website's intended use is to allow the user to create an account and be able to access the Spotify API. Once they are able to login into the website they are able to look at popular songs from different playlists Spotify generates.

 ## Motivation 
The creation of the final project of Per Scholas's third module MERN Stack application.

### Project Requirements: 

A functioning full-stack, single-page application for (Express) and a CDN service for (React).
Incorporate the technologies of the MERN-stack:

MongoDB/Mongoose
Express
React
Node
Have a well-styled interactive front-end that communicates with the Express backend via AJAX.
Implement token-based authentication - "...a user can sign-up, log in & log out".
Implement authorization by restricting functionality to authenticated users.
Navigation should respond to the login status of the user.
One User data entity minimum, which will be used for Auth; other data entities can be added and related if desired but are not required.
Have a comprehensive feature-set.

Full CRUD distributed across all Data Entities

Or

One of the following features instead:

(Easy) - Consume a third-party API and display API data in components.
(Moderate) - Include an admin interface w/features.
(Hard) - Utilize multi-user, real-time communications (difficult and time consuming)


 ### Packages Used:
 <table>
  <tr>
    <td valign="top">

- Axios
- bcrypt
- concurrently
- cors
- dotenv
- express
    </td>
    <td valign="top">
- jsonwebtoken
- mongoose
- react
- react-dom
- react-router-dom
- Tailwind CSS
    </td>
  </tr>
</table>

## Trelloboard: 

![image](https://github.com/ssok305/mod3_project/assets/78516342/6c9d8c77-bb44-4ceb-b48c-0d93ce58ac4c)

## Wireframe:

![image](https://github.com/ssok305/mod3_project/assets/78516342/9d54a20c-8d5e-4384-bf18-028287b544d4)

## Screen shots of the website

![image](https://github.com/ssok305/mod3_project/assets/78516342/63f85b05-8b4e-4346-83af-737f4bb05dd0)

![image](https://github.com/ssok305/mod3_project/assets/78516342/550fd1f7-bbc9-43ab-a725-b2efa30bf836)



Deploy Link: 

https://mod3-projectclient.onrender.com/Login

## Unsolved Problems:
As I was a bit ambitious I couldn't fully grasp the authentication from Spotify from what I wanted to create. With the problem listed as:

- Using Spotify Web playback SDK
   - Major problem was trying to configure my backend to generate tokens as for some reason I kept getting security problems. I was unable to add the feature in time
   - Wanted to add the user to save their song onto my database and allow them to listen to it on their profile. 
- Wanted the user to create posts and share their music with other users.
  - By being able to like and comment on their post and also share it.
- Also wanted to create an admin feature to help monitor posts and ensure a healthy community.

## Future Enhancements:
I plan on implementing the unsolved problems onto my project within due time as that is what started my inspiration in the first place.


 
