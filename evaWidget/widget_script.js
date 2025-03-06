// Get DOM elements
const dropdown = document.getElementById('actions');
const removeCardFields = document.getElementById('removeCardFields');
const removeWalletFields = document.getElementById('removeWalletFields');
const statementRequestFields = document.getElementById('statementRequestFields');
const voidBetFields = document.getElementById('voidBetFields');
const removeTransactionFields = document.getElementById('removeTransactionFields');
const submitButton = document.getElementById('submitButton');
const StatementPeriod = document.getElementById('StatementPeriod');
const dates = document.getElementById('dates');
const ignoreTransactions = document.getElementById('ignoreTransactions');
const transactionIdFields = document.getElementById('transactionIdFields');
const commonFields = document.getElementById('commonFields');

// Function to toggle visibility of form fields
const toggleFields = (visibleField) => {
    const allFields = [
        removeCardFields, removeWalletFields, statementRequestFields,
        voidBetFields, removeTransactionFields
    ];

    allFields.forEach(field => {
        if (field) {
            field.style.display = (field === visibleField) ? 'block' : 'none';
        }
    });
};

// Function to reset form fields
const resetFields = () => {
    document.querySelectorAll('input, select').forEach(element => {
        if (element.type === 'checkbox' || element.type === 'radio') {
            element.checked = false;
        } else {
            element.value = '';
        }
    });
    toggleFields(null);
    commonFields.style.display = 'none';
    submitButton.style.display = 'none';
};

// Ensure event listeners are only added once
if (StatementPeriod) {
    StatementPeriod.addEventListener('change', function () {
        if (dates) dates.style.display = this.value === 'Specific Dates' ? 'block' : 'none';
    });
}

if (ignoreTransactions) {
    ignoreTransactions.addEventListener('change', function () {
        if (transactionIdFields) transactionIdFields.style.display = this.value === 'Yes' ? 'block' : 'none';
    });
}

// Event listener for dropdown selection change
dropdown.addEventListener('change', function () {
    const selectedOption = this.value;
    commonFields.style.display = 'block';

    let processName = '';

    switch (selectedOption) {
        case 'removeCard':
            processName = 'CS_VA_CardRemovals';
            toggleFields(removeCardFields);
            break;

        case 'statementRequest':
            processName = 'CS_Statement_Request';
            toggleFields(statementRequestFields);
            break;

        case 'voidBet':
            processName = 'CS_BetSettlement_VoidBet';
            toggleFields(voidBetFields);
            break;

        case 'removeWallet':
            processName = 'CS_VA_EWalletRemovals';
            toggleFields(removeWalletFields);
            break;

        case 'cancelDeposit':
            processName = 'Fraud_DepositsCancelations';
            toggleFields(removeTransactionFields);
            break;

        default:
            toggleFields(null);
            break;
    }

    submitButton.dataset.processName = processName;
    submitButton.style.display = processName ? 'inline-block' : 'none';
});

// Event listener for form submission
submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission
    
    const selectedOption = dropdown.value;
    const accountId = document.getElementById('accountId').value;
    const brand = document.getElementById('brand').value;
    const processName = submitButton.dataset.processName;
    let requestData = {};

    if (!processName) {
        alert('Invalid action selected.');
        return;
    }

    // Validate account ID (4 to 8 digits)
    if (!/^\d{4,8}$/.test(accountId)) {
        alert('Please enter a valid Account ID (4 to 8 digits).');
        return;
    }

    if (!brand) {
        alert('Please select a brand.');
        return;
    }

    switch (selectedOption) {
        case 'removeCard': {
            const cardLast4 = document.getElementById('cardLast4').value;
            const reasonForRemoval = document.getElementById('reasonForRemoval').value;
            const POF = document.getElementById('POF').value;
            const ApplePay = document.getElementById('ApplePay').value;
            const PaymentMethod = ApplePay === 'Yes' ? 'Apple Pay' : 'Debit Card';

            if (!/^\d{4}$/.test(cardLast4)) {
                alert('Please enter the Last 4 digits of the card (exactly 4 digits).');
                return;
            }
            if (!reasonForRemoval || !POF || !ApplePay) {
                alert('Please fill in all fields before submitting.');
                return;
            }

            requestData = {
                processName,
                AccountID: `${brand}_${accountId}`,
                Brand: brand,
                Channel: 'Co Pilot',
                ConversationID: window.conversationId,
                ReasonForCardRemoval: reasonForRemoval,
                PaymentMethod,
                Last4DigitsOfCard: cardLast4,
                POF_Received: POF,
            };
            break;
        }

        case 'statementRequest': {
            const StatementType = document.getElementById('StatementType').value;
            const startDate = document.getElementById('start').value;
            const endDate = document.getElementById('end').value;

            requestData = {
                processName,
                Reference: `${brand}_${accountId}`,
                AccountID: accountId,
                Brand: brand,
                Channel: 'Co Pilot',
                ConversationID: window.conversationId,
                Start_Date: startDate,
                End_Date: endDate,
                Statement_Type: StatementType
            };
            break;
        }

        case 'voidBet': {
            const betID = document.getElementById('betID').value;
            if (!/^O\/\d{7,8}\/\d{7}$/.test(betID)) {
                alert('Please enter the bet ID in the correct format.');
                return;
            }

            requestData = {
                processName,
                Reference: `${brand}_${accountId}`,
                AccountID: accountId,
                Brand: brand,
                Channel: 'Co Pilot',
                ConversationID: window.conversationId,
                BetID: betID
            };
            break;
        }

        case 'removeWallet': {
            const walletType = document.getElementById('WalletType').value;
            const POF = document.getElementById('POF2').value;

            requestData = {
                processName,
                Reference: `${brand}_${accountId}`,
                AccountID: accountId,
                Brand: brand,
                Channel: 'Co Pilot',
                ConversationID: window.conversationId,
                EWalletType: walletType,
                POF_Received: POF
            };
            break;
        }

        default:
            alert('Please select an action from the dropdown before submitting.');
            return;
    }

        // Uncomment to send the data
    /*
    fetch('https://your-api-endpoint.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
    */

    // Reset fields after submission
    resetFields();
    
    alert('Action is running. Please wait for response.');
    console.log('HTTP Request Body:', JSON.stringify(requestData));
});
