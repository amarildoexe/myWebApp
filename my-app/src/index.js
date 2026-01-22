import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getDatabase, 
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: import.meta.env.VITE_DATABASE_URL
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")
/// START OF THE APP

const titleEl = document.getElementById("title-el")
const inputEl = document.getElementById("input-el")
const inputLinks = document.getElementById("input-links")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const greetingEl = document.getElementById("userGreeting")


function greetUser(){
    let time = new Date().getHours()
    let greeting = ""
    if (time >= 5 && time < 12){
        greeting = "Good Morning!"
    } else if (time >= 12 && time < 18) {
        greeting = "Good afternoon!"
    } else {
        greeting = "Good evening!"
    }
    greetingEl.textContent = greeting
}

greetUser()



function render(leads){
    let listItems = ""
    for (let i=0; i < leads.length; i++){
        listItems += `
            <li>
                <strong>${leads[i].title}</strong><br>
                <span>${leads[i].content}</span><br/><br/>
                <small class="date">${formatDate(leads[i].createdAt)}</small>
            </li>
        `
    }
    inputLinks.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    inputLinks.innerHTML = ""
})

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

inputBtn.addEventListener("click", function(){
    push(referenceInDB, {
        title: titleEl.value,
        content: inputEl.value,
        createdAt: Date.now()
    })
    titleEl.value = ""
    inputEl.value = ""
})

function formatDate(timestamp){
    const date = new Date(timestamp)
    return date.toLocaleString() 
}

const leads = Object.values(snapshotValues)
    .filter(item => item.createdAt)
    .sort((a, b) => b.createdAt - a.createdAt)
