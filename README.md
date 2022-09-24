###THER Genius

### Project Info
항해 8기 F반 7조 실전프로젝트
TVN "더 지니어스"에 방송된 흑과 백 보드게임을 여러 사람과 즐길 수 있도록 웹 게임으로 만들었습니다.
게임은 Socket.io 를 기반으로 한 1대1 방식으로 진행되며 흑 과 백을 모티브로 한 웹 보드게임 "THERGenius"입니다.
###  <img src="https://img.shields.io/badge/.ENV-ECD53F?style=flat-square&logo=.ENV&logoColor=000000"/>


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
### <img src="https://img.shields.io/badge/Convention-D8352A?style=flat-square&logo=The Conversation&logoColor=000000"/>

```
API URL : Lower Case   
          소문자로 표식   
          ex)/api/user/checkemail   
DB Model : Pascal Case   
           구분되는 첫글자 대문자로 표식   
          ex)User, Model   
File : Camel Case   
       구분되는 첫문자는 대문자로 표식   
        ex) WhiteAndBlack   
js.file : Camel Case, Dot Case   
          첫문자는 소문자, 다음 구분되는 문자 첫글자는 대문자로 표식   
          두번째 기능이나 역할은 .으로 구분되며 뒤에 .js가 붙는 방식   
          ex) turnEnd.event.js   
Class : Pascal Case   
        구분되는 첫글자 대문자로 표식   
        ex)RoomController, Game   
변수 : lower Case or Camel Case   

```
### 서비스 아키텍쳐
![image](https://user-images.githubusercontent.com/108967786/192097106-93a2af0f-e8b3-460d-af08-6065f354bf28.png)

### <img src="https://img.shields.io/badge/와이어그램-B8DBE4?style=flat-square&logo=Pixabay&logoColor=000000"/>


[와이어그램](https://www.figma.com/file/0XBiaSNcr9NcTTKjBKfv1x/THERgeniusGame?node-id=0%3A1)

### <img src="https://img.shields.io/badge/ERD-000000?style=flat-square&logo=diagrams.net&logoColor=F08705"/>

[ERD링크](https://app.sqldbm.com/MySQL/Edit/p230806/)
![image](https://user-images.githubusercontent.com/108967786/192095357-0e10cbcc-7c77-41a3-ba87-b14ecaa08cc3.png)


# <img src="https://img.shields.io/badge/Tech stack-00000?style=flat-square&logo=Godot Engine&logoColor=478CBF"/>

Front : <img src="https://img.shields.io/badge/React-000000?style=flat-square&logo=React&logoColor=61DAFB"/>   
Back : <img src="https://img.shields.io/badge/Node.js-000000?style=flat-square&logo=Node.js&logoColor=339933"/>   
DB : <img src="https://img.shields.io/badge/Mysql-000000?style=flat-square&logo=MySQL&logoColor=4479A1"/>   
Web Framework : <img src="https://img.shields.io/badge/Express-E8E8E8?style=flat-square&logo=Express&logoColor=000000"/>


# Back-end Library
```
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
```
# socket error event docs
[ERROR EVENT DOCS](https://github.com/THERgeniusGame/develop_BE/blob/develop/socket/middlewares/errorEventDocs/errorName.md)
