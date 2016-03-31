<?php
// Routes

$app->post('/auth', function($request, $response){
  $body = $request->getBody();
  $decode = json_decode($body);
  $db = $this->dbConn;
  $strToReturn = '';

  $sql = 'SELECT username FROM users WHERE email = :email AND password = :password';
  try {
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':email', $decode->email);
    $stmt->bindParam(':password', $decode->password);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    $row_count = $stmt->rowCount();
  }
  catch(PDOException $e) {
    echo json_encode($e->getMessage());
  }
  if($row_count == 1) //email and password match a user
	{
    return $response->write( json_encode($users));
  }
});

$app->get('/users',function($request, $response){
    return $response->write( json_encode( array("working" => 1) ) );


});
$app->group('/user', function(){
  $this->map(['GET', 'POST'], '', function($request, $response, $args){
    if($request->isGet()){
        $db = $this->dbConn;
        $strToReturn = '';
        $users = '';
        $sql = 'SELECT user_id, first_name, last_name, email, avatar, created
                FROM users';
        try {
          $stmt = $db->query($sql);
          $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        }
        catch(PDOException $e) {
          echo json_encode($e->getMessage());
        }
        $strToReturn = json_encode($users);
        return $response->write('' . $strToReturn);
    }
    if($request->isPost()){
      $body = $request->getBody();
      $decode = json_decode($body);
      $db = $this->dbConn;
      $strToReturn = '';

      $sql = 'INSERT INTO users (`first_name`, `last_name`, `username`, `email`, `created`)
              VALUES (:first_name, :last_name, :username, :email, UTC_TIMESTAMP())';
      try {
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':first_name', $decode->first_name);
        $stmt->bindParam(':last_name', $decode->last_name);
        $stmt->bindParam(':username', $decode->username);
        $stmt->bindParam(':email', $decode->email);
        $stmt->execute();
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
          //return $response->write('' . $);
    }
  });
  $this->get('/{user_id}', function($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $user_id = $request->getAttribute('user_id');
    $users = '';

    $sql = 'SELECT user_id, first_name, last_name, email, avatar
            FROM users
            WHERE user_id = "'.$user_id.'"';
      try {
        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    $test = json_encode($users);
    return $response->write('' . $test);
  });
});

$app->get('/username/{username}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $username = $request->getAttribute('username');
    $users = '';

    $sql = 'SELECT user_id, first_name, last_name, email, avatar
            FROM users
            WHERE username = "'.$username.'"';
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

$app->get('/useremail/{email}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $email = $request->getAttribute('email');
    $users = '';

    $sql = 'SELECT user_id, first_name, last_name, email, avatar
            FROM users
            WHERE email = "'.$email.'"';
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
//This is technically a put request, but I was using HTML forms to test, and they don't support put so I made it a post instead
$app->put('/user/{user_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';

    $user_id = $request->getAttribute('user_id');
    $first_name = $_PUT["first_name"];
    $last_name = $_PUT["last_name"];
    $username = $_PUT["username"];

    $db->query('UPDATE users
                SET first_name = "'.$first_name.'",
                    last_name = "'.$last_name.'",
                    username = "'.$username.'"
                WHERE user_id = "'.$user_id.'"');

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

    $db->query('DELETE FROM users
                WHERE user_id = "'.$user_id.'"');

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

    $sql = 'SELECT team.team_name, user.team_id, user.first_name, user.last_name, user.username
            FROM teams team,
                (SELECT u.first_name, u.last_name, u.username, t.team_id
                 FROM users u,
                    (SELECT * FROM team_participation WHERE team_id = "'.$team_id.'") as t
                 WHERE t.user_id = u.user_id) as user
            WHERE team.team_id = user.team_id';

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

    $sql = 'SELECT team.team_name, team.team_id, user.first_name, user.last_name, user.username
            FROM users user,
              (SELECT t.team_name, t.team_id, tp.user_id
               FROM team_participation tp, (SELECT * FROM teams WHERE team_name = "'.$team_name.'") as t
               WHERE t.team_id = tp.team_id) as team
            WHERE team.user_id = user.user_id';

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
    $users = '';

    //$sql = 'SELECT team.team_name, user.team_id, user.username FROM teams team, (Select u.first_name, u.last_name, u.username, t.team_id FROM users u, (select * from team_participation where team_id = "'.$team_id.'") as t WHERE t.user_id = u.user_id) as user WHERE team.team_id = user.team_id';
    $sql1 = 'SELECT team_id, team_name, captain_id, avatar, created
             FROM teams
             WHERE team_id = "'.$team_id.'"';
    $sql2 = 'SELECT u.user_id, u.username
             FROM users u,
                (SELECT * from team_participation
                 WHERE team_id = "'.$team_id.'") as t
             WHERE t.user_id = u.user_id';
      try {
        $new = array();
        $array_loop = 0;
        $stmt = $db->query($sql2);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        //$d = array('players' => $users);

        $stmt2 = $db->query($sql1);
        $users2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        foreach ($users2 as $val){
          $new[$array_loop]['team_id'] = $val['team_id'];
          $new[$array_loop]['team_name'] = $val['team_name'];
          $new[$array_loop]['captain_id'] = $val['captain_id'];
          $new[$array_loop]['players'] = $users;
          $new[$array_loop]['avatar'] = $val['avatar'];
          $new[$array_loop]['created'] = $val['created'];
          $array_loop++;

        }
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }

    $test = json_encode($new);
    return $response->write('' . $test);
  }
);

$app->get('/team_name/{team_name}',
function ($request, $response, $args){
  $db = $this->dbConn;
  $strToReturn = '';
  $team_name = $request->getAttribute('team_name');
  $users = '';

  //$sql = 'SELECT team.team_name, user.team_id, user.username FROM teams team, (Select u.first_name, u.last_name, u.username, t.team_id FROM users u, (select * from team_participation where team_id = "'.$team_id.'") as t WHERE t.user_id = u.user_id) as user WHERE team.team_id = user.team_id';
  $sql1 = 'SELECT team_id, team_name, captain_id, avatar, created
           FROM teams
           WHERE team_name = "'.$team_name.'"';
  $sql2 = 'SELECT u.user_id, u.username
           FROM users u,
              (SELECT tp.user_id
               FROM team_participation tp,
                  (SELECT team_id FROM teams WHERE team_name = "'.$team_name.'") as a
               WHERE a.team_id = tp.team_id) as t
           WHERE t.user_id = u.user_id';
    try {
      $new = array();
      $array_loop = 0;
      $stmt = $db->query($sql2);
      $users = $stmt->fetchAll(PDO::FETCH_OBJ);
      //$d = array('players' => $users);

      $stmt2 = $db->query($sql1);
      $users2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
      foreach ($users2 as $val){
        $new[$array_loop]['team_id'] = $val['team_id'];
        $new[$array_loop]['team_name'] = $val['team_name'];
        $new[$array_loop]['captain_id'] = $val['captain_id'];
        $new[$array_loop]['players'] = $users;
        $new[$array_loop]['avatar'] = $val['avatar'];
        $new[$array_loop]['created'] = $val['created'];
        $array_loop++;

      }
    }
    catch(PDOException $e) {
      echo json_encode($e->getMessage());
    }

  $test = json_encode($new);
  return $response->write('' . $test);
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
    $body = $request->getBody();
    $decode = json_decode($body);
    $db = $this->dbConn;
    $strToReturn = '';

    $sql = 'INSERT INTO teams (`team_name`, `captain_id`) VALUES (:team_name, :captain_id)';
    try {
      $stmt = $db->prepare($sql);
        $stmt->bindParam(':team_name', $decode->team_name);
        $stmt->bindParam(':captain_id', $decode->captain_id);
        $stmt->execute();
    }
    catch(PDOException $e) {
      echo json_encode($e->getMessage());
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

$app->get('/teams/{user_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $user_id = $request->getAttribute('user_id');
    $users = '';

    $sql = 'SELECT team.team_name, user.team_id, user.first_name, user.last_name, user.username FROM teams team, (SELECT u.first_name, u.last_name, u.user_id, u.username, tp.team_id FROM team_participation tp, (SELECT * FROM users WHERE user_id = "'.$user_id.'") as u WHERE u.user_id = tp.user_id) as user WHERE team.team_id = user.team_id';

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

$app->get('/teams/search/{captain_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $captain_id = $request->getAttribute('captain_id');
    $users = '';

    $sql = 'SELECT DISTINCT team.team_name, team.captain_id, user.user_id, user.first_name, user.last_name, user.username FROM users user, (SELECT t.team_name, t.captain_id, tp.team_id FROM team_participation tp, (SELECT * FROM teams WHERE captain_id = "'.$captain_id.'") as t WHERE t.captain_id = tp.user_id) as team WHERE team.captain_id = user.user_id';

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

$app->get('/challenge/{challenge_id}',
  function ($request, $response, $args){
  }
);

$app->post('/challenge',
  function ($request, $response, $args){
  }
);

$app->delete('/challenge/{challenge_id}',
  function ($request, $response, $args){
  }
);

$app->get('/challenges/{team_id}',
  function ($request, $response, $args){
  }
);

$app->get('/challenges/search/{end_date}',
  function ($request, $response, $args){
  }
);

$app->get('/exercise/{exercise_id}',
  function ($request, $response, $args){
  }
);

$app->post('/exercise',
  function ($request, $response, $args){
  }
);

$app->put('/exercise/{exercise_id}',
  function ($request, $response, $args){
  }
);

$app->delete('/exercise/{exercise_id}',
  function ($request, $response, $args){
  }
);

$app->get('/exercises/{user_id}',
  function ($request, $response, $args){
  }
);

$app->get('/exercises/search/{team_id}',
  function ($request, $response, $args){
  }
);

$app->get('/exercises/exercise/{exercise_name}',
  function ($request, $response, $args){
  }
);

$app->get('/exercises/startdate/{start_date}',
  function ($request, $response, $args){
  }
);

$app->get('/exercises/enddate/{end_date}',
  function ($request, $response, $args){
  }
);
