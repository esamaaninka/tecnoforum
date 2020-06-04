port=3000  if  not defined in .env 
MONGODB_URI= not defined yet


sceleton, currently just starts server, connects to DB if defined in MONGODB_URI and logs info, errors to console, or returns default unknonw endpoint error to REST requests

start with 
%npm run 

to run in dev mode utilising NODEMON 
%npm run dev


in browser localhost:<PORT> as no routers defined yet
{
error: "unknown endpoint"
}
