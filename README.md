# 📝 TaskMaster - React Notes App

TaskMaster is a multi-version React application built for learning and practicing different React state management techniques. It allows users to create and manage notes for various purposes, such as gym routines, shopping lists, travel preparation, and general note-taking.

---

## 🚀 Features

- Add new notes with:
  - Text
  - Two numeric fields
- Edit notes:
  - Text edited via a button that reveals an input field
  - Numbers edited directly by clicking on them
- Toggle note expansion to show/hide full text
- Mark notes as completed
- Delete individual notes or clear all
- Sort notes by:
  - Entry type
  - Alphabetical order
  - Completion status
- View statistics:
  - Total notes
  - Completed vs incomplete
  - Completion percentage
- Movable dark mode toggle button
  - Works on touchscreens (phones, tablets)
  - Can be dragged and placed anywhere
- Notes are stored in `localStorage`
- Shareable link with stored notes

---

## 🧪 Project Structure & Versions

The app is composed of **three main versions** inside the `src` folder:

- **v1**: Uses `useState` only
- **v2**: Uses `useReducer` only
- **v3.1**: Uses `useReducer` with `useContext` in the same file
- **v3.2**: Uses `useReducer` + `useContext` in a separate provider file (`TasksProvider.js`), and exports a custom hook for consuming context

You can switch between versions by editing the `index.js` file and changing the `App` import:

```js
// Example: Use version 3.2
import App from "./App-v3.2";
```

Then run the app normally.

---

## 📁 Folder Structure Overview

```bash
src/
├── components/
│   ├── v1/
│   ├── v2/
│   ├── v3.1/
│   ├── v3.2/
│   └── styles.js         # shared styling file
├── TasksProvider.js      # for version 3.2 context provider
├── App-v1.js
├── App-v2.js
├── App-v3.1.js
├── App-v3.2.js
├── index.js              # main entry point
└── index.css
```

---

## 📷 Screenshots

Below are some screenshots of the application with brief descriptions of their functionality:

1. **Main application image**  
   ![Main application image](./screenshots/Main%20application%20image.png)

2. **How to use `index.js` file**  
   ![How to use index.js file](./screenshots/how%20to%20use%20index.js%20file.png)

3. **Application images according to the order of task completion**  
   ![Order by completion](./screenshots/Application%20images%20according%20to%20the%20order%20of%20task%20completion.png)

4. **Application images in alphabetical order of notes**  
   ![Alphabetical order](./screenshots/Application%20images%20in%20alphabetical%20order%20of%20notes.png)

5. **Image of the application after clicking on the edit note button**  
   ![Edit note button](./screenshots/Image%20of%20the%20application%20after%20clicking%20on%20the%20edit%20note%20button.png)

6. **Image of the application after clicking on the number for editing**  
   ![Edit number](./screenshots/Image%20of%20the%20application%20after%20clicking%20on%20the%20number%20for%20editing.png)

7. **Image of the application in dark mode with the button position changed**  
   ![Dark mode](./screenshots/Image%20of%20the%20application%20in%20dark%20mode%20with%20the%20button%20position%20changed.png)

---

## 🛠️ Installation & Run

```bash
git clone <your-repo-url>
cd TaskMaster
npm install
npm start
```

---

## 🚀 CI/CD Integration

This project uses **CI/CD** (Continuous Integration and Continuous Deployment) with GitLab to automate the building, testing, and deployment of the app.

### GitLab Pipeline Stages:

🔗 [View CI/CD Pipeline on GitLab](https://gitlab.com/saadturky/tasksmaster/-/pipelines/1788007621)

1. **Install Browser**:
   The pipeline installs the Microsoft Edge browser to run tests in a controlled environment.

2. **Deploy to GitLab Pages**:
   After the build process, the application is deployed automatically to **GitLab Pages**, making it publicly accessible.

3. **Run Robot Framework Tests**:
   The app runs automated tests using the **Robot Framework** to ensure the functionality works across multiple browsers:

   - **Google Chrome**
   - **Mozilla Firefox**
   - **Microsoft Edge**

   All tests have passed successfully on these browsers.

### Notes on CI/CD:

- **GitLab Pages** provides a free hosting platform for static websites. A link to the live deployed application is included in the project description on GitLab, and the app is published there for easy access by anyone.
- The **Robot Framework** ensures cross-browser compatibility by running the same test suite on Chrome, Firefox, and Edge.

---

## 📚 Learning Goal

This project was built as a hands-on learning exercise in React, exploring different ways to manage state, build reusable components, and handle user interaction in a more advanced and flexible way.
