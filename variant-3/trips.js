
document.addEventListener('DOMContentLoaded', function() {
    const model = new TripModel();
    const view = new TripView();
    const presenter = new TripPresenter(model, view);
});