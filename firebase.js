// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcK-n5UD9EsSWv8VopSa1ytfi8manFOd0",
  authDomain: "firstproject-2db56.firebaseapp.com",
  databaseURL: "https://firstproject-2db56-default-rtdb.firebaseio.com",
  projectId: "firstproject-2db56",
  storageBucket: "firstproject-2db56.appspot.com",
  messagingSenderId: "615087608295",
  appId: "1:615087608295:web:e22bdc830102372572ed42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
const auth = getAuth(app);

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let studentId = document.getElementById("studentId");
let studentCourse = document.getElementById("course");
let submitBttn = document.getElementById("submitbttn");
let screen = document.getElementById("screen");
let EditScreen = document.getElementById("screentwo");


window.onload = function () {
  const uSerRef = ref(db, "MyUsers/");
  onValue(uSerRef, (data) => {
    const allUsers = data.val();
    console.log("AllUsers : ", allUsers);
    let UsersArrar;
    if (allUsers) {
      UsersArrar = Object.keys(allUsers).map((user) => ({
        id: user,
        ...allUsers[user],
      }));
    }

    console.log("All Users After conversion :", UsersArrar);
    screen.innerHTML = "";
    UsersArrar?.forEach((user) => {
      let editBtn = document.createElement("button");
      editBtn.className = "btn btn-success";
      editBtn.textContent = "Edit";

      editBtn.addEventListener("click", () => {
        editDetails(user.id);
      });

      let delBtn = document.createElement("button");
      delBtn.className = "btn btn-danger";
      delBtn.textContent = "Delete";

      delBtn.addEventListener("click", () => {
        DeleteUserDetails(user.firstname);
      });

      let actions = document.createElement("td");
      actions.className = "d-flex items-center gap-3";
      // Append buttons to the container
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      // Create a container for each student data
      let studentContainer = document.createElement("tr");
      studentContainer.innerHTML = `
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.studentId}</td>
        <td>${user.studentCourse}</td>
`;

      // Append buttons container to the student container
      studentContainer.appendChild(actions);

      // Append student container to the screen
      screen.appendChild(studentContainer);
    });
  });
};

function DeleteUserDetails(firstName) {
  console.log("User First Name : ", firstName);
  let UserRef = ref(db, `MyUsers/${firstName}`);
  console.log("User Info : ", UserRef);
  remove(UserRef)
    .then(() => {
      alert("User Removed Successfully");
      // window.location.reload();
    })
    .catch((error) => {
      alert("error removing user");
      console.log("Error : ", error);
    });
}

function editDetails(id) {
  console.log("ID of user To Edit", id);

  // Fetch the user data from the database
  onValue(ref(db, `MyUsers/${id}`), (snapshot) => {
    let UserInfo = snapshot.val();

    // Create the form elements
    let Updateform = document.createElement("div");
    Updateform.className =
      "col-11 col-md-8 col-lg-6 mx-auto my-5 p-3 card shadow";

    let updateText = document.createElement("h1");
    updateText.textContent = "Update User Info";
    updateText.className = "text-center my-3";

    let studentFirstName = document.createElement("input");
    studentFirstName.className = "form-control my-2";
    studentFirstName.value = UserInfo.firstname;

    let studentLastName = document.createElement("input");
    studentLastName.className = "form-control my-2";
    studentLastName.value = UserInfo.lastname;

    let studentId = document.createElement("input");
    studentId.className = "form-control my-2";
    studentId.value = UserInfo.studentId;

    let StudentCourse = document.createElement("input");
    StudentCourse.className = "form-control my-2";
    StudentCourse.value = UserInfo.studentCourse;

    let UpdateButton = document.createElement("button");
    UpdateButton.className = "btn btn alert alert-success my-3";
    UpdateButton.textContent = "Update User";

    // Update user info when the button is clicked
    UpdateButton.addEventListener("click", () => {
      let updatinginfo = {
        firstname: studentFirstName.value,
        lastname: studentLastName.value,
        studentId: studentId.value,
        studentCourse: StudentCourse.value,
      };
      updateinfo(id, updatinginfo);
    });

    // Append elements to the form
    Updateform.appendChild(updateText);
    Updateform.appendChild(studentFirstName);
    Updateform.appendChild(studentLastName);
    Updateform.appendChild(studentId);
    Updateform.appendChild(StudentCourse);
    Updateform.appendChild(UpdateButton);

    // Clear any existing content in EditScreen and append the new form
    EditScreen.innerHTML = "";
    EditScreen.appendChild(Updateform);
  });
}

function updateinfo(userId, userInfo) {
  console.log("Updating User Info: ", userInfo);
  set(ref(db, `MyUsers/${userId}`), userInfo)
    .then(() => {
      alert("User Information Updated Successfully");
      EditScreen.innerHTML = "";
    })
    .catch((error) => {
      console.log("Error", error);
      alert("Error Updating User Information");
    });
}
let image;
document
  .getElementById("selectImage")
  .addEventListener("change", function (ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      console.log("result", reader.result);
      image = reader.result;
    };

    reader.readAsDataURL(file);
  });

submitBttn.addEventListener("click", function () {
  let userDetails = {
    firstname: firstname.value,
    lastname: lastname.value,
    studentId: studentId.value,
    studentCourse: studentCourse.value,
  };
  set(ref(db, "MyUsers/" + userDetails.firstname), userDetails)
    .then(() => {
      alert("Student Registered Successfully");
      firstname.value = "";
      lastname.value = "";
      studentId.value = "";
      studentCourse.value = "";
    })
    .catch((error) => {
      alert("Error Saving UserData");
      console.log("Eror Saving UserData : ", error);
    });
});

let alllProducts = [
  {
    productName: "Iphone 12",
    productPrice: 1200,
    description: "The Iphone 12 is a great phone",
    category: "Electronics",
    image:
      "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
  },
  {
    productName: "T-Shirt",
    productPrice: 1200,
    description: "The T-shirt is a great phone",
    category: "Men's Wear",
    image:
      "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
  },
];

const getMensWear = alllProducts.filter(
  (product) => product.category === "Men's Wear"
);
console.log("Men's Wear", getMensWear);
