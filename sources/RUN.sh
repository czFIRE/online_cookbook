#!/bin/bash
docker-compose -f compose.yml up -d # start db
npm run --prefix frontend dev & # background
npm run --prefix backend start # also in background
cd backend && npx prisma studio # run this in foreground, kill it with Ctrl+C
kill %2 # stop backend
kill %1 # stop frontend
docker-compose down # stop db