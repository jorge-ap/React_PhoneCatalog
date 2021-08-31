# PhoneCatalog

Welcome to this repository! Here you can find some features:

* [**Views**](#views)
  * [Index - Phone catalog (/phones)](#index)
  * [Phone information (/id)](#phoneInfo)
  * [Phone edition (/phones/id/edit)](#phoneEd)
  * [Phone creation (/phones/newPhone)](#phoneCreation)
* [**How to run it**](#runIt)
  * [Requisites](#reqs)
  * [Run backend only](#back) 
  * [Run frontend only](#front)
* [**Information about docker**](#docker)

## Views <a name="views"></a>

### Index - Phone catalog (/phones) <a name="index"></a>

![image](https://user-images.githubusercontent.com/61882277/131491844-632ab4e1-5e11-453c-a676-23e6cac0dfdb.png)

This is the main component, accessible from this link [localhost:3000](http://localhost:3000/) or [localhost:3000/phones](http://localhost:3000/phones).
Here you can do the following actions:
- See the catalog

- Delete elements with the *Delete* button:

  ![image](https://user-images.githubusercontent.com/61882277/131377982-275471c5-def7-4263-a73c-59e0ce84e86a.png)
  
- Access to each phone clicking wherever inside its box, which change color to blue when it is hovered

  ![image](https://user-images.githubusercontent.com/61882277/131378350-38375cc4-64db-450d-bf2d-e421b1a923a1.png)

- Create a new one

  ![image](https://user-images.githubusercontent.com/61882277/131378454-1462ddcd-be81-43e7-902d-4efd4bbb16ca.png)
  
### Phone information (/id) <a name="phoneInfo"></a>

  ![image](https://user-images.githubusercontent.com/61882277/131378989-80ff33e1-d814-4eb2-a39f-0f67aa380eea.png)

  
Here you can see the phone information and do the following actions:

- Edit phone

![image](https://user-images.githubusercontent.com/61882277/131378958-578281e5-e77d-472e-af5e-54d26238cb1e.png)


- Return to catalog 

![image](https://user-images.githubusercontent.com/61882277/131378850-6af99ca7-b9f5-47e8-a80b-8bdc18fa6f75.png)

### Phone edition (/phones/id/edit) <a name="phoneEd"></a>

![image](https://user-images.githubusercontent.com/61882277/131379088-3265ec69-eaf6-45f1-8715-ab2c18a0119d.png)

Here you can edit the phone. Each parameter is required except the photo, which can be empty. In this case, the image will be set by default. When you finish, you willbe redirected again to the phone information to see the uodates.

### Phone creation (/phones/newPhone) <a name="phoneCreation"></a>

![image](https://user-images.githubusercontent.com/61882277/131490903-594334c5-c44a-4d59-8a90-e4e1231aaa65.png)

This form is similar to the edition, except there is no picture because it does not have anyone yet. When you submit, you will be redirected to the catalog to see your upload.

## How to run it <a name="runIt"></a>

### Requisites <a name="reqs"></a>

To run it, you need to have:
- Node.js. In case you don't have it, you can install in this link : [Descarga | Node.js](https://nodejs.org/es/download/)
- MySQL Server [Download MySQL](https://dev.mysql.com/downloads/mysql/)
- Java 11
- Browser (Google Chrome or Firefox preferred)
- Maven, installed in ubuntu with the command `sudo apt install maven`
- **(Optional)** IntelliJ IDEA Ultimate or Visual Studio Code to make things easier

### Run backend only <a name="back"></a>

The following steps show how to start the developed web application:

1. Download the code released
2. Create a user into MySQL server with the following credentuals and permissions:
  
  * **User** : phoneUser
  * **Password** : phonePassword1
  
    If `ERROR 1819 (HY000): Your password does not satisfy the current policy requirements.` happens, keep this steps
  
    1. In terminal write : `mysql -u root -p`
    2. `SET GLOBAL validate_password.policy=LOW;`
    3. `exit`
    4. Open mysql again with `mysql -u root -p`

 `CREATE USER IF NOT EXISTS 'phoneUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'phonePassword1';`
  
Permissions : `GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, INDEX, ALTER, CREATE TEMPORARY TABLES, CREATE VIEW, EVENT, TRIGGER, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EXECUTE, REFERENCES ON *.* TO 'phoneUser'@'localhost';`

3. `CREATE DATABASE phoneCatalog;`
4. Exit MySQL
5. Run the SpringBoot application:
 `./mvnn spring-boot:run`
6. Done! The backend REST is running on `http://localhost:8080`
    
### Run frontend only <a name="front"></a>

**While backend is running**, open the frontend folder and execute in terminal section `npm install` and after that `npm start`. This will open a new browser tab on `http://localhost:3000`

## Information about docker <a name="docker"></a>

**NOTE**:Every information is related to Ubuntu
The image is posted on dockerhub in the next link : [Dockerhub](https://hub.docker.com/r/jorgeap/phonecatalog)

To execute docker, with the project downloaded, go to docker folder and run in terminal:
1. `chmod u+x create_image.sh`
2. `./create_image.sh`
3. `sudo docker-compose up`

After this, the backend will be displayed on `http://localhost:8080`

**NOTE:** Despite building an copying the build folder created when `npm run build` to backend folder, frontend is not shown and located correctly, so the frontend needs to be displayed on `http://localhost:8080`
