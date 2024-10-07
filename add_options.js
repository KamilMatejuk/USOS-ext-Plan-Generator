// ****************************************************************************
// ********************************* options **********************************
// ****************************************************************************

function toogleExpandMaximizePageWidth(state) {
    document.getElementsByTagName('body')[0].style.overflowX = state ? 'hidden' : 'auto';
    document.getElementsByTagName('usos-layout')[0].style.maxWidth = state ? '100%' : '1200px';
    document.getElementsByTagName('usos-layout')[0].style.minWidth = state ? '100%' : '1200px';
}

function toogleExpandMaximizePlanWidth(state) {
    document.querySelectorAll('div.timetable-wrapper')[0].style.maxWidth = state ? '100%' : '800px';
}

function toogleExpandHideLeftMenu(state) {
    document.getElementsByTagName('menu-left')[0].style.display = state ? 'none' : 'block';
    document.getElementById('main').shadowRoot.getElementById('page-body').style.width = state ? '100%' : '80%';
}

function toogleExpandHideFormatChoice(state) {
    document.querySelectorAll('div.timetable-wrapper > usos-frame')[1].style.display = state ? 'none' : 'block';
}

function toogleExpandHideTimeChoice(state) {
    document.querySelectorAll('div.timetable-wrapper > form')[0].style.display = state ? 'none' : 'block';
}

function toogleSimplifyShortenName(state) {
    FULL_PLAN.forEach(item => {
        const obj = document.getElementById(item.id);
        const subject = obj.shadowRoot.querySelector('div#przedmiot');
        const short_name = item.name.split(' ').map(word => word.length > 3 ? word.slice(0, 3) + '.' : word).join(' ');
        subject.textContent = state ? short_name : item.name;
        subject.style['-webkit-line-clamp'] = state ? '3' : '2';
    });
}

function toogleSimplifyHideTime(state) {
    FULL_PLAN.forEach(item => {
        const obj = document.getElementById(item.id);
        obj.querySelector('span[slot="time"]').style.display = state ? 'none' : 'block';
    });
}

function toogleSimplifyHideLocation(state) {
    FULL_PLAN.forEach(item => {
        const obj = document.getElementById(item.id);
        obj.querySelector('div[slot="info"]').style.display = state ? 'none' : 'block';
    });
}

function toogleSimplifyMinimizeRows(state) {
    document.documentElement.style.setProperty('--timetable-row-height', state ? '0.75rem' : '1.25rem');
}

// ****************************************************************************
// ************************************ ui ************************************
// ****************************************************************************

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
            ['maksymalizacja szerokości strony', toogleExpandMaximizePageWidth],
            ['maksymalizacja szerokości planu', toogleExpandMaximizePlanWidth],
            ['ukryte lewe menu', toogleExpandHideLeftMenu],
            ['ukryty wybór formatu', toogleExpandHideFormatChoice],
            ['ukryty wybór czasu', toogleExpandHideTimeChoice],
        ],
        'uproszczony widok': [
            ['skrócone nazwy przedmiotów', toogleSimplifyShortenName],
            ['ukryta godzina', toogleSimplifyHideTime],
            ['ukryta lokalizacja i typ', toogleSimplifyHideLocation],
            ['zmiejszony rozmiar wierszy', toogleSimplifyMinimizeRows],
        ],
    }
    Object.keys(schema).forEach(main_label => {
        const main_div = document.createElement('div');
        const main_checkbox = _createCheckbox(main_label, false);
        main_div.appendChild(main_checkbox);
        const detail_div = applyStyle(document.createElement('div'), 'topUiOptionsDetail');
        schema[main_label].forEach(([detail, func]) => {
            const detail_checkbox = _createCheckbox(detail, false);
            detail_checkbox.onchange = (e) => func(e.target.checked);
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
