const dropdown = document.getElementById('actions');
const removeCardFields = document.getElementById('removeCardFields');
const submitButton = document.getElementById('submitButton');
const StatementPeriod = document.getElementById('StatementPeriod');
const dates = document.getElementById('dates');

// Event listener for dropdown selection change
dropdown.addEventListener('change', function() {
    const selectedOption = this.value;
    commonFields.style.display = 'block';
    // Dynamically set the process name based on dropdown selection
    let processName = '';
    if (selectedOption === 'removeCard') {
        processName = 'CS_VA_CardRemovals';
        removeCardFields.style.display = 'block';
    } else if (selectedOption === 'statementRequest') {
        processName = 'Statement Request';
        statementRequestFields.style.display = 'block';
        StatementPeriod.addEventListener('change', function() {
            const selectedType = this.value;
            if (selectedType == "Specific Dates") {
                dates.style.display = 'block';
            } else{dates.style.display = 'none';}
        });
    } else if (selectedOption === 'voidBet') {
        processName = 'Void Bet';
        removeCardFields.style.display = 'none';
    }

    // Set the process name dynamically
    document.getElementById('submitButton').dataset.processName = processName;

    // Show or hide the submit button based on selection
    submitButton.style.display = (selectedOption && processName) ? 'inline-block' : 'none';
});

// Event listener for the submit button
submitButton.addEventListener('click', function() {
    const selectedOption = dropdown.value;
    const accountId = document.getElementById('accountId').value;
    const brand = document.getElementById('brand').value;
    const processName = submitButton.dataset.processName; // Get the dynamic process name
    var requestData;

    // Validate accountId (between 4 and 8 digits)
    const accountIdRegex = /^\d{4,8}$/;
    if (!accountId || !accountIdRegex.test(accountId)) {
        alert('Please enter a valid Account ID (between 4 and 8 digits).');
        return;
    }

    if (!brand) {
        alert('Please select a brand.');
        return;
    }




    // Validate required fields if "Remove Card" is selected
    if (selectedOption === 'removeCard') {

        // Remove Card Elements
        const cardLast4 = document.getElementById('cardLast4').value;
        const reasonForRemoval = document.getElementById('reasonForRemoval').value;
        const POF = document.getElementById('POF').value;
        const ApplePay = document.getElementById('ApplePay').value;
        var PaymentMethod;

        if (ApplePay == "Yes") {
            PaymentMethod = "Apple Pay";
        } else {
            PaymentMethod = "Debit Card";
        }

        // Validate Last 4 Digits of Card (4 digits required)
        const cardLast4Regex = /^\d{4}$/;
        if (!cardLast4 || !cardLast4Regex.test(cardLast4)) {
            alert('Please enter the Last 4 digits of the card (exactly 4 digits).');
            return;
        }
        if (!reasonForRemoval || !POF || !ApplePay) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        // Prepare the data to be sent in the body
        requestData = {
          "itemData": {
            "Name": processName,
            "Priority": "Normal",
            "Reference": brand + '_' + accountId,
            "SpecificContent": {
              "AccountID": accountId,
              "AccountID@odata.type": "#String",
              "Brand": brand,
              "Brand@odata.type": "#String",
              "Channel": "Co Pilot",
              "Channel@odata.type": "#String",
              "ConversationID": "tst",
              "ConversationID@odata.type": "#String",
              "ReasonForCardRemoval": reasonForRemoval,
              "ReasonForCardRemoval@odata.type": "#String",
              "PaymentMethod": PaymentMethod,
              "PaymentMethod@odata.type": "#String",
              "Last4DigitsOfCard": cardLast4,
              "Last4DigitsOfCard@odata.type": "#String",
              "POF_Received": POF,
              "POF_Received@odata.type": "#String"
            }
          }
        };

    } else if (selectedOption === 'statementRequest'){

        //Statement Request Elements
        const StatementType = document.getElementById('StatementType').value;
        var startDate = document.getElementById('start').value;
        var endDate = document.getElementById('end').value;

        // Prepare the data to be sent in the body
        requestData = {
          "itemData": {
            "Name": processName,
            "Priority": "Normal",
            "Reference": brand + '_' + accountId,
            "SpecificContent": {
              "AccountID": accountId,
              "AccountID@odata.type": "#String",
              "Brand": brand,
              "Brand@odata.type": "#String",
              "Channel": "Co Pilot",
              "Channel@odata.type": "#String",
              "ConversationID": "tst",
              "ConversationID@odata.type": "#String",
              "Start_Date": startDate,
              "Start_Date@odata.type": "#String",
              "End_Date": endDate,
              "End_Date@odata.type": "#String",
              "Statement_Type": StatementType,
              "Statement_Type@odata.type": "#String"
            }
          }
        };
    }

    else {
        alert('Please select "Remove Card" from the dropdown to submit.');
    }

    // Log the HTTP body to the console
    console.log('HTTP Request Body:', JSON.stringify(requestData));




    // Authenticate UIPath
    var Bearer;

    fetch('https://cloud.uipath.com/identity_/connect/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=d1eeff67-75c2-4d35-8e3d-f750f42628c8&client_secret=r^0y5tjLrz@qpTvN'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Authenitcation successful!');
        Bearer = data.access_token;
        console.log(Bearer);

        // Create Queue Item
        fetch('https://cloud.uipath.com/flutteruki/Dev/orchestrator_/odata/Queues/UiPathODataSvc.AddQueueItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Bearer,
                'X-UIPATH-OrganizationUnitId':'1244159',
                'Access-Control-Allow-Origin':'file:///Users/alex.murphy2/Desktop/EVA%20Widget/EVA_Widget_Test.html'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Queue item creation successful!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });


    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });


});