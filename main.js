FULL_PLAN = readPlan() // from read_plan.js

if (CURRENT_STATE_EXPANDED) { toogleExpand(); } // from ui_expand.js
if (CURRENT_STATE_SIMPLIFIED) { toogleSimplify(); } // from ui_simplify.js

renderUI(); // from ui.js

document.documentElement.style.setProperty('--timetable-row-height', '0.5rem');

addSelectButtons(); // from ui_select.js
addHoverListeners(); // from ui_hover.js
