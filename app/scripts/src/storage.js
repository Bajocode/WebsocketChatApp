/*
    Store username in browser for continuous usage
    - local storage: does not keep data
    - session storage: associated with app's server address
*/

// generic class, to be used by both local and session storage
class Store {
    // local or session api
    constructor(storageAPI) {
        this.api = storageAPI;
    }

    get() {
        return this.api.getItem(this.key);
    }

    set(value) {
        this.api.setItem(this.key, value);
    }
}

export class UserStore extends Store {
    constructor(key) {
        // Invoke Store constructor first
        super(sessionStorage);
        this.key = key;
    }
}
