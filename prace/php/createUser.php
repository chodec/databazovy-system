<?php
//volaní funkce vytvoření uživatele pro funkci ajax
require_once "user.php";
$user = new User();
$email = $_POST['email'];
$password = $_POST['password'];
$name = $_POST['name'];
$surname = $_POST['surname'];
$phone = $_POST['phone'];
$school = $_POST['school'];
$authoritation = $_POST['authorization'];
$user->createAccount($email,$password,$name,$surname,$phone,$school,$authoritation);
