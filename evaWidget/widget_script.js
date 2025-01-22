<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EVA Widget</title>
    <link rel="stylesheet" href="./widgetStyle.css">

</head>
<body>
    <div class="container">
        <h1>Paddy Power EVA Widget</h1>
        
        <!-- Dropdown of actions -->

        <label for="actions">Choose an option:</label>
        <select id="actions">
            <option value="" disabled selected>Select an action</option>
            <option value="removeCard">Remove Card</option>
            <option value="statementRequest">Statement Request</option>
            <option value="voidBet">Void Bet</option>
            <option value="removeWallet">Remove eWallet</option>
            <option value="cancelDeposit">Cancel Deposit</option>
        </select>

        <!-- Common Input Fields -->
        <div class="input-fields" id="commonFields">
            <label for="brand">Brand:</label>
            <select id="brand" name="brand" required>
                <option value="" disabled selected>Select Brand</option>
                <option value="PP">PP</option>
                <option value="BF">BF</option>
                <option value="SBG">SBG</option>
            </select>

            <label for="accountId">Account ID:</label>
            <input type="text" id="accountId" name="accountId" pattern="\d{4,8}" maxlength="8" placeholder="Enter Customer Account ID" required title="Account ID must be between 4 and 8 digits">
            <input type="text" id="conversationId" name="conversationId" placeholder="Enter Conversation ID" required title="Please enter the LivePerson conversation ID">
        </div>


        <!-- Remove Card Input Fields -->

        <div class="input-fields" id="removeCardFields">

            <label for="cardLast4">Last 4 Digits of Card:</label>
            <input type="text" id="cardLast4" name="cardLast4" maxlength="4" pattern="\d{4}" placeholder="Enter 4 digits" required title="Last 4 digits of card must be numeric and 4 digits long">

            <label for="reasonForRemoval">Reason For Removal:</label>
            <select id="reasonForRemoval" name="reasonForRemoval" required>
                <option value="" disabled selected>Select Reason</option>
                <option value="Lost/Stolen">Lost/Stolen</option>
                <option value="Expired">Expired</option>
                <option value="Removing a Card to Add a New One">Removing a Card to Add a New One</option>
                <option value="Something Else">Something Else</option>
            </select>

            <label for="POF">Proof of Funds Received:</label>
            <select id="POF" name="POF" required>
                <option value="" disabled selected>Yes/No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <label for="ApplePay">Linked to Apple Pay:</label>
            <select id="ApplePay" name="ApplePay" required>
                <option value="" disabled selected>Yes/No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

        </div>


        <!-- Statement Request Input Fields -->

        <div class="input-fields" id="statementRequestFields">

            <label for="StatementType">Statement Type:</label>
            <select id="StatementType" name="StatementType" required>
                <option value="" disabled selected>Select statement type</option>
                <option value="Deposits & Withdrawals">Deposits & Withdrawals</option>
                <option value="Full customer statement">Full customer statement</option>
                <option value="Statement of bets">Statement of bets</option>
            </select>

            <label for="StatementPeriod">Statement Period:</label>
            <select id="StatementPeriod" name="StatementPeriod" required>
                <option value="" disabled selected>Select statement period</option>
                <option value="Since account creation">Since account creation</option>
                <option value="Specific Dates">Specific Dates</option>
            </select>

        </div>

        <div class="input-fields" id="dates">
            <label for="start">Start date:</label>
            <input type="date" id="start" name="trip-start" max="2030-12-31" />

            <label for="end">End date:</label>
            <input type="date" id="end" name="trip-end" max="2030-12-31" />
        </div>


        <!-- Void Bet Input Fields -->

        <div class="input-fields" id="voidBetFields">

            <label for="betID">Bet ID:</label>
            <input type="text" id="betID" name="betID" maxlength="20" pattern="\bO\/\d{7,8}\/\d{7}\b" placeholder="Enter the bet ID" required title="Please enter the bet ID in the right format">      

        </div>

        <!-- Remove eWallet Request Input Fields -->

        <div class="input-fields" id="removeWalletFields">

            <label for="WalletType">Statement Type:</label>
            <select id="WalletType" name="WalletType" required>
                <option value="" disabled selected>Select wallet type</option>
                <option value="PayPal">PayPal</option>
                <option value="Neteller">Neteller</option>
                <option value="Moneybookers">Moneybookers</option>
                <option value="Much Better">Much Better</option>
                <option value="Skrill">Skrill</option>
                <option value="AstroPayBank">AstroPayBank</option>
                <option value="AstroPayOneTouch">AstroPayOneTouch</option>
            </select>

            <label for="POF2">Proof of Funds Received:</label>
            <select id="POF2" name="POF2" required>
                <option value="" disabled selected>Yes/No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

        </div>


        <!-- Cancel Deposit Request Input Fields -->

        <div class="input-fields" id="removeTransactionFields">

            <label for="ingoreTransactions">Ignore Transactions?</label>
            <select id="ingoreTransactions" name="ingoreTransactions" required>
                <option value="" disabled selected>Yes/No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

        </div>

        <div class="input-fields" id="transactionIdFields">
            <label for="transactionID">Transaction ID:</label>
            <input type="text" id="transactionID" name="transactionID" maxlength="20" pattern="\bO\/\d{7,8}\/\d{7}\b" placeholder="Enter the transaction ID" required title="Please enter the transaction ID in the right format"> 
        </div>


        <!-- Submit Button -->
        <button id="submitButton" style="display: none;">Submit</button>
    </div>

    <script type="text/javascript" src="./widget_script.js"></script>

</body>
</html>
