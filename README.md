# Inquiry Balance UI - Frontend

Modern, professional banking UI untuk inquiry balance system menggunakan React, Vite, Tailwind CSS 4, dan komponen shadcn/ui style.

## 🎨 Design Features

- **Modern Banking UI**: Desain professional dengan Google Material Design inspiration
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Dark Mode Support**: Built-in dark mode dengan smooth transitions
- **Real-time Feedback**: Loading states, error handling, dan success notifications
- **Accessibility**: WCAG compliant dengan proper ARIA labels
- **Smooth Animations**: Tailwind CSS animations untuk UX yang lebih baik

## 🚀 Tech Stack

- **React 18.3** - UI Library
- **Vite 5** - Build tool & dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client
- **shadcn/ui style components** - High-quality UI components

## 📦 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Backend API running di `http://localhost:2115`

## 🔧 Installation

1. Install dependencies:
```bash
cd inquiry-balance-ui
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Edit `.env` jika backend API menggunakan port yang berbeda:
```env
VITE_API_BASE_URL=http://localhost:2115
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Application akan berjalan di `http://localhost:2116`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
inquiry-balance-ui/
├── src/
│   ├── components/
│   │   ├── Alert.jsx           # Alert component untuk notifications
│   │   ├── Badge.jsx           # Badge untuk status indicators
│   │   ├── Button.jsx          # Button component
│   │   ├── Card.jsx            # Card component
│   │   ├── Input.jsx           # Input field component
│   │   ├── InquiryBalance.jsx  # Main application component
│   │   └── Skeleton.jsx        # Loading skeleton component
│   ├── lib/
│   │   ├── api.js              # API client & service functions
│   │   └── utils.js            # Utility functions
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles & Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎯 Features

### 1. Account Search
- Input account number (9 digits dengan zero padding)
- Real-time validation
- Search dengan Enter key atau button click

### 2. Account Information Display
- Account number dengan status badge
- Available balance dengan formatting currency
- Hold balance (jika ada)
- Account type & currency
- Branch information
- Opening date & last transaction date

### 3. Customer Information Display
- Customer ID (CIF)
- Full name dengan customer type badge
- KYC status indicator
- Contact information (email, phone, mobile)
- Complete address
- Customer segment & risk rating
- Date of birth

### 4. Error Handling
- Network errors
- Account not found (404)
- Invalid input (400)
- Server errors (500)
- Empty responses

### 5. Loading States
- Skeleton loaders untuk better UX
- Animated loading indicators
- Disabled states during API calls

## 🎨 UI Components

### Button Variants
- `default` - Primary action button
- `outline` - Secondary action button
- `ghost` - Minimal button
- `destructive` - Danger/delete actions

### Alert Variants
- `default` - Information
- `destructive` - Error messages
- `success` - Success messages
- `warning` - Warning messages
- `info` - Info messages

### Badge Variants
- `default` - Standard badge
- `success` - Green (ACTIVE, VERIFIED)
- `warning` - Yellow (PENDING, DORMANT)
- `destructive` - Red (BLOCKED, EXPIRED)
- `outline` - Outlined badge

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Single column layout)
- **Tablet**: 768px - 1024px (Two column for results)
- **Desktop**: > 1024px (Full two column layout)

## 🎭 Sample Accounts for Testing

```
Account Number: 000000001
Account Number: 000000002
Account Number: 000000003
...
Account Number: 000010000
```

## 🔐 Security Features

- Secure API communication
- No sensitive data in localStorage
- Environment variables untuk configuration
- HTTPS ready (untuk production)

## 🎨 Color Scheme

### Light Mode
- Primary: Blue (#3B82F6)
- Background: Light Gray (#F8FAFC)
- Card: White (#FFFFFF)
- Text: Dark Gray (#0F172A)

### Dark Mode
- Primary: Blue (#3B82F6)
- Background: Dark Gray (#0F172A)
- Card: Darker Gray (#1E293B)
- Text: Light Gray (#F8FAFC)

## 🚀 Performance Optimizations

- Lazy loading untuk components
- Optimized bundle size dengan Vite
- CSS purging dengan Tailwind
- Cached API responses
- Debounced search input (optional)

## 🐛 Troubleshooting

### API Connection Issues
```bash
# Check if backend is running
curl http://localhost:8080/api/v1/health

# Check CORS settings di backend
# Pastikan backend allow origin dari frontend
```

### Build Issues
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Style Issues
```bash
# Rebuild Tailwind
npm run dev
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:2115` |

## 🧪 Testing the Application

1. Start backend server:
```bash
cd ..
./inquiry-balance-api
```

2. Start frontend:
```bash
npm run dev
```

3. Test scenarios:
   - Valid account (000000001)
   - Invalid account (999999999)
   - Empty input
   - Network timeout

## 📄 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Future Enhancements

- [ ] Multi-language support (ID/EN)
- [ ] Export to PDF functionality
- [ ] Transaction history view
- [ ] Account comparison feature
- [ ] Advanced search filters
- [ ] Dark mode toggle button
- [ ] Keyboard shortcuts
- [ ] Print-friendly view

## 📞 Support

Untuk pertanyaan atau issues, silakan contact team development atau create issue di repository.

---

**Built with ❤️ using modern web technologies**
