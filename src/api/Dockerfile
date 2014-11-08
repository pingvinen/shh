FROM dockerfile/ubuntu

# Based on http://blog.abhinav.ca/blog/2014/07/25/docker-nodejs-dev-environment-take-2/

# Install Node
RUN  \
	cd /opt && \
	wget http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-x64.tar.gz && \
	tar -xzf node-v0.10.28-linux-x64.tar.gz && \
	mv node-v0.10.28-linux-x64 node && \
	cd /usr/local/bin && \
	ln -s /opt/node/bin/* . && \
	rm -f /opt/node-v0.10.28-linux-x64.tar.gz

WORKDIR /src

CMD ["./docker-startup"]