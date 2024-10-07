# Laboratory Research Management Web Application

This repository contains the code for a web application developed as part of a laboratory project focusing on research management. The project aims to create a comprehensive web platform for managing a research laboratory, including its members, publications, tools, and events.

## Project Overview

The project focuses on building a web-based system to manage a research laboratory. It includes the following key features:

- Management of the laboratory with attributes like code, name, address, institution, and research focus areas.
- Member management, distinguishing between students and permanent researchers, each characterized by unique personal information.
- Collaboration capabilities where members can publish research work (journal articles, book chapters, posters, etc.), develop tools (open-source), and organize laboratory events.
- Relationship between members and publications, allowing multiple authors per publication, all assumed to belong to the same laboratory.
- Visitor access to view laboratory members, download their CVs, publications, source code of tools developed within the laboratory, and check upcoming events.
- Advanced search functionalities for members (by grade, institution) and publications (by year, type).

### Academic Details
- Academic Year: 2023/2024
- Class: GI3S4

## Dependencies Used

### Backend (Spring Boot)
- **Spring Cloud:** Utilized for implementing microservices architecture.
- **Spring Data JPA:** Used for data access and management.
- **Spring Web:** Enabled building web applications.
- **Spring Security:** Integrated for securing access to the site.
- **MySQL Connector:** Utilized for connecting Spring Boot application with MySQL database.
- **JSON Web Token (JWT):** Implemented for authentication purposes.
- **Spring Boot DevTools:** Added for enhancing the development experience.
- **Lombok:** Used for reducing boilerplate code.

### Frontend (Angular)
- **Angular Material:** Used for UI components and design.
- **Angular Flex Layout:** Utilized for responsive design and layout.
- **JWT Decode:** Used for decoding JSON Web Tokens in the frontend.

## Usage

To run the application locally:
1. Clone this repository.
2. Navigate to the project directory.
3. Follow the instructions in the individual service directories for setting up and running each microservice.

Ensure you have the necessary tools and dependencies installed as per the requirements of each service.

## Additional Notes

- **Visual Presentation:** Efforts have been made to provide a visually appealing and harmonious user interface within the application.
- **Security Measures:** Integration of Spring Security has been highly recommended to secure access to the site, ensuring the protection of sensitive data and functionalities.

## Contributors

This project was completed by Ibrahim BEN LAKHAL as part of a collaborative effort in fulfilling the requirements of the laboratory project.

## Acknowledgments

Special thanks to Dr.Imene Lahyeni, Dr.Sihem Loukil and Dr.Mariam Lahami for guidance and support throughout the development process.

