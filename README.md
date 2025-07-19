# 🕒 Secure Digital Time Capsule

A secure, time-locked digital capsule system where specific recipients (students) can access a shared hackathon link only **after a specified unlock time**, and only if their **email or roll number matches** what was predefined in the capsule.

---

## 📌 Project Overview

This project allows the creation of **digital capsules** containing sensitive content (such as a hackathon link), which:

- Can only be accessed **after a certain date and time**
- Are protected by recipient identity (email or roll number)
- Are accessible through **unique capsule links**

---

## 🚀 Features

- 📝 **Create Capsules**

  - Input a message or link (e.g., hackathon link)
  - Specify unlock date and time
  - Add allowed recipient(s) via email or roll number

- 🔐 **Recipient-Based Access**

  - Capsule is accessible only to students whose email or roll number matches
  - Others are shown an “Access Denied” message

- ⏳ **Time Lock System**

  - Capsules remain locked until the specified unlock time

- 🔗 **Unique Access Links**

  - Capsules generate shareable, secure URLs like:
    ```
    /capsule/:id
    ```

- 🌐 **Simple Web Interface**
  - Built with EJS and Express for easy interaction

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS
- **Database:** MongoDB with Mongoose
- **Environment:** dotenv for config management

---
