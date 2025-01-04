const { isErrorResponse } = require('../utils/responseUtils');

// ...existing code...

function handleResponse(response) {
    if (isErrorResponse(response)) {
        // Handle error
        console.error('Error in response:', response.data.errors);
        return;
    }

    // ...existing code to handle successful response...
}

// ...existing code...
