### INFO

    Enter the database using the docker 

        $ docker-compose up
        
        ## the database srevice name is database 
        $ docker-compose run database bash 

        ## enter the bash terminal 
        root@database# psql --host=database --username=arefe --dbname=postgres


        We can also do it as follows,

        ## find the container name
        $ docker ps -a
        
        ## Run the below command to enter into the container (with the ID from step-1).
        $ docker exec -it <PSQL-Container-ID> bash

        ## Authenticate to start using as postgres user
        $ psql -h localhost -p 5432 -U postgres -W






