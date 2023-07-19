#!/bin/bash

mkdir -p "./dist/cjs"
cat >"./dist/cjs/package.json" <<!EOF
{
    "type": "commonjs"
}
!EOF

mkdir -p "./dist/esm"
cat >"./dist/esm/package.json" <<!EOF
{
    "type": "module"
}
!EOF
