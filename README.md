#CompFit

##How To Set Up Dev Environment

1. Clone the repository
2. cd into the directory of the cloned repo and run 'vagrant up'
3. Run 'vagrant --reload provision'
4. Run 'vagrant ssh'
5. mysql -uroot -p

##How to Run the Server
1. SSH into the vagrant box
2. Run 'cd /var/www/html/app'
3. Run 'gulp'
4. In the browser, navigate to http://localhost:8080/
5. Edit files
6. Ctrl-C to stop server
7. Run 'gulp' to start again to see edits
