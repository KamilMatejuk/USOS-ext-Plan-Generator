function _cerateLi(content) {
    const li = document.createElement('li');
    li.textContent = content;
    return li;
}

function _createUl(lis) {
    const ul = document.createElement('ul');
    lis.forEach(li => {
        ul.appendChild(li);
    });
    return ul;
}

function _generatePlan() {
    const lis = Object.entries(FULL_PLAN).map(([k, v]) => {
        const li = _cerateLi(k);
        const lis_i = Object.entries(v).map(([k_i, v_i]) => {
            const li_i = _cerateLi(k_i);
            const lis_ii = v_i.map(v_ii => _cerateLi(`grupa ${v_ii.group}, ${v_ii.day} ${v_ii.time_start}-${v_ii.time_end}`))
            li_i.appendChild(_createUl(lis_ii))
            return li_i;
        });
        li.appendChild(_createUl(lis_i))
        return li;
    });
    return _createUl(lis);
}

function _generateOptions() {
    const div = document.createElement('div');
    [
        ['pełny ekran', toogleExpand, !CURRENT_STATE_EXPANDED],
        ['uproszczony widok ', toogleSimplify, !CURRENT_STATE_SIMPLIFIED],
    ].forEach(([text, func, value]) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${text}`.replace(' ', '-');
        checkbox.checked = value;
        const label = document.createElement('label');
        label.htmlFor = checkbox.id
        label.textContent = text;
        checkbox.onchange = func;
        div.appendChild(checkbox);
        div.appendChild(label);
    });
    return div;
}

function renderUI() {
    const parent = document.querySelector('div.usos-ui');
    const container = document.createElement('dev');
    // container.appendChild(_generatePlan())
    container.appendChild(_generateOptions())
    parent.children[1].insertAdjacentElement('afterend', container);
}
