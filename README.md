
# DocForge App 

The AEC (architecture, engineering, construction) industry is well known for being in continuous evolution/changes during the whole construction process. Working with the last updated file it can be a real challenge. Although there are differente Common Data Environment (CDE) in the market for exchanging and centralizing documents most of the time the exchange of information (plans) happens via email, SharedPoint and some CDE well known within the industry.

Despite the construction industry has changed/improved over the years, workers on site they still keep/prefer working with plans on paper and this lead most of the time to not working with the last version of the plans/documents. Making building sites PaperLess is not an option. But if there is one thing that everybody carry/wear on site besides helmet and a package of cigarttes is an smartphone.

And this is how DocForge was born. DocForge is a webapplication where Architects, Engineers and Stakeholders can upload Plans/Files (normally PDFs) and be traceable. The idea is every document/plan (pdf) uploaded will get a automaticlly a QR-code visible in one of the corner of the PDF. The construction worker with his smartphone will be able to scan the QR-code and check if he/she is working with the last version of the documents and eventually download the last version.

## Programming languages and technologies

The application will have a FrontEnd and a BackEnd. Since this course is about "Gegevensbeheer en -beveiliging" and not focus on building/designing frontend we will be using React TypeScript.
For the Backend, managing databases, generating qrcode, etc we will using Python.

- FrontEnd → ![My Skills](https://skillicons.dev/icons?i=vite,react,ts,tailwind)
- Backend → ![My Skills](https://skillicons.dev/icons?i=py,mongodb)

## Architecture

The Application will be running in a Docker Cointainer. Docker is an open platform for developing, shipping, and running applications. Using Docker, you can quickly deploy and scale applications into any environment and know your code will run. The application will be available on the Official Docker Hub sothat anyone can deploy it locally or on a server in a couple of seconds.

For the Presentation / Demo I will be giving in January the application will be deployed on a Raspberry Pi 4 using Ubuntu Server 22.04 that will be running at home. 

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=raspberrypi,docker,ubuntu,linux" />
  </a>
</p>

## What I will be learning with this project?

I will be learning the following topics and technologies:
- Networking: Vpn, Linux Servers, DNS/DNSS
- Databases: MongoDB
- Managing sessions, Authentication: JWT (json web token)
- Containerization: Docker
- QR-Code technology: Did you know that a QR code can store