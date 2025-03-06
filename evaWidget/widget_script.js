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
        removeWalletFields.style.display = 'none';
        statementRequestFields.style.display = 'none';
        voidBetFields.style.display = 'none';
    } 
    else if (selectedOption === 'statementRequest') {
        processName = 'CS_Statement_Request';
        statementRequestFields.style.display = 'block';
        removeCardFields.style.display = 'none';
        voidBetFields.style.display = 'none';
        removeWalletFields.style.display = 'none';
        StatementPeriod.addEventListener('change', function() {
            const selectedType = this.value;
            if (selectedType == "Specific Dates") {
                dates.style.display = 'block';
            } else{dates.style.display = 'none';}
        });
    } 
    else if (selectedOption === 'voidBet') {
        processName = 'CS_BetSettlement_VoidBet';
        voidBetFields.style.display = 'block';
        removeCardFields.style.display = 'none';
        statementRequestFields.style.display = 'none';
        removeWalletFields.style.display = 'none';
    }
    else if (selectedOption === 'removeWallet') {
        processName = 'CS_VA_EWalletRemovals';
        voidBetFields.style.display = 'none';
        removeCardFields.style.display = 'none';
        statementRequestFields.style.display = 'none';
        removeWalletFields.style.display = 'block';
    }
    else if (selectedOption === 'cancelDeposit') {
        processName = 'Fraud_DepositsCancelations';
        voidBetFields.style.display = 'none';
        removeCardFields.style.display = 'none';
        statementRequestFields.style.display = 'none';
        removeWalletFields.style.display = 'none';
        removeTransactionFields.style.display = 'block';
        ingoreTransactions.addEventListener('change', function() {
            const selectedOption = this.value;
            if (selectedOption == "Yes") {
                transactionIdFields.style.display = 'block';
            } else{transactionIdFields.style.display = 'none';}
        });
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
    const conversationID = document.getElementById('conversationId').value;    
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

    if (!conversationID) {
        alert('Please enter a conversation ID.');
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
            "processName": processName,
            "AccountID": brand + '_' + accountId,
            "Brand": brand,
            "Channel": "Co Pilot",
            "ConversationID": window.conversationId,
            "ReasonForCardRemoval": reasonForRemoval,
            "PaymentMethod": PaymentMethod,
            "Last4DigitsOfCard": cardLast4,
            "POF_Received": POF,
        };

    } else if (selectedOption === 'statementRequest'){

        //Statement Request Elements
        const StatementType = document.getElementById('StatementType').value;
        var startDate = document.getElementById('start').value;
        var endDate = document.getElementById('end').value;

        // Prepare the data to be sent in the body
        requestData = {
            "processName": processName,
            "Reference": brand + '_' + accountId,
            "AccountID": accountId,
            "Brand": brand,
            "Channel": "Co Pilot",
            "ConversationID": window.conversationId,
            "Start_Date": startDate,
            "End_Date": endDate,
            "Statement_Type": StatementType           
        };
    } else if (selectedOption === 'voidBet'){

        //Statement Request Elements
        const betID = document.getElementById('betID').value;

        // Validate Last 4 Digits of Card (4 digits required)
        const betIdRegex = /^\bO\/\d{7,8}\/\d{7}\b$/;
        if (!betID || !betIdRegex.test(betID)) {
            alert('Please enter the bet ID in the correct format.');
            return;
        }

        // Prepare the data to be sent in the body
        requestData = {
            "processName": processName,
            "Reference": brand + '_' + accountId,
            "AccountID": accountId,
            "Brand": brand,
            "Channel": "Co Pilot",
            "ConversationID": window.conversationId,
            "BetID": betID     
        };
    } else if (selectedOption === 'removeWallet'){

        //Statement Request Elements
        const walletType = document.getElementById('WalletType').value;
        const POF = document.getElementById('POF2').value;

        // Prepare the data to be sent in the body
        requestData = {
            "processName": processName,
            "Reference": brand + '_' + accountId,
            "AccountID": accountId,
            "Brand": brand,
            "Channel": "Co Pilot",
            "ConversationID": window.conversationId,
            "EWalletType": walletType,  
            "POF_Received": POF    
        };
    } else if (selectedOption === 'cancelDeposit'){

        //Statement Request Elements
        const transactionID = document.getElementById('transactionID').value;
        const POF = document.getElementById('POF2').value;

        // Prepare the data to be sent in the body
        requestData = {
            "processName": processName,
            "Reference": brand + '_' + accountId,
            "AccountID": accountId,
            "Brand": brand,
            "Channel": "Co Pilot",
            "ConversationID": window.conversationId,
            "Ignore_Transaction": transactionID
        };
        
    }

    else {
        alert('Please select "Action" from the dropdown to submit.');
    }

    alert('Action is running. Please wait for response.');



    // Log the HTTP body to the console
    console.log('HTTP Request Body:', JSON.stringify(requestData));





    // // Send to Power Automate
    // fetch('https://prod-153.westeurope.logic.azure.com:443/workflows/5236e83c2ccb419b9a3b95c5f314d6df/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SyWdNRd97f7HsoMpUOoi_yeVug1wQT3k0tE3aI4rY4Y', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(requestData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);      
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     alert('An error occurred. Please try again.');
    // });

});
