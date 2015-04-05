#!/usr/bin/env bash

case "$1" in
	build)
		source docker_stuff/build "${@:2}"
		;;

	kill)
		source docker_stuff/kill "${@:2}"
		;;

	removeall)
		source docker_stuff/removeall "${@:2}"
		;;

	run)
		source docker_stuff/run "${@:2}"
		;;

	info)
		source docker_stuff/info "${@:2}"
		;;
	ssh)
		source docker_stuff/ssh "${@:2}"
		;;
	*)
		echo "Do not know $1"
		echo "build"
		echo "kill <container search>"
		echo "removeall"
		echo "run"
		echo "info"
		echo "ssh <container search>"
		;;
esac

# just making sure there is a newline
echo ""