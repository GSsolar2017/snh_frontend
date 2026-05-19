function login(){

  let username =
  document.getElementById("username").value;

  let password =
  document.getElementById("password").value;

  // ADMIN LOGIN
  if(username === "admin" &&
     password === "1234"){

      localStorage.setItem("role","admin");

     window.location.assign("index.html");
  }

  // USER LOGIN
  else if(username === "snhospital" &&
          password === "SNH042025"){

      localStorage.setItem("role","user");

      window.location.assign("index.html");
  }

  else{

    document.getElementById("error-msg").innerText =
    "Invalid Username or Password";
  }
}