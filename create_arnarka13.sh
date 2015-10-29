#!/bin/bash
curl -i -XPOST -d "{ \"username\" : \"arnarka13\", \"password\" : \"rassiprump\", \"email\" : \"arnarka13@ru.is\" \"age\" : \"22\" }" -H "Content-Type: Application/json" http://localhost:4000/users
