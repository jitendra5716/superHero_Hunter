//  fetching element from html 
const outerDiv = document.getElementsByClassName('outerDiv')[0];

// fetch data from url for specific character
function fetchDataById(){
    //getting data from local storage for fetching data with id;
    let id = localStorage.getItem('charId');
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = ()=>{
        let responseJSON = JSON.parse(xhrRequest.response);
        let detailsData = responseJSON.data.results[0];
        let imageUrl = detailsData.thumbnail.path+"."+detailsData.thumbnail.extension;

        //create a dynamic element div when server run
        let div = document.createElement('div');

        div.innerHTML =`
        <div class="imgDiv">
              <img src="${imageUrl}" alt="superHeroDetails">
             </div>
             <div class="info">
              <h1 id="heading">${detailsData.name}</h1>
              <p class="desc">
                  ${detailsData.description}
              </p>
              <p class="modified">modified: ${detailsData.modified}</p>
              <ul class="achivements">
                  <li>
                      Comics : ${detailsData.comics.available}
                  </li>
                  <li>Events :  ${detailsData.events.available}</li>
                  <li>Series :  ${detailsData.series.available}</li>
                  <li>Stories :  ${detailsData.stories.available}</li>
              </ul>
              <ul class="urls">
                  <li> 
                      <button target="_blanck" ><a href="${detailsData.urls[0].url}" target="_blanck" >Details <span><i class="fa-solid fa-arrow-right"></i></span></a></button>
                  </li>
                  <li>  
                      <button><a href="${detailsData.urls[1].url}">Wiki <span><i class="fa-solid fa-arrow-right"></i></span></a></button>
                  </li>
                  <li>
                      <button><a href="">comiclink <span><i class="fa-solid fa-arrow-right"></i></span></a></button>

                  </li>
              </ul>
            </div>
        `
        div.classList.add('innerDiv');
        outerDiv.append(div);
    }
    xhrRequest.open('get',`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=2174bced0ab0decd5085a7c812761b08&hash=ce5fc4e0b4fa380679337ae7b6b1a2af`,true);
    xhrRequest.send();
}
fetchDataById();