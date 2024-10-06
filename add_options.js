function _generateOptions() {
    const div = document.createElement('div');
    [
        ['pełny ekran', toogleExpand, OPTIONS.expand],            // from option_expand.js
        ['uproszczony widok ', toogleSimplify, OPTIONS.simplify], // from option_simplify.js
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

function renderTopUI() {
    const parent = document.querySelector('div.usos-ui');
    const container = document.createElement('details');
    container.style.border = '1px solid HSL(52, 90%, 58%)';
    container.style.background = '#FCF5C7';
    container.style.borderRadius = '10px';
    // summary
    const summary = document.createElement('summary');
    summary.innerText = 'Generator Planu USOS'
    summary.style.padding = '10px';
    summary.style.border = '2px solid HSL(52, 90%, 58%)';
    summary.style.background = '#FCF5C7';
    summary.style.borderRadius = '10px';
    summary.style.cursor = 'pointer';
    container.appendChild(summary);
    // contents
    const contents = document.createElement('div');
    contents.style.padding = '10px';

    contents.appendChild(_generateOptions());
    container.appendChild(contents);
    parent.children[1].insertAdjacentElement('afterend', container);
}
