#!/bin/bash

# MariaDB installieren
echo "Updating package lists and installing MariaDB..."
sudo apt update
sudo apt install -y mariadb-server mariadb-client

# MariaDB-Dienst starten
echo "Starting MariaDB service..."
sudo service mysql start

# Sicherstellen, dass MariaDB läuft
if ! systemctl is-active --quiet mysql; then
  echo "MariaDB konnte nicht gestartet werden. Abbruch."
  exit 1
fi

# Benutzerdefinierte Variablen
DB_NAME="testdb"
DB_USER="testuser"
DB_PASSWORD="testpassword"
TABLE_NAME="users"

# SQL-Befehle für das Setup
SQL_COMMANDS=$(cat <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;

USE $DB_NAME;
CREATE TABLE IF NOT EXISTS $TABLE_NAME (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO $TABLE_NAME (name, email) VALUES
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');
EOF
)

# SQL-Befehle ausführen
echo "Setting up database, user, and table..."
sudo mysql -u root -e "$SQL_COMMANDS"

# Fertig
echo "MariaDB-Setup abgeschlossen."
echo "Datenbank: $DB_NAME"
echo "Benutzer: $DB_USER"
echo "Passwort: $DB_PASSWORD"
