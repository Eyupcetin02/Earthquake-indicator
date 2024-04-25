# Earthquake-Indicator

Hello, I am Eyüp, I am here with a project that shows the abnormal earthquakes in the world today on a map.

## Project Dependencies

1- The client part of the project was made with <b>Reactjs</b>.
<br>
2- The server side of the project was made with <b>Expressjs</b>.
<br>
3- <b>MongoDB</b> was used as the database in the project.
<br>
4- <b>RabbitMQ</b> was used as the queuing system in the project.
<br>
5- <b>maptiler/sdk</b> library was used for the map in the project.
<br>
The project has been dockerized and docker-compose has been written to run with a single command.

## Dependencies

| Client-side             | Server-side          |
|-------------------------|----------------------|
| axios        | amqplib|
| redux-toolkit| body-parser |
| react   | dotenv|
| react-dom  | express|
| maptiler/sdk | axios|
| typescript| mongoose|
| leaflet |cors|

## Project setup

<ul>
  <li>
    First, download the project and go to the directory where the project is located with the terminal.
  </li>
  <li>
    then run <b>docker-compose up -d</b> in terminal
  </li>
  <li>
    After the installation is completed, you can access the project's client by going to http://localhost:3000 in your browser.
  </li>
</ul>

## Scripts

There are 2 scripts in the project. The 1st script sends random latitude, longitude and intensity data to my server every second. In the 2nd script, the user enters his own latitude, longitude and intensity data and sends them to the server.

## Author

LinkedIn Click [Here](https://www.linkedin.com/in/eyupcetin00/) @eyupcetin00

