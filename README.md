# Airplane (React, Material UI and REST API)
This is a Demo of using React, Material UI and a REST API application in InterSystems IRIS, showing information with different types of graphics, the datasource is get from CENIPA (Aeronautical Accident Prevention and Research Center).

## Developers

:boy: Flávio Lúcio Naves Júnior [@flnaves](https://github.com/flnaves)

:older_man: Felipe França [@felipeflfranca](https://github.com/felipeflfranca) 

## Prerequisites
Make sure you have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Docker desktop](https://www.docker.com/products/docker-desktop) installed.

# Demonstration of screens

## Dashboard Menu

![Image Dashboard Menu](https://raw.githubusercontent.com/flnaves/airplane/master/images/print1.PNG)

## Occurence Type Report

![Image Occurence Type](https://raw.githubusercontent.com/flnaves/airplane/master/images/print2.PNG)

## Airplane Model Report

![Image Airplane Model](https://raw.githubusercontent.com/flnaves/airplane/master/images/print3.PNG)

## Geographic Report

![Image Geographic Report](https://raw.githubusercontent.com/flnaves/airplane/master/images/print4.PNG)

## Contributing Factors Report

![Image Contributing Factors Report](https://raw.githubusercontent.com/flnaves/airplane/master/images/print5.PNG)


## How to Run the Application

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
$ yarn
$ yarn start
```

That will create a url to acess the Web page:

```
http://localhost:3000/
```

or open the folder in VSCode and do the following:

![Airplane usage demo](https://raw.githubusercontent.com/flnaves/airplane/master/images/airplane.gif)

# Testing

## Unit Test

To test and see if all Unit tests are working go to terminal and execute:

```
USER> do ##class(%UnitTest.Manager).RunTest(,"/nodelete")
```

See the results on:

```
http://localhost:52773/csp/sys/%25UnitTest.Portal.Indices.cls?Index=2&$NAMESPACE=USER
```
Tutorial how to test:

![Airplane test demo](https://raw.githubusercontent.com/flnaves/airplane/master/images/unittest.gif)
