#!/bin/bash
ctags -R --languages=php \
  --fields=+aimS --php-kinds=cdfint --tag-relative=yes --totals=yes \
  --exclude=tags --exclude="doc/*" --exclude="images/*" --exclude="css/*" \
  --exclude="labels/*" --exclude="uploads/*" \
  --extras=+q
