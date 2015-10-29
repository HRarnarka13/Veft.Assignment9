#!/bin/bash
curl -i -XPOST -d "{ \"username\" : \"arnarka13\", \"password\" : \"rassiprump\" " -H "Content-Type: Application/json" http://localhost:4000/token
