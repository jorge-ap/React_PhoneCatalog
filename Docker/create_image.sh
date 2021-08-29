#!/bin/bash

# First, check the destination directory exists
if [ -d "../backend/src/main/resources/static/new" ]
then
# Delete all the inside content
	rm -rf ../backend/src/main/resources/static/new
else
# Create the folder
	mkdir ../backend/src/main/resources/static/new
fi

# Go to frontend which contains the Angular project
cd ../frontend

# Build the application, but first, install npm
sudo docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app node:16.0.0 /bin/bash -c "npm install && npm run build"

# Copy all the dist folder content into backend static folder
cp frontend/build/* ../backend/src/main/resources/static/new

# Then locate the pom.xml
cd ../backend || exit
# Executing dockerfile commands
sudo docker run --rm -v "$PWD":/data -w /data maven mvn package

# Copy the .jar files to docker dir
cp target/*.jar ../docker

# Return to docker folder
cd ../docker || exit

rm -f BackendPhone-0.0.1-SNAPSHOT.jar

# Building the new container
sudo docker build -t jorgeap/phonecatalog .
