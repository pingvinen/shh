<?php

class Container extends AutoContainer
{
	/**
	 * @var Config
	 */
	private $config;

	/**
	 * @var Session
	 */
	private $session = null;

	public function __construct(Config $config)
	{
		$this->config = $config;
	}

	public function getAutoContainer()
	{
		return $this;
	}

	public function getConfig()
	{
		return $this->config;
	}

	public function getSlimSlim()
	{
		return \Slim\Slim::getInstance();
	}

	public function getIWebRequest(\Slim\Http\Request $request)
	{
		return new WebRequest($request);
	}

	public function getIWebResponse(\Slim\Http\Response $httpResponse, \Slim\Slim $app)
	{
		return new WebResponse($httpResponse, $app);
	}

	public function getSession()
	{
		if (is_null($this->session))
		{
			$this->session = new Session();
		}

		return $this->session;
	}
}
