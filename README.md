
# 🚀 Offline-First Social Media App

> A feature-rich React Native mobile application that lets users **create, edit, and delete posts even without an internet connection**. Posts are stored locally in **SQLite** and synced with a remote server when the device is back online.

---

## 📱 Features

- 🔌 **Offline-first functionality** using SQLite
- ☁️ **Syncing with remote server** when back online
- ✍️ **Create, update, delete** posts locally
- 🔁 Seamless **background syncing**
- 🧠 Built with **Redux Toolkit** for state management
- 🌐 API integration with dummy api server.
- 🎨 Clean and responsive UI using **React Native Paper**
- 🔐 Login with **AsyncStorage** session persistence

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| React Native     | Cross-platform mobile framework  |
| Redux Toolkit    | State management                 |
| SQLite           | Local storage for offline data   |
| Axios            | HTTP requests and syncing        |
| React Navigation | Navigation between screens       |
| AsyncStorage     | Persistent login session         |
| JSONPlaceholder  | Sample online server             |
| React Native Paper | UI components and theming     |

---

## 📸 Screenshots 

>*Login Screen*
<img src="https://github.com/user-attachments/assets/7afe155f-32bd-4d15-9507-c8f92d76aeeb" alt="Screenshot" width="250" height="400" />

>*SignUp Screen*
<img src="https://github.com/user-attachments/assets/194d0efa-32a6-40de-b858-d2db65af1485" alt="Screenshot" width="230" height="400" />

>*Feed (offline)*
<img src="https://github.com/user-attachments/assets/57c5e9af-fde9-40ed-a277-78bfcf6cb323" alt="Screenshot" width="230" height="400" />

>*Feed (synced automatically when online)*
<img src="https://github.com/user-attachments/assets/52773fc4-d473-4ca1-9e5a-b26b2097e744" alt="Screenshot" width="230" height="400" />

>*Add/Update Post*
<img src="https://github.com/user-attachments/assets/1e64ae64-219f-499d-93e9-e71e58f866dd" alt="Screenshot" width="230" height="400" />

>*Logout*
<img src="https://github.com/user-attachments/assets/0e041e8f-2c4b-4692-8ac5-e1eb75b5cf6d" alt="Screenshot" width="230" height="400" />



---

## 🧑‍💻 How to Run the Project Locally

### 1. 📦 Clone the repository

```bash
git clone https://github.com/your-username/offline-social-app.git
cd offline-social-app
````

### 2. 📲 Install dependencies

```bash
npm install
# or
yarn install
```

### 3. 🔧 Setup Android/iOS environment

Make sure you have followed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) for either Android or iOS.

### 4. ▶️ Run the App

```bash
npx react-native run-android
# or
npx react-native run-ios
```

---

## 🧠 Local Database (SQLite) Management

We use [`react-native-sqlite-storage`](https://github.com/andpor/react-native-sqlite-storage) for persistent local storage.

* **Posts are stored locally** when created/edited/deleted offline.
* A **`synced` flag** is used to track if changes are pending sync.
* Background sync checks for network availability and **pushes changes to remote** when online.
* The database is initialized on app start and rehydrated into Redux state.

---

## 🌐 Online Server (Sync)

When the app detects internet connectivity, it automatically:

1. Sends unsynced posts to [`https://jsonplaceholder.typicode.com/posts`](https://jsonplaceholder.typicode.com/posts)
2. Marks them as synced in SQLite
3. Fetches latest posts from remote and updates UI

> 💡 Since *JSONPlaceholder* is a *mock server*, data doesn't persist after a real sync. This is just for demonstration purposes.

---

## 🔐 Login and Session Persistence

* The app features a **login screen with dummy credentials**.
* On successful login, user data is stored in **AsyncStorage**.
* Users remain logged in until they explicitly log out.

---

## 🔄 Folder Structure

```
/src
  /components     # Reusable UI components
  /screens        # App screens (Login, Home, PostEditor)
  /redux          # Redux Toolkit slices and store
  /database       # SQLite setup and queries
  /utils          # Helper functions (sync, storage, etc.)
App.js
```

---

## 👥 Dummy User for Login

| Username | Password      |
| -------- | ------------- |
| `demo`   | `password123` |

> ⚠️ This is a demo app, so credentials are hardcoded for testing purposes.

---


## 📚 Useful Commands

```bash
# Start Metro
npx react-native start

# Clean Android build (if needed)
cd android && ./gradlew clean
```

---

Made with ❤️ by Radhika Padiya

---

