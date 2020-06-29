'use strict';

const apikey = 'B5apR3q4ufhJN72IrcWKLD3LBf0DJ3HcxzWbPwgV'
const searchUrl = 'https://developer.nps.gov/api/v1/parks'



function displayParkList(responseJson, maxResults) {
    console.log(responseJson.data[1].description)
    $('ul').empty();
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results').append(`
        <li class="result-list-item">
            <div>
                <h3 class="parkName">${responseJson.data[i].name}</h3>
            </div>
            <div>
                <h4 class="parkAddress">${responseJson.data[i].addresses[0].line1},${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}</h4>
            </div>
            <div>
                <p class="parkDescription">${responseJson.data[i].description}</p>
            </div>
            <div>
                <a href="${responseJson.data[i].url}" class="parkUrl">${responseJson.data[i].url}</a>
            </div>
        </li>
    `);
    };
    $('ul').removeClass('hidden');
    console.log(responseJson.data.length);
    
};


function reformatQueries(param) {
    const queryItems = Object.keys(param).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`);
    return queryItems.join('&')
};


function getParkList(seaTer, maxRes=10) {
    const param = {
        stateCode: seaTer,
        limit: maxRes,
        api_key: apikey,
    };

    const queryString = reformatQueries(param);
    const url = searchUrl+'?'+queryString;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayParkList(responseJson, maxRes))
    .catch(error => alert(`There seems to be some technical difficulties: ${error.message}`));
};



function runParkList() {
    $('button').click( function(event) {
        event.preventDefault();
        const searchTerm = $('#state').val();
        const maxResults = $('#max-num').val();
        console.log(searchTerm);
        getParkList(searchTerm, maxResults);
    });
};

runParkList();