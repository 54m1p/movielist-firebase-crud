

let regUser = document.getElementById("user-form");
regUser.addEventListener("click", (e) =>{
e.preventDefault();
    formValidate = validatefn();
    if(formValidate == false){
        alert("Not submitted");
        return;
    }
    submitForm();
    // document.getElementById('register-form').reset();
    //registerform.submit();
});

function validatefn(){
    dateCheckResponse = datecheck();
    emailCheckResponse = emailCheck();
    pswdCheckResponse = passwordCheck();
    // pswdCheckResponse = true;
    if(dateCheckResponse == false){
        alert("Invalid date");
        return false;
    }
    if(emailCheckResponse == false){
            alert("Invalid email");
            return false
        }
    if(pswdCheckResponse == false){
            alert("Invalid password");
            return false;
        }
    return true;
    
}
function datecheck(){
    let inputMonth = document.getElementById("mm").value;
    let inputDay = document.getElementById("dd").value;
    let inputYear = document.getElementById("yyyy").value;

    let currentDate =new Date();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    let currentYear = currentDate.getFullYear();

    if((inputYear < currentYear) || (inputYear == currentYear && inputMonth < currentMonth) || (inputYear == currentYear && inputMonth == currentMonth && inputDay < currentDay)){
        return true;
    }
    else{
        return false;
    }
    }

    function emailCheck(){
        const regexValue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        inputEmail = document.getElementById("form-email").value;
        if(inputEmail.match(regexValue)){
            return true;
        }
        else{
            return false;
        }
    }
let inputEmail;

function passwordCheck(){
    const pswd1 = document.getElementById("password").value;
    const pswd2 = document.getElementById("re-pass").value;
    if(pswd1 == pswd2 ){
        return true;
    }
    else{
        return false;
    }
}
        const togglePassword = document.querySelector("#togglePass");
        const password = document.querySelector("#password");
        togglePassword.addEventListener("click", function () {
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            this.classList.toggle("bi-eye");
        });
        
        const toggleRePass = document.querySelector("#toggleRePass");
        const rePass = document.querySelector("#re-pass");
        toggleRePass.addEventListener("click",function () {
            const reType = rePass.getAttribute("type") === "password" ? "text" : "password";
            rePass.setAttribute("type", reType);
            this.classList.toggle("bi-eye");    
        })
async function submitForm (){
    const email = document.getElementById("form-email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("firstName").value +" "+ document.getElementById("lastName").value;
    const phone = document.getElementById("phoneNo").value;
    const address = document.getElementById("address").value;
    const dob = document.getElementById("mm").value+"/"+document.getElementById("dd").value+"/"+document.getElementById("yyyy").value;
    const genderRadio = document.querySelectorAll('input[name = "gender"]')
    for(const radiobtn of genderRadio){
        if(radiobtn.checked){
            gender = radiobtn.value;
            break;
        }  
    }
    const hashPswd = await hashPassword(password);
    console.log(name,'--name--',phone,'--phone--',dob,'--dob--',address,'---address---',gender,'--gender--',email,'--email',password,'--pass')
    db.collection('users').add({
        name: name,
        phone: phone,
        dob: dob,
        // gender: gender,
        address: address,
        email:email,
        password: hashPswd
    })
    .then((docRef)=>{
        alert('successfully created new user');
        // document.getElementById('register-form').reset();
        location.href = "login.html";

    })
    .catch((error)=>{
        console.log('Error in adding:',error.message);
    })
}

let discard = document.getElementById("discard");
discard.addEventListener('click', function(){
    location.href = "login.html";
})

async function hashPassword(pswd) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pswd);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log('Hashed password:', hashHex);
    return hashHex;
  }