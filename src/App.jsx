import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Layers,
  Search,
  Sparkles,
  Trophy,
  UserCheck,
  ArrowUpRight,
  ChevronRight,
  FileText,
  Plus,
  X,
  Shield,
  Filter,
  User,
  LogOut,
  Upload,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  Command,
  PartyPopper,
  Zap,
  Check,
  TrendingUp,
  Brain,
  HelpCircle,
  Share2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Cpu,
  Bot,
  Terminal,
  ExternalLink,
  Play,
  Star,
  Activity,
  Sliders,
  CheckSquare,
  ArrowRight,
  Globe,
  Briefcase,
  GraduationCap,
  Building2,
  Code2
} from 'lucide-react';
import supabase from './lib/supabaseClient';

// Import Modular Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PartnerMarquee from './components/PartnerMarquee';
import HiringDrivesTab from './components/HiringDrivesTab';
import ResumeMatcherTab from './components/ResumeMatcherTab';
import PrepTab from './components/PrepTab';
import NoticesTab from './components/NoticesTab';
import ResourcesTab from './components/ResourcesTab';
import TasksTab from './components/TasksTab';
import PlacementsTab from './components/PlacementsTab';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import Modals from './components/Modals';
import Footer from './components/Footer';

// Audio feedback helper
const playAudioFeedback = (type = 'click') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch (e) {
    // Audio fallback
  }
};

// Confetti canvas component for high-impact celebrations
const ConfettiCanvas = ({ active, onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#F59E0B', '#10B981', '#8B5CF6'];

    for (let i = 0; i < 110; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 350,
        y: canvas.height / 2 + (Math.random() - 0.5) * 250,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1) * 16 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    let animationFrame;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28;
        p.rotation += p.rSpeed;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrame = requestAnimationFrame(render);
      } else if (onComplete) {
        onComplete();
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

export default function App() {
  // Roles: 'student' | 'club_student' | 'coordinator' | 'hod'
  const [currentRole, setCurrentRole] = useState('student');
  const [currentDept, setCurrentDept] = useState('CSE');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResourceCategory, setSelectedResourceCategory] = useState('All');
  const [billingCycle, setBillingCycle] = useState('annual');

  // Supabase Persistent State
  const [notices, setNotices] = useState([]);
  const [resources, setResources] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interactive Features State
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [bookmarkedNotices, setBookmarkedNotices] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [activePrepQuestionIndex, setActivePrepQuestionIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Interactive Resume AI Matcher Widget State
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Fullstack Engineer');
  const [aiMatchResult, setAiMatchResult] = useState(null);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);

  // Agent Pipeline Toggles
  const [agentRules, setAgentRules] = useState([
    { id: 1, title: 'Autonomous ATS Resume Scoring', desc: 'Auto-evaluate candidate resumes against role requirements upon application', active: true },
    { id: 2, title: 'AI Video Assessment Dispatch', desc: 'Automatically send AI technical screening links to candidates with >80% ATS score', active: true },
    { id: 3, title: 'Multi-Channel Circular Broadcast', desc: 'Sync announcements across Placement Portal, Email, and Student Discord/Telegram', active: true },
    { id: 4, title: 'Instant Offer Letter & Contract Bot', desc: 'Generate verified PDF offer summaries and log candidate acceptances', active: false }
  ]);

  // Modal States
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);

  // Form States
  const [newNotice, setNewNotice] = useState({ title: '', content: '', category: 'General', attachment_url: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', department: 'CSE', deadline: '', status: 'todo' });
  const [newResource, setNewResource] = useState({ title: '', category: 'Technical', month: 'August 2026', file_url: '' });
  const [newPlacement, setNewPlacement] = useState({ student_name: '', company: '', role: '', package: '', department: 'CSE', quote: '' });

  // Flashcards Dataset
  const flashcards = [
    {
      q: "What is the difference between Synchronous and Asynchronous execution?",
      a: "Synchronous execution blocks the main looper thread until completion. Asynchronous execution delegates work to worker pools or promises without blocking."
    },
    {
      q: "Explain ACID properties in Relational Database Systems.",
      a: "Atomicity (all-or-nothing transactions), Consistency (invariants maintained), Isolation (concurrent transaction independence), Durability (persisted commits)."
    },
    {
      q: "How does the STAR Method elevate Behavioral Interviews?",
      a: "Structure your response into Situation (context), Task (objective), Action (specific steps taken with tech), and Result (quantifiable impact)."
    },
    {
      q: "What is the primary advantage of B-Tree Database Indexing?",
      a: "B-Trees reduce disk seek time from O(N) full table scans down to O(log N) logarithmic node traversals for high-cardinality searches."
    }
  ];

  // Hiring Drives Mockup Data for COSMOQ Desk
  const featuredDrives = [
    { id: 'drive-1', company: 'Google', role: 'Software Engineer - AI Systems', package: '₹32.5 LPA', dept: 'CSE / IT', location: 'Bengaluru / Hybrid', deadline: 'Aug 30, 2026', matchScore: 96, applicants: 142, tags: ['Python', 'PyTorch', 'Distributed Systems'] },
    { id: 'drive-2', company: 'Microsoft', role: 'Cloud Solutions Architect', package: '₹28.0 LPA', dept: 'CSE / ECE / IT', location: 'Hyderabad', deadline: 'Sep 02, 2026', matchScore: 92, applicants: 189, tags: ['Azure', 'Kubernetes', 'Go'] },
    { id: 'drive-3', company: 'NVIDIA', role: 'CUDA Performance Engineer', package: '₹35.0 LPA', dept: 'CSE / ECE', location: 'Bengaluru', deadline: 'Sep 05, 2026', matchScore: 89, applicants: 98, tags: ['C++', 'CUDA', 'Parallel Computing'] },
    { id: 'drive-4', company: 'Goldman Sachs', role: 'Quantitative Developer', package: '₹30.0 LPA', dept: 'All Depts', location: 'Mumbai', deadline: 'Sep 10, 2026', matchScore: 85, applicants: 215, tags: ['Java', 'Algorithms', 'Financial Math'] }
  ];

  // Fetch real data from Supabase backend
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data: noticesData, error: noticesErr } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });
      if (!noticesErr && noticesData) setNotices(noticesData);

      const { data: tasksData, error: tasksErr } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      if (!tasksErr && tasksData) setTasks(tasksData);

      const { data: resourcesData, error: resourcesErr } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      if (!resourcesErr && resourcesData) setResources(resourcesData);

      const { data: placementsData, error: placementsErr } = await supabase
        .from('placements')
        .select('*')
        .order('created_at', { ascending: false });
      if (!placementsErr && placementsData) setPlacements(placementsData);
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Hotkey listener for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
        playAudioFeedback('pop');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (text) => {
    setToastMessage(text);
    playAudioFeedback('pop');
    setTimeout(() => setToastMessage(null), 3200);
  };

  const fireCelebration = () => {
    setTriggerConfetti(true);
    playAudioFeedback('success');
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    playAudioFeedback('click');
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    if (newStatus === 'done') {
      fireCelebration();
      showToast('Task completed! COSMOQ Agent updated progress 🎉');
    } else {
      showToast(`Task status updated to ${newStatus.replace('_', ' ')}`);
    }

    try {
      const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
      if (error) console.error('Error updating task status:', error);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleBookmark = (noticeId) => {
    playAudioFeedback('click');
    if (bookmarkedNotices.includes(noticeId)) {
      setBookmarkedNotices(prev => prev.filter(id => id !== noticeId));
      showToast('Removed notice from saved list');
    } else {
      setBookmarkedNotices(prev => [...prev, noticeId]);
      showToast('Saved notice to reading list!');
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    playAudioFeedback('success');
    const item = {
      title: newNotice.title,
      content: newNotice.content,
      category: newNotice.category,
      attachment_url: newNotice.attachment_url || null
    };

    try {
      const { data, error } = await supabase.from('notices').insert([item]).select();
      if (!error && data) {
        setNotices([data[0], ...notices]);
      } else {
        if (error) console.error('Error inserting notice:', error);
        setNotices([{ ...item, id: Date.now().toString(), created_at: new Date().toISOString() }, ...notices]);
      }
    } catch (err) {
      setNotices([{ ...item, id: Date.now().toString(), created_at: new Date().toISOString() }, ...notices]);
    }

    setIsNoticeModalOpen(false);
    setNewNotice({ title: '', content: '', category: 'General', attachment_url: '' });
    showToast('Broadcast Notice Published & AI Synced!');
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    playAudioFeedback('success');
    const item = {
      title: newTask.title,
      description: newTask.description,
      department: newTask.department,
      deadline: newTask.deadline || new Date().toISOString().split('T')[0],
      status: 'todo'
    };

    try {
      const { data, error } = await supabase.from('tasks').insert([item]).select();
      if (!error && data) {
        setTasks([data[0], ...tasks]);
      } else {
        if (error) console.error('Error inserting task:', error);
        setTasks([{ ...item, id: Date.now().toString() }, ...tasks]);
      }
    } catch (err) {
      setTasks([{ ...item, id: Date.now().toString() }, ...tasks]);
    }

    setIsTaskModalOpen(false);
    setNewTask({ title: '', description: '', department: 'CSE', deadline: '', status: 'todo' });
    showToast('Department Task created & assigned to agent!');
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    playAudioFeedback('success');
    const item = {
      title: newResource.title,
      category: newResource.category,
      month: newResource.month,
      file_url: newResource.file_url || '#'
    };

    try {
      const { data, error } = await supabase.from('resources').insert([item]).select();
      if (!error && data) {
        setResources([data[0], ...resources]);
      } else {
        if (error) console.error('Error inserting resource:', error);
        setResources([{ ...item, id: Date.now().toString() }, ...resources]);
      }
    } catch (err) {
      setResources([{ ...item, id: Date.now().toString() }, ...resources]);
    }

    setIsResourceModalOpen(false);
    setNewResource({ title: '', category: 'Technical', month: 'August 2026', file_url: '' });
    showToast('Study Repository item uploaded!');
  };

  const handleCreatePlacement = async (e) => {
    e.preventDefault();
    fireCelebration();
    const item = {
      student_name: newPlacement.student_name,
      company: newPlacement.company,
      role: newPlacement.role,
      package: newPlacement.package,
      department: newPlacement.department,
      quote: newPlacement.quote
    };

    try {
      const { data, error } = await supabase.from('placements').insert([item]).select();
      if (!error && data) {
        setPlacements([data[0], ...placements]);
      } else {
        setPlacements([{ ...item, id: Date.now().toString() }, ...placements]);
      }
    } catch (err) {
      setPlacements([{ ...item, id: Date.now().toString() }, ...placements]);
    }

    setIsPlacementModalOpen(false);
    setNewPlacement({ student_name: '', company: '', role: '', package: '', department: 'CSE', quote: '' });
    showToast('Placement Record published to Wall of Fame! 🎉');
  };

  // Run AI Resume Score Analysis Simulation
  const handleAnalyzeResume = () => {
    if (!resumeText.trim()) {
      showToast('Please enter or paste resume details first!');
      return;
    }
    setIsAnalyzingResume(true);
    playAudioFeedback('pop');

    setTimeout(() => {
      setIsAnalyzingResume(false);
      const score = Math.floor(Math.random() * 20) + 78;
      setAiMatchResult({
        score,
        targetRole,
        matchingSkills: ['Data Structures', 'React.js', 'System Architecture', 'REST APIs', 'PostgreSQL'],
        missingKeywords: ['Docker Containerization', 'GraphQL', 'CI/CD Pipelines'],
        recommendation: score >= 88 
          ? 'High match! Your profile is strong for top-tier hiring drives.' 
          : 'Good foundation. Add system design projects & Cloud concepts to boost ATS score above 90%.'
      });
      playAudioFeedback('success');
      showToast(`AI Evaluation complete! ATS Score: ${score}%`);
    }, 1200);
  };

  // Toggle Agent Rule Activation
  const toggleAgentRule = (id) => {
    playAudioFeedback('click');
    setAgentRules(prev => prev.map(rule => rule.id === id ? { ...rule, active: !rule.active } : rule));
    showToast('COSMOQ Agent workflow config updated');
  };

  // Permissions
  const canManageAll = currentRole === 'coordinator';
  const canPostNotices = currentRole === 'coordinator' || currentRole === 'club_student';
  const canUpdateDepartmentTasks = currentRole === 'coordinator' || currentRole === 'club_student';

  const filteredTasks = tasks.filter(t => {
    if (currentRole === 'hod' || currentRole === 'coordinator') return true;
    return t.department === currentDept;
  });

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden bg-line-grid">
      
      {/* Confetti Celebration Canvas Layer */}
      <ConfettiCanvas active={triggerConfetti} onComplete={() => setTriggerConfetti(false)} />

      {/* Floating Ambient Glowing Spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] glow-radial-blue pointer-events-none opacity-60 z-0" />
      <div className="absolute top-[600px] right-0 w-[550px] h-[550px] glow-radial-purple pointer-events-none opacity-40 z-0" />
      <div className="absolute top-[1600px] left-0 w-[600px] h-[600px] glow-radial-amber pointer-events-none opacity-30 z-0" />

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121829] text-white px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-blue-500/40 flex items-center gap-3 text-xs font-semibold tracking-wide animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
          {toastMessage}
        </div>
      )}

      {/* Navbar */}
      <Navbar
        setActiveTab={setActiveTab}
        playAudioFeedback={playAudioFeedback}
        setIsCommandOpen={setIsCommandOpen}
        currentDept={currentDept}
        setCurrentDept={setCurrentDept}
        showToast={showToast}
        setIsNotificationDrawerOpen={setIsNotificationDrawerOpen}
        isNotificationDrawerOpen={isNotificationDrawerOpen}
        notices={notices}
        bookmarkedNotices={bookmarkedNotices}
        toggleBookmark={toggleBookmark}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />

      {/* Hero Section */}
      <HeroSection
        setActiveTab={setActiveTab}
        playAudioFeedback={playAudioFeedback}
        setIsVideoModalOpen={setIsVideoModalOpen}
        noticesLength={notices.length}
      />

      {/* Hiring Partner Logo Marquee */}
      <PartnerMarquee />

      {/* Navigation Tabs Bar */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-white/10">
          {[
            { id: 'overview', label: 'Overview & AI Desk', icon: Cpu },
            { id: 'drives', label: 'Hiring Drives Desk', icon: Briefcase },
            { id: 'resume_ai', label: 'Resume ATS Matcher', icon: Brain },
            { id: 'prep_ai', label: 'AI Flashcard Prep', icon: Code2 },
            { id: 'notices', label: 'Notices & Circulars', icon: Bell },
            { id: 'resources', label: 'Study Repository', icon: BookOpen },
            { id: 'tasks', label: 'Department Tasks', icon: Layers },
            { id: 'placements', label: 'Wall of Fame', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); playAudioFeedback('click'); }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Admin Control Bar */}
        {(canPostNotices || canManageAll) && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl cosmo-glass-card border border-blue-500/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              <Shield className="w-4 h-4 text-blue-400" /> Admin Controls Active ({currentRole.replace('_', ' ')})
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {canPostNotices && (
                <button 
                  onClick={() => { setIsNoticeModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide transition-all transform hover:scale-105 inline-flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" /> Post Circular
                </button>
              )}
              {canUpdateDepartmentTasks && (
                <button 
                  onClick={() => { setIsTaskModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-slate-200 text-xs font-bold tracking-wide hover:bg-white/10 transition-all inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Assign Task
                </button>
              )}
              {canManageAll && (
                <button 
                  onClick={() => { setIsResourceModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-slate-200 text-xs font-bold tracking-wide hover:bg-white/10 transition-all inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Material
                </button>
              )}
              {canManageAll && (
                <button 
                  onClick={() => { setIsPlacementModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-bold tracking-wide hover:bg-amber-500/20 transition-all inline-flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> Publish Placed Candidate
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Main Tab View Contents */}
      <main className="max-w-7xl mx-auto px-6 pb-20 pt-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Bento Grid Feature Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Multi-Agent Workflow Engine */}
              <div className="lg:col-span-2 cosmo-glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-4">
                    <Bot className="w-3.5 h-3.5" /> MULTI-AGENT WORKFLOW ORCHESTRATION
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">Automated Hiring & Screening Pipeline</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                    Configure multi-agent rules to auto-screen candidates, schedule interview slots, sync notices to Telegram, and log placement records seamlessly.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-colors">
                    <div className="text-blue-400 font-bold flex items-center justify-between">
                      <span>Node #1</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-white font-semibold mt-1">Resume Ingestion</div>
                    <div className="text-[11px] text-slate-400 mt-1">Auto-extract tech skills & GPA metrics</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-colors">
                    <div className="text-blue-400 font-bold flex items-center justify-between">
                      <span>Node #2</span>
                      <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    </div>
                    <div className="text-white font-semibold mt-1">AI ATS Evaluator</div>
                    <div className="text-[11px] text-slate-400 mt-1">Match candidate vs Job Description</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-colors">
                    <div className="text-blue-400 font-bold flex items-center justify-between">
                      <span>Node #3</span>
                      <Bot className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="text-white font-semibold mt-1">Auto Schedule</div>
                    <div className="text-[11px] text-slate-400 mt-1">Dispatch interview links & notices</div>
                  </div>
                </div>
              </div>

              {/* Card 2: AI Flashcard Trainer Mini Widget */}
              <div className="cosmo-glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" /> AI INTERVIEW TRAINER
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Card {activePrepQuestionIndex + 1}/{flashcards.length}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {flashcards[activePrepQuestionIndex].q}
                  </h4>
                  
                  {showFlashcardAnswer && (
                    <div className="mt-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 animate-in fade-in">
                      {flashcards[activePrepQuestionIndex].a}
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => { setShowFlashcardAnswer(!showFlashcardAnswer); playAudioFeedback('click'); }}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all"
                  >
                    {showFlashcardAnswer ? 'Hide AI Solution' : 'Reveal AI Solution'}
                  </button>
                  <button
                    onClick={() => {
                      setActivePrepQuestionIndex((prev) => (prev + 1) % flashcards.length);
                      setShowFlashcardAnswer(false);
                      playAudioFeedback('pop');
                    }}
                    className="w-full py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1"
                  >
                    <span>Next Practice Question</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Live Announcements & Automation Config */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2 font-display">
                    <Bell className="w-4 h-4 text-blue-400" /> Recent Circulars & Placement Notices
                  </h3>
                  <button 
                    onClick={() => { setActiveTab('notices'); playAudioFeedback('click'); }}
                    className="text-xs font-semibold text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    View All Notices <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {loading ? (
                  <div className="p-8 cosmo-glass-card rounded-2xl text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> Fetching circulars from Supabase...
                  </div>
                ) : notices.length === 0 ? (
                  <div className="cosmo-glass-card p-8 rounded-2xl text-center space-y-3">
                    <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                    <div className="text-sm font-bold text-white">No announcements published yet</div>
                    <p className="text-xs text-slate-400">
                      {canPostNotices ? 'Use the button above to post the first broadcast notice.' : 'Check back later for placement notices.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notices.slice(0, 3).map((notice) => (
                      <div 
                        key={notice.id}
                        className="cosmo-glass-card p-5 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-300">
                                {notice.category}
                              </span>
                              <span className="text-xs text-slate-400">
                                {notice.created_at ? new Date(notice.created_at).toLocaleDateString() : 'Just now'}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-white leading-snug group-hover:text-blue-300">
                              {notice.title}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {notice.content}
                            </p>
                          </div>

                          <button
                            onClick={() => toggleBookmark(notice.id)}
                            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-blue-500/40 text-slate-300 transition-colors"
                            title="Save Circular"
                          >
                            {bookmarkedNotices.includes(notice.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Bookmark className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* COSMOQ Automation Config */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2 font-display">
                  <Sliders className="w-4 h-4 text-amber-400" /> COSMOQ Automation Rules
                </h3>
                
                <div className="space-y-3">
                  {agentRules.map((rule) => (
                    <div 
                      key={rule.id}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        rule.active 
                          ? 'bg-blue-500/10 border-blue-500/30' 
                          : 'bg-white/5 border-white/5 opacity-70'
                      }`}
                      onClick={() => toggleAgentRule(rule.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <Zap className={`w-3.5 h-3.5 ${rule.active ? 'text-blue-400' : 'text-slate-500'}`} />
                          {rule.title}
                        </div>
                        <div className={`w-8 h-4 rounded-full transition-colors relative ${rule.active ? 'bg-blue-600' : 'bg-slate-700'}`}>
                          <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${rule.active ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HIRING DRIVES TAB */}
        {activeTab === 'drives' && (
          <HiringDrivesTab
            featuredDrives={featuredDrives}
            currentDept={currentDept}
            fireCelebration={fireCelebration}
            showToast={showToast}
          />
        )}

        {/* RESUME ATS MATCHER TAB */}
        {activeTab === 'resume_ai' && (
          <ResumeMatcherTab
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            currentDept={currentDept}
            resumeText={resumeText}
            setResumeText={setResumeText}
            handleAnalyzeResume={handleAnalyzeResume}
            isAnalyzingResume={isAnalyzingResume}
            aiMatchResult={aiMatchResult}
          />
        )}

        {/* PREP TAB */}
        {activeTab === 'prep_ai' && (
          <PrepTab
            flashcards={flashcards}
            activePrepQuestionIndex={activePrepQuestionIndex}
            setActivePrepQuestionIndex={setActivePrepQuestionIndex}
            showFlashcardAnswer={showFlashcardAnswer}
            setShowFlashcardAnswer={setShowFlashcardAnswer}
            playAudioFeedback={playAudioFeedback}
          />
        )}

        {/* NOTICES TAB */}
        {activeTab === 'notices' && (
          <NoticesTab
            notices={notices}
            loading={loading}
            canPostNotices={canPostNotices}
            setIsNoticeModalOpen={setIsNoticeModalOpen}
            playAudioFeedback={playAudioFeedback}
            toggleBookmark={toggleBookmark}
            bookmarkedNotices={bookmarkedNotices}
          />
        )}

        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <ResourcesTab
            resources={resources}
            loading={loading}
            canManageAll={canManageAll}
            setIsResourceModalOpen={setIsResourceModalOpen}
            playAudioFeedback={playAudioFeedback}
          />
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <TasksTab
            currentDept={currentDept}
            canUpdateDepartmentTasks={canUpdateDepartmentTasks}
            setIsTaskModalOpen={setIsTaskModalOpen}
            playAudioFeedback={playAudioFeedback}
            filteredTasks={filteredTasks}
            handleTaskStatusChange={handleTaskStatusChange}
          />
        )}

        {/* PLACEMENTS TAB */}
        {activeTab === 'placements' && (
          <PlacementsTab
            placements={placements}
            loading={loading}
            canManageAll={canManageAll}
            setIsPlacementModalOpen={setIsPlacementModalOpen}
            playAudioFeedback={playAudioFeedback}
          />
        )}

        {/* PRICING SECTION */}
        <PricingSection
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          playAudioFeedback={playAudioFeedback}
          setActiveTab={setActiveTab}
          fireCelebration={fireCelebration}
          showToast={showToast}
        />

        {/* FAQ SECTION */}
        <FaqSection
          openFaqIndex={openFaqIndex}
          setOpenFaqIndex={setOpenFaqIndex}
          playAudioFeedback={playAudioFeedback}
        />

        {/* CTA BANNER */}
        <section className="mt-20 cosmo-glass-card rounded-3xl p-10 text-center relative overflow-hidden border border-blue-500/30">
          <div className="absolute inset-0 glow-radial-blue opacity-40 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold text-white font-display">Ready to Automate Your Campus Placement Engine?</h2>
            <p className="text-xs text-slate-300">Launch autonomous recruitment workflows, AI resume scoring, and live drive orchestration today.</p>
            <button
              onClick={() => { setIsCommandOpen(true); playAudioFeedback('click'); }}
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Command className="w-4 h-4" />
              <span>Launch Command Hub (⌘K)</span>
            </button>
          </div>
        </section>

      </main>

      {/* Modals & Overlays */}
      <Modals
        isCommandOpen={isCommandOpen}
        setIsCommandOpen={setIsCommandOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
        isVideoModalOpen={isVideoModalOpen}
        setIsVideoModalOpen={setIsVideoModalOpen}
        isNoticeModalOpen={isNoticeModalOpen}
        setIsNoticeModalOpen={setIsNoticeModalOpen}
        newNotice={newNotice}
        setNewNotice={setNewNotice}
        handleCreateNotice={handleCreateNotice}
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        handleCreateTask={handleCreateTask}
        isResourceModalOpen={isResourceModalOpen}
        setIsResourceModalOpen={setIsResourceModalOpen}
        newResource={newResource}
        setNewResource={setNewResource}
        handleCreateResource={handleCreateResource}
        isPlacementModalOpen={isPlacementModalOpen}
        setIsPlacementModalOpen={setIsPlacementModalOpen}
        newPlacement={newPlacement}
        setNewPlacement={setNewPlacement}
        handleCreatePlacement={handleCreatePlacement}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
