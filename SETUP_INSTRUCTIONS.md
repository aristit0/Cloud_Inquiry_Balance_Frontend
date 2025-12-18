# 🚀 Quick Setup - Inquiry Balance Frontend

## ✅ Fixed Version - Tailwind CSS 3.4.1

This ZIP includes the fixed version using **Tailwind CSS 3.4.1** (stable).
No Tailwind CSS 4 PostCSS errors!

## Instalasi Cepat (5 Menit)

### Prerequisites
- Node.js 18+ dengan npm
- Backend API running di port 2115

---

## Step 1: Extract ZIP File

```bash
unzip inquiry-balance-ui.zip
cd inquiry-balance-ui
```

---

## Step 2: Install Dependencies

```bash
npm install
```

Tunggu hingga semua dependencies terinstall (~2-3 menit)

---

## Step 3: Verify Configuration

File `.env` sudah included dengan configuration:
```bash
VITE_API_BASE_URL=http://localhost:2115
```

✅ Tidak perlu edit apapun jika backend running di port 2115!

---

## Step 4: Start Development Server

```bash
npm run dev
```

Expected output:
```
  VITE v5.1.0  ready in 324 ms

  ➜  Local:   http://localhost:2116/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Step 5: Open Browser

Buka browser dan navigate ke:
```
http://localhost:2116
```

---

## Testing

1. Pastikan backend running di `http://localhost:2115`
2. Test health check backend:
   ```bash
   curl http://localhost:2115/api/v1/health
   ```
3. Di UI, masukkan account number: `000000001`
4. Click "Search"
5. Lihat hasilnya!

---

## Build untuk Production

```bash
npm run build
```

Static files akan ada di folder `dist/`

Preview production build:
```bash
npm run preview
```

---

## Troubleshooting

### Port 2116 Already in Use
```bash
# Kill process yang menggunakan port 2116
lsof -i :2116
kill -9 <PID>
```

### Cannot Connect to Backend
- Pastikan backend running di port 2115
- Test: `curl http://localhost:2115/api/v1/health`
- Check file `.env` memiliki URL yang benar

### npm install Error
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## File Structure

```
inquiry-balance-ui/
├── .env                    ← Configuration (sudah included!)
├── .env.example           ← Template
├── package.json           ← Dependencies
├── vite.config.js         ← Vite config (port 2116)
├── tailwind.config.js     ← Tailwind config
├── index.html
├── FRONTEND_README.md     ← Full documentation
└── src/
    ├── main.jsx           ← Entry point
    ├── App.jsx            ← Root component
    ├── index.css          ← Global styles
    ├── components/        ← UI components
    │   ├── InquiryBalance.jsx  ← Main component
    │   ├── Alert.jsx
    │   ├── Badge.jsx
    │   ├── Button.jsx
    │   ├── Card.jsx
    │   ├── Input.jsx
    │   └── Skeleton.jsx
    └── lib/
        ├── api.js         ← API client
        └── utils.js       ← Utilities
```

---

## Available Scripts

```bash
npm run dev      # Start development server (port 2116)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Configuration Files

### Port Configuration (Already Set!)
- **Frontend**: Port 2116 (vite.config.js)
- **Backend**: Port 2115 (.env & api.js)

### Environment Variables
File `.env` already included:
```
VITE_API_BASE_URL=http://localhost:2115
```

### Proxy Configuration
`vite.config.js` already configured:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:2115',
    changeOrigin: true,
  },
}
```

---

## Features

✅ Modern banking UI design
✅ Responsive (mobile-first)
✅ Dark mode support
✅ Real-time loading states
✅ Error handling
✅ Status badges
✅ Currency formatting (IDR)
✅ Smooth animations
✅ Professional corporate look

---

## Tech Stack

- **React** 18.3
- **Vite** 5.x (Build tool)
- **Tailwind CSS** 4.x (Styling)
- **Axios** (HTTP client)
- **Lucide React** (Icons)

---

## Need Help?

1. Check `FRONTEND_README.md` for detailed documentation
2. Verify backend is running: `curl http://localhost:2115/api/v1/health`
3. Check browser console for errors
4. Verify `.env` file exists and has correct URL

---

## Success Checklist

- [ ] ZIP extracted
- [ ] `npm install` completed without errors
- [ ] Backend running at port 2115
- [ ] `npm run dev` running
- [ ] Browser open at http://localhost:2116
- [ ] UI loads without errors
- [ ] Search for "000000001" returns data

---

**Selamat! Frontend sudah siap digunakan! 🎉**

**URL Frontend**: http://localhost:2116
**URL Backend**: http://localhost:2115
