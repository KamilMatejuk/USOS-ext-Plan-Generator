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
    button.textContent = add ? '+' : '-';
    applyStyle(button, 'actionButton');
    applyStyle(button, add ? 'actionButtonAdd' : 'actionButtonRemove');
}

function selectItem(event, item) {
    event.preventDefault();
    event.stopPropagation();
    const selected = !SELECTED.includes(item.id)
    if (selected) {
        SELECTED.push(item.id);
        _generateSelected();
    } else {
        SELECTED = SELECTED.filter(id => id !== item.id);
        _generateSelected();
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
        _styleBtn(button, true);
        button.onclick = (e) => selectItem(e, item)
        obj.shadowRoot.querySelector('div[aria-describedby="dod-info"]').appendChild(button);
    });
}
