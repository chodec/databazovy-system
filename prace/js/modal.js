let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let defaultUrl = 'http://localhost:63342/prace/php/userAPI.php?';
let urlDisplayUsers = defaultUrl + 'action=getAllUsers';

//vytvoření dialogu
btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(function(){
    $(':input[type="submit"]').prop('disabled',true);
});

//kontroly jednotlivých polí
function validateName(){
    let name = $("#inputName").val();
    const regex = new RegExp('([A-Z][a-z]*)([\\\\s\\\\\\\'-][A-Z][a-z]*)*');
    if(!regex.test(name)){
        $("#inputName").removeClass("is-valid");
        $("#inputName").addClass("is-invalid");
        $("#inputName").after('<div id="invalid-name" class="invalid-feedback">Špatně zadané jméno.(Velké první písmeno)</div>');
    } else{
        $("#inputName").removeClass("is-invalid");
        $("#inputName").addClass("is-valid");
        $("#inputName").after('<div id="valid-name" class="valid-feedback">Jméno je v pořádku.</div>');
    }
}

function validateSurname(){
    let surname = $("#inputSurname").val();
    const regex = new RegExp('([A-Z][a-z]*)([\\\\s\\\\\\\'-][A-Z][a-z]*)*');
    if(!regex.test(surname)){
        $("#inputSurname").removeClass("is-valid");
        $("#inputSurname").addClass("is-invalid");
        $("#inputSurname").after('<div id="invalid-surname" class="invalid-feedback">Špatně zadané příjmení.(Velké první písmeno)</div>');
    } else{
        $("#inputSurname").removeClass("is-invalid");
        $("#inputSurname").addClass("is-valid");
        $("#inputSurname").after('<div id="valid-surname" class="valid-feedback">Příjmení je v pořádku.</div>');
    }
}

function validateEmail(){
    let email = $("#inputEmail").val();
    const regex = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    if (!regex.test(email)) {
        $("#inputEmail").removeClass("is-valid");
        $("#inputEmail").addClass("is-invalid");
        $("#inputEmail").after('<div id="invalid-email" class="invalid-feedback">Špatně zadaný email.</div>');
    } else {
        $("#inputEmail").removeClass("is-invalid");
        $("#inputEmail").addClass("is-valid");
        $("#inputEmail").after('<div id="valid-email" class="valid-feedback">Email je v pořádku.</div>');
    }
}

function validatePassword(){
  let password = $("#inputPassword").val();
  const regex = new RegExp('^.*(?=.{4,10})(?=.*\\d)(?=.*[a-zA-Z]).*$');
  if(!regex.test(password)){
      $("#inputPassword").removeClass("is-valid");
      $("#inputPassword").addClass("is-invalid");
      $("#inputPassword").after('<div id="invalid-password" class="invalid-feedback">Heslo musí obsahovat alespoň jedno písmeno a číslo.</div>')
  } else {
      $("#inputPassword").removeClass("is-invalid");
      $("#inputPassword").addClass("is-valid");
      $("#inputPassword").after('<div id="valid-password" class="valid-feedback">Heslo je v pořádku.</div>')
  }
}

function validatePhone(){
    let phone = $("#inputPhone").val();
    const regex = new RegExp('^(\\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$');
    if(!regex.test(phone)){
        $("#inputPhone").removeClass("is-valid");
        $("#inputPhone").addClass("is-invalid");
        $("#inputPhone").after('<div id="invalid-phone" class="invalid-feedback">Špatně zadaný formát telefonního čísla.</div>');
    } else {
        $("#inputPhone").removeClass("is-invalid");
        $("#inputPhone").addClass("is-valid");
        $("#inputPhone").after('<div id="valid-phone" class="valid-feedback">Telefonní číslo je v pořádku.</div>');
    }
}

//kontrola chyb validace
function enableBtn(){
    if($("#inputName").val() == 0 || $("#inputSurname").val() == 0 || $("#inputEmail").val() == 0 || $("#inputPassword").val() == 0 || $("#inputPhone").val() == 0 || $("#invalid-name").length || $("#invalid-password").length || $("#invalid-email").length || $("#invalid-surname").length || $("#invalid-phone").length){
        $(':input[type="submit"]').prop('disabled',true);
    } else {
        $(':input[type="submit"]').prop('disabled',false);
        addUser();
    }
}
//volani ajax funkce
function addUser(){
    let surname = $("#inputSurname").val();
    let name = $("#inputName").val();
    let email = $("#inputEmail").val();
    let password = $("#inputPassword").val();
    let phone = $("#inputPhone").val();
    let myRadio = $("input[name=gridRadios]");
    let authorization = myRadio.filter(":checked").val();
    let school = $("#inputSchool").val();

    $("#createUser").click(function(){
        modal.style.display = "none";
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        $.ajax({
            type: "POST",
            url: 'php/createUser.php',
            dataType: 'json',
            data: {email: email,password: password,name: name,surname: surname, school: school,phone: phone,authorization: authorization,}
        });
     });
}
function deleteUser(email){
    console.log(email);
    $.ajax({
       type: "POST",
       url: 'php/deleteUser.php',
       dataType: 'json',
       data:  {email: email}
    });
    displayUsers();
}

//grafické upozornění zda validace proběhla úspěšně
$("#inputPassword").keyup(function(){
    $("#valid-password").remove();
    $("#invalid-password").remove();
    validatePassword();
    enableBtn();
});

$("#inputEmail").keyup(function(){
    $("#valid-email").remove();
    $("#invalid-email").remove();
    validateEmail();
    enableBtn();
});

$("#inputName").keyup(function(){
    $("#invalid-name").remove();
    $("#valid-name").remove();
    validateName();
    enableBtn();
});

$("#inputSurname").keyup(function(){
    $("#invalid-surname").remove();
    $("#valid-surname").remove();
    validateSurname();
    enableBtn();
});

$("#inputPhone").keyup(function(){
   $("#invalid-phone").remove();
   $("#valid-phone").remove();
   validatePhone();
   enableBtn();
});

//vypis uživatelů
function displayUsers(){
    $("#display").empty();
    $.getJSON(urlDisplayUsers,function (json) {
       $.each(json,function(i, item){
           $("#display").append('<tr><td><button class="btn btn-xs btn-warning"><span class="fa fa-user-edit"></span></button><button id="' + json[i].email + '" class="btn btn-xs btn-danger" onclick="deleteUser(this.id)"><span class="fa fa-user-minus"></span></button></td><td>' + json[i].email + '</td><td>' + json[i].name + " " + json[i].surname + '</td><td>' + json[i].school+ '</td><td>' + json[i].authorization + '</td></tr>');
        });
    });
}

$(document).ready(function () {
    displayUsers();
});