//workflow
let userList = [];

const apiEP = "https://randomuser.me/api?";
const displayElm = document.getElementById("list");
const countElm = document.getElementById("count");
// 1 Fetch user from api

//Using Promise is like ordering at macdonalds
// const fetchUsers = () => {
//   // promise
//   fetch(apiEP)
//     .then((response) => {
//       return response.json();
//       // console.log(response);
//     })
//     .then((data) => {
//       userList = data;
//       console.log(data);
//     });
// };

//using async and await

const fetchUsers = async (path = "results = 20") => {
  try {
    const response = await fetch(apiEP + path);
    const data = await response.json();
    //2 Store those user in global array

    userList = data.results;
    console.log(userList);
  } catch (error) {
    console.log(error);
  }
  displayUser(userList);
};

fetchUsers();

//3 display user in the UI

const displayUser = (displayArg) => {
  let str = "";
  displayArg.forEach((usr) => {
    str += `
    <div class="card" style="width: 18rem;">
    <img src="${usr?.picture?.large}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${usr?.name?.title} ${usr?.name?.first} ${usr?.name?.last}</h5>
      <h3 class="card-title">Gender:${usr?.gender}<br>
      Cell: ${usr?.cell}<br>
      Phone:${usr?.phone}</h3>
      <p class="card-text">Age:${usr?.dob?.age}<hr> 
      <i class="fa-solid fa-envelope"></i>:${usr?.email}<br>DOB: ${usr?.dob?.date}</p>
      <hr>
      <p>Location<br>
      <i class="fa-solid fa-house"></i>
     City: ${usr?.location?.city}<br>
     Coordinates ${usr?.location?.coordinates?.latitude}<br>
     country: ${usr?.location?.country}<br>
     Postcode: ${usr?.location?.postcode}<br>
     State: ${usr?.location?.state}<br>
      Street:${usr?.location?.street?.number} ${usr?.location?.street?.name}</p>
      <a>
      <div class="d-grid">
      <button class="btn btn-primary"></button></div>
      </a>

    </div>
  </div>`;
  });
  displayElm.innerHTML = str;
  countElm.innerText = displayArg.length;
};

//filtering by gender

document.getElementById("select").addEventListener("change", (e) => {
  const { value } = e.target; //e.target.value using destructing
  console.log(value);
  const path = `results=20&&gender=` + value;
  console.log(path);
  fetchUsers(path);
});
//onfocus onblur keypress keyup keydown
document.getElementById("search-input").addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const { value } = e.target;
  //run flter method
  const filteredUser = userList.filter((user) => {
    console.log(user);
    const fullName = (user.name.first + "" + user.name.last).toLowerCase();
    return fullName.includes(value.toLowerCase());
  });
  //display function
  displayUser(filteredUser);
});
