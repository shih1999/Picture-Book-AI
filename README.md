# Picture Book AI

## Overview
This website is an interactive picture book creation platform that leverages Generative AI technology. <br>
It allows users to become creators of picture books rather than just passive readers.

<img src="https://github.com/shih1999/Picture-Book-AI/assets/65940533/f3a9978c-2844-4ba2-88d4-33aa23de17ae" width=90% height=90%>

## Features
- AI-Driven Illustrations: Users can input text, triggering AI to generate illustrations in various styles tailored to the content.
- Community Interaction: Users can actively engage by commenting on and contributing content to picture books, fostering collaboration and sharing.
- Edutainment: The platform blends entertainment with educational value, providing engaging experiences for both children and creators.

## Getting Started
### Installation
1. Clone this repository
2. Navigate to the project directory:

   ```bash
    cd Picture-Book-AI
    ```
3. Install frontend dependencies:

   ```bash
    cd Frontend
    npm install
    ```
4. Install backend dependencies:

   ```bash
    cd Backend
    npm install
    ```
5. DataBase Installation
    - Download MySql
    - Input correct User_name, Password and Database_name in /Backend/.env
    - Run Backend/test.sql in the DataBase command line

### Running the Application
1.  Add your OpenAI API Key to ```Create\api\get-image.js```
2. Start the backend server:

   ```bash
    cd Backend
    node server.js
    ```
3.  Start the frontend server:
  
    ```bash
    cd Frontend
    npm start
    ```
4. Open your web browser and go to ```http://localhost:3000``` to use the application. <br>
   http://localhost:3000


## Website Preview
> Home (Pricing)
<img src="https://github.com/shih1999/Picture-Book-AI/assets/65940533/e47d5796-74cf-43fd-bee6-1d0707359976" width=70% height=70%>
<img src="https://github.com/shih1999/Picture-Book-AI/assets/65940533/461bf0e7-c65d-418d-825d-b62bc9a6aab6" width=70% height=70%>

> Create
<img src="https://github.com/shih1999/Picture-Book-AI/assets/65940533/1f9f941f-1cf4-49b1-8fc5-619099f2b3d2" width=70% height=70%>
<img src="https://github.com/shih1999/Picture-Book-AI/assets/65940533/76e99123-30dc-4033-8080-8703f18fda2c" width=70% height=70%>

> MyStory
<img src="https://github.com/shih1999/Picture-Book-AI/assets/65940533/f50c4123-632e-4c5b-801c-f4cbe11e76f5" width=70% height=70%>
<img src="https://github.com/shih1999/Picture-Book-AI/assets/65940533/b28208c7-ec94-40d6-a44a-63e220ceb7ef" width=70% height=70%>

## Future Plans
- [ ] **Implement 3rd Party Login and Password Recovery:**  Integrate convenient login options such as Google account login and enhance account security.
- [ ] **AI improvment:** Continuously enhance AI models to produce more accurate and diverse illustrations.
- [ ] **Enhanced Book Creation Tools:** Develop tools including customizable templates, interactive elements like animations and audio, and introduce features such as voice input and AR effects to enrich user experience.
- [ ] **Community Feature Expansion:** Expand community features with comment and like functionalities to encourage collaboration and content sharing among users.
- [ ] **Business Exploration:** Explore business models such as subscription fees, advertising, and more to achieve sustainable growth.

## Reference
- [Storybird](https://storybird.com)
- [Storybird AI](https://storybird.ai/)

## Our Team
| Role | Member |
|:-|:-|
| Project Manager | 施雅婷 |
| Frontend Engineer | 朱修平 [TimmyChu890902](https://github.com/TimmyChu890902) |
| Frontend Engineer | 陳世潔 [shih1999](https://github.com/shih1999) |
| Backend Engineer | 林冠汝 [LinKuanRu](https://github.com/LinKuanRu) |
| Testing Engineer | 曾靖傑 [Alexei0000](https://github.com/Alexei0000) |
