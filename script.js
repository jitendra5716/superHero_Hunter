// fetching the data from html 
const searchBtn = document.getElementById('searchBtn');
const inputDiv = document.getElementById('searchIcon');
const outputDiv = document.getElementById('charactersList');
const heading = document.getElementById('heading');
const loading = document.getElementById('loading');
const moreInfoBtn = document.getElementsByClassName('moreInfo')[0];

// create an empty array for storing the favourite heros 
let favouriteSuperHeros = [];

// add an event listener to search button to find relevent results 

searchBtn.addEventListener('click',()=>{
    loading.style.display='block';
    outputDiv.innerHTML = '';
    heading.style.fontSize="3rem";
   let inputVal = inputDiv.value;
   //fetch the data from api 
    function fetchUrl(){
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.onload = ()=>{
            var responseJSON = JSON.parse(xhrRequest.response);
            let data = responseJSON.data.results;
            loading.style.display='none';
            data.forEach((singleData)=>{
                let imgUrl = singleData.thumbnail.path+"."+singleData.thumbnail.extension;
                // create a dom element an append it to its parent element
                let div = document.createElement('div');
                div.innerHTML =`
                    <img src="${imgUrl}" alt="superHero">
                    <div class="descriptionBox">
                      <h2 class="charTitle">${singleData.name}</h2>
                      <p class="shortDesc">${singleData.description}</p>
                      <div class="charBtns">
                         <button type="submit" class="charBtn moreInfo" id = "${singleData.id}"><a href="/about.html" target="_blanck" id="${singleData.id}">More Info <span><i class="fa-solid fa-arrow-right"></i></span></a></button>
                         <button type="submit" class="charBtn addtoFav" id = "${singleData.id}fav" >Add To Favourite <span><i class="fa-sharp fa-regular fa-heart"></i></span></button>
                      </div>
                    </div>
                `
                div.classList.add('character');
                outputDiv.append(div);
                // add event listener to dynamic fetch btn for details page
            let btn = document.getElementById(`${singleData.id}`);
            btn.addEventListener('click',(e)=>{
                let characterId = e.target.id;
                localStorage.setItem('charId',characterId);
                
            })
            // add event listener to dynamic button for favourite button to add it is in a list
            let favBtn = document.getElementById(`${singleData.id}fav`);
            favBtn.addEventListener('click',(e)=>{
                let originalId = e.target.id;
                let orin = originalId.slice(0,7);
                //push single id of clicked to an array
                favouriteSuperHeros.push(orin);
                let StringFav = JSON.stringify(favouriteSuperHeros);

                //use local storage to transfer data from one html page to other page
                localStorage.setItem('favouriteSuperHeros',StringFav); 
                window.alert("Add to Favourite Success");  
            })
            })
            
        }
        xhrRequest.open('get',`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${inputVal}&ts=1&apikey=2174bced0ab0decd5085a7c812761b08&hash=ce5fc4e0b4fa380679337ae7b6b1a2af`,true);
        xhrRequest.send();
    };
    fetchUrl();
});





