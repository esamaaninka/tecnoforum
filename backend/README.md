Define env variables in .env file in project root, examples below:

    port=<PORT_NUMBER> by default 3001 used if undefined
    MONGODB_URI= mongodb+srv://<USERNAME>:<PASSWORD>@tecnoforum0-enrpp.mongodb.net/<DBNAME>?retryWrites=true&w=majority
    SECRET=SALAINENSANATOKENINTEKOON


Start with 
%npm start 
or
%node index.js

to run in dev mode utilising NODEMON 
%npm run dev


Browser localhost:<PORT>/api/users 
    [
        {
            fullname: "Jaska Jokunen",
            password: "sanasala",
            email: "jaska.jokunen@mail.com",
            nickname: "Jaska",
            id: "5eda1c51cc9d6412209bf1f8"
        },
        {
            fullname: "Jaska Jokunen",
            password: "sanasala",
            email: "jaska.jokunen@mail.com",
            nickname: "Jaska",
            id: "5eda1c5dd6eba72ec8222e4a"
        }
    ]

----------------------------------------------------------------
REST API 
----------------------------------------------------------------

Users
GET http://localhost:{<PORT>}/api/users
- get_all_users.rest to be used from VSC, note change port number manually

GET http://localhost:<PORT>/api/users/name/<NAME>
- get_user_by_name.rest (change the port number manually)

GET http://localhost:<PORT>/api/users/id/<id>
- get_user_by_id.rest

POST http://localhost:<PORT>/api/users 
- POST_user.rest

POST http://localhost:<PORT>/api/users/login
- POST_login.rest

----------------------------------------------------------------
Comments: 
GET http://localhost:<PORT>/api/comments
- get_all_comments.rest

POST http://localhost:<PORT>/api/comments
- POST_a_comment.rest


POST http://localhost:{{PORT}}/api/comments
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBla2thIFB1dXDDpMOkIiwiaWQiOiI1ZWUzMWIwMTk0MmJkZjQ2OTBhZWU0ZjkiLCJpYXQiOjE1OTIxNjY1MTl9.jO4apItViBccU9xYD3D7GVvXUFvV1F3_ZEV8vE-cR3Q

{
		"comment": "Aliquam in porta enim, ut pulvinar neque. Fusce pulvinar fermentum placerat. Nulla porta, quam elementum eleifend dictum, leo erat fringilla arcu, nec efficitur sem purus vitae magna. Nulla facilisi. Aliquam mi lectus, iaculis non mattis sed, laoreet vitae sem. Phasellus viverra sodales arcu at sollicitudin. Phasellus vestibulum neque at dolor porttitor mattis. Curabitur porttitor massa sed condimentum auctor. Mauris semper ex massa. Vestibulum aliquet hendrerit diam, semper dictum enim lobortis eget.",
		"author": "cicero"
}
