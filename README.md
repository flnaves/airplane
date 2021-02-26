# Airplane (React, Material UI, and REST API)
This is a Demo of using React, Material UI and a REST API application in InterSystems IRIS, showing information with different types of graphics, the datasource is get from CENIPA (Aeronautical Accident Prevention and Research Center).

## Developers

:boy: Flávio Lúcio Naves Júnior @flnaves

:older_man: Felipe França @felipeflfranca 

## Prerequisites
Make sure you have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Docker desktop](https://www.docker.com/products/docker-desktop) installed.

## How to Run the Application

### Installation with ZPM

```
zpm:USER>install airplane
```

### Installation

Clone/git pull the repo into any local directory e.g. like it is shown below:

```
$ git clone https://github.com/flnaves/airplane.git
```

Open the terminal in this directory and run:

```
$ docker-compose up -d --build
```

Go to /Web folder and Run the Yarn:

```
$ yarns install
$ yarn
$ yarn start
```

That will create a url to acess the Web page:

```
http://localhost:3000/
```

or open the folder in VSCode and do the following:
![rest](https://user-images.githubusercontent.com/2781759/78183327-63569800-7470-11ea-8561-c3b547ce9001.gif)

# Testing

## Unit Test

To test and see if all Unit tests are working go to terminal and execute:

$ set ^UnitTestRoot="/opt/irisapp/tests/UnitTest/Report"
$ do ##class(%UnitTest.Manager).RunTest(,"/nodelete")