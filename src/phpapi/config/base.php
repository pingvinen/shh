<?php
define('INC', dirname(__DIR__));
require_once(INC.'/vendor/autoload.php');
require_once(INC.'/vendor/anneks/rightaboutnow/src/AutoLoader.class.php');
AutoLoader::register(array(
	  INC.'/lib'
	, INC.'/controllers'
	, INC.'/views'
));
$config = new Config();