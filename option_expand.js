function toogleExpand() {
    OPTIONS.expand = !OPTIONS.expand
    if (OPTIONS.expand) {
        document.getElementsByTagName('body')[0].style.overflowX = 'hidden'
        document.getElementsByTagName('usos-layout')[0].style.maxWidth = '100%'
        document.getElementsByTagName('usos-layout')[0].style.minWidth = '100%'
        document.querySelectorAll('div.timetable-wrapper > usos-frame')[1].style.display = 'none'
        document.getElementsByTagName('menu-left')[0].style.display = 'none'
        document.getElementById('layout-main-content').style.width = '98vw'
        document.getElementById('layout-main-content').style.margin = '1vw'
        document.querySelectorAll('div.timetable-wrapper')[0].style.maxWidth = '100%'
    } else {
        document.getElementsByTagName('body')[0].style.overflowX = 'auto'
        document.getElementsByTagName('usos-layout')[0].style.maxWidth = '1200px'
        document.getElementsByTagName('usos-layout')[0].style.minWidth = '1200px'
        document.querySelectorAll('div.timetable-wrapper > usos-frame')[1].style.display = 'block'
        document.getElementsByTagName('menu-left')[0].style.display = 'block'
        document.getElementById('layout-main-content').style.width = '880px'
        document.getElementById('layout-main-content').style.margin = '40px'
        document.querySelectorAll('div.timetable-wrapper')[0].style.maxWidth = '880px'
    }
}
