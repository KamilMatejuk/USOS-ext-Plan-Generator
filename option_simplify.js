function _shortenName(text) {
    return text.split(' ').map(word => word.length > 3 ? word.slice(0, 3) + '.' : word).join(' ');
    // return text.split(' ').map(word => word.length > 1 ? word.slice(0, 1).toUpperCase() : word).join('');
}

function toogleSimplify() {
    OPTIONS.simplify = !OPTIONS.simplify
    if (OPTIONS.simplify) {
        FULL_PLAN.forEach(item => {
            const obj = document.getElementById(item.id);
            obj.querySelector('div[slot="info"]').style.display = 'none';
            obj.querySelector('span[slot="time"]').style.display = 'none';
            const subject = obj.shadowRoot.querySelector('div#przedmiot')
            subject.style['-webkit-line-clamp'] = '3';
            subject.textContent = `[${item.type}] ` + _shortenName(item.name);
            document.documentElement.style.setProperty('--timetable-row-height', '0.75rem');
        });
    } else {
        FULL_PLAN.forEach(item => {
            const obj = document.getElementById(item.id);
            obj.querySelector('div[slot="info"]').style.display = 'block';
            obj.querySelector('span[slot="time"]').style.display = 'block';
            const subject = obj.shadowRoot.querySelector('div#przedmiot')
            subject.style['-webkit-line-clamp'] = '2';
            subject.textContent = item.name;
            document.documentElement.style.setProperty('--timetable-row-height', '1.25rem');
        });
    }
}
