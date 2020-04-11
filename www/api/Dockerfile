#Quickfix - Basebox for PHP7.2 Library now uses Debian "10" Buster, superceeding #libcurl3, stretch is most compatible at this time whilst devs workout backport.
#https://github.com/docker-library/php/issues/865
FROM php:7.2-apache-buster

#Surpresses debconf complaints of trying to install apt packages interactively
#https://github.com/moby/moby/issues/4032#issuecomment-192327844

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update --fix-missing --no-install-recommends
RUN apt-get -y upgrade

# Install useful tools
RUN apt-get -yq install apt-utils nano wget dialog

# Install important libraries
RUN apt-get -y install --fix-missing apt-utils build-essential git curl libcurl4 libcurl4-openssl-dev zip openssl libsodium-dev

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install xdebug
RUN pecl install xdebug-2.6.0
RUN docker-php-ext-enable xdebug

# Install redis
RUN pecl install redis-4.0.1
RUN docker-php-ext-enable redis

# Other PHP7 Extensions

RUN apt-get -y install libsqlite3-dev libsqlite3-0 default-mysql-client libxml2-dev libpng-dev
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install pdo_sqlite
RUN docker-php-ext-install mysqli

RUN docker-php-ext-install curl
RUN docker-php-ext-install tokenizer
RUN docker-php-ext-install json
RUN docker-php-ext-install sodium
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install fileinfo
RUN docker-php-ext-install ctype
RUN docker-php-ext-install dom
RUN docker-php-ext-install gd
RUN docker-php-ext-install hash
RUN docker-php-ext-install iconv
RUN docker-php-ext-install intl
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install simplexml
RUN docker-php-ext-install soap
RUN apt-get install -y libxslt-dev
RUN docker-php-ext-install xsl
RUN docker-php-ext-install zip


RUN apt-get -y install zlib1g-dev
RUN docker-php-ext-install zip

RUN apt-get -y install libicu-dev
RUN docker-php-ext-install -j$(nproc) intl

RUN docker-php-ext-install mbstring
RUN docker-php-ext-install gettext

RUN apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install -j$(nproc) gd

# Enable apache modules
RUN a2enmod rewrite headers

RUN apt-get install -y sendmail
RUN apt-get update
RUN apt-get install -y wkhtmltopdf
WORKDIR /var/www/html

COPY . .
RUN composer install
RUN chmod -R 777 storage bootstrap/cache
