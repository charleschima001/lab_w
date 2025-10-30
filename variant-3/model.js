class TripModel {
    constructor() {
        this.trips = [...mockTrips];
        this.listeners = [];
    }

    addTrip(tripData) {
        const trip = {
            id: generateId(),
            ...tripData
        };
        this.trips.push(trip);
        this.notifyListeners();
        return trip;
    }

    removeTrip(id) {
        this.trips = this.trips.filter(trip => trip.id !== id);
        this.notifyListeners();
    }

    updateTrip(id, updatedData) {
        const tripIndex = this.trips.findIndex(trip => trip.id === id);
        if (tripIndex !== -1) {
            this.trips[tripIndex] = { ...this.trips[tripIndex], ...updatedData };
            this.notifyListeners();
            return this.trips[tripIndex];
        }
        return null;
    }

    getTrips() {
        return [...this.trips];
    }

    filterTripsByDate(date) {
        if (!date) return this.getTrips();
        return this.trips.filter(trip => trip.date === date);
    }

    filterTripsByStatus(completedOnly) {
        if (!completedOnly) return this.getTrips();
        return this.trips.filter(trip => trip.status === "Completed");
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.trips));
    }
}