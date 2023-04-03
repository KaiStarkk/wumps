let wakeButton, sleepButton, statusIndicator, toast, toastBody;

function sendPacket(endpoint, successMessage) {
    const macAddress = document.getElementById('mac-address').value;
    updateStatus();
    fetch(`/api/${endpoint}/${macAddress}`)
        .then(parseJSON)
        .then((data) => {
            if (data.result) {
                showToast(successMessage);
            } else {
                showToast(
                    data.error || 'An error occurred while sending the packet.'
                );
            }
        })
        .catch(() =>
            showToast('Failed to send the packet. Check your connection.')
        );
}

function updateStatus() {
    const hostIP = document.getElementById('hostIP').value;
    statusIndicator.innerText = '...';
    statusIndicator.classList.remove('bg-danger', 'bg-success', 'bg-warning');
    fetch(`/api/state/ip/${hostIP}`)
        .then(parseJSON)
        .then((data) => {
            if (data.error) {
                statusIndicator.innerText = 'Error';
                statusIndicator.classList.add('bg-danger');
                showToast(data.error);
            } else {
                statusIndicator.innerText = data.status;
                if (data.status === 'awake') {
                    statusIndicator.classList.add('bg-success');
                } else {
                    statusIndicator.classList.add('bg-warning');
                }
            }
        })
        .catch(() => {
            statusIndicator.innerText = 'Error';
            statusIndicator.classList.add('bg-danger');
            showToast('Failed to update the status. Check your connection.');
        });
}

function showToast(message) {
    toastBody.innerText = message;
    toast.show();
}

// Helper function
function parseJSON(response) {
    return response.text().then((text) => {
        return text ? JSON.parse(text) : {};
    });
}

function init() {
    const wakeButton = document.getElementById('wake-button');
    const sleepButton = document.getElementById('sleep-button');
    const toggleFormBtn = document.getElementById('toggle-form-btn');
    const configForm = document.getElementById('config-form');
    statusIndicator = document.getElementById('status-indicator');
    toast = new bootstrap.Toast(document.getElementById('toast'));
    toastBody = document.getElementById('toast-body');

    wakeButton.addEventListener('click', () =>
        sendPacket('wol', 'Wake packet sent.')
    );
    sleepButton.addEventListener('click', () =>
        sendPacket('sol', 'Sleep packet sent.')
    );

    toggleFormBtn.addEventListener('click', () => {
        configForm.classList.toggle('d-none');
    });

    updateStatus();
    setInterval(updateStatus, 8000);
}

document.addEventListener('DOMContentLoaded', init);

$(function () {
    // Handle form submission
    $('#config-form').submit(function (event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Serialize form data
        var formData = $(this).serialize();

        // Submit form using AJAX
        $.ajax({
            type: 'POST',
            url: '/save',
            data: formData,
            success: function (data) {
                // Handle successful form submission here
                console.log('Form submitted successfully');
            },
            error: function (xhr, status, error) {
                // Handle form submission error here
                console.error('Form submission failed: ' + error);
            },
        });
    });
});
