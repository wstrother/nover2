import {postTo, getFrom} from './api';

// collection/table names in DB
const PLAYERS = 'players';
const GAMES = 'games';


class Orm {
    // path = '';
    // default = {};

    constructor(data, id=0) {
        let newData = Object.assign({}, this.default);

        Object.assign(newData, data);
        Object.assign(this, newData);

        if (!data.id && id) {
            this.id = id;
        }
    }

    static get path() {
        return '';
    }

    static get default() {
        return {};
    }

    update(data) {
        Object.assign(this, data);
        let newData = Object.assign({}, this);

        return postTo(this.path, newData, true);
    }

    static getFromData(data) {
        return new this(data);
    }

    static create(data) {
        return postTo(this.path, data)
            .then(data => this.getFromData(data));
    }

    static getByID(id) {
        return this.getByKey('id', id);
    }

    static getByKey(key, value) {
        return getFrom(this.path)
        .then(items => {
            let match = false;

            items.forEach(item => {
                if (item[key] === value) match = item;
            });

            if (match) {
                return match;
            } else {
                throw Error(`${key}: '${value}' not found in collection '${this.path}'`);
            }
        });

    }
}


class Player extends Orm{
    // path = PLAYERS;
    // default = {
    //     currentGame: 0,
    //     playerIndex: 0
    // };
    static get path() {
        return PLAYERS;
    }

    static get default() {
        return {
            currentGame: 0,
            playerIndex: 0
        };
    }

    static getByName(name) {
        return this.getByKey('name', name);
    }
}


class Game extends Orm {
    path = GAMES;
    default = {
        playerIDs: [0, 0],
        numbers: [0, 0]
    };

    joinGame(player) {
        let open = false;
        let playerIndex = 0;

        for (let i=0; i<=1; i++) {
            if (!this.playerIDs[i]) {
                playerIndex = i;
                open = true;
            }
        }

        if (!open) {
            throw Error(`Game with ID: '${this.id}' is full, could not add player: '${player.name}'`);
        }

        let playerIDs = this.playerIDs;
        playerIDs[playerIndex] = player.id;

        return this.update({playerIDs})
            .then(() => player.update({playerIndex}));
    }
}


export {
    Player,
    Game
}