<?php

/**
 * @route GET /
 */
class IndexController
{
	/**
	 * @var IndexApiViewModel
	 */
	private $model;

	public function __construct(IndexApiViewModel $model)
	{
		$this->model = $model;
	}

	public function execute(IWebRequest $request, IWebResponse $response)
	{
		$this->model->setMessage('Hello at ' . date('Y-m-d H:i:s'));
		return $this->model;
	}
}
