# YouTube Stats Tracker Builder

A user-friendly web application to generate a personalized Chrome extension for tracking any YouTube channel's statistics, no coding required.

 <!-- Replace with a URL to a screenshot of your app -->

## ✨ Features

- **No-Code Extension Builder**: Generate a fully functional Chrome extension with a simple web interface.
- **Real-Time Channel Stats**: The generated extension displays subscriber count, total views, and total video count.
- **Latest Videos Feed**: See the most recent 5 videos from the channel directly in the extension popup.
- **Live Subscriber Badge**: The extension icon on your browser toolbar shows the channel's current subscriber count, updated periodically.
- **Personalized for You**: Input any valid YouTube Channel ID and API Key to create a tracker for your favorite creator or your own channel.
- **Modern & Clean UI**: The web builder and the generated extension are designed to be intuitive and visually appealing.
- **Dark & Light Mode**: Both the builder website and the generated extension support dark and light themes to match your system preferences.
- **Client-Side Generation**: The entire extension is generated and zipped directly in your browser for speed and privacy.

---

## 🚀 How It Works

The process is designed to be as simple as possible:

1.  **Get Credentials**:
    *   Obtain a **YouTube Data API v3 Key** from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
    *   Find the **YouTube Channel ID** for the channel you want to track. You can find your own on the [YouTube Advanced Settings](https://www.youtube.com/account_advanced) page.

2.  **Enter Details**:
    *   Paste your API Key and the Channel ID into the input fields on the web app.

3.  **Verify & Generate**:
    *   The application verifies that the credentials are correct and fetches the channel's data.
    *   Once verified, click the "Generate Extension" button.

4.  **Download**:
    *   A `.zip` file containing your personalized Chrome extension will be automatically downloaded.

---

## 🔧 How to Install the Generated Extension

Once you've downloaded the `.zip` file, follow these steps to install it in Google Chrome (or any Chromium-based browser):

1.  **Unzip the File**: Extract the contents of the downloaded `.zip` file into a new folder. Remember where you save this folder, as you'll need it to stay there.

2.  **Open Chrome Extensions**:
    *   Navigate to `chrome://extensions` in your browser's address bar.
    *   Alternatively, click the three-dot menu in the top-right corner, go to `Extensions` > `Manage Extensions`.

3.  **Enable Developer Mode**:
    *   In the top-right corner of the Extensions page, turn on the **"Developer mode"** toggle switch.

4.  **Load the Extension**:
    *   Click the **"Load unpacked"** button that appears on the top-left.
    *   Select the folder where you extracted the extension files.

5.  **Done!**
    *   Your new YouTube Stats Tracker extension will now appear in your list of extensions. Click the puzzle piece icon in your toolbar and pin it for easy access!

---

## 🛠️ Tech Stack

This project was built using a modern and efficient technology stack:

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Extension Generation**: [JSZip](https://stuk.github.io/jszip/) for client-side file packaging.
-   **Intelligence**: Powered by the **Google Gemini API** for backend logic and processing.

---

## 👨‍💻 Getting Started (For Developers)

If you'd like to run this project locally or contribute, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ankushpramanik/youtube-stats-tracker-builder.git
    cd youtube-stats-tracker-builder
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run start
    # or
    yarn start
    ```
    The application will be available at `http://localhost:3000`.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

Created by Ankush Pramanik. Feel free to reach out!

-   **GitHub**: [@ankushpramanik](https://github.com/ankushpramanik)
-   **Email**: `pramanikankush@gmail.com`
