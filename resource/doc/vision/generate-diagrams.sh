#!/bin/bash

vision --projectRootPath=../../.. --tsConfig=../../../tsconfig.json --destName=vision --printIgnoreExternal --printIgnoreTypes  --printIgnorePaths='["src/util","src/types"]'

