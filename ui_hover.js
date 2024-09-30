function _getSameNameType(id) {
    const items = [];
    const [code, type, _] = id.split('_');
    Object.entries(FULL_PLAN).forEach(([name, name_values]) => {
        Object.entries(name_values).forEach(([t, type_values]) => {
            if (t != type) return
            type_values.forEach(item => {
                if (item.code != code) return
                items.push(document.getElementById(item.id));
            });
        });
    });
    return items;
}


function handleHover(event) {
    if (SELECTED.includes(event.target.id)) return
    _getSameNameType(event.target.id).forEach(item => {
        item.style.background = '#00000044';
    });
}

function handleHoverEnd(event) {
    if (SELECTED.includes(event.target.id)) return
    _getSameNameType(event.target.id).forEach(item => {
        item.style.background = '';
    });
}


function addHoverListeners() {
    Object.entries(FULL_PLAN).forEach(([name, name_values]) => {
        Object.entries(name_values).forEach(([type, type_values]) => {
            type_values.forEach(item => {
                const obj = document.getElementById(item.id);
                obj.addEventListener('mouseover', handleHover);
                obj.addEventListener('mouseout', handleHoverEnd);
            });
        });
    });
}
