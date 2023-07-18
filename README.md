# React Todo List App with API Integration

https://ankit8895.github.io/TodoList-app/

The libraries, dependencies, and themes used in the app are as follows:

1. React
2. Redux DOM
3. Redux Toolkit
4. React Redux
5. React Toastify
6. React Bootstrap
7. Bootswatch
8. Axios


The React Todo List app is a powerful and interactive application designed to manage a list of tasks or todos. It incorporates several key features that allow users to fetch, add, update, and delete todo items. The app integrates with an external API, specifically the JSONPlaceholder API (https://jsonplaceholder.typicode.com/todos), to perform these operations.

The main functionality of the app is to fetch and display todo items from the provided API. Upon loading the app, it makes an API call to retrieve a list of todos from the given URL. The fetched data is then rendered in the app's user interface, allowing users to view their existing todos.

To add a new todo item, the app provides a form where users can enter the details of the task. When the user submits the form, the app makes a POST request to the same API endpoint. Although this is a dummy request and doesn't actually save the item on the server, it demonstrates the process of adding a new todo. The app then updates its internal state to include the newly created todo, ensuring that it is reflected in the user interface.

In addition to adding new todos, the app allows users to update existing items. Each todo in the list is accompanied by an edit button, which, when clicked, opens a form pre-populated with the current todo details. Upon submitting the updated information, the app makes a PUT request to the API endpoint to mimic the process of updating the todo. The app's state is then updated accordingly, and the changes are immediately reflected in the user interface.

Furthermore, the app supports the deletion of todo items. Each todo in the list includes a delete button, which, when clicked, triggers a DELETE request to the API endpoint. Again, this is a dummy call that simulates the removal of the item from the server. The app responds by updating its state and removing the deleted todo from the user interface.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
