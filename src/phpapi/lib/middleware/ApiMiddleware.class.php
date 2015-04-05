<?php

class ApiMiddleware extends \Slim\Middleware
{
	/**
	 * Call
	 *
	 * Perform actions specific to this middleware and optionally
	 * call the next downstream middleware.
	 */
	public function call()
	{
		$request = $this->app->request;

		try
		{
			$this->next->call();
		}
		catch (Exception $ex)
		{
			$response = $this->app->response;
			$vm = new AjaxViewModel();
			$vm->exception($ex);

			$this->app->render('', array('vm'=>$vm));
		}
	}
}
