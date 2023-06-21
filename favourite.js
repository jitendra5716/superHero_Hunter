const superHeroListDiv = document.getElementsByClassName('superHeroListDiv')[0];
const loading = document.getElementById('loading');

let favouriteSuperHeros = localStorage.getItem('favouriteSuperHeros');

let favArray = JSON.parse(favouriteSuperHeros);

// console.log(favArray);


function removeSuperHero(id){
    let newFavArray = favArray.filter((fab)=>{
        // console.log(id);
        // console.log(fab);
        return fab !== id;
    })

    favArray = newFavArray;
    window.alert("remove item success!");
}
function runFunction(){
    loading.style.display = 'block';
    favArray.forEach((fav)=>{
        // console.log(fav);
        superHeroListDiv.innerHTML ='';
        function fetchApi(){
            let xhrRequest = new XMLHttpRequest();
            xhrRequest.onload=()=>{
                // console.log(xhrRequest.response);
                loading.style.display = 'none';
                let responseJSON = JSON.parse(xhrRequest.response);
                // console.log(responseJSON.data.results);
                let data = responseJSON.data.results[0];
                let imgUrl = data.thumbnail.path+"."+data.thumbnail.extension;
                // console.log(imgUrl);
                let li = document.createElement('li');
    
                li.innerHTML = `
                <div class="listDiv">
                            <div class="imgDiv">
                                <img src="${imgUrl}" alt="heros">
                            </div>
                            <div class="infoDiv">
                                <h2>${data.name}</h2>
                                <p>${data.description}</p>
                                <button id=${data.id}>Un-favourite <span><i class="fa-solid fa-heart-crack"></i></span></button>
                            </div>
                        </div>
                `
                superHeroListDiv.append(li);
                let unFavBtn = document.getElementById(`${data.id}`);
                unFavBtn.addEventListener('click',(e)=>{
                    e.preventDefault();
                    let id = e.target.id;
                    removeSuperHero(id); 
                    let favArrayStr = JSON.stringify(favArray);
                    localStorage.setItem("favouriteSuperHeros", favArrayStr);
                    runFunction();
                })
            };
            xhrRequest.open('get',`https://gateway.marvel.com:443/v1/public/characters/${fav}?ts=1&apikey=2174bced0ab0decd5085a7c812761b08&hash=ce5fc4e0b4fa380679337ae7b6b1a2af`,true);
            xhrRequest.send();
        }
        fetchApi();
    
    });
    
}
runFunction();


