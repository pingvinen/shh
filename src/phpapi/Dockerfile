FROM dockerfile/ubuntu

# Based on https://github.com/fideloper/docker-nginx-php

# Nginx-PHP Installation
RUN apt-get update
RUN apt-get install -y \
	curl \
	wget \
	build-essential \
	python-software-properties

RUN add-apt-repository -y ppa:nginx/stable
RUN apt-get update
RUN apt-get install -y --force-yes \
	openssh-server \
	php5 \
	php5-common \
	php5-cli \
	php5-fpm \
	php5-curl \
	php5-mcrypt

RUN sed -i "s/;date.timezone =.*/date.timezone = UTC/" /etc/php5/fpm/php.ini
RUN sed -i "s/;date.timezone =.*/date.timezone = UTC/" /etc/php5/cli/php.ini

RUN apt-get install -y nginx

RUN sed -i -e "s/;daemonize\s*=\s*yes/daemonize = no/g" /etc/php5/fpm/php-fpm.conf
RUN sed -i "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/" /etc/php5/fpm/php.ini

RUN mkdir -p 				/var/www
ADD docker/nginx_default	/etc/nginx/sites-available/default

EXPOSE 3000
# End Nginx-PHP

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN adduser pingvinen
RUN echo 'pingvinen:qwe' | chpasswd
RUN adduser pingvinen sudo

RUN service nginx start
RUN service ssh start
RUN service --status-all

WORKDIR /src

CMD ["./docker_startup"]
