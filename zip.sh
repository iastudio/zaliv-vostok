zip -r project * -x@exclude.lst

echo "Project archiving ok."

# zip -r project * -x .sublime-project .sublime-workspace sftp-config.json sftp-settings.json /venv/ .svn .hg .git .bzr _darcs CVS .DS_Store Thumbs.db desktop.ini .sass-cache /bourbon/ /bower_components/ /scss/ .bowerrc .gitignore bower.json config.rb /node_modules/