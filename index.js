import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getDatabase, 
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: DATABASE_URL
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")
/// START OF THE APP


const inputEl = document.getElementById("input-el")
const inputLinks = document.getElementById("input-links")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")

 
function render(leads){
    let listItems = ""
    for (let i=0; i < leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'> 
                    ${leads[i]}
                </a>
            </li>`
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
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})