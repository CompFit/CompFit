<?php

// Method: POST
// Data: array("param" ==> "value") ==> index.php?param=value

function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, "root:root");

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = json_decode(curl_exec($curl));

    curl_close($curl);

    return $result;
}

 

$team = json_encode(array("team_name" => "Commandos", "captain_id" => "1", "avatar" => "/img/team_avatars/team_avatar6.png"));
echo CallAPI("POST", "http://localhost:9000/api/team", $team);

// CallAPI("GET", "/api/team/1");

//INSERT INTO teams (team_name, captain_id, avatar) VALUES ('Commandos', '1', '/img/team_avatars/team_avatar6.png');

?>