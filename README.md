###THER Genius

### 프로젝트 소개
항해 8기 F반 7조 실전프로젝트
TVN "더 지니어스"에 방송된 흑과 백 보드게임을 여러 사람과 즐길 수 있도록 웹 게임으로 만들었습니다.
게임은 Socket.io 를 기반으로 한 1대1 방식으로 진행되며 흑 과 백을 모티브로 한 웹 보드게임 "THERGenius"입니다.
### .env 
```
 MYSQL_USERNAME     데이터베이스 사용자
 MYSQL_PASSWORD     데이터베이스 비밀번호
 MYSQL_DATABASE     데이터베이스 저장소
 MYSQL_HOST         데이터베이스 이름
 SECRET_KEY         JWT 토큰키
 NODEMAILER_USER    이메일
 NODEMAILER_PASS    이메일 비밀번호
 PORT               포트 번호
 REPORT_PAGE_COUNT  신고페이지목록 개수
 ADMIN_USERID       관리자 유저 번호
 CHECK_HTTPS        https 적용여부
 ```

# 와이어그램
[와이어그램](https://www.figma.com/file/0XBiaSNcr9NcTTKjBKfv1x/THERgeniusGame?node-id=0%3A1)

# ERD
[ERD링크](https://app.sqldbm.com/MySQL/Edit/p230806/)
![image](https://user-images.githubusercontent.com/108967786/192095357-0e10cbcc-7c77-41a3-ba87-b14ecaa08cc3.png)


# Tech Stack
Front : React
Back : Node.js
DB : Mysql
Web Framework : Express

# Front-end Library
axios
redux-toolkit
styled-components
json-server
jwt
socket.io
react-hook-form
sweetalert2
dotenv

# Back-end Library
fs
cors
dotenv
sequlize
bcrypt
joi
jwt
nodemailer
socket.io
ejs

# socket error event docs
[ERROR EVENT DOCS](https://github.com/THERgeniusGame/develop_BE/blob/develop/socket/middlewares/errorEventDocs/errorName.md)
