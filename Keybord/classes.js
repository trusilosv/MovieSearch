'use strict'
class Key {

    constructor(options = "") {
        let arroptions = options.split(' ');
        this.code = arroptions.shift();
        this.length = 1;
        this.service = false;
        this.languages = [];
        this.language_keys = [];
        this.act = () => {};
        this.key_dom = document.createElement('div');

        while (arroptions.length != 0) {
            if (arroptions[0].length == 2) {
                this.languages.push(arroptions.shift());
                this.language_keys.push(arroptions.shift());
                this.language_keys.push(arroptions.shift());
            } else {
                if (arroptions[0] === 'l') {
                    arroptions.shift();
                    this.service = true;
                    this.length = +arroptions.shift();
                }
            }
        }

    }
    setlanguage(language = "", shift = false) {
        let indexlanguage = this.languages.indexOf(language);
        if (this.service == false) {
            if (indexlanguage != -1) {
                if (shift) this.key_dom.innerText = this.language_keys[indexlanguage * 2 + 1];
                else this.key_dom.innerText = this.language_keys[indexlanguage * 2];
            } else this.key_dom.innerText = "no ";
        };

    }
    add_to_node(node = document.body) {

        node.appendChild(this.key_dom);
        this.key_dom.id = this.code;
        this.key_dom.classList.add('key');
        if (this.service)
            this.key_dom.innerText = this.code;
        else
            this.key_dom.innerText = this.language_keys[0];
    }
    addact(act = function() {}) {
        this.act = act;
    }
    change_value_dom(value = "") {
        this.key_dom.innerText = value;
    }
    setkey_present_value() {
        if (this.service === false)
            return this.key_dom.innerText;
        else return "";
    }





}
class Keyboard {
    constructor() {
        this.keys = [];
        this.languages = ['ru', 'en'];
        this.keyboard_dom = document.createElement('div');
        this.keylength = 5.7;
        this.language = this.languages[0];
        this.shift = false;

    }
    getkeys(keys = "") {
        this.keys = keys.map((element) => {
            return new Key(element);
        });
    }
    setkey(keycode = "") {
        for (let iterator of this.keys) {
            if (iterator.code === keycode)
                return iterator;
        }
        return false;

    }
    add_to_node(node = document.body) {
        this.keyboard_dom.innerText = "";
        node.appendChild(this.keyboard_dom);
        this.keyboard_dom.id = 'keyboard';
        this.keys.forEach((key) => {
            key.add_to_node(this.keyboard_dom);

        });
    }
    set_keys_length() {
        this.keys.forEach((items) => {
            items.key_dom.style.width = items.length * this.keylength + "%";
        });
    }

    switch_language() {
        this.language = this.languages.pop();
        this.languages.unshift(this.language);
        this.keys.forEach((item) => {
            item.setlanguage(this.language, this.shift);
        });

    }
    switch_key() {
        this.keys.forEach((item) => {
            item.setlanguage(this.language, this.shift);

        });


    }
}