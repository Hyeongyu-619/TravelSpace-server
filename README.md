# 🌏 Travel Space : 다녀온 여행을 기록하는 나만의 공간
<br />
<p align="center">
    <img src="https://github.com/user-attachments/assets/737b6cba-a48e-4c92-ba92-563d7cf85683" width="400" /><br /><br />
    🌍 <a href=https://travelspace.world target=_blank>Travel Space와 함께 여행 떠나보실까요?</a><br />
</p>

# 프로젝트 소개

> <strong>여행을 좋아하는 사용자들을 위한 블로그 커뮤니티 플랫폼</strong>입니다. 사용자들은 개인의 행성을 생성하고, 행성 내에서 그룹을 형성하여 여행 기록을 작성하거나 실시간 채팅을 통해 소통할 수 있습니다. 플랫폼에서는 우주선을 생성하여 여행을 계획하고 기록하는 기능을 제공하며, 여행 그룹을 만들거나 가입해 인원을 모집하고 여행 계획을 세울 수 있습니다. 여행 후에는 글과 사진으로 경험을 기록하고, 다른 여행자들과 이야기를 공유하여 새로운 여행 아이디어를 얻을 수 있습니다.
<br />

| TravelSpace | 행성별 지도 |
| :-------------------------------------------: | :------------: |
| <img width="1440" alt="메인" src="https://github.com/Travel-Space/server/assets/110807563/fba003c3-9a96-4c48-8cf0-030d01a8384b"> | <img width="1440" alt="랜덤 행성" src="https://github.com/user-attachments/assets/2b5e7d6a-2620-43f7-b3ab-17fd2addc77f"> |  
| 행성별 지도 | 행성별 게시글 |  
| <img width="1440" alt="행성별 지도" src="https://github.com/Travel-Space/server/assets/110807563/c7482505-ab38-44ed-93a1-48cf8b9cedce"> |  <img width="1440" alt="행성별 게시글" src="https://github.com/Travel-Space/server/assets/110807563/69ec9e04-ca36-445f-a37e-cc9c960c3190"> |
| 행성 생성 | 행성별 우주선 생성 |  
| <img width="1440" alt="행성 생성" src="https://github.com/Travel-Space/server/assets/110807563/b8fb3177-038a-4848-92a2-c5d74078f039"> |  <img width="1440" alt="행성별 우주선 생성" src="https://github.com/Travel-Space/server/assets/110807563/cd8eef0b-553f-4a83-b3f7-5644852bdc03"> |
| 채팅 | 알림 |  
| <img width="1440" alt="채팅" src="https://github.com/Travel-Space/server/assets/110807563/46f3bc17-678a-49d0-b332-f112c724824a"> |  <img width="1440" alt="알림" src="https://github.com/user-attachments/assets/0680793a-461e-41e3-9f8a-19ec3e1900f0"> |
| 마이 페이지 | 프로필 |  
| <img width="1440" alt="마이 페이지" src="https://github.com/user-attachments/assets/b9d53cca-6921-438c-84aa-63308a90f3a9"> | <img width="1440" alt="프로필" src="https://github.com/user-attachments/assets/41c637c6-8dbb-49cd-ba61-fab6ec2c1503"> |
<br />

# 팀원 소개

| 담당자 | 업무 | 
| ------ | ------------------------------- | 
| 김현규 | 백엔드 총괄, 배포 | 
| 문수민 | 프로필, 마이페이지 | 
| 이슬 | 로그인, 회원가입 페이지 / 행성 생성 및 관리 페이지 / 우주선 생성 및 관리 페이지 | 
| 예은선 | 알림, 관리자 페이지 | 
| 조아연 | 지도, 채팅 페이지 | 
| 최형욱 | 메인, 게시글 관련 페이지 | 

</br>

# 진행 기간
🗓️ 2023년 10월 01일 - 2023년 11월 29일
<br /></br>

# 기능 목록
<details><summary>1. 로그인 및 회원가입</summary>

- 구글 oAuth를 사용한 회원가입 및 로그인이 가능
- 일반 회원가입 및 로그인 기능
- nodemailer를 사용해 회원가입 혹은 비밀번호 변경 시 이메일 인증 가능

</details>

<details><summary>2. 게시글 및 댓글 작성 / 조회 / 수정</summary>

- 게시글 작성 및 수정
  - 작성 및 수정 시 실시간으로 미리보기 가능
- 게시글 조회
  - 행성 미가입 시 공개 행성만 조회
- 게시글 좋아요
- 게시글 삭제
  - 게시글 작성자에 한하여 삭제 가능
- 댓글 및 대댓글 작성 / 수정 / 조회 / 삭제 가능
- 게시글 및 댓글 신고
  - 신고 내용, 사유, 사진을 선택해서 신고 가능

</details>

<details><summary>3. 마이 페이지</summary>

- 행성 이름으로 조회
  - 일간 / 주간 / 금일까지의 누적 방문 수
  - 총 게시글 수 포함
- 내가 작성한 게시글 조회
  - 월간 조회 수 기준으로 10개의 게시글이 정렬(작성일 및 행성 포함)
- 프로필 정보 수정
  - 프로필 이미지, 닉네임, 비밀번호 변경 가능
- 내가 생성한 행성 / 여행 중인 행성 조회
- 친구 목록(팔로잉 / 팔로워) 조회
- 친구 추천 기능(랜덤 유저로 추천)
- 내가 좋아요 누른 행성 / 게시글 및 좋아요 횟수 조회

</details>

<details><summary>4. 프로필 페이지</summary>

- 회원 프로필 정보 조회
  - 팔로워 및 팔로잉한 유저 목록 조회 가능
  - 여행 중인 행성 조회
  - 작성한 게시글 목록

</details>

<details><summary>5. 행성 생성 및 관리 페이지</summary>

- 행성 생성 및 관리
  - 공개 여부 (공개 / 비공개)
  - 행성 이미지, 이름, 소개글, 해시태그 관리
  - 최대 인원 수
  - 최대 우주선 갯수
- 행성 삭제
- 행성 탈출
  - 행성 관리자 위임(관리자가 행성을 탈출할 경우)
- 행성 멤버 관리
  - 유저 조회 및 검색
  - 행성 가입 승인, 거절 및 초대 가능
  - 행성 멤버 역할 수정(관리자 / 부관리자 / 일반)
  - 행성 멤버 추방

</details>

<details><summary>6. 우주선 생성 및 관리 페이지</summary>

- 우주선 목록 조회
  - 우주선 대표 이미지 및 이름
  - 탑승 인원수(현재 탑승 인원 / 최대 탑승 인원)
- 우주선 상세 조회
   - 우주선 이름 및 설명글
   - 여행 상태(여행 준비 / 여행 중 / 여행 끝 / 여행 취소)
   - 여행 시작일자 / 종료일자
   - 탑승 멤버
- 우주선 생성 및 수정
  - 여행 상태(여행 준비 / 여행 중 / 여행 끝 / 여행 취소)
  - 우주선 대표 이미지, 이름, 설명
- 우주선 삭제

</details>

<details><summary>7. 지도 (Google Map API)</summary>

- 행성별 지도
  - 행성별 지도 클릭시 게시글 마커 위치 및 게시글 수 조회
  - 게시글 마커 클릭시 행성 소개 및 글 리스트 조회
  - 가입한 우주선에 해당하는 게시글 조회
  - 리스트는 무한 스크롤 처리

</details>

<details><summary>8. 채팅(Web Socket)</summary>

- 행성 혹은 우주선 생성 시 채팅방 자동 생성
- 채팅방 목록 및 멤버 조회
- 실시간 채팅 기능
- 사진 전송 및 수신
- 채팅 신고
- 행성 / 우주선 탈퇴 시 채팅방 자동 탈퇴

</details>

<details><summary>9. 알림</summary>

- 알림 전송
   - 작성한 게시글 좋아요, 댓글, 대댓글
   - 가입한 행성 새로운 게시글
   - 본인 팔로우
   - 사용자 활동 제한(기간 / 사유)
   - 행성 초대(수락 / 거절 기능)
- 알림 클릭시 해당 페이지(게시글 / 댓글 / 마이 페이지)로 이동

</details>

<details><summary>10. 관리자</summary>

 - 사용자 관리
    - 사용자 검색
    - 전체 사용자 수 조회
    - 사용자 활동 제한(사유 전송)
- 게시글 관리
   - 게시글 검색
   - 게시글 삭제(사유 전송)
- 행성 관리
   - 행성 검색
   - 행성 삭제(사유 전송)
- 신고 관리
  - 신고 처리(승낙 / 거절)
    - 신고 유저 정보(닉네임 / 이메일 / 계정 상태 - 신고 횟수)
    - 요청 승낙 사유

</details>

<details><summary>🚫 사용자 활동 제한 🚫</summary>

- 활동 제한 시 서비스 이용 불가
- 매일 crontab으로 사용자 활동 제한 여부 판단 및 갱신

</details>

<details><summary>공통</summary>

- 페이지네이션
- 무한 스크롤
- 유효성 검사
- Markdown 문법 지원

</details>
<br />

# 기술 스택
#### FE
![NextJS](https://img.shields.io/badge/Nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-007af4?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiMwMDdhZjQiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjkwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=&logoColor=white)
![Styled-Components](https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)<br  />
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=Swiper&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white)
![AntDesign](https://img.shields.io/badge/AntDesign-0170FE?style=for-the-badge&logo=AntDesign&logoColor=white)

#### BE
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)<br/>
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/AmazonEC2-FF9900?style=for-the-badge&logo=amazonEC2&logoColor=white)
![Amazon S3](https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white)
![nginx](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white)
<br />

# 협업 방식
- Notion: 회의 기록 및 배포 방법을 작성하는 등 진행
- Figma: 웹 페이지 디자인 및 기획을 진행
- Discord 및 Gather Town: 팀원들과 실시간으로 소통하며 진행
<br />

## 프로젝트 관련 자료 및 주소
- 배포 주소 : <a href=https://travelspace.world target=_blank>https://travelspace.world/</a>
- 피그마 : https://www.figma.com/file/HNPr0zzVnOXJB09UhLdXzb/Pick-ME?type=design&mode=design
- 백엔드 서버 : https://github.com/Travel-Space/server
<br />

## 🌐 Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Latest ✔ | Latest ✔ | Latest ✔ |
