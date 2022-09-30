# ERROR NAME & EXPLANATION

socket.io를 사용하면서 에러 핸들링하여 error 이벤트로 보낸 에러의 의미와 위치

에러이름|발생 이벤트|설명|
|------|---|---|
| Bad-Request       |login      |req가 잘못된 경우             |
| Expired-Token     |login      |token의 유효시간이 지난 경우   |
| Wrong-Url         |login      |room이 존재하지 않는 경우|
| None-Exist-Owner  |login      |오너가 존재하지 않습니다.|
|  None-User        |disconnect |유저의 데이터가 없는 경우|
|  None-Room        |disconnect |유저의 데이터가 없는 경우|
| None-Ready        |gameStart  |준비가 아직 안된 경우|
| Not-Your-Turn     |turnEnd    |알맞는 턴이 아닌 경우|
| Err-Update-Result |turnEnd    |제대로 결과가 반영되지 않은 경우|
| Failed-ChatLog    |chat       |채팅을 제대로 로그로 만들지 못한 경우|
| Failed_ReportChat |chatReport |신고된 채팅을 신고하지 못한 경우|
| Exist-ReportChat  |chatReport |이미 신고한 채팅|