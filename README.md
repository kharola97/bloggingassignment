# bloggingassignment
to run this project on your local machine make sure you have Nodejs installed in your computer

create and empty folder on desktop open it with vscode 
open the terminal in vscode
paste this command in terminal git clone https://github.com/kharola97/bloggingassignment.git

not the cloning might take a little time after cloning the project you need to install all the dependencies of the project using the command -- npm i

now after installation of all the dependencies you can start the server by running the command node index.js which will make the connection to data base and start the ser ver


API's in the project--

localhost:3000/register --  run this url in postman which will help the user to register himself just like creating an account

localhost:3000/login -- this url is used when user is trying ti login in our w=server using the email and password he used to register himself

localhost:3000/updateuserdetails/656a04d31a5feaa06cc99a78 --  this url is used if user wants to update his details

localhost:3000/createblog/656ac07e93b2a0ad20bef490  -- this url is used to create a new blog by the user who have already registered with us 

localhost:3000/updateblog/656ac20ace945ac3d9612856/656ac07e93b2a0ad20bef490 -- this url isused to update the blog and only the user who created the blog can update it

localhost:3000/getblogs --  this url is used when a logged in user wants to see all the blogs created by different users

localhost:3000/deleteblog/656ac07e93b2a0ad20bef490/656ac20ace945ac3d9612856 --  this url is used to delete a blog and only the who created the blog can delete it 




