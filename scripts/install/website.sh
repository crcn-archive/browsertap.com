cd /home/ubuntu/apps/website;
sudo rm -rf /etc/supervisor/conf.d/website.conf 
sudo ln -s ./supervisor/website.conf /etc/supervisor/conf.d/website.conf 
sudo supervisorctl reread
sudo supervisorctl update