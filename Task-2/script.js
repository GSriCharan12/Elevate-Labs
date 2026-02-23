document.addEventListener('DOMContentLoaded', () => {
    // 1. Select DOM elements
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const dateDisplay = document.getElementById('date-display');

    // Display current date
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateDisplay.textContent = today.toLocaleDateString('en-US', options);

    // 2. Add Event Listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Check if list is empty initially
    checkEmptyState();

    // 3. Main Function to Add Task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!'); // Simple validation
            return;
        }

        // Create the task item
        const li = document.createElement('li');
        li.className = 'task-item animate-in'; // Add animation class

        li.innerHTML = `
            <div class="task-content">
                <span class="custom-checkbox"></span>
                <span class="task-text">${escapeHtml(taskText)}</span>
            </div>
            <button class="delete-btn" title="Delete Task">
                <i class="fas fa-trash"></i>
            </button>
        `;

        // 4. Append to list
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';
        taskInput.focus();

        // Update empty state
        checkEmptyState();

        // 5 & 6. Add functionality using Event Listeners on the new element
        // (Alternatively, we could use Event Delegation on the UL)
        
        // Toggle Complete
        const taskContent = li.querySelector('.task-content');
        taskContent.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Delete Task
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggling when clicking delete
            
            // Add exit animation
            li.classList.remove('animate-in');
            li.classList.add('animate-out');

            // Remove after animation finishes
            li.addEventListener('animationend', () => {
                li.remove();
                checkEmptyState();
            });
        });
    }

    // Helper: Check if list is empty to toggle placeholder
    function checkEmptyState() {
        if (taskList.children.length === 0) {
            emptyState.style.display = 'flex';
        } else {
            emptyState.style.display = 'none';
        }
    }

    // Helper: Prevent XSS by escaping HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
