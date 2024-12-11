export class LocStorageClass {
    constructor(storage) {
        this.storage = storage;
        this.dict = JSON.parse(localStorage.getItem(this.storage)) || {};
    }

    changeDict() {
        localStorage.setItem(this.storage, JSON.stringify(this.dict));
    }

    addValue(key, value) {
        this.dict[key] = value;
        this.changeDict();
    }

    getValue(key) {
        return this.dict[key];
    }

    deleteValue(key) {
        if (key in this.dict) {
            delete this.dict[key];
            this.changeDict();
            return true;
        } else {
            return false;
        }
    }

    getKeys() {
        return Object.keys(this.dict);
    }
}
