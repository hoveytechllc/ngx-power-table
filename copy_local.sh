# This script is used to copy src code and index.* files from local
# git repository to a sibiling repository named 'ng2-power-table-ui' which is the same repository
# just checked out 'gh-pages' branch for github.io site.
echo 'Copying files from ng2-power-table to ng2-power-table-ui'

cp -R --parents ./src/*.* ./src/**/*.* ./../ng2-power-table-ui/node_modules/ng2-power-table
cp ./index.* ./../ng2-power-table-ui/node_modules/ng2-power-table