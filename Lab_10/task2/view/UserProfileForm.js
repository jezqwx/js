export class UserProfileForm {
  constructor(containerId, viewModel) {
    this.container = document.getElementById(containerId);
    this.viewModel = viewModel;
    this.isBound = false;
    this.watchersAttached = false;
  }

  render() {
    const vm = this.viewModel;

    this.container.innerHTML = `
      <div class="mvvm-form">
        <h1>User Profile (MVVM)</h1>

        <div class="form-group">
          <label>First Name:</label>
          <input
            type="text"
            data-field="firstName"
            value="${vm.firstName}"
            class="${vm.errors?.firstName ? 'invalid' : ''}"
          />
          <span class="error">${vm.errors?.firstName || ''}</span>
        </div>

        <div class="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            data-field="lastName"
            value="${vm.lastName}"
            class="${vm.errors?.lastName ? 'invalid' : ''}"
          />
          <span class="error">${vm.errors?.lastName || ''}</span>
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input
            type="email"
            data-field="email"
            value="${vm.email}"
            class="${vm.errors?.email ? 'invalid' : ''}"
          />
          <span class="error">${vm.errors?.email || ''}</span>
        </div>

        <div class="form-group">
          <label>Age:</label>
          <input
            type="number"
            data-field="age"
            value="${vm.age}"
            class="${vm.errors?.age ? 'invalid' : ''}"
          />
          <span class="error">${vm.errors?.age || ''}</span>
        </div>

        <div class="preview">
          <h3>Preview</h3>
          <p><strong>Full Name:</strong> ${vm.fullName}</p>
          <p><strong>Valid:</strong> ${vm.isValid ? 'Yes' : 'No'}</p>
        </div>

        <div class="actions">
          <button id="saveBtn" ${!vm.isValid ? 'disabled' : ''}>Save</button>
          <button id="resetBtn">Reset</button>
        </div>

        <div id="message"></div>
      </div>
    `;

    this.attachEventListeners();
    this.subscribeToChanges();
  }

  attachEventListeners() {
    if (this.isBound) return;
    this.isBound = true;

    this.container.addEventListener('input', (e) => {
      const target = e.target;
      if (target.dataset.field) {
        const field = target.dataset.field;
        this.viewModel[field] = target.value;
      }
    });

    this.container.addEventListener('click', (e) => {
      const target = e.target;

      if (target.id === 'saveBtn') {
        const result = this.viewModel.save();
        const message = this.container.querySelector('#message');

        if (result.success) {
          message.textContent = 'Profile saved successfully!';
          message.className = 'success';
        } else {
          message.textContent = 'Please fix the errors.';
          message.className = 'error';
        }
      }

      if (target.id === 'resetBtn') {
        this.viewModel.reset();
        const message = this.container.querySelector('#message');
        message.textContent = '';
        message.className = '';
      }
    });
  }

  subscribeToChanges() {
    if (this.watchersAttached) return;
    this.watchersAttached = true;

    ['firstName', 'lastName', 'email', 'age', 'errors'].forEach(field => {
      this.viewModel.$watch(field, () => this.render());
    });
  }
}