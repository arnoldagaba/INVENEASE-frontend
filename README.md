# InvenEase - Modern Inventory Management System

InvenEase is a modern, user-friendly inventory management system built with React and TypeScript. It helps businesses track their inventory, manage stock levels, and monitor product movements efficiently.

## 🚀 Features

- **User Authentication & Authorization**
  - Secure JWT-based authentication
  - Role-based access control (Admin/Staff)
  - Persistent login with refresh tokens
  - Secure password reset flow

- **Inventory Management**
  - Product tracking with SKU
  - Real-time stock level monitoring
  - Low stock alerts and notifications
  - Category management
  - Batch operations support
  - Image upload and management

- **Modern Dashboard**
  - Real-time inventory statistics
  - Interactive charts and graphs
  - Recent transactions view
  - Low stock notifications
  - Stock value tracking
  - Customizable widgets

- **Advanced UI/UX**
  - Responsive design with mobile-first approach
  - Dark/Light theme with system preference sync
  - Smooth animations with Framer Motion
  - Toast notifications for user feedback
  - Intuitive navigation with sidebar
  - Global search functionality
  - Accessible components (ARIA compliant)

## 🛠️ Tech Stack

- **Core**
  - React 18 with TypeScript
  - Vite for fast development
  - React Router v6 for routing

- **Styling & UI**
  - TailwindCSS for styling
  - Framer Motion for animations
  - Lucide React for icons
  - Custom UI components
  - Responsive design system

- **State Management & Data Handling**
  - Zustand for state management
  - React Query for server state
  - Axios for API requests
  - Form handling with React Hook Form
  - Zod for schema validation

- **Developer Experience**
  - ESLint for code linting
  - Prettier for code formatting
  - Husky for git hooks
  - TypeScript for type safety

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- Git
- A modern web browser

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/invenease.git
   cd invenease/frontend
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

   Configure the following in your `.env`:

   ```env
   # API Configuration
   VITE_API_URL=http://localhost:8000/api
   VITE_API_TIMEOUT=30000

   # Authentication
   VITE_JWT_SECRET=your_jwt_secret_here
   VITE_JWT_EXPIRY=7d

   # Feature Flags
   VITE_ENABLE_ANALYTICS=true
   VITE_ENABLE_NOTIFICATIONS=true

   # Theme Configuration
   VITE_DEFAULT_THEME=light
   ```

4. **Start development server**

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

## 🤝 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── ui/         # Basic UI components
│   │   └── layout/     # Layout components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── public/            # Static assets
└── tests/            # Test files
```

## 🎨 Theme System

The application uses a comprehensive theme system:

- Light/Dark mode with system preference detection
- CSS variables for dynamic theming
- TailwindCSS for consistent styling
- Framer Motion for smooth transitions
- Customizable color schemes

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- CSRF protection
- Input sanitization
- Rate limiting
- Secure password handling

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support:

- Create an issue in the repository
- Email: <support@invenease.com>
- Documentation: [docs.invenease.com](https://docs.invenease.com)

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Made with ❤️ by the InvenEase Team
