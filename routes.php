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
