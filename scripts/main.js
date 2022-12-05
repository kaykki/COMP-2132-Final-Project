const $keyboard = $(`#keyboard`);


const lettersUrl = `data/letters.json`;


fetch(lettersUrl)
    .then(function(response){
        if(response.ok){
            return response.json();
        }else{
            console.log("Network error: fetch failed");
        }
    })
    .then(function(data){

        const letters = data.map(x => x);

        letters.forEach(function(letter){
            $keyboard.append(`
            <input type="button" value="${letter}"></input>`);
        });

    }).catch(function(error){
        console.log(error);
})

