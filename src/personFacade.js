//http://localhost:8080/devops_starter_war_exploded/
const URL = "http://localhost:8080/devops_starter_war_exploded/api/xxx";

function getPersons(){
return fetch(URL + "/all")
.then(res => res.json())
}

///person/{id}
function getPersonById(id){
return fetch(URL + "/person/" + id)
.then(res => res.json())
}

function getPersonsByHobby(hobby){
return fetch(URL + "/hobby/" + hobby)
.then(res => res.json())
}

function getpersonsByZipFetch(zip){
return fetch(URL + "/city/" + zip)
.then(res => res.json())
}

function getPersonByPhone(phone){
return fetch(URL + "/phone/" + phone)
.then(res => res.json())
}

function findPersonByPhone(){
const phone = document.getElementById("findPersonByPhoneText").value;
  getPersonByPhone(phone)
    .then(person =>{

        const personRows = 
            `<tr>
<td>${person.firstName}</td>
<td>${person.lastName}</td>
<td>${person.email}</td>
<td>${person.phones.map(phone => `<span>${phone.phoneNumber}</span><br>`).join()}</td>
<td>${person.hobbies.map(hobby => `<span>${hobby.name}</span><br>`).join()}</td>
</tr>
        `;
  document.getElementById("allUserRows").innerHTML = personRows;

})
}

function findPersonsByZip(){
const zip = document.getElementById("findPersonByZipText").value;
  getpersonsByZipFetch(zip)
    .then(persons =>{
        const personRows = persons.map(person =>
            `<tr>
<td>${person.firstName}</td>
<td>${person.lastName}</td>
<td>${person.email}</td>
<td>${person.phones.map(phone => `<span>${phone.phoneNumber}</span><br>`).join()}</td>
<td>${person.hobbies.map(hobby => `<span>${hobby.name}</span><br>`).join()}</td>
</tr>
        `);
        const userRowsAsString = personRows.join('');
  document.getElementById("allUserRows").innerHTML = userRowsAsString;

})
}

function findPersonById(){
    const personIdToEdit = document.getElementById("find_person_to_edit_text").value;
    console.log(personIdToEdit);
 getPersonById(personIdToEdit)
 .then(person => {
     //Sets the 'edit user' table to the values the user has now.
     document.getElementById("edit_first_name").value = person.firstName;
     document.getElementById("edit_last_name").value = person.lastName;
     document.getElementById("edit_mail").value = person.email;
     document.getElementById("edit_street").value = person.address.street;
     document.getElementById("edit_zip_code").value = person.address.cityInfo.zipCode;
     document.getElementById("edit_city").value = person.address.cityInfo.city;
     document.getElementById("edit_hobby").value = person.hobbies[0].name;
     document.getElementById("edit_phone").value = person.phones[0].phoneNumber;
 })
}

function findPersonsByHobby()
{
  const hobby = document.getElementById("findPersonByHobbyText").value;
  getPersonsByHobby(hobby)
    .then(persons =>{

        const personRows = persons.map(person => 
            `<tr>
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


function getPersonToAdd(){
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("mail").value;
    const street = document.getElementById("street").value;
    const zipCode = document.getElementById("zip_code").value;
    const city = document.getElementById("city").value;


    const cityInfo = {
        "zipCode" : zipCode,
        "city" : city
    }
    const address = {
        "street" : street,
        "additionalInfo" : "",
        "cityInfo" : cityInfo
    }
    const person = {
        "firstName" : firstName,
        "lastName" : lastName,
        "email" : email,
        "address" : address

    }
    //adds person through rest endpoint
    addPerson(person);
    getAllPersons();
}

function getAllPersons(){
getPersons()
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
function addPerson(person) {
    const options = makeOptions('POST', person)
    return fetch(URL + "/", options)
        .then(res => handleHttpErrors(res))
}




function editPerson(person, id){
    const option = makeOptions("PUT", person);
    return fetch(URL + "/" + id, option)
        .then(res => handleHttpErrors(res))
}

function deleteUser(id){
    
}

const personFacade = {
    getPersons,
    getPersonsByHobby,
    findPersonsByHobby,
    getPersonById,
    addPerson,
    editPerson,
    getPersonToAdd,
    findPersonByPhone,
    findPersonsByZip,
    deleteUser, 
    findPersonById
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default personFacade;