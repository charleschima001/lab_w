class TripView {
    constructor() {
        this.tripForm = document.getElementById('trip-form');
        this.tripList = document.getElementById('trip-list');
        this.dateFilter = document.getElementById('date-filter');
        this.completedFilter = document.getElementById('completed-filter');
        
        this.presenter = null;
        this.editingTripId = null;
    }

    setPresenter(presenter) {
        this.presenter = presenter;
    }

    displayTrips(trips) {
        this.tripList.innerHTML = '';
        
        trips.forEach(trip => {
            const tripElement = this.createTripElement(trip);
            this.tripList.appendChild(tripElement);
        });
    }

    createTripElement(trip) {
        const li = document.createElement('li');
        li.className = `trip-item ${trip.status.toLowerCase()}`;
        
        li.innerHTML = `
            <div class="trip-info">
                <h3>${trip.destination}</h3>
                <p><strong>Дата:</strong> ${this.formatDate(trip.date)}</p>
                <p><strong>Заметки:</strong> ${trip.notes}</p>
                <p><strong>Статус:</strong> ${this.getStatusText(trip.status)}</p>
            </div>
            <div class="trip-actions">
                <button class="edit-btn" data-id="${trip.id}">Редактировать</button>
                <button class="delete-btn" data-id="${trip.id}">Удалить</button>
            </div>
        `;

        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            this.presenter.handleDeleteTrip(parseInt(e.target.dataset.id));
        });

        li.querySelector('.edit-btn').addEventListener('click', (e) => {
            this.showEditForm(parseInt(e.target.dataset.id));
        });

        return li;
    }

    showEditForm(tripId) {
        const trip = this.presenter.getTripById(tripId);
        if (!trip) return;

        this.editingTripId = tripId;
        
        document.getElementById('trip-destination').value = trip.destination;
        document.getElementById('trip-date').value = trip.date;
        document.getElementById('trip-notes').value = trip.notes;
      
        const statusRadio = document.querySelector(`input[name="trip-status"][value="${trip.status}"]`);
        if (statusRadio) statusRadio.checked = true;

        const submitButton = this.tripForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Обновить поездку';
    }

    resetForm() {
        this.tripForm.reset();
        this.editingTripId = null;
        const submitButton = this.tripForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Добавить поездку';
    }

    getFormData() {
        return {
            destination: document.getElementById('trip-destination').value,
            date: document.getElementById('trip-date').value,
            notes: document.getElementById('trip-notes').value,
            status: document.querySelector('input[name="trip-status"]:checked').value
        };
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }

    getStatusText(status) {
        return status === 'Planned' ? 'Запланировано' : 'Выполнено';
    }

    getEditingTripId() {
        return this.editingTripId;
    }

    showError(message) {
        alert(message);
    }
}