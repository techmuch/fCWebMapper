# fCWebMapper
-----------------





## Getting Started

fCWebMapper is built on top of the Yeomen generator-huddle template. The template utilizes a combination of node.js applications to automate common cross project functions. Getting started is easy with the following steps:

  - Make sure the require software is installed
  - Clone the github repository
  - Pull the required dependances
  - Start the application

### Required before getting started
First, your machine must have at minimum the following installed:

  - node.js
  - npm

Take the appropreate steps to install these required tools before proceeding.

### Clone, Pull Dependancey, Start

Clone the repository by typing

```sh
$ git clone git@github.gatech.edu:df115/fcwebmapper.git
```

change directories into the newly created fcwebmapper

```sh
$ cd fcwebmapper
```

pull all of the node.js dependencies by typing

```sh
$ npm update
```

pull all of the web application dependencies by typing

```sh
$ bower update
```

the application can be served either by the http_server or by first compiling to an executable

for http_server

```sh
$ http_Server src/
```

to produce an executable

```sh
$ gulp build
```