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

function _generateDownload() {
    // https://fontawesome.com/icons/file-arrow-down?f=classic&s=solid
    const svg = applyStyle(document.createElementNS('http://www.w3.org/2000/svg', 'svg'), 'topUiDownload');
    svg.setAttribute('viewBox', '0 0 384 512');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z');
    svg.appendChild(path);
    svg.id = 'usos-ext-download';
    // download on click
    svg.onclick = () => {
        const headers = ['code', 'name', 'type', 'group', 'day', 'time'];
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        SELECTED.map(id => FULL_PLAN.filter(fp => fp.id == id)[0])
                .filter(fp => fp)
                .sort((a, b) => a.name.localeCompare(b.name) || a.type.localeCompare(b.type))
                .forEach(item => {
                    const row = headers.map(header => item[header]);
                    csvContent += row.join(',') + '\n';
                });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'plan.csv');
        document.body.appendChild(link);
        link.click();
    }
    return svg;
}

function _generateSelected() {
    // classes
    const container = document.getElementById('usos-ext-selected-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    SELECTED.map(id => FULL_PLAN.filter(fp => fp.id == id)[0])
            .filter(fp => fp)
            .sort((a, b) => a.name.localeCompare(b.name) || a.type.localeCompare(b.type))
            .forEach(item => {
        ['name', 'type', 'group', 'day', 'time'].forEach(attr => {
            const cell = applyStyle(document.createElement('div'), 'topUiSelectedCell');
            cell.innerText = item[attr];
            container.appendChild(cell);
        });
    });
    // icon
    const download = document.getElementById('usos-ext-download');
    applyStyle(download, SELECTED.length ? 'topUiDownloadActive' : 'topUiDownloadInactive');
    // title
    const all = new Set(FULL_PLAN.map(fp => `${fp.name} ${fp.type}`));
    const title = document.getElementById('usos-ext-selected-header');
    title.innerText = `Wybrane przedmioty (${SELECTED.length}/${all.size})`;
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
    if (FULL_PLAN.length) {
        const header_options = applyStyle(document.createElement('p'), 'topUiHeader');
        header_options.innerText = 'Ustawienia';
        contents.appendChild(header_options);
        contents.appendChild(_generateOptions());
        const header_selected = applyStyle(document.createElement('p'), 'topUiHeader');
        header_selected.id = 'usos-ext-selected-header';
        contents.appendChild(header_selected);
        contents.appendChild(_generateDownload());
        const selected = applyStyle(document.createElement('div'), 'topUiSelectedContainer');
        selected.id = 'usos-ext-selected-container';
        contents.appendChild(selected);
    } else {
        const header_error = document.createElement('p');
        header_error.innerText = 'Nie udało się załadować planu. Sproboń ponownie później.';
        contents.appendChild(header_error);
    }
    container.appendChild(contents);
    parent.children[1].insertAdjacentElement('afterend', container);
    if (FULL_PLAN.length) { _generateSelected(); }
}
