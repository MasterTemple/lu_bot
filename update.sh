#!/bin/bash
git add -A
git commit --amend -m "Push data"
git gc --aggressive --prune=all
git push -f
