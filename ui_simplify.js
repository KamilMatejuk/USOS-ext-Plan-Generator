CURRENT_STATE_SIMPLIFIED = true


function _shortenName(text) {
    return text.split(' ').map(word => word.length > 3 ? word.slice(0, 3) + '.' : word).join(' ');
    // return text.split(' ').map(word => word.length > 1 ? word.slice(0, 1).toUpperCase() : word).join('');
}


function toogleSimplify() {
    CURRENT_STATE_SIMPLIFIED = !CURRENT_STATE_SIMPLIFIED
    if (CURRENT_STATE_SIMPLIFIED) {
        Object.entries(FULL_PLAN).forEach(([name, name_values]) => {
            Object.entries(name_values).forEach(([type, type_values]) => {
                type_values.forEach(item => {
                    const obj = document.getElementById(item.id);
                    obj.querySelector('div[slot="info"]').style.display = 'block';
                    obj.querySelector('span[slot="time"]').style.display = 'block';
                    const subject = obj.shadowRoot.querySelector('div#przedmiot')
                    subject.style['-webkit-line-clamp'] = '2';
                    subject.textContent = name;
    
                });
            });
        });
    } else {
        Object.entries(FULL_PLAN).forEach(([name, name_values]) => {
            Object.entries(name_values).forEach(([type, type_values]) => {
                type_values.forEach(item => {
                    const obj = document.getElementById(item.id);
                    obj.querySelector('div[slot="info"]').style.display = 'none';
                    obj.querySelector('span[slot="time"]').style.display = 'none';
                    const subject = obj.shadowRoot.querySelector('div#przedmiot')
                    subject.style['-webkit-line-clamp'] = '3';
                    subject.textContent = `[${type}] ` + _shortenName(name);
    
                });
            });
        });
    }
}
