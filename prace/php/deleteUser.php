<?php
//volaní funkce smazání uživatele pro funkci ajax
require_once "user.php";
$user = new User();
$email = $_POST['email'];
$user->deleteAccount($email);