cd /home/ubuntu/apps/browsertap.com;
sudo scripts/install/clean.sh
sudo ln -s `pwd`/supervisor/app.conf /etc/supervisor/conf.d/app.conf 
sudo supervisorctl reread
sudo supervisorctl update