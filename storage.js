function getPlanIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan_id');
    return planId;
}

function saveToLocalStorage() {
    localStorage.setItem(getPlanIdFromUrl(), JSON.stringify({
        selected: SELECTED,
    }));
}

function loadFromLocalStorage() {
    const planId = getPlanIdFromUrl();
    const plan = JSON.parse(localStorage.getItem(planId));
    if (plan) {
        SELECTED = plan.selected;
    }
}
