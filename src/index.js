function App() {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const usersService = new UsersService('https://jsonplaceholder.typicode.com');
      const users = await usersService.getAllUsers();
      usersService.renderUsersList(users);
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

App();
