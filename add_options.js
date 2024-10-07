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

function _getCheckboxId(text) {
    return `checkbox-${text}`.replace(' ', '-').toLowerCase();
}

function _createCheckbox(text, state) {
    const div = document.createElement('div');
    const checkbox = applyStyle(document.createElement('input'), 'topUiCheckbox');
    checkbox.type = 'checkbox';
    checkbox.id = _getCheckboxId(text);
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
        'pełny ekran (5)': [
            ['maksymalizacja szerokości strony', toogleExpandMaximizePageWidth],
            ['maksymalizacja szerokości planu', toogleExpandMaximizePlanWidth],
            ['ukryte lewe menu', toogleExpandHideLeftMenu],
            ['ukryty wybór formatu', toogleExpandHideFormatChoice],
            ['ukryty wybór czasu', toogleExpandHideTimeChoice],
        ],
        'uproszczony widok (4)': [
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
            detail_checkbox.onchange = (e) => {
                func(e.target.checked)
                if (!e.target.checked) {
                    document.getElementById(_getCheckboxId(main_label)).checked = false;
                }
            };
            detail_div.appendChild(detail_checkbox);
        });
        main_checkbox.onchange = (e) => {
            schema[main_label].forEach(([detail, func]) => {
                func(e.target.checked);
                document.getElementById(_getCheckboxId(detail)).checked = e.target.checked;
            });
        }
        main_div.append(detail_div);
        div.append(main_div);
    });
    return div;
}

function updateSummaryIcon(details) {
    const summary = details.querySelector('summary');
    const icon_open = '▼';
    const icon_closed = '▶';
    const [icon_old, icon_new] = details.open ? [icon_closed, icon_open] : [icon_open, icon_closed];
    if (summary.textContent.startsWith(icon_old)) {
        summary.textContent = icon_new + summary.textContent.slice(1);
    } else {
        summary.textContent = icon_old + ' ' + summary.textContent;
    }
}

function renderTopUI() {
    const parent = document.querySelector('div.usos-ui');
    const container = applyStyle(document.createElement('details'), 'topUiDetails');
    container.setAttribute('open', '');
    container.addEventListener('toggle', () => updateSummaryIcon(container));
    // summary
    const summary = applyStyle(document.createElement('summary'), 'topUiSummary');
    summary.innerText = 'Generator Planu USOS'
    container.appendChild(summary);
    updateSummaryIcon(container);
    // contents
    const contents = applyStyle(document.createElement('div'), 'topUiContents');
    const header_options = applyStyle(document.createElement('p'), 'topUiHeader');
    header_options.innerText = 'Ustawienia';
    contents.appendChild(header_options);
    contents.appendChild(_generateOptions());
    container.appendChild(contents);
    parent.children[1].insertAdjacentElement('afterend', container);
}
