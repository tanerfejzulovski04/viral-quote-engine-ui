# Viral Quote Engine UI - MVP Demo

A complete web application demonstrating the MVP flows for a viral quote engine platform. This demo includes all the essential features for creating, editing, and managing quote graphics with AI-powered optimization.

## Features

### 🔐 Authentication
- User registration with form validation
- Login system with proper session management
- Secure logout functionality

### 🎨 Brand Kit Management
- Logo upload with live preview
- Brand color customization (Primary, Secondary, Accent)
- Persistent brand settings

### 📄 Template System
- Create and edit quote templates
- Template preview functionality
- Template library management
- Delete templates with confirmation

### ✏️ Quote Editor
- Interactive canvas-based quote editor
- Real-time text rendering with custom styling
- Multiple size presets:
  - Instagram (1080x1080)
  - Twitter/X (1200x675) 
  - Facebook (1200x630)
- AI-powered quote rewriting with multiple variants
- Style controls (font size, colors, alignment)

### 📤 Export System
- PNG export in multiple social media sizes
- High-quality canvas-to-image conversion
- Automatic asset library management

### 📁 Assets Library
- View all exported graphics
- Download previously created assets
- Delete assets with confirmation
- Organized by date and format

### 💫 User Experience
- Toast notifications for all actions
- Responsive design for mobile and desktop
- Smooth transitions and animations
- Error handling and validation
- No console errors during operation

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Canvas API**: For quote rendering and export
- **CSS Grid & Flexbox**: For responsive layouts
- **Font Awesome**: For icons
- **Local Storage**: For data persistence (can be easily extended)

## Demo Flows

This application demonstrates all the required MVP integration flows:

1. **Register → Login**: Complete user authentication flow
2. **Brand Kit & Logo Upload**: Customizable brand identity setup
3. **Template Creation/Editing**: Template management system
4. **Quote Editor**: Full-featured editor with AI rewriting and size presets
5. **PNG Export**: Export functionality for Instagram and Twitter/X sizes
6. **Assets Library Management**: View and delete exported assets

## Getting Started

1. Clone this repository
2. Open `index.html` in a modern web browser
3. Start with the "Get Started" button to begin the demo flow

## File Structure

```
viral-quote-engine-ui/
├── index.html          # Main application HTML
├── styles.css          # Complete styling and responsive design
├── app.js             # Application logic and functionality
└── README.md          # This file
```

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

*Note: Canvas export functionality requires a modern browser with Canvas API support.*

## Features Demonstrated

✅ User registration and login
✅ Brand kit setup with logo upload
✅ Template creation and editing
✅ Quote editor with AI rewrite functionality
✅ PNG export for Instagram and Twitter/X sizes
✅ Assets library with delete functionality
✅ Appropriate UX toasts for all actions
✅ No console errors during normal operation
✅ Responsive design for all screen sizes

## Next Steps

This MVP demo provides a solid foundation for a full-featured viral quote engine platform. Potential enhancements could include:

- Backend API integration
- Real AI/ML integration for quote optimization
- Advanced template designer
- Social media publishing
- Analytics and engagement tracking
- User collaboration features

---

*This is a demonstration application created to showcase MVP integration flows for manual smoke testing.*