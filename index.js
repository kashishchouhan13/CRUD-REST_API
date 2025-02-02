const API_URL = 'http://localhost:4000/students'; // Replace this with your API URL

// Show and Hide Sections
function showAddData() {
    document.getElementById('addDataSection').style.display = 'block';
    document.getElementById('showDataSection').style.display = 'none';
    document.getElementById('updateDataSection').style.display = 'none';
}

function showShowData() {
    document.getElementById('addDataSection').style.display = 'none';
    document.getElementById('showDataSection').style.display = 'block';
    document.getElementById('updateDataSection').style.display = 'none';
    fetchData();
}

function showUpdateData() {
    document.getElementById('addDataSection').style.display = 'none';
    document.getElementById('showDataSection').style.display = 'none';
    document.getElementById('updateDataSection').style.display = 'block';
    fetchStudentOptions();
}

// Add new student
document.getElementById('addButton').addEventListener('click', () => {
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;
    const address = document.getElementById('inputAddress').value;

    // Validate inputs
    const errorMessage = validateInputs(name, email, phone, address);
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    const newStudent = { name, email, phone, address };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Failed to add student');
            });
        }
        return response.json();
    })
    .then(() => {
        showShowData();  // Refresh the student list
        clearInputs();
    })
    .catch(error => alert(error.message));
});

// Validate inputs
function validateInputs(name, email, phone, address) {
    if (!name || !email || !phone || !address) {
        return "All fields are required.";
    }
    if (!validateEmail(email)) {
        return "Please enter a valid email address.";
    }
    if (!/^\d{10}$/.test(phone)) { // Validate phone number format
        return "Phone number must be 10 digits long.";
    }
    return null; // No errors
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return re.test(String(email).toLowerCase());
}

// Fetch all students and show them
function fetchData() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('dataList');
            dataList.innerHTML = ''; // Clear the table body

            data.forEach(student => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.address}</td>
                    <td>
                        <button onclick="deleteData('${student._id}')">Delete</button>
                    </td>
                `;
                dataList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Delete student based on ID
function deleteData(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete student: ' + response.statusText);
        }
        return response.json();
    })
    .then(() => fetchData())  // Refresh the student list
    .catch(error => alert(error.message));
}

// Fetch options for updating student
function fetchStudentOptions() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const updateSelect = document.getElementById('updateSelect');
            updateSelect.innerHTML = '<option value="">Select a student</option>';  // Reset options

            data.forEach(student => {
                let option = document.createElement('option');
                option.value = student._id;
                option.textContent = student.name;
                updateSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching student options:', error));
}

// Fetch student data to update
function fetchUpdateData() {
    const studentId = document.getElementById('updateSelect').value;

    if (!studentId) return;

    fetch(`${API_URL}/${studentId}`)
        .then(response => response.json())
        .then(student => {
            document.getElementById('updateName').value = student.name;
            document.getElementById('updateEmail').value = student.email;
            document.getElementById('updatePhone').value = student.phone;
            document.getElementById('updateAddress').value = student.address;
        })
        .catch(error => console.error('Error fetching student data:', error));
}

// Update student data
document.getElementById('updateButton').addEventListener('click', () => {
    const studentId = document.getElementById('updateSelect').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const phone = document.getElementById('updatePhone').value;
    const address = document.getElementById('updateAddress').value;

    // Validate inputs
    const errorMessage = validateInputs(name, email, phone, address);
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    const updatedStudent = { name, email, phone, address };

    fetch(`${API_URL}/${studentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Failed to update student');
            });
        }
        return response.json();
    })
    .then(() => {
        showShowData();  // Refresh the student list
    })
    .catch(error => alert(error.message));
});

// Clear input fields after adding or updating
function clearInputs() {
    document.getElementById('inputName').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputPhone').value = '';
    document.getElementById('inputAddress').value = '';
}

// Initial fetch of data
showShowData();