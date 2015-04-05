<?php

class IndexApiViewModel extends ApiViewModel
{
	protected $message = '';

	public function setMessage($message)
	{
		$this->message = $message;
	}
}
