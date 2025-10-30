
const mockTrips = [
    {
        id: 1,
        destination: "Canada",
        date: "2024-05-15",
        notes: "gonna be a great trip",
        status: "Planned"
    },
    {
        id: 2,
        destination: "London",
        date: "2024-06-20",
        notes: "man dem",
        status: "Completed"
    },
    {
        id: 3,
        destination: "Nigeria",
        date: "2024-07-10",
        notes: "home sweet home",
        status: "Planned"
    }
];

let nextId = 4;
function generateId() {
    return nextId++;
}