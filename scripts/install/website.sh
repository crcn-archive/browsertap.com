
cd /home/ubuntu/apps/browsertap.com;
sudo ln -s ./supervisor/website.conf /etc/supervisor/conf.d/website.conf 
sudo supervisorctl reread
sudo supervisorctl update