function _createCheckbox(text, state) {
    const div = document.createElement('div');
    const checkbox = applyStyle(document.createElement('input'), 'topUiCheckbox');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${text}`.replace(' ', '-').toLowerCase();
    checkbox.checked = state;
    const label = applyStyle(document.createElement('label'), 'topUiCheckboxLabel');
    label.htmlFor = checkbox.id;
    label.textContent = text;
    div.appendChild(checkbox);
    div.appendChild(label);
    return div;
}

function _generateOptions() {
    const div = applyStyle(document.createElement('div'), 'topUiOptionsContainer');
    const schema = {
        'pełny ekran': [
            'maksymalizacja szerokości strony',
            'ukryte lewe menu',
            'ukryty wybór formatu',
            'ukryty wybór czasu',
        ],
        'uproszczony widok': [
            'skrócone nazwy przedmiotów',
            'ukryta godzina',
            'ukryta lokalizacja i typ',
            'zmiejszony rozmiar wierszy',
        ],
    }
    Object.keys(schema).forEach(main_label => {
        const main_div = document.createElement('div');
        const main_checkbox = _createCheckbox(main_label, false);
        // checkbox.onchange = func;
        main_div.appendChild(main_checkbox);
        const detail_div = applyStyle(document.createElement('div'), 'topUiOptionsDetail');
        schema[main_label].forEach(detail => {
            const detail_checkbox = _createCheckbox(detail, false);
            detail_div.appendChild(detail_checkbox);
        });
        main_div.append(detail_div);
        div.append(main_div);
    });
    return div;
}

function renderTopUI() {
    const parent = document.querySelector('div.usos-ui');
    const container = document.createElement('details');
    applyStyle(container, 'topUiDetails');
    // summary
    const summary = document.createElement('summary');
    summary.innerText = 'Generator Planu USOS'
    applyStyle(summary, 'topUiSummary');
    container.appendChild(summary);
    // contents
    const contents = document.createElement('div');
    applyStyle(contents, 'topUiContents');
    contents.appendChild(_generateOptions());
    container.appendChild(contents);
    parent.children[1].insertAdjacentElement('afterend', container);
}
