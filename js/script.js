//Alert function to append alert to div
const alertNotification = (message) => {
    //Creating elements
    const alert = document.querySelector('.alert');
    const messageDiv = document.createElement('div');
    const alertDiv = document.createElement('div');
    const exitDiv = document.createElement('div');
   
    //Setting element properties
    messageDiv.textContent = message;
    messageDiv.className = 'message';

    alertDiv.textContent = 'Alert';
    alertDiv.className = 'aText';
    
    exitDiv.textContent = 'X';
    exitDiv.className = 'exit';
    exitDiv.style.cursor = 'pointer';

    //appending to alert
    alert.appendChild(alertDiv);
    alert.appendChild(messageDiv);
    alert.appendChild(exitDiv);
}; 

//Calling alertNotification, passing in lorem ipsum text
let message = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
alertNotification(message);

//Click listener for exit on alert
const alertDiv = document.querySelector('.alert');
alertDiv.addEventListener('click', e => {
    if(e.target.className.toLowerCase() === "exit") {
        removeSlideRight(alertDiv, 800);
    }
});

//Function for alert transition when exited
const removeSlideRight = ( element, speed ) => {
    var seconds = speed/1000;
    element.style.transition = "transform "+seconds+"s ease-in-out";

    element.style.transform = 'translateX(100vw)';
    setTimeout(function() {
        element.parentNode.removeChild(element);
    }, speed-100);
}


//Click listener for all traffic lis items
const traffic = document.querySelector('.traffic ul');
traffic.addEventListener('click', (e) => {
    const active = traffic.querySelector('.active');
    if(e.target.tagName === "A"){
        active.className = '';
        e.target.className = 'active';
    }
});

// Toggle Button 
const toggle = (toggleContainer) => {
    let toggleState = toggleContainer.getElementsByTagName('p')[0];
    if(toggleState.textContent.toLowerCase() === 'off') {
        toggleState.textContent = 'On';
        toggleContainer.style.backgroundColor = '#7477bf';
        toggleContainer.style.gridTemplateAreas = '"state circle"';
        return 'Off';
    } else {
        toggleState.textContent = 'Off';
        toggleContainer.style.backgroundColor = '#a7a7a7';
        toggleContainer.style.gridTemplateAreas = '"circle state"';
        return 'On';
    }
};

const toggleButton_1 = document.querySelector('.toggle-button_1');
let toggleState_1 = toggleButton_1.querySelector('.toggle-state');
if(localStorage.getItem('toggleButton_1')) {
    toggleState_1.textContent = localStorage.getItem('toggleButton_1');
} else {
    toggleState_1.textContent = 'On';
}
toggle(toggleButton_1);

toggleButton_1.addEventListener('click', (e) => {
    let toggleSetting = toggle(toggleButton_1);
    localStorage.setItem('toggleButton_1', toggleSetting);
});

const toggleButton_2 = document.querySelector('.toggle-button_2');
let toggleState_2 = toggleButton_2.querySelector('.toggle-state');
if(localStorage.getItem('toggleButton_2')) {
    toggleState_2.textContent = localStorage.getItem('toggleButton_2');
} else {
    toggleState_2.textContent = 'On';
}
toggleState_2.textContent = localStorage.getItem('toggleButton_2');
toggle(toggleButton_2);

toggleButton_2.addEventListener('click', (e) => {
    let toggleSetting = toggle(toggleButton_2);
    localStorage.setItem('toggleButton_2', toggleSetting);
});

// Messages Received 
const notification = document.querySelector('.bell');
const notificationState = notification.querySelector('div');

// Create notification
const createNotification = (message) => {
    const notificationDiv = document.createElement('div');
    const greenCircle = document.createElement('div');
    const notificationP = document.createElement('p');
    const exitButton = document.createElement('button');

    notificationDiv.className = 'notification';
    greenCircle.className = 'greenCircle';

    notificationP.textContent = message;
    exitButton.textContent = 'X';

    notificationDiv.appendChild(greenCircle);
    notificationDiv.appendChild(notificationP);
    notificationDiv.appendChild(exitButton);
    return notificationDiv;
};

//Adding messages to bell
const containerDiv = document.createElement('div');
containerDiv.className = 'notificationDiv';

containerDiv.appendChild(createNotification('You have 6 unread messages'));
containerDiv.appendChild(createNotification('You have 3 new followers'));
containerDiv.appendChild(createNotification('You password expires in 7 days'));

containerDiv.style.display = "none";
notificationState.appendChild(containerDiv);

notification.addEventListener('click', e => {
    if(notificationState.className.toLowerCase() === 'hasmessages') {
        containerDiv.style.display = "";
        notificationState.className = 'viewingMessages';

    } else if(notificationState.className.toLowerCase() === 'viewingmessages' 
    && e.target.parentNode.className === 'bell' 
    && containerDiv.querySelector('.notification')){
        containerDiv.style.display = "none";
        notificationState.className = 'hasMessages';
    }
});

//Deleting notifications
const notificationContainer = document.querySelector('.notificationDiv');
notificationContainer.addEventListener('click', e => {
    if(e.target.textContent.toLowerCase() === 'x') {
        removeUp(e.target.parentNode, 300);
    }
});

//Function for alert transition when exited
const removeUp = (element, speed) => {
    var seconds = speed/1000;
    element.style.overflow = 'hidden';
    element.style.transition = "max-height "+seconds+"s ease-in-out";

    element.style.maxHeight = '0';
    setTimeout(function() {
        element.parentNode.removeChild(element);
    }, speed);
}

// Messaging section
const user = document.querySelector('.message-user input');
const comment = document.querySelector('.message-user textarea'); 
const send = document.querySelector('.message-user button');

send.addEventListener('click', e => {
    e.preventDefault();
    console.log('user' + user.value + ' area' + comment.value);
    if (user.value === '' && comment.value === '') {
        alert('User and Message fields are empty');
    } else if(user.value === '') {
        alert('User field is empty');
    } else if(comment.value === '') {
        alert('Message field is empty');
    } else {
        alert(`Message successfully sent to ${user.value}`);
    }
});

// Names array
let names = ['Josh', 'Kurt', 'Angela', 'Avery', 'Mary'];

// Message-user autocomplete
const message_form = document.querySelector('.message-user form');
const message_input = message_form.querySelector('input');
const autocompleteDiv = message_form.querySelector('.autocomplete');
message_form.addEventListener('input', e => {
    if(e.target.tagName === "INPUT") {
        autocompleteDiv.style.display = 'block';
        autocompleteDiv.innerHTML = '';
        getSearches(names, e.target.value);
    }
});

const getSearches = (usernames, search) => {
    for(let i = 0; i < usernames.length; i++){
        if(usernames[i].toLowerCase().indexOf(search.toLowerCase()) !== -1){
            let userP = document.createElement('p');
            userP.textContent = usernames[i];
            userP.style.margin = '0';
            userP.style.padding = '5px';
            autocompleteDiv.appendChild(userP);
        }
    }
};

autocompleteDiv.addEventListener('click', e => {
    message_input.value = e.target.textContent;
    autocompleteDiv.style.display = 'none';
});


$('body').on('blur click', e => {
    autocompleteDiv.style.display = 'none';
    if(e.target.className === 'autoInput'){
        if(e.target.tagName === "P"){
            autocompleteDiv.style.display = '';
        }
    }
});

// Timezone localStorage
const timezone = document.querySelector('#timezone');

if(localStorage.getItem('timezone')){
    timezone.value = localStorage.getItem('timezone');
}

timezone.addEventListener('change', e => {
    localStorage.setItem('timezone', e.target.value);    
});





