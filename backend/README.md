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


REST API 
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