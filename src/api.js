const API_ROOT = "http://localhost:3000/";

function postTo(route, data) {
    return fetch(
        API_ROOT + route,
        {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        .then(response => response.json());
}

function getFrom(route) {
    return fetch(API_ROOT + route)
        .then(response => response.json());
}


// sign up user
function signup(data) {
    return postTo('players', data)
        .then(login(data));
}


// login user
function login({name}) {
    return getFrom('players')
        .then(data => {
        let selected = null;

        data.forEach(player => {
            if (player.name === name) {
                selected = player;
            }
        });

        return selected;
    });
}

//getPlayer
function getPlayer(id) {
    return getFrom(`players/${id}`);
}

// get games list
function getGames({player}) {
    return getFrom('games');
}


export {
    signup, 
    login,
    getPlayer,
    getGames
}
