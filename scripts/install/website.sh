cd /home/ubuntu/apps/browsertap.com;
ln -s ./supervisor/website.conf /etc/supervisor/conf.d/website.conf 
supervisorctl reread
supervisorctl update