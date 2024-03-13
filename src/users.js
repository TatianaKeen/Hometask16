function UsersService(baseUrl) {
  this.baseUrl = baseUrl;
}

UsersService.prototype.getAllUsers = async function () {
  try {
    const response = await fetch(`${this.baseUrl}/users`);
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
};

UsersService.prototype.getUserById = async function (id) {
  try {
    await new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 500);
    });
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw new Error(`Error fetching user with id ${id}`);
  }
};

UsersService.prototype.renderUsersList = function (list) {
  const userListElement = document.getElementById('user-list');
  const loadingElement = document.getElementById('loading');
  userListElement.innerHTML = '';

  list.forEach(user => {
    const listItem = document.createElement('li');
    const userAvatar = document.createElement('img');
    userAvatar.src = `https://api.lorem.space/image/face?w=50&h=50&r=${user.id}`;
    userAvatar.alt = `Avatar of ${user.name}`;
    userAvatar.classList.add('user-avatar');
    listItem.appendChild(userAvatar);
    listItem.innerHTML += `
      <div>
        <h3>${user.name}</h2>
        <p>Company: ${user.company.name}</p>
      </div>
    `;
    listItem.classList.add('main-info');
    listItem.addEventListener('click', async () => {
      this.renderLoading();
      const userInfo = await this.getUserById(user.id);
      this.renderUserDetails(userInfo);
    });
    userListElement.appendChild(listItem);
  });
};

UsersService.prototype.renderUserDetails = function (user) {
  const userDetailsElement = document.getElementById('user-details');
  userDetailsElement.innerHTML = `
  <div class="main-info">
    <img class="user-avatar" src="https://api.lorem.space/image/face?w=50&h=50&r=${user.id}" alt="Avatar of ${user.name}">
    <div>
      <h2>${user.name}</h2>
      <p>Username: ${user.username}</p>
    </div>
  </div>

  <div class="detail-info">
    <div class="row">
      <p>Company</p>
      <p>${user.company.name}</p>
    </div>
    <div class="row">
      <p>Phone</p>
      <p>${user.phone}</p>
    </div>
    <div class="row">
      <p>Email</p>
      <a href="mailto:${user.email}">${user.email}</a>
    </div>
    <div class="row">
        <p>Address</p>
        <p>${user.address.suite}, ${user.address.street}, ${user.address.city} / ${user.address.zipcode}</p>
    </div>
  </div>
  `;
};


UsersService.prototype.renderLoading = function () {
  const userDetailsElement = document.getElementById('user-details');
  userDetailsElement.innerHTML = `<p class="loading">Loading...</p>`;
};

