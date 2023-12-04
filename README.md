# camp_project_05
기존의 프로젝트에 3-layered-architecture를 적용하고 ORM을 변경해보자

# 기술 스택
express.js, prisma

# 환경변수
COOKIE_SECRET=example

JWT_SECRET=example

SALT_ROUNDS=example

DATABASE_URL=mysql://user:password@host:port/db


# 집중 요소
1. 3-layered-architecture에 맞게 기존의 라우터를 controller, service, repository로 분리함.
2. ORM을 sequelize => prisma로 변경하기 위해 repository만을 변경함.
3. 효율적이고 일관적인 예외처리를 위해서 service-layer에서 예상가능한 예외를 처리하고, controller-layer에서 try-catch를 통해 모든 예외를 받아 error-middleware에서 처리
4. 반복적인 코드 처리 및 가독성을 위해 HttpException이라는 커스텀 클래스를 작성해서 service-layer에서 예외를 throw할때 status를 포함.
