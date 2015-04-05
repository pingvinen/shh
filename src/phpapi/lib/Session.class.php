<?php

/**
 * @singleton
 */
class Session extends BaseSession
{
	public function setIsAuthenticated($trueOrFalse)
	{
		parent::set('authenticated', $trueOrFalse);
	}

	public function isAuthenticated()
	{
		return parent::get('authenticated', false) === true;
	}
}
 