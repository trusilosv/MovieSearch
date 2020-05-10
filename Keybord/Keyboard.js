'use strict'
let textarea = document.querySelector('#inpur__search');
let keys = ['Backquote ru ё Ё en ` ~', 'Digit1 ru 1 ! en 1 !', 'Digit2 ru 2 " en 2 @', 'Digit3 ru 3 № en 3 #', 'Digit4 ru 4 ; en 4 $', 'Digit5 ru 5 % en 5 %', 'Digit6 ru 6 : en 6 ^', 'Digit7 ru 7 ? en 7 &', 'Digit8 ru 8 * en 8 *', 'Digit9 ru 9 ( en 9 (', 'Digit0 ru 0 ) en 0 )', 'Minus ru - _ en - _', 'Equal ru = + en = +', 'Backspace l 2', 'Tab l 1', 'KeyQ ru й Й en q Q', 'KeyW ru ц Ц en w W', 'KeyE ru у У en e E', 'KeyR ru к К en r R', 'KeyT ru е Е en t T', 'KeyY ru н Н en y Y', 'KeyU ru г Г en u U', 'KeyI ru ш Ш en i I', 'KeyO ru щ Щ en o O', 'KeyP ru з З en p P', 'BracketLeft ru х Х en [ {', 'BracketRight ru ъ Ъ en ] }', 'Backslash ru \\ / en \\ |', 'Delete l 1', 'CapsLock l 2', 'KeyA ru ф Ф en a A', 'KeyS ru ы Ы en s S', 'KeyD ru в В en d D', 'KeyF ru а А en f F', 'KeyG ru п П en g G', 'KeyH ru р Р en h H', 'KeyJ ru о О en j J', 'KeyK ru л Л en k K', 'KeyL ru д Д en l L', 'Semicolon ru ж Ж en ; :', 'Quote ru э Э en \' \"', 'Enter l 2', 'ShiftLeft l 2', 'KeyZ ru я Я en z Z', 'KeyX ru ч Ч en x X', 'KeyC ru с С en с С', 'KeyV ru м М en v V', 'KeyB ru и И en b B', 'KeyN ru т Т en n N', 'KeyM ru ь Ь en m M', 'Comma ru б Б en , <', 'Period ru ю Ю en . >', 'Slash ru . , en / ?', 'ArrowUp l 1', 'ShiftRight l 2', 'ControlLeft l 1', 'MetaLeft l 1', 'AltLeft l 1', 'Space l 6.5', 'AltRight l 1', 'ContextMenu l 1', 'ArrowLeft l 1', 'ArrowDown l 1', 'ArrowRight l 1', 'ControlRight l 1'];
let keyboard = new Keyboard();
keyboard.getkeys(keys);
keyboard.add_to_node(document.querySelector(".Keys"));
keyboard.set_keys_length();
keyboard.setkey("MetaLeft").change_value_dom("⊞");
keyboard.setkey("ControlLeft").change_value_dom("Ctrl");
keyboard.setkey("AltLeft").change_value_dom("Alt");
keyboard.setkey("AltRight").change_value_dom("Alt");
keyboard.setkey("ContextMenu").change_value_dom("🔥");
keyboard.setkey("ArrowLeft").change_value_dom("◄");
keyboard.setkey("ArrowDown").change_value_dom("▼");
keyboard.setkey("ArrowUp").change_value_dom("▲");
keyboard.setkey("ArrowRight").change_value_dom("►");
keyboard.setkey("ControlRight").change_value_dom("Ctrl");
keyboard.setkey("Delete").change_value_dom("Del");
keyboard.setkey("CapsLock").addact(() => { caps(); });
keyboard.setkey("ShiftLeft").act = keyboard.setkey("CapsLock").act;
keyboard.setkey("ShiftRight").act = keyboard.setkey("CapsLock").act;
keyboard.setkey("Space").addact(() => { add_texarea(" ") });
keyboard.setkey("Enter").addact(() => { add_texarea("\n") });
keyboard.setkey("ContextMenu").addact(() => {
    keyboard.switch_language();
});

document.addEventListener('keydown', (event) => {
    let key = keyboard.setkey(event.code);
    if (key) {
        key.key_dom.classList.add('active');
        key.act();

        if (key.code.indexOf("Arrow") && key.code != "Backspace" && key.code != "Delete") {
            event.preventDefault();
            if (key.code == "Tab")
                add_texarea("   ");
            add_texarea(key.setkey_present_value());
        }
    }
    if (event.ctrlKey && event.altKey)
        keyboard.switch_language();
});
document.addEventListener('keyup', (event) => {
    let key = keyboard.setkey(event.code)
    if (key)
        key.key_dom.classList.remove('active');
    if (key.code == "ShiftLeft" || key.code == "ShiftRight")
        key.act();
});

function add_texarea(text = "")

{
    textarea.focus();
    let Text = textarea.value;
    let textFirstpart = Text.slice(0, textarea.selectionStart);
    let textSecondpart = Text.slice(textarea.selectionEnd, Text.length);
    let selection = textarea.selectionStart + 1;
    textarea.value = textFirstpart + text + textSecondpart;
    textarea.selectionStart = selection;
    textarea.selectionEnd = selection;

}

function Delete_texarea(type) {
    let Text = textarea.value;
    let textFirstpart = Text.slice(0, textarea.selectionStart - 1);
    let textSecondpart = Text.slice(textarea.selectionEnd - 1, Text.length);
    let selection = textarea.selectionStart;
    if (type == "Backspace") {
        if (textFirstpart.length != 0) {
            selection--;
            textarea.value = textFirstpart.substring(0, textFirstpart.length - 1) + textSecondpart;
        }
    } else textarea.value = textFirstpart + textSecondpart.slice(1, textSecondpart.length);
    textarea.selectionStart = selection - 1;
    textarea.selectionEnd = selection - 1;

}
keyboard.keyboard_dom.addEventListener('mousedown', (element) => {
    if (element.target.classList.value == "key");
    let key = keyboard.setkey(element.target.id);
    if (key) {
        key.key_dom.classList.add('active');
        key.act();
        if (key.code == "Tab")
            add_texarea("   ");
        add_texarea(key.setkey_present_value());
        if (key.code == "Delete" || key.code == "Backspace") {
            Delete_texarea(key.code);
        }

    }
});
keyboard.keyboard_dom.addEventListener('mouseup', (element) => {
    if (element.target.classList.value == "key");
    let key = keyboard.setkey(element.target.id);
    if (key)
        key.key_dom.classList.remove('active');
    if (key.code == "ShiftLeft" || key.code == "ShiftRight")
        key.act();
});

function caps() {
    if (keyboard.shift)
        keyboard.shift = false;
    else keyboard.shift = true;
    keyboard.switch_key();
}
keyboard.switch_language();
let keyboard__on = false;
document.querySelector('.button__keyboard').addEventListener('click', () => {
    if (keyboard__on) {
        keyboard__on = false;
        keyboard.keyboard_dom.style.display = "none";
        document.querySelector(".slider").style.display = 'block';

    } else {
        keyboard__on = true;
        keyboard.keyboard_dom.style.display = 'flex';
        document.querySelector(".slider").style.display = 'none';
    }


});