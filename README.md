#캠핑장 정보 제공 및 예약 웹 앱
이 프로젝트는 전국의 다양한 캠핑장에 대한 정보를 제공하고 사용자들이 예약을 할 수 있도록 도와줍니다. 또한, 캠핑장의 상세페이지에서는 해당 캠핑장에 대한 상세정보와 해당 지역의 일주일간의 날씨, 위치를 표시하는 지도, 그리고 다녀온 사람들이 간단히 후기를 남길 수 있는 댓글 게시판이 제공됩니다. 사용자들은 키워드별, 지역별, 테마별로 캠핑장을 검색할 수 있으며, 잘 모르는 사항이 있을 경우 AI를 통해 질문할 수 있는 페이지도 마련되어 있습니다.

##기능

- 회원가입 및 로그인 기능: 사용자는 회원으로 가입하여 로그인할 수 있습니다.
- 캠핑장 정보 제공: 전국의 다양한 캠핑장에 대한 정보를 제공합니다.
- 캠핑장 예약: 사용자들은 예약 사이트 링크를 통해 간편하게 예약을 할 수 있습니다.
- 캠핑장 상세페이지: 캠핑장의 상세정보, 지역의 일주일간의 날씨, 위치를 표시하는 지도, 댓글 게시판이 제공됩니다.
- 검색 기능: 키워드별, 지역별, 테마별로 캠핑장을 검색할 수 있습니다.
- AI 대화 기능: 사용자들은 AI에게 캠핑장에 대한 질문을 할 수 있습니다.

##설치 및 실행

- Git 리포지토리를 클론합니다.
- cd 명령어를 사용하여 프로젝트 폴더로 이동합니다.
- npm install 명령어로 종속성을 설치합니다.
- Firebase 설정을 위해 .env 파일을 생성하고 필요한 정보를 입력합니다.
- npm start 명령어로 개발 서버를 실행합니다.

##사용 기술

- React: 프론트엔드 개발에 사용되는 JavaScript 라이브러리로, 사용자 인터페이스(UI)를 구축하기 위해 사용됩니다.
- Firebase: 구글의 클라우드 기반 플랫폼으로, 이 애플리케이션에서는 Firebase의 Realtime Database를 사용하여 실시간으로 데이터를 저장하고 동기화합니다. 또한 Firebase의 Authentication을 사용하여 회원가입과 로그인 기능을 구현합니다.
- Axios: HTTP 클라이언트 라이브러리로, 서버와 데이터를 주고받기 위해 사용됩니다.
- OpenAI: 인공 지능(AI) 모델을 사용하기 위한 API로, 사용자가 질문을 하고 AI가 대답을 생성하는 기능을 구현합니다.
- Lodash: 유용한 JavaScript 유틸리티 라이브러리로, 이 애플리케이션에서는 throttle 함수를 사용하여 스크롤 이벤트를 제어합니다.
- CSS Modules: CSS 모듈 방식을 사용하여 스타일을 컴포넌트에 캡슐화하고 충돌을 방지합니다.
- Bootstrap: CSS 프레임워크로, 반응형 디자인과 다양한 UI 컴포넌트를 사용하여 빠르고 멋진 디자인을 구축합니다.
- leaflet API: 지도를 표시하기 위해 사용되는 API로, 캠핑장의 위치를 지도에 표시합니다.
- TypeScript: 프로젝트에서 TypeScript를 사용하여 정적 타입을 도입하여 코드의 안정성과 가독성을 향상시킬 수 있습니다.

##기여 방법

1. 이 레포지토리를 포크합니다.
2. 새로운 브랜치를 생성하여 수정하거나 기능을 추가합니다.
3. 변경 사항을 커밋하고 푸시합니다.
4. 풀 리퀘스트를 생성하여 변경 사항을 제안합니다.

##라이센스
이 프로젝트는 MIT 라이선스에 따라 배포됩니다.

##작성자
이름: HW Choe
이메일: hwchoe86@gmail.com

##연락처
문의나 기타 사항은 이메일로 연락주세요.

<hr/>

#Camping Site Information and Reservation Web App
This project provides information on various camping sites across the country and facilitates users to make reservations through the website. On the camping site's detailed page, users can find comprehensive information about the site, a map displaying the location and weather forecast for the upcoming week, and a comment board where visitors can leave brief reviews. The app allows users to search for camping sites based on keywords, regions, and themes, and it also offers an AI-powered page for users to ask questions related to camping.

##Features

- Registration and Login: Users can create an account and log in to access the reservation functionality.
- Camping Site Information: Detailed information on various camping sites nationwide is provided.
- Site Reservation: Users can make reservations by following the links to booking sites.
- Camping Site Detail Page: This page includes comprehensive details about the camping site, a map displaying the location, a weather forecast for the upcoming week, and a comment board for reviews.
- Search Functionality: Users can search for camping sites based on keywords, regions, and themes.
- AI Conversation Feature: Users can interact with the AI to ask questions about camping.

##Installation and Running the App

- Clone the Git repository.
- Navigate to the project folder using the cd command.
- Install dependencies with the npm install command.
- Create a .env file for Firebase configuration and add the necessary information.
- Start the development server with npm start.

##Technologies Used

- React: A JavaScript library used for front-end development to build user interfaces (UI).
- Firebase: A cloud-based platform by Google. In this application, Firebase's Realtime Database is used to store and synchronize data in real-time. Additionally, Firebase Authentication is used to implement sign-up and login functionalities.
- Axios: An HTTP client library used for making requests to servers and handling data exchange.
- OpenAI: An API used for artificial intelligence (AI) models. It enables users to ask questions and generate AI-driven responses.
- Lodash: A useful JavaScript utility library. In this application, the throttle function from Lodash is used to control scroll events.
- CSS Modules: A CSS module system used to encapsulate styles within components and prevent conflicts.
- Bootstrap: A CSS framework that provides responsive design and various UI components to quickly build visually appealing interfaces.
- leaflet API: An API used to display maps. It is used in the project to show the location of camping sites on the map.
- TypeScript: TypeScript is used in the project to introduce static typing, enhancing code stability and readability.

##How to Contribute

1. Fork the repository.
2. Create a new branch for your modifications or additions.
3. Commit and push your changes.
4. Open a pull request to propose your changes.

##License
This project is distributed under the MIT License.

##Author
Name: HW Choe
Email: hwchoe86@gmail.com

##Contact
For inquiries or any other matters, please contact us by email.
