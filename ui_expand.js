CURRENT_STATE_EXPANDED = true


EXTEND_ELEMENTS = [
    // make overall wider
    { 'element': document.getElementsByTagName('body')[0], 'attr': 'overflow-x', 'value': 'hidden' },
    { 'element': document.getElementsByTagName('usos-layout')[0], 'attr': 'max-width', 'value': '100%' },
    { 'element': document.getElementsByTagName('usos-layout')[0], 'attr': 'min-width', 'value': '100%' },
    // remove unnecessary text around
    { 'element': document.querySelectorAll('div.timetable-wrapper > usos-frame')[1], 'attr': 'display', 'value': 'none' },
    // remove left menu
    { 'element': document.getElementsByTagName('menu-left')[0], 'attr': 'display', 'value': 'none' },
    // make table wider
    { 'element': document.getElementById('layout-main-content'), 'attr': 'width', 'value': '98vw' },
    { 'element': document.getElementById('layout-main-content'), 'attr': 'margin', 'value': '1vw' },
    { 'element': document.querySelectorAll('div.timetable-wrapper')[0], 'attr': 'max-width', 'value': '100%' },
];


// save original value
EXTEND_ELEMENTS.forEach(data => {
    data.original_value = window.getComputedStyle(data.element).getPropertyValue(data.attr)
});


function toogleExpand() {
    CURRENT_STATE_EXPANDED = !CURRENT_STATE_EXPANDED
    let key = (CURRENT_STATE_EXPANDED) ? 'original_value' : 'value'
    EXTEND_ELEMENTS.forEach(data => {
        let styleKey = data.attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase()); // e.g. max-width -> MaxWidth
        data.element.style[styleKey] = data[key];
    });
}
