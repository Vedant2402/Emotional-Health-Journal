# 🌸 MindBloom - Your Emotional Wellness Journey

<div align="center">
  <img src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop" alt="MindBloom Banner" width="100%" height="200" style="border-radius: 12px; object-fit: cover;">
  
  <h3>A beautiful, intuitive platform for tracking your emotions, journaling your thoughts, and discovering patterns in your mental wellness journey.</h3>
  
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-10.7.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

---

## ✨ Features

### 🎭 **Mood Tracking**
- **8 Distinct Moods**: From "Blooming" 🌸 to "Anxious" 😰 with beautiful gradient designs
- **Special Animations**: Unique visual effects for "Blooming" and "Amazing" moods
- **Weekly Overview**: Visual representation of your emotional journey over the past 7 days
- **Contextual Notes**: Add personal notes to each mood entry for deeper reflection
- **Real-time Sync**: All mood data syncs instantly across devices

### 📝 **Journaling**
- **Rich Text Editor**: Clean, distraction-free writing environment
- **Emotion Tags**: Categorize entries with feelings like Grateful, Excited, Motivated, etc.
- **Writing Prompts**: Daily inspirational prompts to spark reflection
- **Entry History**: Browse and revisit all your past journal entries
- **Auto-save**: Never lose your thoughts with automatic saving

### 📊 **Analytics & Insights**
- **Mood Statistics**: Track your most common emotions and patterns
- **Streak Tracking**: Monitor your consistency with current and longest streaks
- **Visual Charts**: Beautiful data visualization of your emotional journey
- **Progress Metrics**: See your total check-ins and weekly activity
- **Personalized Affirmations**: Daily positive messages to encourage your wellness journey

### 🔐 **Authentication & Security**
- **Secure Sign-up/Sign-in**: Email and password authentication via Firebase
- **User Profiles**: Personalized experience with display names and avatars
- **Data Privacy**: Your emotional data is encrypted and securely stored
- **Session Management**: Automatic session handling with persistent login

### 🎨 **Beautiful Design**
- **Apple-level Aesthetics**: Clean, sophisticated, and intuitive interface
- **Responsive Design**: Perfect experience on mobile, tablet, and desktop
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Gradient Themes**: Beautiful color schemes that promote calm and positivity
- **Accessibility**: High contrast ratios and keyboard navigation support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vedantkankate/mindbloom.git
   cd mindbloom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Realtime Database
   - Copy your Firebase config

4. **Configure Firebase**
   - Open `src/lib/firebase.js`
   - Replace the placeholder config with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
     projectId: "your-project-id",
     storageBucket: "your-project.firebasestorage.app",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id",
     measurementId: "your-measurement-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Create an account and start your wellness journey! 🌱

---

## 🏗️ Project Structure

```
mindbloom/
├── src/
│   ├── components/           # React components
│   │   ├── Analytics.jsx     # Insights and statistics
│   │   ├── AuthPage.jsx      # Authentication interface
│   │   ├── Footer.jsx        # App footer with creator info
│   │   ├── Header.jsx        # Navigation and user menu
│   │   ├── Journal.jsx       # Journaling interface
│   │   ├── LoadingScreen.jsx # Beautiful loading animation
│   │   └── MoodTracker.jsx   # Mood tracking interface
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js       # Authentication logic
│   │   └── useFirestore.js  # Database operations
│   ├── lib/                 # Configuration and utilities
│   │   └── firebase.js      # Firebase configuration
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and animations
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite build configuration
└── README.md               # This file
```

---

## 🛠️ Technology Stack

### **Frontend**
- **React 18.3.1** - Modern UI library with hooks and functional components
- **Vite 5.4.2** - Lightning-fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, customizable icons

### **Backend & Services**
- **Firebase Authentication** - Secure user authentication
- **Firebase Realtime Database** - Real-time data synchronization
- **Firebase Analytics** - User behavior insights

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes
- **Modern JavaScript (ES2020+)** - Latest language features

---

## 🎨 Design Philosophy

MindBloom follows **Apple-level design aesthetics** with focus on:

- **Simplicity**: Clean, uncluttered interfaces that don't overwhelm
- **Consistency**: Unified design language across all components
- **Accessibility**: High contrast ratios and intuitive navigation
- **Delight**: Thoughtful animations and micro-interactions
- **Wellness**: Calming colors and positive visual elements

### **Color Palette**
- **Primary**: Emerald to Teal gradients (`from-emerald-500 to-teal-600`)
- **Mood Colors**: Unique gradients for each emotional state
- **Neutrals**: Sophisticated grays and whites for balance
- **Accents**: Soft pastels for highlights and special states

---

## 📱 Features in Detail

### **Mood Tracking System**
The mood tracker offers 8 carefully selected emotional states:

1. **🌸 Blooming** - Peak wellness with special petal animations
2. **🤩 Amazing** - High energy with sparkle effects
3. **😊 Happy** - Positive and content
4. **😌 Good** - Stable and peaceful
5. **😐 Okay** - Neutral baseline
6. **😕 Meh** - Slightly down
7. **😢 Sad** - Low mood requiring attention
8. **😰 Anxious** - Stress and worry

Each mood features:
- Unique emoji and color gradient
- Special animations for "Blooming" and "Amazing"
- Contextual note-taking capability
- Historical tracking and visualization

### **Journal System**
The journaling feature includes:
- **Writing Prompts**: Rotating daily questions to inspire reflection
- **Emotion Tags**: 6 predefined tags (Grateful, Excited, Motivated, Peaceful, Creative, Blooming)
- **Rich Formatting**: Clean text editor with focus on content
- **Entry Management**: Browse, search, and revisit past entries

### **Analytics Dashboard**
Comprehensive insights including:
- **Weekly Mood Chart**: Visual representation of emotional patterns
- **Mood Breakdown**: Percentage distribution of different emotions
- **Streak Tracking**: Current and longest consecutive tracking periods
- **Progress Metrics**: Total entries, weekly activity, and trends
- **Motivational Content**: Daily affirmations and encouragement

---

## 🔧 Configuration

### **Firebase Setup**
1. Create a Firebase project
2. Enable Authentication with Email/Password
3. Set up Realtime Database with these rules:
   ```json
   {
     "rules": {
       "moods": {
         ".read": "auth != null",
         ".write": "auth != null",
         "$uid": {
           ".validate": "newData.child('userId').val() === auth.uid"
         }
       },
       "journals": {
         ".read": "auth != null",
         ".write": "auth != null",
         "$uid": {
           ".validate": "newData.child('userId').val() === auth.uid"
         }
       }
     }
   }
   ```

### **Environment Variables**
No environment variables needed - Firebase config is directly in the code for simplicity.

---

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Deploy to Netlify**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up continuous deployment from your Git repository

### **Deploy to Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

---

## 🤝 Contributing

We welcome contributions to make MindBloom even better! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes across different devices and browsers
- Update documentation if needed
- Ensure accessibility standards are maintained

### **Areas for Contribution**
- 🎨 UI/UX improvements and new animations
- 📊 Additional analytics and insights features
- 🔧 Performance optimizations
- 🌐 Internationalization and localization
- 📱 Mobile app development (React Native)
- 🧪 Testing and quality assurance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About the Creator

<div align="center">
  <img src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" alt="Vedant Kankate" width="100" height="100" style="border-radius: 50%;">
  
  **Vedant Kankate**
  
  *Passionate about creating digital experiences that promote mental wellness and emotional growth.*
  
  [![Portfolio](https://img.shields.io/badge/Portfolio-vedantkankate.com-emerald?style=for-the-badge&logo=globe&logoColor=white)](https://vedantkankate.com)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-vedantkankate-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/vedantkankate)
  [![GitHub](https://img.shields.io/badge/GitHub-vedantkankate-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vedantkankate)
</div>

---

## 🙏 Acknowledgments

- **Design Inspiration**: Apple's Human Interface Guidelines
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent iconography
- **Images**: [Pexels](https://pexels.com/) for high-quality stock photography
- **Color Palettes**: Inspired by nature and wellness themes
- **Typography**: System fonts for optimal readability and performance

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create an Issue**: Report bugs or request features
3. **Contact**: Reach out via [LinkedIn](https://linkedin.com/in/vedantkankate)
4. **Documentation**: Refer to this README and inline code comments

---

<div align="center">
  <h3>🌸 Start your wellness journey today with MindBloom! 🌸</h3>
  <p><em>Your mind deserves to bloom.</em></p>
  
  **Made with ❤️ by Vedant Kankate**
</div>