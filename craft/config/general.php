<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
	'*' => array(
		'cpTrigger' => 'admin',
		'omitScriptNameInUrls' => 'auto',
		'enableCsrfProtection' => true,
		'defaultWeekStartDay' => 1,
    ),
    'mn.dev' => array(
        'devMode' => true,
        'environmentVariables' => array(
            'basePath' => '/www/sites/mn/html/',
            'baseUrl'  => 'http://mn.dev/',
			'siteUrl' => 'http://mn.dev/',

        )
    ),
    'mnacht.centaurus.uberspace.de' => array(
        'devMode' => false,
        'environmentVariables' => array(
            'basePath' => '/var/www/virtual/mnacht/html/',
            'baseUrl'  => 'http://mnacht.centaurus.uberspace.de/',
			'siteUrl' => 'http://mnacht.centaurus.uberspace.de/',
        )
    )
);