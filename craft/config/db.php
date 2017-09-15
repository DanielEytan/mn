<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
    '*' => array(
        'tablePrefix' => 'craft',
    ),
    '.dev' => array(
        'server' => '127.0.0.1',
        'user' => 'root',
        'password' => '',
        'database' => 'mn',
    ),
    '.com' => array(
        'server' => 'localhost',
        'user' => 'mnacht',
        'password' => 'Pou7aeNg9xue7eu3ooz',
        'database' => 'mnacht',
    ),
);