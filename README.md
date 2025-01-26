User Details 

Given two files server.js and a database file userData.db consisting a table User.

API 1

Path: /users/

Method: POST

Description:
Creates a new user in the User Table

Response
       
      {
        id: 1,
        first_name: "Geetha",
        last_name: Rao,
        email:geetha@123,
        department:Commerce
      },
    
      
    

API 2

Path: /users/:id/

Method: DELETE

Description:
Deletes a user from the user (database) based on the user ID 

Response 
    User Removed 
    

API 3

Path: /users/

Method: GET

Description:
Returns a list of all users in the User Table 

Response 
           
      {
        id: 1,
        first_name: "Geetha",
        last_name: Rao,
        email:geetha@123,
        department:Commerce
      },
    
    

API 4

Path: /users/:id/

Method: PUT

Description:
Updates the details of a user in the User Table (database) based on the user id 

Request 

    {
        first_name: "Geetha",
        last_name: Rao,
        email:geetha@123,
        department:Commerce
      }, 

Response 
    User Updated successfully

    
