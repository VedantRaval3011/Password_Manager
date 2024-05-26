window.onload = function() {
    if (document.getElementById('tableBody').childElementCount === 0) {
        defaultMessage();
    }
}

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
if (validateForm()) {
    const password = document.getElementById('password').value;
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;

    const newRow = document.createElement('tr')
    
    //create and append the table row data for website in the new row
    const websiteCell = document.createElement('td')
    websiteCell.textContent = website
    newRow.appendChild(websiteCell)

    //create and append the table row data for username in the new row
    const usernameCell = document.createElement('td')
    usernameCell.textContent = username
    newRow.appendChild(usernameCell)

    //create and append the table row data for password in the new row
    const passwordCell = document.createElement('td')
    passwordCell.textContent = password
    newRow.appendChild(passwordCell)

    //create and append the table row data for action buttons in the new row
    //for delete button
    const actionButtonCell = document.createElement('td')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"
    deleteButton.classList.add('delete-btn');
    actionButtonCell.classList.add('action-btn')
    actionButtonCell.appendChild(deleteButton)
    deleteButton.addEventListener('click', function() {
        newRow.remove();
        if (document.getElementById('tableBody').childElementCount === 0) {
        defaultMessage();
    }
    })

    //for copy button
    const copyButton = document.createElement('button')
    copyButton.classList.add('copy-btn')
    copyButton.innerHTML = '<i class="fa-solid fa-copy"></i>'
    actionButtonCell.appendChild(copyButton)
    copyButton.addEventListener('click', function(){
        copyPassword(passwordCell.textContent)
    })

    newRow.appendChild(actionButtonCell)
    

    document.querySelector('tbody').appendChild(newRow);
    // Clear form fields
    document.getElementById('passwordForm').reset();
    removeMessage();
}else{
    alert('Password must be at least 8 characters long and contain a mix of letters and numbers.');
}     
});

function validateForm() {
    const password = document.getElementById('password').value;
    
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
        return false;
    }
    return true;
}

function defaultMessage() {
    const message = document.querySelector('#message')
    message.innerHTML = `<p>Your data will appear here</p>` 
}

function removeMessage() {
    const message = document.querySelector('#message');
    message.innerHTML = ''; 
}

function copyPassword(text){
    const textArea = document.createElement('textarea')
    textArea.value = text;
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('PASSWORD COPIED')
}