cd /home/ubuntu/apps/browsertap.com;
sudo rm -rf /etc/supervisor/conf.d/app.conf 
sudo ln -s `pwd`/supervisor/app.conf /etc/supervisor/conf.d/app.conf 
sudo supervisorctl reread
sudo supervisorctl update