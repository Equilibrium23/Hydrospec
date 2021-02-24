function hasNumber(myString) 
{
    return /\d/.test(myString);
}
function validateEmail(mail) 
{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)
}
function validateNrTel(nrTel) 
{
    const nrTelWithoutWhiteSpaces = nrTel.replace(/\s/g, "");
    return /^[0-9]{9}$/.test(nrTelWithoutWhiteSpaces);
}

function validateMailData(mailData)
{
    var validate = true;
    document.getElementById("nameValidator").innerHTML="";
    document.getElementById("mailValidator").innerHTML="";
    document.getElementById("telValidator").innerHTML="";

    if (hasNumber(mailData["clientName"]) || mailData["clientName"].length < 3 )
    {
        validate = false;
        console.log("BLAD")
        document.getElementById("nameValidator").innerHTML="Twoje imie i nazwisko jest niepoprawne<br>";
    }
    if (!validateEmail(mailData["clientMail"]))
    {
        validate = false;
        document.getElementById("mailValidator").innerHTML="Twój Mail jest niepoprawny<br>";
    }
    if (!validateNrTel(mailData["clientTel"]))
    {
        validate = false;
        document.getElementById("telValidator").innerHTML="Twój nr telefonu jest niepoprawny<br>";
    }
    return validate;
}

function sendMail()
{
    var form = document.getElementById("mailForm");
    var formElements= form.elements;    
    var mailData={};
    for (var i=0; i<formElements.length; i++)
        mailData[formElements[i].name]=formElements[i].value;

    if ( validateMailData(mailData) )    
    {
        emailjs.sendForm('service_rh5nkxq', 'template_usm7ymq', '#mailForm')
        .then(function(response) {
            document.getElementById("sendValidator").innerHTML="<br>Wysłano !";
            document.getElementById("mailForm").reset();
        }, function(error) {
            document.getElementById("sendValidator").innerHTML="<br>Ups coś poszło nie tak";
        });
    }
    

    
}
