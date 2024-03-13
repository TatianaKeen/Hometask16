function UsersService(baseUrl) {
  this.baseUrl = baseUrl;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const usersService = new UsersService('https://jsonplaceholder.typicode.com');
    const users = await usersService.getAllUsers();
    usersService.renderUsersList(users);
  } catch (error) {
    console.error('Error:', error);
  }
});

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
    const userAvatar = document.createElement('img');
    userAvatar.src = `https://api.lorem.space/image/face?w=50&h=50&r=${user.id}`;
    userAvatar.alt = `Avatar of ${user.name}`;
    userAvatar.classList.add('user-avatar');
    listItem.appendChild(userAvatar);
    listItem.innerHTML += `
      <h2>${user.name}</h2>
      <p>Company: ${user.company.name}</p>
    `;
    listItem.addEventListener('click', async () => {
      try {
        const userInfo = await this.getUserById(user.id);
        this.renderUserDetails(userInfo);
      } catch (error) {
        console.error('Error fetching user information:', error);
        alert('Error fetching user information');
      }
    });
    userListElement.appendChild(listItem);
  });
};

UsersService.prototype.renderUserDetails = function (user) {
  const userDetailsElement = document.getElementById('user-details');
  userDetailsElement.innerHTML = `
    <img class="user-avatar" src="https://api.lorem.space/image/face?w=50&h=50&r=${user.id}" alt="Avatar of ${user.name}">

    <h2>${user.name}</h2>
    <p>Username: ${user.username}</p>

    <p>Company: ${user.company.name}</p>
    <p>Phone: ${user.phone}</p>
    <p>Email: ${user.email}</p>
    <p>Address: ${user.address.suite}, ${user.address.street}, ${user.address.city} / ${user.address.zipcode}</p>
    <hr>
  `;
};
