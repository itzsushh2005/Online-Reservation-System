// Dummy login data
const validLoginId = "admin";
const validLoginPassword = "admin123";

// Train database
const trains = {
    "101": "Rajdhani Express",
    "102": "Shatabdi Express",
    "103": "Duronto Express",
    "104": "Intercity Express"
};

// LOGIN FUNCTION
function login() {
    let id = document.getElementById("loginId").value;
    let pass = document.getElementById("loginPassword").value;

    if (id === validLoginId && pass === validLoginPassword) {
        alert("Login Successful!");
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("reservationSection").classList.remove("hidden");
        document.getElementById("cancelSection").classList.remove("hidden");
    } else {
        alert("Invalid Login!");
    }
}

// AUTO-FILL TRAIN NAME
function autoFillTrainName() {
    let trainNo = document.getElementById("trainNo").value;
    document.getElementById("trainName").value = trains[trainNo] || "";
}

// RESERVATION FUNCTION
function reserveTicket() {
    let name = document.getElementById("passengerName").value;
    let age = document.getElementById("age").value;
    let trainNo = document.getElementById("trainNo").value;
    let trainName = document.getElementById("trainName").value;
    let classType = document.getElementById("classType").value;
    let date = document.getElementById("journeyDate").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (!name || !age || !trainNo || !trainName || !classType || !date || !from || !to) {
        alert("Please fill all fields!");
        return;
    }

    let pnr = Math.floor(Math.random() * 9000000000) + 1000000000;

    let ticket = {
        pnr,
        name,
        age,
        trainNo,
        trainName,
        classType,
        date,
        from,
        to
    };

    localStorage.setItem(pnr, JSON.stringify(ticket));

    alert(`Ticket Reserved Successfully!\nPNR: ${pnr}`);
}

// SEARCH FOR PNR
function searchPNR() {
    let pnr = document.getElementById("cancelPNR").value;

    let ticket = localStorage.getItem(pnr);

    if (!ticket) {
        alert("PNR Not Found!");
        return;
    }

    let data = JSON.parse(ticket);

    document.getElementById("pnrDetails").classList.remove("hidden");
    document.getElementById("pnrDetails").innerHTML = `
        <h3>PNR Details</h3>
        Name: ${data.name}<br>
        Train: ${data.trainNo} - ${data.trainName}<br>
        Date: ${data.date}<br>
        From: ${data.from}<br>
        To: ${data.to}
    `;

    document.getElementById("confirmCancelBtn").classList.remove("hidden");
}

// CANCEL TICKET
function cancelTicket() {
    let pnr = document.getElementById("cancelPNR").value;
    localStorage.removeItem(pnr);
    alert("Ticket Cancelled Successfully!");
    location.reload();
}
