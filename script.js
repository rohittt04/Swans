const sendButton = document.querySelector('.send-button');
const messageInput = document.querySelector('.message-input');
const messageContainer = document.querySelector('.message-container');
const contactList = document.querySelector('.contact-list ul');
const chatHeaderRecipientName = document.querySelector('.recipient-info span');
const contactItems = document.querySelectorAll('.contact');

// Function to add a message to the chat
function addMessage(text, isSent) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isSent ? 'sent' : 'received');
    messageDiv.textContent = text;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to bottom
}

// Function to simulate receiving a response based on the sent message
function generateResponse(sentMessage) {
    const lowerCaseMessage = sentMessage.toLowerCase();
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return "Hello there!";
    } else if (lowerCaseMessage.includes('how are you')) {
        return "I'm doing well, thank you for asking!";
    } else if (lowerCaseMessage.includes('what is') || lowerCaseMessage.includes('tell me about')) {
        return "That's an interesting question! Unfortunately, I don't have real-time access to external knowledge.";
    } else if (lowerCaseMessage.includes('thank you')) {
        return "You're welcome!";
    } else if (lowerCaseMessage.includes('code')) {
        return "Ah, you're talking about code! What kind of code are you working on?";
    } else {
        return "Interesting! Tell me more.";
    }
}

// Event listener for sending a message
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        addMessage(messageText, true);
        // In a real application, you would send this message to the server here
        messageInput.value = '';
        // Simulate a received response based on the sent message
        setTimeout(() => {
            const response = generateResponse(messageText);
            simulateReceive(response);
        }, Math.random() * 1000 + 500); // Simulate varying response times
    }
});

// Event listener for pressing Enter in the input field
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click(); // Trigger the send button click
    }
});

// Event listeners for contact selection
contactItems.forEach(contact => {
    contact.addEventListener('click', () => {
        // Remove active class from other contacts
        contactItems.forEach(c => c.classList.remove('active'));
        // Add active class to the clicked contact
        contact.classList.add('active');
        // Update chat header (you'll need to get the contact name dynamically)
        const contactName = contact.querySelector('span').textContent;
        chatHeaderRecipientName.textContent = contactName;
        // In a real application, you would load messages for this contact here
        messageContainer.innerHTML = ''; // Clear previous messages (for now)
        addMessage(`Chatting with ${contactName}...`, false); // Just a placeholder
        // Simulate an initial response when a contact is selected
        setTimeout(() => {
            simulateReceive(`Hello ${contactName}! How can I assist you?`);
        }, 750);
    });
});

// Basic function to simulate receiving a message
function simulateReceive(text) {
    addMessage(text, false);
}

// Initial "received" message (you'd replace this with actual logic)
setTimeout(() => {
    simulateReceive("Welcome to the chat!");
}, 500);