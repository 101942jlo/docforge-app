
# DocForge App 

The AEC (Architecture, Engineering, and Construction) industry is well known for its continuous evolution and frequent changes throughout the construction process. Keeping track of the latest updated files can be a real challenge. Although there are various Common Data Environments (CDEs) available in the market for exchanging and centralizing documents, most of the time, information (such as plans) is still exchanged via email, SharePoint, or certain CDEs widely recognized within the industry.

Despite the advancements in the construction industry over the years, workers on-site often prefer working with printed plans, which frequently leads to using outdated versions of plans and documents. While making construction sites entirely paperless may not be feasible, one thing that everyone carries on-site—besides a helmet and, occasionally, a pack of cigarettes—is a smartphone.

This is where DocForge comes in. DocForge is a web application that enables architects, engineers, and stakeholders to upload plans and files (typically PDFs) in a way that makes them easily traceable. Every document or plan uploaded to the platform is automatically assigned a QR code, visible in one of the corners of the PDF. Construction workers can scan the QR code using their smartphones to verify whether they are working with the latest version of the document and, if necessary, download the updated version.

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
<p align="center">
  <img src="/images/DocForge_Network.png" alt="Architecture network schematic" width="500">
</p>

## What I will be learning with this project?

I will be learning the following topics and technologies:
- Networking: Vpn, Linux Servers, DNS/DNSS
- Databases: MongoDB
- Managing sessions, Authentication: JWT (JSON web token)
- Containerization: Docker
- QR-Code technology: Did you know that a QR code can store
