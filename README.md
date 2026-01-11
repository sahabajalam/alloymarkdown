# Alloy Markdown Viewer

> A professional, modern, and beautiful Markdown viewer designed for clarity and focus.

![Alloy Markdown Viewer](https://raw.githubusercontent.com/sahabajalam/alloymarkdown/main/public/vite.svg)

**Alloy Markdown Viewer** transforms your raw Markdown files into elegant, readable documents with advanced support for code, mathematics, and tables. Built with a focus on aesthetics and user experience, it features a glassmorphic design, dynamic backgrounds, and perfect contrast across multiple themes.

## ✨ Key Features

*   **🎨 Stunning UI/UX**:
    *   **Glassmorphism**: Modern, translucent headers and footers using `backdrop-filter`.
    *   **Dynamic Backgrounds**: Subtle, animated gradients that breathe life into the application.
    *   **Responsive Design**: A 2-column layout on desktop that gracefully adapts to a stacked layout on mobile.
    *   **Smart Layout**: An "app-like" experience with a fixed shell and independently scrollable content area.

*   **🌓 Multi-Theme Support**:
    *   **Light**: Clean, slate-based palette for day-to-day use.
    *   **Dark**: Deep "OLED-black" theme for low-light environments.
    *   **Book**: A warm, sepia-toned theme optimized for long reading sessions.
    *   *All themes feature carefully tuned contrast ratios for maximum readability.*

*   **⚡ Advanced Rendering**:
    *   **GitHub Flavored Markdown (GFM)**: Full support for standard markdown features.
    *   **Math Equations**: Beautiful rendering of LaTeX math equations using `KaTeX`, with custom styling for high visibility.
    *   **Syntax Highlighting**: Theme-aware code blocks support for dozens of languages.
    *   **Tables**: Professionally styled tables with striped rows and hover effects.

*   **🛠️ Practical Utilities**:
    *   **Drag & Drop Upload**: Simply drag your `.md` files to view them instantly.
    *   **Smart Navbar**: Automatically hides when you scroll down to maximize reading space, and reappears when you scroll up.
    *   **One-Click Reset**: Click the logo to instantly return to the upload screen.

## 🚀 Tech Stack

*   **Frontend Framework**: [React](https://reactjs.org/) (v18+)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Markdown Parsing**: `react-markdown`, `remark-gfm`, `remark-math`
*   **Math Rendering**: `rehype-katex`
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Fonts**: `Inter` (UI) and `JetBrains Mono` (Code) via Google Fonts.

## 📦 Installation

To get started with Alloy Markdown Viewer locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sahabajalam/alloymarkdown.git
    cd alloymarkdown
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in your browser**:
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📖 Usage

1.  **Upload a File**: Drag and drop a `.md` file onto the upload zone, or click to select one from your computer.
2.  **Toggle Themes**: Use the sun/moon/book icon in the header to switch between Light, Dark, and Book modes.
3.  **Navigation**: Scroll down to read. The navbar will hide to give you more space. Scroll up to bring it back. Click the **Alloy Markdown** logo to close the current file and upload a new one.

## 🤝 Credits

Designed for **Clarity** & **Focus** with [Google Antigravity](https://deepmind.google).

---

&copy; 2026 Alloy Markdown Viewer. All rights reserved.
