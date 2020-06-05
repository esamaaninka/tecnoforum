Define env variables in .env file in project root, examples below:

    port=<PORT_NUMBER> by default 3000 used if undefined
    MONGODB_URI= mongodb+srv://<USERNAME>:<PASSWORD>@tecnoforum0-enrpp.mongodb.net/<DBNAME>?retryWrites=true&w=majority


Start with 
%npm start

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

Issues: 
mongo_user_test.js 
- needs to run twice to be able to read from DB 
- saves data to tecnoforum_db/users - not user as I wanted cannot find reason ???

REST API 
GET http://localhost:{<PORT>}/api/users
- get_all_users.rest to be used from VSC, note change port number manually
- Note! reads from tecnoforum_db/users  - not user as intended ???
