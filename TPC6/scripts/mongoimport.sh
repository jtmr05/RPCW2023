#!/bin/sh

mongoimport -d people -c people --file data/dataset.json --jsonArray
