# Backend

## [AWS EC2](https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104/-/wikis/%EC%84%9C%EB%B2%84)  

서버로 활용중인 AWS EC2 컨테이너에 관한 설명이 있는 페이지

## [Node.js(Express)](https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104/-/wikis/Node.js)

백엔드 통신을 구현한 Node.js 서버에 대한 설명이 있는 페이지

## [Docker](https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104/-/wikis/Docker)

백엔드에서 컨테이너화된 프론트, 백엔드와 기타 DB, Jenkins 등을 관리하는 Docker 설정에 대한 설명이 있는 페이지

## [Jenkins](https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104/-/wikis/Docker)

자동화된 CI/CD를 위해 도입한 Jenkins에 대한 설명이 있는 페이지

## [Swagger](https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104/-/wikis/Swagger)

API를 쉽게 문서화하고 바로 테스트를 통해 검증할 수 있도록 도와주는 Swagger에 대한 설명이 있는 페이지

## [DB](https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104/-/wikis/MySQL)

서버에서 활용하는 DB에 대한 설명이 있는 페이지

## 서버 접속 정보
> server ip : i6a104.p.ssafy.io  
> client id : ubuntu  
> client pw : pem파일로 대체 (MM첨부파일 확인, 팀원 이외에 공유 금지)  

- 작업 디렉토리 ~/Workspace

- 서버에서 사용하는 브랜치는 develop 브랜치 이용
  - 서버에 변경사항 적용시 작업한 브랜치 develop에 merge한 뒤 pull하여 적용 확인  

<br>

- [https://i6a104.p.ssafy.io](https://i6a104.p.ssafy.io)로 Frontend에 접근 가능
- [https://i6a104.p.ssafy.io/api](https://i6a104.p.ssafy.io/api)로 Backend API에 접근 가능

- Mosquitto(MQTT브로커) 1883 포트에서 작동 중  
세부 설정값은 위키 [하위 페이지](MQTT) 참조

- Docker 작동 중  
세부 사항은 위키 [Docker](Docker) 참조

- SSL 인증서  
letsencrypt로 i6a104.p.ssafy.io에 대한 SSL 인증서 발급 완료  
/etc/letsencrypt/live/i6a104.p.ssafy.io/ 에 pem파일 저장됨  
임시로 portainer를 위해 /home/ubuntu/Workspace/certs/ 에 복사됨

- AWS EC2 포트 정보  

|포트 번호|이름|
|:----:|:----:|
|22|SSH|
|53|DNS|
|80|Redirected to Port 443 by nginx (docker)|
|443|Redirected to Port 3000 by nginx (docker)|
|1883|MQTT (Docker)|
|3000|Frontend (Docker)|
|5050|MySQL (Docker)|
|6010|X11-Forwarding|
|8001|Backend (Docker)|
|8080|Jenkins Controller Web UI (Docker)|
|9000|Swagger-UI WebService (Docker)|
|9443|Portainer (Docker)|
|10022|Jenkins Agent (Docker)|
|50000|Jenkins TCP Agent Listener Port (Docker)|
