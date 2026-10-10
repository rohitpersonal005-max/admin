window.CMS_DASHBOARD = {
  activeFilter: 'all',

  init() {
    this.renderToDOM();
  },

  renderToDOM() {
    const root = document.getElementById('app-content');
    if (root) {
      root.innerHTML = this.render();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  openTaskModal() {
    const store = window.CMS_STORE;
    const users = (store.data.users || []).filter(u => u.role !== 'Admin');
    const userOptions = users.map(u => `<option value="${u.username}">${u.username} (${u.role})</option>`).join('');

    const content = `
      <form class="space-y-4 text-sm" onsubmit="event.preventDefault(); CMS_DASHBOARD.saveTask();">
        <div>
          <label class="block font-bold text-slate-700 mb-1 text-xs">Task Title <span class="text-rose-600">*</span></label>
          <input type="text" id="task-title" required class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50" placeholder="e.g. Please review the new vendor quotation" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1 text-xs">Initial Message <span class="text-rose-600">*</span></label>
          <textarea id="task-message" required rows="3" class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50" placeholder="Describe what needs to be done..."></textarea>
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1 text-xs">Assign To <span class="text-rose-600">*</span></label>
          <select id="task-assign" required class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50">
            <option value="">-- Select User --</option>
            ${userOptions}
          </select>
        </div>
        <div class="flex justify-end pt-4 border-t border-slate-200">
          <button type="submit" class="px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow transition">Add task</button>
        </div>
      </form>
    `;
    window.CMS_APP.openModal('Add New Task', content, 'max-w-lg');
  },

  saveTask() {
    const title = document.getElementById('task-title').value;
    const message = document.getElementById('task-message').value;
    const assignedTo = document.getElementById('task-assign').value;

    const task = {
      id: 'task_' + Date.now(),
      title,
      assignedTo,
      createdAt: new Date().toISOString(),
      status: 'Open',
      chat: [
        { sender: window.CMS_STORE.getCurrentUser().username, text: message, timestamp: new Date().toISOString() }
      ]
    };

    if (!window.CMS_STORE.data.adminTasks) window.CMS_STORE.data.adminTasks = [];
    window.CMS_STORE.data.adminTasks.unshift(task); // push to front
    window.CMS_STORE.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast('Task added successfully.', 'success');
    this.renderToDOM();
  },

  deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      window.CMS_STORE.data.adminTasks = (window.CMS_STORE.data.adminTasks || []).filter(t => t.id !== taskId);
      window.CMS_STORE.save();
      window.CMS_APP.toast('Task deleted.', 'info');
      this.renderToDOM();
    }
  },

  addChatMessage(taskId) {
    const input = document.getElementById('chat-input-' + taskId);
    if (!input || !input.value.trim()) return;

    const task = (window.CMS_STORE.data.adminTasks || []).find(t => t.id === taskId);
    if (!task) return;

    if (!task.chat) task.chat = [];
    
    // Convert old "message" to chat history if migrating old tasks
    if (task.message && task.chat.length === 0) {
       task.chat.push({ sender: 'Admin', text: task.message, timestamp: task.createdAt });
    }

    task.chat.push({
      sender: window.CMS_STORE.getCurrentUser().username,
      text: input.value.trim(),
      timestamp: new Date().toISOString()
    });

    // Automatically reopen task if an admin messages a resolved task, or if user messages it.
    if (task.status === 'Resolved') task.status = 'Open';

    window.CMS_STORE.save();
    this.renderToDOM();
  },

  resolveTask(taskId) {
    const task = (window.CMS_STORE.data.adminTasks || []).find(t => t.id === taskId);
    if (task) {
      task.status = 'Resolved';
      window.CMS_STORE.save();
      window.CMS_APP.toast('Task marked as resolved.', 'success');
      this.renderToDOM();
    }
  },

  handleChatEnter(e, taskId) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.addChatMessage(taskId);
    }
  },

  render() {
    const store = window.CMS_STORE;
    const currentUser = store.getCurrentUser();
    const role = currentUser ? currentUser.role : '';
    const username = currentUser ? currentUser.username : '';

    const allTasks = store.data.adminTasks || [];
    
    // Filter tasks based on role. Admins see all tasks. Users see tasks assigned to them.
    const myTasks = role === 'Admin' ? allTasks : allTasks.filter(t => t.assignedTo === username);

    const taskCards = myTasks.map(task => {
      // Migrate old tasks on the fly for rendering
      let chatHistory = task.chat || [];
      if (chatHistory.length === 0 && task.message) {
         chatHistory = [{ sender: 'Admin', text: task.message, timestamp: task.createdAt }];
      }

      const chatHtml = chatHistory.map(msg => {
        const isMe = msg.sender === username;
        return `
          <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-3">
            <div class="px-3 py-2 rounded-lg text-sm max-w-[85%] ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}">
              <div class="whitespace-pre-wrap">${msg.text}</div>
            </div>
            <div class="text-[10px] text-slate-400 mt-1 px-1">
              ${msg.sender} � ${window.CMS_STORE.formatDate(msg.timestamp)}
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="bg-slate-50 border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col mb-4">
          <!-- Header -->
          <div class="px-4 py-3 bg-white border-b border-slate-200 flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded ${task.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-900 border-amber-300'} border text-[10px] font-bold font-mono uppercase tracking-wide">
                  ${task.status}
                </span>
                <span class="text-[11px] text-slate-500 font-mono">Assigned to: <strong class="text-slate-800">${task.assignedTo}</strong></span>
              </div>
              <h3 class="font-bold text-slate-900 text-base">${task.title}</h3>
            </div>
            <div class="flex gap-2">
              ${task.status !== 'Resolved' ? `<button onclick="CMS_DASHBOARD.resolveTask('${task.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow transition">Mark Resolved</button>` : ''}
              ${role === 'Admin' ? `<button onclick="CMS_DASHBOARD.deleteTask('${task.id}')" class="px-2 py-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition border border-transparent hover:border-rose-200" title="Delete Task"><i data-lucide="trash-2" class="w-4 h-4"></i></button>` : ''}
            </div>
          </div>

          <!-- Chat History -->
          <div class="p-4 overflow-y-auto max-h-96 flex-1 flex flex-col-reverse">
            <div class="flex flex-col justify-end">
              ${chatHtml}
            </div>
          </div>

          <!-- Chat Input Bar -->
          <div class="px-4 py-3 bg-white border-t border-slate-200 flex items-end gap-2">
            <textarea id="chat-input-${task.id}" onkeydown="CMS_DASHBOARD.handleChatEnter(event, '${task.id}')" rows="1" class="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-sm resize-none" placeholder="Type your message... (Press Enter to send)"></textarea>
            <button onclick="CMS_DASHBOARD.addChatMessage('${task.id}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow transition shrink-0 flex items-center gap-1.5">
              <span>Send</span>
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="max-w-4xl mx-auto py-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Task Manager</h1>
            <p class="text-sm text-slate-500 mt-1">Communicate and manage tasks.</p>
          </div>
          <button onclick="CMS_DASHBOARD.openTaskModal()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-md transition flex items-center gap-2"><i data-lucide="plus" class="w-4 h-4"></i> Add task</button>
        </div>

        <div class="space-y-6">
          ${taskCards.length > 0 ? taskCards : `
            <div class="p-12 text-center text-slate-400 bg-white border border-dashed border-slate-300 rounded-lg">
              <i data-lucide="inbox" class="w-8 h-8 mx-auto text-slate-300 mb-3"></i>
              <div class="text-base font-semibold text-slate-600">No active tasks</div>
              <p class="text-sm text-slate-400 mt-1">You're all caught up.</p>
            </div>
          `}
        </div>
      </div>
    `;
  }
};


