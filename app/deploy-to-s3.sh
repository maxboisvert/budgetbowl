#!/bin/bash

source ~/budgetbowl-s3-iam.sh

aws s3 sync . s3://app.budgetbowl.com/

