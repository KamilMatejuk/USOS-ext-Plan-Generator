const urlParams = new URLSearchParams(window.location.search);
const action = urlParams.get('_action');
if (action == 'home/plany/pokaz') {

    FULL_PLAN = readPlan(); // from read_plan.js
    // console.table(FULL_PLAN);
    
    SELECTED = [];
    loadFromLocalStorage();
    
    renderTopUI(); // from add_options.js
    editTimetableUI(); // from edit_timetable.js

}
