<?php
// Routes

//$app->get('/[{name}]', function ($request, $response, $args) {
$app->get('/hello', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/goodbye', function ($request, $response, $args) {
  return $response->write("Time to go. Goodbye!");
});

$app->get('/user',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';

    foreach($db->query('select * from users') as $row){
      $strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
      $strToReturn .= '<br />';
    }

    return $response->write('' . $strToReturn);
  }
);
$app->get('/user/{user_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $user_id = $request->getAttribute('user_id');

    foreach($db->query('select * from users where user_id = "'.$user_id.'"') as $row){
      $strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
    }

    return $response->write('' . $strToReturn);
  }
);
$app->post('/user',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';

    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $username = $_POST["username"];
    $email = $_POST["email"];

    $db->query('INSERT INTO users (first_name, last_name, username, email) VALUES ("'.$first_name.'", "'.$last_name.'", "'.$username.'", "'.$email.'")');

    foreach($db->query('select * from users') as $row){
      $strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
      $strToReturn .= '<br />';
    }

    return $response->write('' . $strToReturn);
  }
);
$app->delete('/user/{user_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $user_id = $request->getAttribute('user_id');

    foreach($db->query('select * from users where user_id = "'.$user_id.'"') as $row){
      $strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
    }

    $db->query('DELETE FROM users WHERE user_id = "'.$user_id.'"');

    return $response->write('Deleting <br />' . $strToReturn);
  }
);


$app->get('/team',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';

    foreach($db->query('select * from teams') as $row){
      $strToReturn .= '<br /> team_id: ' . $row['team_id'] .' <br /> team_name: ' . $row['team_name'];
      $strToReturn .= '<br /> captain_id: ' . $row['captain_id'] . '<br />';
    }

    return $response->write('' . $strToReturn);
  }
);

$app->get('/team/{team_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_id = $request->getAttribute('team_id');

    foreach($db->query('select * from teams where team_id = "'.$team_id.'"') as $row){
      $strToReturn .= '<br /> team_id: ' . $row['team_id'] .' <br /> team_name: ' . $row['team_name'];
      $strToReturn .= '<br /> captain_id: ' . $row['captain_id'];
    }

    return $response->write('' . $strToReturn);
  }
);

$app->get('/team/{team_id}/{captain_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_id = $request->getAttribute('team_id');
    $captain_id = $request->getAttribute('captain_id');

    foreach($db->query('select * from teams where team_id = "'.$team_id.'"') as $row){
      $strToReturn .= '<br /> team_id: ' . $row['team_id'] .' <br /> team_name: ' . $row['team_name'];
      $strToReturn .= '<br /> captain_id: ' . $row['captain_id'];
      foreach($db->query('select * from users where user_id = "'.$captain_id.'"') as $row){
        $strToReturn .= ' <br /> username: ' . $row['username'];
        $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
      }
    }

    return $response->write('' . $strToReturn);
  }
);
