const client_id = "d65b22f29856465da4c0e80786539cdf";
const client_secret = "55ff671998684f929b8ea70228b0aa2b";

function onJson_Spotify(json){
    
    console.log("Talè");
    console.log(json);

    const canzoni = document.querySelector("#risultati_spo");
    canzoni.innerHTML = "";

    let max = json.limit;
    let num_random = Math.floor(Math.random() * max);
    console.log(num_random);

    if(num_random > 95){
        num_random = 95;
    }

    for(let i=0; i<5; i++){

        const canzone = json.items[num_random++];
        const titolo = canzone.track.name;
        console.log("Titolo:" + titolo);
        const artista = canzone.track.artists[0].name;
        console.log("Artista:" + artista);

        const block = document.createElement("div");
        block.classList.add("blocchetto_spo");
        const blo_titolo = document.createElement("span");
        blo_titolo.textContent = 'TITOLO:  ' + titolo;
        const blo_artista = document.createElement("span");
        blo_artista.textContent = 'CANTANTE:  ' + artista;
        const blo_link = document.createElement("a");
        blo_link.href = canzone.track.preview_url;
        blo_link.textContent = blo_link.href;
        const frase = document.createElement("span");
        frase.textContent = 'LINK PREVIEW:  ';

        block.appendChild(blo_titolo);
        block.appendChild(blo_artista);
        block.appendChild(frase);
        block.appendChild(blo_link);

        canzoni.appendChild(block);

    }

}

function onJson(json){
    
    const citazione = document.querySelector("#risultati_ani");
    citazione.innerHTML = "";

    const anime = json.anime;
    const character = json.character;
    const quote = json.quote;

    const blocco = document.createElement("div");
    blocco.classList.add("blocchetto_ani");
    const blo_anime = document.createElement("span");
    blo_anime.textContent = anime;
    blo_anime.classList.add("anime")
    const blo_character = document.createElement("span");
    blo_character.textContent = character;
    blo_character.classList.add("character");
    const blo_quote = document.createElement("span");
    blo_quote.textContent = quote;
    blo_quote.classList.add("quote");

    blocco.appendChild(blo_anime);
    blocco.appendChild(blo_character);
    blocco.appendChild(blo_quote);

    citazione.appendChild(blocco);

}

function onResponse(response){
    console.log("Apposto");
    return response.json();
}

function cercaCit(event){

    event.preventDefault();

    const anime_input = document.querySelector("#anime");
    const anime_value = encodeURIComponent(anime_input.value);

    rest_url = "https://animechan.vercel.app/api/random/anime?title=" + anime_value;

    fetch(rest_url).then(onResponse).then(onJson);

}

function Musica(event){

    event.preventDefault();

    fetch("https://api.spotify.com/v1/playlists/1YA5cPIfDy3L03bGnNiDM7/tracks",
        {
            headers:
            {
                'Authorization' : 'Bearer ' + token,
            }
        }
    ).then(onResponse).then(onJson_Spotify);

}

function onTokenJson(json){
    token = json.access_token;
    console.log(json);
    console.log(token);
}

function onTokenResponse(response){
    console.log("Ricevuto");
    return response.json();
}

let token;

fetch("https://accounts.spotify.com/api/token",
    {
        method: 'post',
        body: 'grant_type=client_credentials',
        headers:
        {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
).then(onTokenResponse).then(onTokenJson);

const form = document.querySelector("form");
form.addEventListener('submit', cercaCit);

const button = document.querySelector("button");
button.addEventListener('click', Musica);