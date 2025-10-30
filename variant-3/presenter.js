class TripPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.view.setPresenter(this);
        this.init();
    }

    init() {
        this.updateView();
       
        this.view.tripForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        this.view.dateFilter.addEventListener('change', () => {
            this.handleFilterChange();
        });

        this.view.completedFilter.addEventListener('change', () => {
            this.handleFilterChange();
        });

        this.model.addListener(() => {
            this.updateView();
        });
    }

    handleFormSubmit() {
        try {
            const formData = this.view.getFormData();
            
            if (!formData.destination || !formData.date) {
                this.view.showError('Пожалуйста, заполните все обязательные поля');
                return;
            }

            const editingTripId = this.view.getEditingTripId();
            
            if (editingTripId) {
        
                this.model.updateTrip(editingTripId, formData);
            } else {
            
                this.model.addTrip(formData);
            }

            this.view.resetForm();
        } catch (error) {
            this.view.showError('Ошибка при сохранении поездки: ' + error.message);
        }
    }

    handleDeleteTrip(tripId) {
        if (confirm('Вы уверены, что хотите удалить эту поездку?')) {
            this.model.removeTrip(tripId);
        }
    }

    handleFilterChange() {
        this.updateView();
    }

    updateView() {
        let trips = this.model.getTrips();
        
        const dateFilter = this.view.dateFilter.value;
        if (dateFilter) {
            trips = this.model.filterTripsByDate(dateFilter);
        }
        
        const completedOnly = this.view.completedFilter.checked;
        if (completedOnly) {
            trips = this.model.filterTripsByStatus(completedOnly);
        }
        
        this.view.displayTrips(trips);
    }

    getTripById(id) {
        return this.model.getTrips().find(trip => trip.id === id);
    }
}