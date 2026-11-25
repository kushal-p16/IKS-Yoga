import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ExplorePoses from './pages/ExplorePoses';
import PoseDetail from './pages/PoseDetail';
import AIAssistant from './pages/AIAssistant';
import RoutineGenerator from './pages/RoutineGenerator';
import MyRoutines from './pages/MyRoutines';
import AboutIKS from './pages/AboutIKS';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans antialiased transition-colors duration-400">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/poses" element={<ExplorePoses />} />
              <Route path="/pose/:id" element={<PoseDetail />} />
              <Route path="/assistant" element={<AIAssistant />} />
              <Route path="/routine-generator" element={<RoutineGenerator />} />
              <Route path="/my-routines" element={<MyRoutines />} />
              <Route path="/about-iks" element={<AboutIKS />} />
            </Routes>
          </main>

          {/* Botanical Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
