<?php

$rootDir = __DIR__ . '/../..';

function rrmdir($dir) {
	if (is_dir($dir)) {
		$objects = scandir($dir);
		foreach ($objects as $object) {
			if ($object != "." && $object != "..") {
				if (filetype($dir . "/" . $object) == "dir") {
					rrmdir($dir . "/" . $object);
				} else {
					unlink($dir . "/" . $object);
				}
			}
		}
		reset($objects);
		rmdir($dir);
	}
}

rrmdir($rootDir . '/temp/cache/');
require_once($rootDir . '/cleanRedisDatabase.php');

die('What is cleaned, is cleaned');
