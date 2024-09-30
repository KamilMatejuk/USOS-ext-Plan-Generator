SELECTED = []

function _styleBtn(button, add) {
    button.textContent = add ? '+' : '-';
    button.style.color = add ? 'green' : 'red';
    button.style.padding = '0';
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.background = 'transparent';
    button.style.fontWeight = 'bold';
    button.style.fontSize = '1.5rem';
    button.style.position = 'absolute';
    button.style.right = '0';
    button.style.bottom = '0';
}


function selectItem(item) {
    if (SELECTED.includes(item.id)) {
        SELECTED = SELECTED.filter(id => id !== item.id);
        _getSameNameType(item.id).forEach(i => {
            if (i.id == item.id) {
                i.style.background = '';
                _styleBtn(i.shadowRoot.querySelector('button'), true)
            } else {
                i.style.display = 'block';
            }
        });
    } else {
       SELECTED.push(item.id);
        _getSameNameType(item.id).forEach(i => {
            if (i.id == item.id) {
                i.style.background = '#8DE969';
                _styleBtn(i.shadowRoot.querySelector('button'), false)
            } else {
                i.style.display = 'none';
            }
        });
    }
}

function addSelectButtons() {
    Object.entries(FULL_PLAN).forEach(([name, name_values]) => {
        Object.entries(name_values).forEach(([type, type_values]) => {
            type_values.forEach(item => {
                const obj = document.getElementById(item.id);
                obj.style.position = 'relative'
                const button = document.createElement('button');
                _styleBtn(button, true);
                button.onclick = (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    selectItem(item)
                };
                obj.shadowRoot.querySelector('div[aria-describedby="dod-info"]').appendChild(button);
            });
        });
    });
}
