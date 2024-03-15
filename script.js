// link for initializing app from firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// Link for getting database from Firebase
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// Url gotten from realdatatime after registring on firebase

const appSettings = {
  databaseURL: "https://explore-a4ff3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB =ref(database, "shoppingList")


const inputEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-btn")

addBtnEl.addEventListener("click", function()
{
  let inputValue = inputEl.value

  push(shoppingListInDB, inputValue)

  console.log(`${inputValue} added to database`) 
  
})