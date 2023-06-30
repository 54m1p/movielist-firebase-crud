
let loginFlag;
let currentLoggedIn;

let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', loginCheck);
const togglePassword = document.querySelector("#togglePass");
const loginPswd = document.querySelector("#login-pswd");
        togglePassword.addEventListener("click", function () {
            const type = loginPswd.getAttribute("type") === "password" ? "text" : "password";
            loginPswd.setAttribute("type", type);
            this.classList.toggle("bi-eye");
        });
async function loginCheck(){
    const loginEmail = document.getElementById("login-email").value;
    const loginPswd = document.getElementById("login-pswd").value;
    const hashedPswd = await hashPassword(loginPswd);
    // document.getElementById("login-email").value = "";
    // document.getElementById("login-pswd").value = "";
    const dbUsers = await db.collection('users');
    dbUsers.where('email', '==',loginEmail).where('password', '==', hashedPswd).get()
    .then(user=>{
        console.log('inside then');
        if(user.size == 1){    
            console.log(user.docs[0].data().name,'--user name');      
            currentLoggedIn = {
                name: user.docs[0].data().name,
                email: user.docs[0].data().email,
                logged: true
            }
            localStorage.setItem("current-user",JSON.stringify(currentLoggedIn));
            location.href ="../index.html";
        }else{
            alert('Invalid Email or Password')
            loginFlag = false;
        }
        
    })
    .catch((err)=>{
        console.log('Error:',err);
    })

}

async function hashPassword(pswd) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pswd);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }