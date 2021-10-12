import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import "./personFacade"
import jokeFacade from "./jokeFacade"
import personFacade from "./personFacade"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */


/* JS For Exercise-2 below */



/* JS For Exercise-3 below */

//Edit person

/*document.getElementById("find_person_to_edit").addEventListener('click',function(){
  console.log(document.getElementById("find_person_to_edit_text").value);

})*/

function getAllPersons(){
personFacade.getPersons()
.then(persons =>{
  const personRows = persons.map(person =>`
<tr>
<td>${person.id}</td>
<td>${person.firstName}</td>
<td>${person.lastName}</td>
<td>${person.email}</td>
<td>${person.phones.map(phone => `<span>${phone.phoneNumber}</span><br>`).join()}</td>
<td>${person.hobbies.map(hobby => `<span>${hobby.name}</span><br>`).join()}</td>
</tr>
  `)
  const userRowsAsString = personRows.join('');
  document.getElementById("allUserRows").innerHTML = userRowsAsString;
})
}
getAllPersons()//test data

//Push edited person to database: 
document.getElementById("submitEdit").addEventListener('click', function(){
  const id = document.getElementById("find_person_to_edit_text").value;
  const firstName = document.getElementById("edit_first_name").value;
     const lastName = document.getElementById("edit_last_name").value;
    const email = document.getElementById("edit_mail").value;
    const street = document.getElementById("edit_street").value;
    const zipCode =  document.getElementById("edit_zip_code").value;
     const city = document.getElementById("edit_city").value;
     const name = document.getElementById("edit_hobby").value;
     const phoneNumber = document.getElementById("edit_phone").value;

      const cityInfo = {
        "zipCode" : zipCode,
        "city" : city
    }
    const address = {
        "street" : street,
        "additionalInfo" : "",
        "cityInfo" : cityInfo
    }

    const hobby = {
      "name" : name,
      "description" : ""
    }
    const hobbies = [
      hobby
    ]
    const phone = {
      "phoneNumber" : phoneNumber,
      "description" : "privat"
    }
    const phones = [
      phone
    ]

    const person = {
        "firstName" : firstName,
        "lastName" : lastName,
        "email" : email,
        "address" : address,
        "hobbies" : hobbies,
        "phones" : phones

    }

     console.log(person);

     personFacade.editPerson(person, id);

})

//Find person to edit and display into edit user form
document.getElementById("find_person_to_edit").addEventListener('click', event => personFacade.findPersonById());

//find persons by hobby
document.getElementById("findPersonByHobbyButton").addEventListener('click', event => personFacade.findPersonsByHobby());

//Find persons all hobbies
document.getElementById("findAllPersonsButton").addEventListener('click', event => getAllPersons());

//Find persons by zip
document.getElementById("findPersonByZipButton").addEventListener('click', event => personFacade.findPersonsByZip());


document.getElementById("findPersonByPhoneButton").addEventListener('click', event => personFacade.findPersonByPhone());

document.getElementById("submitForm").addEventListener('click', event => personFacade.getPersonToAdd());
/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



