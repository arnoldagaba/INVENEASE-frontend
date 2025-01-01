# InvenEase - Inventory Management System

InvenEase is a modern, user-friendly inventory management system built with React and TypeScript. It helps businesses track their inventory, manage stock levels, and monitor product movements efficiently.

## 🚀 Features

- **User Authentication**
  - Secure login and registration
  - Password reset functionality
  - Role-based access control (Admin/Staff)

- **Inventory Management**
  - Product tracking with SKU
  - Stock level monitoring
  - Low stock alerts
  - Category management

- **Dashboard**
  - Real-time inventory statistics
  - Recent transactions view
  - Low stock notifications
  - Stock value tracking

- **Modern UI/UX**
  - Responsive design
  - Dark/Light theme support
  - Clean and intuitive interface
  - Toast notifications

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- React Router v6
- Axios
- React Toastify
- HeadlessUI
- Lucide React (Icons)
- Date-fns

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/invenease.git
   cd invenease
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```
   VITE_API_URL=your_api_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing project structure
- Use functional components with hooks
- Write meaningful commit messages
- Add appropriate comments for complex logic
- Update documentation for significant changes

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Layout/     # Layout components
│   └── ui/         # Basic UI components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── store/          # State management
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## 🔒 Authentication

The application uses JWT-based authentication. Available endpoints:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/request-reset` - Request password reset
- `POST /auth/reset-password` - Reset password
- `POST /auth/update-password` - Update password
- `GET /auth/me` - Get current user

## 🎨 Theme Customization

The application supports both light and dark themes. Theme configuration can be found in:
- `src/hooks/useTheme.ts`
- TailwindCSS configuration

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@invenease.com or create an issue in the repository.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.dev/)
- [Lucide Icons](https://lucide.dev/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

Made with ❤️ by the InvenEase Team 