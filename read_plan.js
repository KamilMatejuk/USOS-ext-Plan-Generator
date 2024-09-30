function _getHourFromStyle(element, label) {
    const time = element.getAttribute('style').match(new RegExp(`${label}:\\s*g(\\d{4})`))[1];
    return time.substring(0, 2) + ':' + time.substring(2);
}

function _getTypeFromInfoSlot(element) {
    return element.querySelector('div[slot="info"]').textContent.split(',')[0];
}

function _getGroupFromInfoSlot(element) {
    return parseInt(element.querySelector('div[slot="info"]').textContent.match(/gr\.\s*(\d+)/)[1]);
}

function _groupByKey(items, key) {
    const new_items = {}
    const unique_values = Array.from(new Set(items.map(i => i[key]))).sort();
    unique_values.forEach(v => {
        new_items[v] = items.filter(i => i[key] == v).map(obj => {
            const { [key]: _, ...newObj } = obj;
            return newObj;
        });
    })
    return new_items;
}

function _groupPlan(plan) {
    const by_name = _groupByKey(plan, 'name');
    const by_name_and_type = Object.fromEntries(Object.entries(by_name).map(([k, v]) => [k, _groupByKey(v, 'type')]));
    return by_name_and_type;
}

function readPlan() {
    const table = document.getElementsByTagName('usos-timetable')[0];
    const items = [];
    Array.from(table.children).forEach(column => {
        const day_name = column.children[0].textContent;
        const day_items = column.children[1].getElementsByTagName('timetable-entry');
        Array.from(day_items).forEach(item => {
            let i = {
                'day': day_name,
                'time_start': _getHourFromStyle(item, 'grid-row-start'),
                'time_end': _getHourFromStyle(item, 'grid-row-end'),
                'name': item.getAttribute('name'),
                'code': item.getAttribute('name-id'),
                'type': _getTypeFromInfoSlot(item),
                'group': _getGroupFromInfoSlot(item),
            }
            i.id = `${i.code}_${i.type}_${i.group}`;
            item.setAttribute('id', i.id);
            items.push(i);
        });
    });
    return _groupPlan(items);
}
