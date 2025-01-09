RewriteEngine On

RewriteRule (adminer.css|static/.+) index.php?file=$1 [L,QSA]

AuthType Basic
AuthName "For password contact prg@esports.cz"
AuthUserFile /var/www/fotbal.l/www/adminer/.htpasswd
require valid-user
