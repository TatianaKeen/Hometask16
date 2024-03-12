function UsersService(baseUrl) {
  this.baseUrl = baseUrl;
}

UsersService.prototype.getAllUsers = async function () {
  try {
    const response = await fetch(`${this.baseUrl}/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
};

UsersService.prototype.getUserById = async function (id) {
  try {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw new Error(`Error fetching user with id ${id}`);
  }
};

UsersService.prototype.renderUsersList = function (list) {
  const userListElement = document.getElementById('user-list');
  userListElement.innerHTML = '';

  list.forEach(user => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${user.name}</span> - <span>${user.company.name}</span>
    `;
    listItem.addEventListener('click', async () => {
      try {
        const userInfo = await this.getUserById(user.id);
        alert(`User info:\nName: ${userInfo.name}\nEmail: ${userInfo.email}\nPhone: ${userInfo.phone}`);
      } catch (error) {
        alert('Error fetching user information');
      }
    });
    userListElement.appendChild(listItem);
  });
};


const usersService = new UsersService('https://jsonplaceholder.typicode.com');
usersService.getAllUsers()
  .then(users => {
    usersService.renderUsersList(users);
  })
  .catch(error => {
    console.error('Error:', error);
  });