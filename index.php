<?php

function isDatabaseUpdate($argv) {
	if (php_sapi_name() !== 'cli') {
		return false;
	}
	if (!$argv || !is_array($argv) || count($argv) < 2) {
		return false;
	}
	$path = $argv[1];
	return strpos($path, "Console:Database") !== false;
}

if (is_file(__DIR__ . '/maintenance.php') && !isDatabaseUpdate($argv)) {
	require 'maintenance.php';
}

$container = require __DIR__ . '/../app/bootstrap.php';

$container->getService('application')->run();
