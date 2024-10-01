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
    return items;
}
