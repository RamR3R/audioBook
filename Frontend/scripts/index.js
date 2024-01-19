let data = [];




function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTimeString = `${hours}:${minutes}`;
  
    document.getElementById("currentTime").innerText = currentTimeString;
  }
  
  // Update the time every second
  setInterval(updateCurrentTime, 1000);
  
  // Initial update


function userCall(){
    let userinfo = JSON.parse(localStorage.getItem("userinfo")) || "user";
    document.getElementById('userinfo').innerText = `Hey, ${userinfo.name} ` ;
}

function fetchData(){
  fetch("http://localhost:3030/courses")
  .then(res=>res.json())
  .then(data => {
    console.log(data);
    const container = document.getElementById('cardContainer');
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      let alt = `./public/images.png`
      card.innerHTML = `<img src="${item.coverImage} alt="error"/><h2>${item.title}</h2><p>by ${item.instructor}</p>`;
      card.addEventListener("click",()=>{
        localStorage.setItem("single",JSON.stringify(item));
        window.location.href  = "./single.html";
      })
      container.appendChild(card);
    });
    localStorage.setItem("data",JSON.stringify(data));
})
}



const renderCards = ()=>{
  
  fetchData();
  
}

// Initial rendering of cards
renderCards();

updateCurrentTime();  
userCall();
