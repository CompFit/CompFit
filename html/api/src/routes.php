<?php
// Routes

//Error Codes
  //-1 => Sent when no users are found from a get
  //-2 => Sent when no teams are found from a get
  //-3 => Returns for POST user, when the username is not unique
  //-4 => Returns for POST user when the user's email has already been used

// Function to check if a password hashes to the same thing as str2
function hash_equals($str1, $str2) {
    if(strlen($str1) != strlen($str2)) {
      return false;
    } else {
      $res = $str1 ^ $str2;
      $ret = 0;
      for($i = strlen($res) - 1; $i >= 0; $i--) $ret |= ord($res[$i]);
      return !$ret;
    }
}

$app->post('/auth', function($request, $response){
  $body = $request->getBody();
  $decode = json_decode($body);
  $db = $this->dbConn;
  $password = $decode->password;
  $strToReturn = '';

  $sql = 'SELECT username, password FROM users WHERE email = :email';
  try {
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':email', $decode->email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_OBJ);
  }
  catch(PDOException $e) {
    echo json_encode($e->getMessage());
  }
  if(hash_equals($user->password, crypt($password, $user->password))) //email and password match a user
	{
    return $response->write( json_encode(array("username" => $user->username)));
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
        $sql = 'SELECT user_id, username, first_name, last_name, email, avatar, created
                FROM users';
        try {
          $stmt = $db->query($sql);
          $users = $stmt->fetch(PDO::FETCH_OBJ);
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
      $password = $decode->password;
      $db = $this->dbConn;
      $strToReturn = '';

      $checkUniqueUserSql = 'SELECT * FROM users WHERE `username` = :username';

      try {
        $stmt = $db->prepare($checkUniqueUserSql);
        $stmt->bindParam(':username', $decode->username);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
      $test = json_encode($user);
      if($test != 'false'){
        return $response->write(json_encode(array("error" => -3)));
      }

      $checkUniqueEmailSql = 'SELECT * FROM users WHERE `email` = :email';

      try {
        $stmt = $db->prepare($checkUniqueEmailSql);
        $stmt->bindParam(':email', $decode->email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
      $test = json_encode($user);
      if($test != 'false'){
        return $response->write(json_encode(array("error" => -4)));
      }

      $sql = 'INSERT INTO users (`first_name`, `last_name`, `username`, `email`, `password`, `created`)
              VALUES (:first_name, :last_name, :username, :email, :password, UTC_TIMESTAMP())';
      try {
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':first_name', $decode->first_name);
        $stmt->bindParam(':last_name', $decode->last_name);
        $stmt->bindParam(':username', $decode->username);
        $stmt->bindParam(':email', $decode->email);
        $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
        $salt = sprintf("$2a$%02d$", 10) . $salt;
        $hash = crypt($password, $salt);
        $stmt->bindParam(':password', $hash);
        $stmt->execute();
        $user_id = $db->lastInsertId();
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
        return $response->write(json_encode(array("user_id" => $user_id)));
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
        $users = $stmt->fetch(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    $test = json_encode($users);
    if($test == '[]'){
      return $response->write(json_encode(array("No users found" => -1)));
    }
    else {
      return $response->write('' . $test);
    }
  });
});

$app->get('/username/{username}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $username = $request->getAttribute('username');
    $users = '';

    $sql = 'SELECT user_id, username, first_name, last_name, email, avatar
            FROM users
            WHERE username = "'.$username.'"';
    try {
      $stmt = $db->query($sql);
      $users = $stmt->fetch(PDO::FETCH_OBJ);
    }
    catch(PDOException $e) {
      echo json_encode($e->getMessage());
    }
    $test = json_encode($users);
    if($test == 'false'){
      return $response->write(json_encode(array("error" => -1)));
    }
    else {
      return $response->write('' . $test);
    }
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
        $users = $stmt->fetch(PDO::FETCH_OBJ);
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    $test = json_encode($users);
    if($test == '[]'){
      return $response->write(json_encode(array("No users found" => -1)));
    }
    else {
      return $response->write('' . $test);
    }
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

$app->group('/users', function(){
  $this->get('/{team_id}', function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_id = $request->getAttribute('team_id');
    $users = '';

    $sql = 'SELECT user.user_id, user.username, user.first_name, user.last_name, user.email, user.avatar
            FROM teams team,
                (SELECT u.user_id, u.username, u.first_name, u.last_name, u.email, u.avatar, t.team_id
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
    if($test == '[]'){
      return $response->write(json_encode(array("No users found" => -1)));
    }
    else {
      return $response->write('' . $test);
    }
  });
  $this->get('/team_name/{team_name}', function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_name = $request->getAttribute('team_name');
    $users = '';

    $sql = 'SELECT user.user_id, user.username, user.first_name, user.last_name, user.email, user.avatar
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
    if($test == '[]'){
      return $response->write(json_encode(array("No users found" => -1)));
    }
    else {
      return $response->write('' . $test);
    }
  });
});

$app->get('/team',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $teams = '';
    $sql = 'SELECT team_id, team_name, captain_id, avatar
            FROM teams';
    try {
      $stmt = $db->query($sql);
      $teams = $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    catch(PDOException $e) {
      echo json_encode($e->getMessage());
    }
    $strToReturn = json_encode($teams);
    return $response->write('' . $strToReturn);
    }
);

$app->get('/team/{team_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $team_id = $request->getAttribute('team_id');
    $users = '';

    $sql1 = 'SELECT team_id, team_name, captain_id, avatar, created
             FROM teams
             WHERE team_id = "'.$team_id.'"';

    $sql2 = 'SELECT u.user_id, u.username
             FROM users u,
                (SELECT * from team_participation
                 WHERE team_id = "'.$team_id.'") as t
             WHERE t.user_id = u.user_id';
      try {
        $new;
        $array_loop = 0;
        $stmt = $db->query($sql2);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        //$d = array('players' => $users);

        $stmt2 = $db->query($sql1);
        $users2 = $stmt2->fetch(PDO::FETCH_ASSOC);
        $new['team_id'] = $users2['team_id'];
        $new['team_name'] = $users2['team_name'];
        $new['captain_id'] = $users2['captain_id'];
        $new['players'] = $users;
        $new['avatar'] = $users2['avatar'];
        $new['created'] = $users2['created'];
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    $test = json_encode($new);
    if($test == '[]'){
      return $response->write(json_encode(array("No teams found" => -2)));
    }
    else {
      return $response->write('' . $test);
    }
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
      $users = $stmt->fetch(PDO::FETCH_OBJ);
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
  if($test == '[]'){
    return $response->write(json_encode(array("No teams found" => -2)));
  }
  else {
    return $response->write('' . $test);
  }
}
);

// $app->get('/team/{team_id}/{captain_id}',
//   function ($request, $response, $args){
//     $db = $this->dbConn;
//     $strToReturn = '';
//     $team_id = $request->getAttribute('team_id');
//     $captain_id = $request->getAttribute('captain_id');
//
//     foreach($db->query('select * from teams where team_id = "'.$team_id.'"') as $row){
//       $strToReturn .= '<br /> team_id: ' . $row['team_id'] .' <br /> team_name: ' . $row['team_name'];
//       $strToReturn .= '<br /> captain_id: ' . $row['captain_id'];
//       foreach($db->query('select * from users where user_id = "'.$captain_id.'"') as $row){
//         $strToReturn .= ' <br /> username: ' . $row['username'];
//         $strToReturn .= '<br /> first_name: ' . $row['first_name'] .' <br /> last_name: ' . $row['last_name'];
//       }
//     }
//
//     return $response->write('' . $strToReturn);
//   }
// );

$app->post('/team',
  function ($request, $response, $args){
    $body = $request->getBody();
    $decode = json_decode($body);
    $players = $decode->players;
    $db = $this->dbConn;
    $strToReturn = '';

    $sql = 'INSERT INTO teams (`team_name`, `captain_id`, `avatar`, `created`)
            VALUES (:team_name, :captain_id, :avatar, UTC_TIMESTAMP())';
    try {
      $stmt = $db->prepare($sql);
        $stmt->bindParam(':team_name', $decode->team_name);
        $stmt->bindParam(':captain_id', $decode->captain_id);
        $stmt->bindParam(':avatar', $decode->avatar);
        $stmt->execute();
        $team_id = $db->lastInsertId();
    }
    catch(PDOException $e) {
      echo json_encode($e->getMessage());
    }

    $sql2 = 'INSERT INTO team_participation (`team_id`, `user_id`, `created`)
             VALUES (:team_id, :user_id, UTC_TIMESTAMP())';

    try {
      $stmt = $db->prepare($sql2);
        $stmt->bindParam(':team_id', $team_id);
        $stmt->bindParam(':user_id', $decode->captain_id);
        $stmt->execute();
    }
    catch(PDOException $e) {
      echo json_encode($e->getMessage());
    }

    foreach($players as $playerid){
      try {
        $stmt = $db->prepare($sql2);
          $stmt->bindParam(':team_id', $team_id);
          $stmt->bindParam(':user_id', $playerid);
          $stmt->execute();
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    }
    //Need to find a way to return team_id
    //return $response->write('' . $);
    return $response->write( json_encode( array("team_id" => $team_id) ) );
  }
);

// $app->delete('/team/{team_id}',
//   function ($request, $response, $args){
//     $db = $this->dbConn;
//     $strToReturn = '';
//     $team_id = $request->getAttribute('team_id');
//
//     foreach($db->query('select * from teams where team_id = "'.$team_id.'"') as $row){
//       $strToReturn .= '<br /> team_id: ' . $row['team_id'] .' <br /> captain_id: ' . $row['captain_id'];
//     }
//
//     $db->query('DELETE FROM teams WHERE team_id = "'.$team_id.'"');
//
//     return $response->write('Deleting <br />' . $strToReturn);
//   }
// );

$app->get('/teams/{user_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $user_id = $request->getAttribute('user_id');
    $users = '';

    $sql = 'SELECT team.team_id, team.team_name, team.captain_id, team.avatar, team.created
            FROM teams team,
              (SELECT u.first_name, u.last_name, u.user_id, u.username, tp.team_id
               FROM team_participation tp,
                  (SELECT * FROM users WHERE user_id = "'.$user_id.'") as u
               WHERE u.user_id = tp.user_id) as user
             WHERE team.team_id = user.team_id';


             try {
               $new = array();
               $array_loop = 0;
               $stmt = $db->query($sql);
               $teams = $stmt->fetchAll(PDO::FETCH_OBJ);
               foreach ($teams as $val){
                 $new[$array_loop]['team_id'] = $val->team_id;
                 $new[$array_loop]['team_name'] = $val->team_name;
                 $new[$array_loop]['captain_id'] = $val->captain_id;
                 $sql2 = 'SELECT u.user_id, u.username
                          FROM users u,
                           (SELECT * from team_participation
                            WHERE team_id = "'.$val->team_id.'") as t
                          WHERE t.user_id = u.user_id';
                 $stmt2 = $db->query($sql2);
                 $users = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                 $new[$array_loop]['players'] = $users;
                 $new[$array_loop]['avatar'] = $val->avatar;
                 $new[$array_loop]['created'] = $val->created;
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

$app->get('/teams/captain_id/{captain_id}',
  function ($request, $response, $args){
    $db = $this->dbConn;
    $strToReturn = '';
    $captain_id = $request->getAttribute('captain_id');
    $users = '';

    $sql = 'SELECT t.team_id, t.team_name, t.captain_id, t.avatar, t.created
            FROM teams t
            WHERE captain_id = "'.$captain_id.'"';

      try {
        $new = array();
        $array_loop = 0;
        $stmt = $db->query($sql);
        $teams = $stmt->fetchAll(PDO::FETCH_OBJ);
        foreach ($teams as $val){
          $new[$array_loop]['team_id'] = $val->team_id;
          $new[$array_loop]['team_name'] = $val->team_name;
          $new[$array_loop]['captain_id'] = $val->captain_id;
          $sql2 = 'SELECT u.user_id, u.username
                   FROM users u,
                    (SELECT * from team_participation
                     WHERE team_id = "'.$val->team_id.'") as t
                   WHERE t.user_id = u.user_id';
          $stmt2 = $db->query($sql2);
          $users = $stmt2->fetchAll(PDO::FETCH_ASSOC);
          $new[$array_loop]['players'] = $users;
          $new[$array_loop]['avatar'] = $val->avatar;
          $new[$array_loop]['created'] = $val->created;
          $array_loop++;
        }
      }
      catch(PDOException $e) {
        echo json_encode($e->getMessage());
      }
    $test = json_encode($new);
    if($test == '[]'){
      return $response->write(json_encode(array("No teams found" => -2)));
    }
    else {
      return $response->write('' . $test);
    }
});

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

$app->get('/challenges/end_date/{end_date}',
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
