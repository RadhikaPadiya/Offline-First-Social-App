
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
<img src="https://github.com/user-attachments/assets/fb1bceae-5578-45e5-b4b1-bb6011cd507b" alt="Screenshot" width="250" height="400" />

>*SignUp Screen*
<img src="https://github.com/user-attachments/assets/ae15e80c-c83e-4f39-b0e6-06764d88bce3" alt="Screenshot" width="230" height="400" />

>*Feed (offline)*
<img src="https://github.com/user-attachments/assets/641b471b-b912-41f8-87ea-200d9c1fe0f9" alt="Screenshot" width="230" height="400" />

>*Feed (synced automatically when online)*
<img src="https://github.com/user-attachments/assets/9ea04811-0e4c-4e50-b85b-22c86de37571" alt="Screenshot" width="230" height="400" />

>*Add/Update Post*
<img src="https://github.com/user-attachments/assets/fa50eebf-9365-41e3-87f9-b529d064c357" alt="Screenshot" width="230" height="400" />

>*Logout*
<img src="https://github.com/user-attachments/assets/0c4bb382-acea-480a-8c5f-e5463ad59b98" alt="Screenshot" width="230" height="400" />



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

