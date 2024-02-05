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
cd ../frontend || exit

# Build the application, but first, install npm
sudo docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app node:16.0.0 /bin/bash -c "npm install && npm run build"

# Copy all the dist folder content into backend static folder
cp build/* ../backend/src/main/resources/static/new
# First, we locate the pom
cd ../backend || exit

# Executing dockerfile commands
mvn package

# Copy the .jar files to docker dir
cp target/*.jar ../docker

# Return to docker folder
cd ../docker || exit

sudo docker build -t jorgeap/phonecatalog .

# Push the image to dockerhub
sudo docker push jorgeap/phonecatalog
