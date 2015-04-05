<?php
error_reporting(22519);
require_once(dirname(__DIR__).'/config/base.php');
require_once(INC.'/config/config.php');
$container = new Container($config);

$app = new \Slim\Slim(array(
	  'debug' => $config->debug
	, 'view' => $container->getJsonSlimView()
));

$app->add($container->getApiMiddleware());

/**
 * @var $routeSetter RouteSetter
 */
$routeSetter = $container->getRouteSetter($app);
$routeSetter->addRoutes(INC.'/controllers');

$app->run();
