# radio-server

This is the raspberry server part of the code
It will serve the radio client
And it will control the mpc

music player daemon
sudo apt-get install mpd

music player client
sudo apt-get install mpc

find pid
pidof node

kill process
sudo kill -9 1234

systemd
sudo nano /lib/systemd/system/radio.service


-------------

[Unit]
Description=Internet radio for raspberry pi
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory= /home/pi/apps/radio-server/dist/src/
ExecStart=node app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target

-------------

systemd control:
sudo systemctl daemon-reload

sudo systemctl start radio

sudo systemctl enable radio

journalctl -u radio.service
