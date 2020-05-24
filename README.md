# simple-stateless-microservice
This repository contains the source code for simple stateless microservice which has 2 major functionalities
<ol>
<li> Authentication </li>
<li> Image Thumbnail Generation </li>
</ol>

This codebase utilizes Node.js with an express server.

<h2> Setup </h2>
<p> Just clone this repository to your machine and run the command <strong> npm install dependencies </strong> and then just <strong> npm start </strong> This will start
the server on port 3000. Make sure port 3000 is currently free on your machine before starting the server. </p>
<p> This project can be best experienced on <em> Microsoft Visual Studio Code </em> and please install <strong> REST Client </strong>
in the extensions for making the API calls to the server. </p>

<h2> Usage </h2>
There are basically two endpoints which can be used for interaction.
<h4> Authentication </h4>
</p>
For authentication user can login in the server by an arbitary username and password which can be set in <strong> <em> request.rest </em> </strong> file
under the <strong> POST </strong> request. When user sends the request the endpoint is going to return a json respons containing the
 <strong> Signed Java Web Token </strong> copy and paste this token to a secure location for future request. Now that the user has got the JWT
they are now ready to proceed to next step. </p>
<h4> Image Thumbnail Generation </h4>
<p> For this endpoint the users needs to add his token which they got earlier after <strong> <em> Bearer </em> </strong> in the Authorization tag in 
the <strong> GET </strong> request in the <strong> <em> request.rest </em> </strong> file, and add an image url under the url field in the <strong> GET </strong> request.
Now you have enetered all the fields for successfully making the API call to the server. Unless the JWT Token is not altered and the url
is a valid Image url, user is going to get the Image thumbnail having 50 px X 50 px dimension. Otherwise if the image url was invalid the 
request is going to get rejected. Same is going to happen in case if JWT was modified.
</p>

Thanks for looking💙
