function _getSameNameType(id) {
    const [code, type, _] = id.split('_');
    return FULL_PLAN
        .filter(item => (item.type == type) && (item.code == code))
        .map(item => document.getElementById(item.id));
}


function handleHover(event) {
    if (SELECTED.includes(event.target.id)) return
    _getSameNameType(event.target.id).forEach(item => {
        item.style.background = '#00000044';
        item.style.borderColor = '#00000044';
    });
}

function handleHoverEnd(event) {
    if (SELECTED.includes(event.target.id)) return
    _getSameNameType(event.target.id).forEach(item => {
        item.style.background = '';
        item.style.borderColor = '';
    });
}


function addHoverListeners() {
    FULL_PLAN.forEach(item => {
        const obj = document.getElementById(item.id);
        obj.addEventListener('mouseover', handleHover);
        obj.addEventListener('mouseout', handleHoverEnd);
    });
}
