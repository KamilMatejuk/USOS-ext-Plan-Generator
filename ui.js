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
    container.appendChild(_generateOptions())
    parent.children[1].insertAdjacentElement('afterend', container);
}
