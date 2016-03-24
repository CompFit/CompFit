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
    $users = '';
    $sql = 'select * from users';
    try {
      $stmt = $db->query($sql);
      $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    catch(PDOException $e) {
      echo json_encode($e->getMessage());
    }
    $strToReturn = json_encode($users);
    /*foreach($db->query('select * from users') as $row){
      $strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
      $strToReturn .= '<br />';
    }*/

    return $response->write('' . $strToReturn);
  }
);

$app->get('/user/{user_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $user_id = $request->getAttribute('user_id');
    $users = '';

    $sql = 'select * from users where user_id = "'.$user_id.'"';
      try {
        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    //foreach($db->query('select * from users where user_id = "'.$user_id.'"') as $row){
      //$strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      //$strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];

    //}
    $test = json_encode($users);
    return $response->write('' . $test);
  }
);

$app->get('/user/search/{username}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $username = $request->getAttribute('username');
    $users = '';

    $sql = 'select * from users where username = "'.$username.'"';
      try {
        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    //foreach($db->query('select * from users where user_id = "'.$user_id.'"') as $row){
      //$strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      //$strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];

    //}
    $test = json_encode($users);
    return $response->write('' . $test);
  }
);

$app->get('/user/{email}/search',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $email = $request->getAttribute('email');
    $users = '';

    $sql = 'select * from users where email = "'.$email.'"';
      try {
        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    //foreach($db->query('select * from users where user_id = "'.$user_id.'"') as $row){
      //$strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      //$strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];

    //}
    $test = json_encode($users);
    return $response->write('' . $test);
  }
);

/*$app->post('/user',
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
);*/
// Run with curl -i -X POST -H "Content-Type: application/json"  -d '{"first_name":"Don","last_name":"Smith","username":"dsmith","email":"anemail@gmail.com"}' p://zero-to-slim.dev/user
// Accepts json and creates new user
$app->post('/user',
  function ($request, $response, $args){
    //global $app;
    //$req = $app->request();
    $body = $request->getBody();
    $decode = json_decode($body);
    //echo $decode->['first_name'];
    $db = $this->dbConn;
    $strToReturn = '';

    $sql = 'INSERT INTO users (`first_name`, `last_name`, `username`, `email`) VALUES (:first_name, :last_name, :username, :email)';
    try {
      $stmt = $db->prepare($sql);
        $stmt->bindParam(':first_name', $decode->first_name);
        $stmt->bindParam(':last_name', $decode->last_name);
        $stmt->bindParam(':username', $decode->username);
        $stmt->bindParam(':email', $decode->email);
        $stmt->execute();
      //echo json_encode($user);
    }
    catch(PDOException $e) {
      //echo json_encode($e->getMessage());
    }

    //return $response->write('' . $);
  }
);

//This is technically a put request, but I was using HTML forms to test, and they don't support put so I made it a post instead
$app->post('/user/{user_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';

    $user_id = $request->getAttribute('user_id');
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $username = $_POST["username"];

    $db->query('UPDATE users SET first_name = "'.$first_name.'", last_name = "'.$last_name.'", username = "'.$username.'" WHERE user_id = "'.$user_id.'"');

    foreach($db->query('select * from users') as $row){
      $strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
      $strToReturn .= '<br />';
    }
    return $response->write('' . $strToReturn);
  }
);
// Use curl –i –X DELETE http://zero-to-slim.dev/user/{user_id} in console
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

/*$app->delete('/user/{username}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $username = $request->getAttribute('username');

    foreach($db->query('select * from users where user_id = "'.$user_id.'"') as $row){
      $strToReturn .= '<br /> user_id: ' . $row['user_id'] .' <br /> username: ' . $row['username'];
      $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
    }

    $db->query('DELETE FROM users WHERE user_id = "'.$user_id.'"');

    return $response->write('Deleting <br />' . $strToReturn);
  }
);*/
//Returns all the users on a given team
$app->get('/users/{team_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_id = $request->getAttribute('team_id');
    $users = '';

    $sql = 'SELECT team.team_name, user.team_id, user.first_name, user.last_name, user.username FROM teams team, (Select u.first_name, u.last_name, u.username, t.team_id FROM users u, (select * from team_participation where team_id = "'.$team_id.'") as t WHERE t.user_id = u.user_id) as user WHERE team.team_id = user.team_id';

      try {
        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    $test = json_encode($users);
    return $response->write('' . $test);
  }
);

$app->get('/users/search/{team_name}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_name = $request->getAttribute('team_name');
    $users = '';

    $sql = 'SELECT team.team_name, team.team_id, user.first_name, user.last_name, user.username FROM users user, (SELECT t.team_name, t.team_id, tp.user_id FROM team_participation tp, (SELECT * FROM teams WHERE team_name = "'.$team_name.'") as t WHERE t.team_id = tp.team_id) as team WHERE team.user_id = user.user_id';

      try {
        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    $test = json_encode($users);
    return $response->write('' . $test);
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

/*$app->post('/team',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';

    $team_name = $_POST["team_name"];
    $captain_id = $_POST["captain_id"];

    $db->query('INSERT INTO teams (team_name, captain_id) VALUES ("'.$team_name.'", "'.$captain_id.'")');

    foreach($db->query('select * from teams') as $row){
      $strToReturn .= '<br /> team_id: ' . $row['team_id'] .' <br /> team_name: ' . $row['team_name'];
      $strToReturn .= '<br /> captain_id: ' . $row['captain_id'];
      foreach($db->query('select * from users where user_id = "'.$captain_id.'"') as $row){
        $strToReturn .= ' <br /> username: ' . $row['username'];
        $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
      }
      $strToReturn .= '<br />';
    }

    return $response->write('' . $strToReturn);
  }
);*/
// Run with curl -i -X POST -H "Content-Type: application/json"  -d '{"team_name":"Golems","captain_id":"1"}' p://zero-to-slim.dev/team
// Accepts json and creates new team

$app->post('/team',
  function ($request, $response, $args){
    //global $app;
    //$req = $app->request();
    $body = $request->getBody();
    $decode = json_decode($body);
    //echo $decode->['first_name'];
    $db = $this->dbConn;
    $strToReturn = '';

    $sql = 'INSERT INTO teams (`team_name`, `captain_id`) VALUES (:team_name, :captain_id)';
    try {
      $stmt = $db->prepare($sql);
        $stmt->bindParam(':team_name', $decode->team_name);
        $stmt->bindParam(':captain_id', $decode->captain_id);
        $stmt->execute();
      //echo json_encode($user);
    }
    catch(PDOException $e) {
      //echo json_encode($e->getMessage());
    }

    //return $response->write('' . $);
  }
);

$app->delete('/team/{team_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_id = $request->getAttribute('team_id');

    foreach($db->query('select * from teams where team_id = "'.$team_id.'"') as $row){
      $strToReturn .= '<br /> team_id: ' . $row['team_id'] .' <br /> captain_id: ' . $row['captain_id'];
    }

    $db->query('DELETE FROM teams WHERE team_id = "'.$team_id.'"');

    return $response->write('Deleting <br />' . $strToReturn);
  }
);
