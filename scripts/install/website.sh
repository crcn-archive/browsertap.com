cd /home/ubuntu/apps/browsertap.com;
sudo scripts/install/clean.sh
sudo ln -s `pwd`/supervisor/website.conf /etc/supervisor/conf.d/website.conf 
sudo supervisorctl reread
sudo supervisorctl update