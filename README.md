# 🧪 Wikipedia Watchlist Test Automation (Playwright)

Automated end-to-end test using [Playwright](https://playwright.dev/) that:

✅ Logs into a test Wikipedia account  
✅ Adds two specific articles to the watchlist  
✅ Removes one of them  
✅ Verifies the other remains  
✅ Confirms the page title of the remaining article

---

## 🚀 How to Run 🧠

1. 📦 **Install dependencies**

Use the following command to install all required Node.js packages: 
```bash
npm install
```

2. 🔐 **Set up your `.env` file**

In the root of the project, create a .env file and add the following credentials for your test Wikipedia account:

WIKI_USERNAME=your_test_username
WIKI_PASSWORD=your_test_password

🛑 Important: Use a test account. This script interacts with your Wikipedia watchlist.

3. ▶️ **Run the test**

Headless (default, CI-friendly):
```bash
npx playwright test
```
Headed (to visually see the browser interaction):
```bash
npx playwright test --headed
```
✅ Supports: Chromium, Firefox, and WebKit

---

## 🙌 Final Note

Thank you for reviewing my submission!

If you have any questions, feedback, or would like me to walk you through the test logic, I’d be happy to chat!

Looking forward to the next steps —  
— Christina 💻✨

