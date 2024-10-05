SELECTED = []

function _getSameNameType(id) {
    const [code, type, _] = id.split('_');
    return FULL_PLAN
        .filter(item => (item.type == type) && (item.code == code))
        .map(item => document.getElementById(item.id))
}

function handleHover(event, hovering) {
    if (SELECTED.includes(event.target.id)) return
        _getSameNameType(event.target.id).forEach(item => {
            const color = hovering ? '#ccc' : ''
            item.style.background = color;
            item.style.borderColor = color;
            item.shadowRoot.getElementById('info').style.background = color;
        });
}

function _styleBtn(button, add) {
    const color = add ? 'green' : 'red'
    button.textContent = add ? '+' : '-';
    button.style.color = color;
    button.style.padding = '0';
    button.style.textAlign = 'center';
    button.style.cursor = 'pointer';
    button.style.border = `2px solid ${color}`;
    button.style.borderRadius = '100%';
    button.style.background = 'transparent';
    button.style.fontWeight = 'bold';
    button.style.position = 'absolute';
    button.style.left = '5px';
    button.style.bottom = '5px';
    button.style.width = '1.5rem';
    button.style.height = '1.5rem';
    button.style.fontSize = '1.5rem';
    button.style.lineHeight = add ? '1.4rem' : '0.9rem';
}

function selectItem(event, item) {
    event.preventDefault();
    event.stopPropagation();
    const selected = !SELECTED.includes(item.id)
    if (selected) {
        SELECTED.push(item.id);
    } else {
        SELECTED = SELECTED.filter(id => id !== item.id);
    } 
    _getSameNameType(item.id).forEach(i => {
        if (i.id == item.id) {
            const color = selected ? '#8DE969' : '';
            i.style.background = color;
            i.style.borderColor = color;
            i.shadowRoot.getElementById('info').style.background = color;
            _styleBtn(i.shadowRoot.querySelector('button'), !selected)
        } else {
            i.style.display = selected ? 'none' : 'block';
        }
    });
}

function editTimetableUI() {
    FULL_PLAN.forEach(item => {
        const obj = document.getElementById(item.id);
        // hover listeners
        obj.addEventListener('mouseover', (e) => handleHover(e, true));
        obj.addEventListener('mouseout', (e) => handleHover(e, false));
        // buttons
        obj.style.position = 'relative'
        const button = document.createElement('button');
        const svg = document.createElement('svg');
        _styleBtn(button, true);
        button.onclick = (e) => selectItem(e, item)
        obj.shadowRoot.querySelector('div[aria-describedby="dod-info"]').appendChild(button);
    });
}
