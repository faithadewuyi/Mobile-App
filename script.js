// link for initializing app from firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

// Link for getting database from Firebase
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// Url gotten from realdatatime after registring on firebase

const appSettings = {
  databaseURL: "https://explore-a4ff3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")

addBtnEl.addEventListener("click", function()
{
  let inputValue = inputEl.value

  push(shoppingListInDB, inputValue)
  
  clearInputFieldEl()

}) 


onValue(shoppingListInDB, function(snapshot){

  if (snapshot.exists())
  {

  
  let changetoArray = Object.entries(snapshot.val())
  
  clearShoppingListEl()

  for (let i = 0; i < changetoArray.length; i++){
    let currentItem = changetoArray[i]

    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    appendToShoppingList(currentItem)
  }
  }
  else{
    shoppingListEl.innerHTML = "No more items here"
  }
})

function clearShoppingListEl(){
  shoppingListEl.innerHTML = ""
}
function clearInputFieldEl(){
  inputEl.value = "" 
}
function appendToShoppingList(item){
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")
    
  newEl.textContent = itemValue

  newEl.addEventListener("click", function(){
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
  })
  shoppingListEl.append(newEl)
}

 