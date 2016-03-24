<?php
	
if(!mysql_connect("localhost","uroot","root")){
     die('oops connection problem ! --> '.mysql_error());
}
if(!mysql_select_db("dbtest")){
     die('oops database selection problem ! --> '.mysql_error());
}

?>

<?php
session_start();
if(isset($_SESSION['user'])!="")
{
 header("Location: home.php");
}
include_once 'dbconnect.php';

if(isset($_POST['btn-signup'])){

 $uname = mysql_real_escape_string($_POST['uname']);
 $email = mysql_real_escape_string($_POST['email']);
 $upass = md5(mysql_real_escape_string($_POST['pass']));
 
 if(mysql_query("INSERT INTO users(username,email,password) VALUES('$uname','$email','$upass')")){
  ?>
        <script>alert('successfully registered ');</script>
        <?php
 }
 else{
  ?>
        <script>alert('error while registering you');</script>
        <?php
 }
}
?>

<!DOCTYPE html PUBLIC "http://www.compfit.us/Create_New_User">
	<html xmlns="http://www.compfit.us">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title>Login & Registration System</title>
			<link rel="stylesheet" href="style.css" type="text/css" />

		</head>
		<body>
			<center>
				<div id="login-form">
					<form method="post">
						<table align="center" width="30%" border="0">
							<tr>
								<td><input type="text" name="uname" placeholder="User Name" required /></td>
							</tr>
							<tr>
								<td><input type="email" name="email" placeholder="Your Email" required /></td>
							</tr>
							<tr>
								<td><input type="password" name="pass" placeholder="Your Password" required /></td>
							</tr>
							<tr>
								<td><button type="submit" name="btn-signup">Sign Me Up</button></td>
							</tr>
							<tr>
								<td><a href="homepage.php">Sign In Here</a></td>
								<!-- create homepage to link to -->
							</tr>
						</table>
					</form>
				</div>
			</center>
		</body>
	</html>
