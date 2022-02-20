const API_ROOT = "http://localhost:3000/";

function postTo(route, data, put=false) {
    let method = !put ? 'POST' : 'PUT';
    return fetch(
        API_ROOT + route,
        {
          method: method, 
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
// name: string -> player: object
function signup(data) {
    return postTo('players', data)
        .then(login(data));
}


// login user
function login({name}) {
    return getFrom(`players`)
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

function getGame(id) {
    return getFrom(`games/${id}`);
}

function newGame({player}) {
    return postTo('games', {
        playerIDs: [player.id, 0],
        numbers: [0, 0]
    })
}

function joinGame({player, game}) {
    player.currentGame = game.id;
    return postTo(`players/${player.id}`, player, true)
        .then(() => game);
}

export {
    postTo,
    getFrom,
    signup, 
    login,
    getPlayer,
    getGames,
    getGame,
    newGame,
    joinGame
}
