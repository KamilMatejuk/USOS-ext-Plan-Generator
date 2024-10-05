FULL_PLAN = readPlan(); // from read_plan.js
console.table(FULL_PLAN);

OPTIONS = {
    'expand': false,
    'simplify': false,
}

renderTopUI(); // from add_options.js
editTimetableUI(); // from edit_timetable.js
