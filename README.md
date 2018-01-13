# Document Generator Service

A micro service offers rest APIs to prepare MS WORD document using a template system. The service consumes docxtemplater open source packages to do all the processing job and is simply a rest wrapper. It also stores the documents locally on the system so that it can be accessed again.

## Install on your local machine

- Install node js and npm
- Pull dependencies: npm install
- Run: npm run start
- Run test cases: npm run debugWindows|debugLinux

## Docker container

- Build: docker build -t "docx-service" .
- Execute: docker run --name docx-service -p 3000:3000 -v docx-service-data:/home/node/app/data -d docx-service
