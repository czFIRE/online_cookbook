@ECHO OFF
::START docker-compose -f compose.yml up
START npm run --prefix frontend dev
START npm --prefix backend start
CD .\backend
START npx prisma studio
EXIT