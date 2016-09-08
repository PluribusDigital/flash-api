#!/bin/sh

node_modules/db-migrate/bin/db-migrate up --verbose && \
npm start