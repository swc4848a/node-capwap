# vManager

## Virtual Manager in Centos Minimal Virtual Machine

### Development Step

#### vm image create
* set network connection to bridge mode
use nmtui change ipv4 to manual mode and set your own ip and dns

* disable firewall
~~~~
systemctl disable firewalld
~~~~

* add service 
create /etc/systemd/system/vmanager.service
put in the following contents and save the file
~~~~
[Unit]
Description=vmanager Service
After=network.target

[Service]
Type=simple
User=iperf
ExecStart=/usr/bin/node /home/zqqiang/node-capwap/monitor.js
Restart=on-abort

[Install]
WantedBy=multi-user.target
~~~~
Reload systemd to see the changes
~~~~
sudo systemctl daemon-reload
~~~~
Start the service at boot:
~~~~
sudo systemctl enable vmanager
~~~~

* set autologin user
edit /etc/systemd/system/getty.target.wants/getty@tty1.service
change to "ExecStart=-/sbin/agetty --autologin username --noclear %I $TERM"

* set user nologin
change to certain shell:
~~~~
usermod -s /sbin/nologin username
~~~~
list all shell:
~~~~
chsh -l
~~~~
show current user shell:
~~~~
echo $SHELL
~~~~

* disable grub menu
~~~~
vi /etc/default/grub
GRUB_TIMEOUT=0
grub2-mkconfig -o /boot/grub2/grub.cfg
~~~~