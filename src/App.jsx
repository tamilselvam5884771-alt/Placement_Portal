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
import LeftSidebar from './components/LeftSidebar';
import TopHeader from './components/TopHeader';
import LandingPage from './components/LandingPage';
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
import ThemeDrawer from './components/ThemeDrawer';

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
    const colors = ['#E11D48', '#F43F5E', '#FB7185', '#FDA4AF', '#BE123C', '#9F1239'];

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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' = Animated Landing Page
  const [searchQuery, setSearchQuery] = useState('');
  const [billingCycle, setBillingCycle] = useState('annual');

  // Sidebar Layout State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Theme & Flexibility State (persisted in localStorage)
  const [themePalette, setThemePalette] = useState(() => localStorage.getItem('cosmo_theme_palette') || 'crimson');
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('cosmo_theme_mode') || 'light');
  const [layoutDensity, setLayoutDensity] = useState(() => localStorage.getItem('cosmo_layout_density') || 'normal');
  const [bgPattern, setBgPattern] = useState(() => localStorage.getItem('cosmo_bg_pattern') || 'grid');
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const [widgetVisibility, setWidgetVisibility] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmo_widget_visibility');
      return saved ? JSON.parse(saved) : { hero: true, stats: true, drives: true, resume: true, notices: true, tasks: true, placements: true };
    } catch (e) {
      return { hero: true, stats: true, drives: true, resume: true, notices: true, tasks: true, placements: true };
    }
  });

  // Sync Theme Attributes with HTML Root Element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themePalette);
    root.setAttribute('data-mode', themeMode);
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cosmo_theme_palette', themePalette);
    localStorage.setItem('cosmo_theme_mode', themeMode);
    localStorage.setItem('cosmo_layout_density', layoutDensity);
    localStorage.setItem('cosmo_bg_pattern', bgPattern);
    localStorage.setItem('cosmo_widget_visibility', JSON.stringify(widgetVisibility));
  }, [themePalette, themeMode, layoutDensity, bgPattern, widgetVisibility]);

  // Supabase Persistent State
  const [notices, setNotices] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmo_cached_notices');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [resources, setResources] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmo_cached_resources');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmo_cached_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [placements, setPlacements] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmo_cached_placements');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [loading, setLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Interactive Features State
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [bookmarkedNotices, setBookmarkedNotices] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
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

  // Hiring Drives Data
  const featuredDrives = [
    { id: 'drive-1', company: 'Google', role: 'Software Engineer - AI Systems', package: '₹32.5 LPA', dept: 'CSE / IT', location: 'Bengaluru / Hybrid', deadline: 'Aug 30, 2026', matchScore: 96, applicants: 142, tags: ['Python', 'PyTorch', 'Distributed Systems'] },
    { id: 'drive-2', company: 'Microsoft', role: 'Cloud Solutions Architect', package: '₹28.0 LPA', dept: 'CSE / ECE / IT', location: 'Hyderabad', deadline: 'Sep 02, 2026', matchScore: 92, applicants: 189, tags: ['Azure', 'Kubernetes', 'Go'] },
    { id: 'drive-3', company: 'NVIDIA', role: 'CUDA Performance Engineer', package: '₹35.0 LPA', dept: 'CSE / ECE', location: 'Bengaluru', deadline: 'Sep 05, 2026', matchScore: 89, applicants: 98, tags: ['C++', 'CUDA', 'Parallel Computing'] },
    { id: 'drive-4', company: 'Goldman Sachs', role: 'Quantitative Developer', package: '₹30.0 LPA', dept: 'All Depts', location: 'Mumbai', deadline: 'Sep 10, 2026', matchScore: 85, applicants: 215, tags: ['Java', 'Algorithms', 'Financial Math'] }
  ];

  // Default Datasets
  const defaultNotices = [
    { id: 'notice-1', title: 'Google Campus Drive 2026 Registration Open', category: 'Interview Schedule', content: 'Registration for Google Software Engineer - AI Systems drive closes on August 30. Eligible: CSE & IT 2026 Batch with CGPA >= 7.5.', created_at: new Date(Date.now() - 3600000).toISOString(), attachment_url: '#' },
    { id: 'notice-2', title: 'Amazon SDE-1 Online Assessment Slot Allotment', category: 'Urgent', content: 'All registered candidates must check their student inbox for online assessment login credentials. Test Window: 10:00 AM - 12:00 PM.', created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'notice-3', title: '1-on-1 Mock Technical Interview Series', category: 'General', content: 'Training & Placement Cell is conducting mock technical interview practice sessions for CSE, ECE, and IT students this weekend.', created_at: new Date(Date.now() - 172800000).toISOString() }
  ];

  const defaultTasks = [
    { id: 'task-1', title: 'Audit CSE 2026 Batch ATS Resumes', department: 'CSE', description: 'Verify student uploaded resume URLs for formatting & contact information.', status: 'in_progress', deadline: 'Aug 28, 2026' },
    { id: 'task-2', title: 'Coordinate Microsoft Interview Labs', department: 'ECE', description: 'Setup 15 high-performance desktop rigs with Teams & Visual Studio Code.', status: 'todo', deadline: 'Sep 01, 2026' },
    { id: 'task-3', title: 'Publish Placement Hall of Fame Banner', department: 'IT', description: 'Collect quotes and offer letters from 24 newly placed candidates.', status: 'done', deadline: 'Aug 24, 2026' }
  ];

  const defaultResources = [
    { id: 'res-1', title: 'System Design & Distributed Systems Handbook 2026', category: 'System Design', month: 'August 2026', file_url: '#' },
    { id: 'res-2', title: 'Top 100 Data Structures & Algorithms Problem Patterns', category: 'Technical', month: 'August 2026', file_url: '#' },
    { id: 'res-3', title: 'Quantitative Aptitude & Logical Reasoning Master Sheet', category: 'Aptitude', month: 'July 2026', file_url: '#' },
    { id: 'res-4', title: 'Behavioral & STAR Method Interview Guide', category: 'HR', month: 'July 2026', file_url: '#' }
  ];

  const defaultPlacements = [
    { id: 'plc-1', student_name: 'Aditya Sharma', company: 'Google', role: 'Software Engineer - AI Systems', package: '₹32.5 LPA', department: 'CSE', quote: 'The AI interview trainer and ATS score matcher on the portal helped me target missing tech keywords before my final interview!' },
    { id: 'plc-2', student_name: 'Priya Nair', company: 'Microsoft', role: 'Cloud Solutions Architect', package: '₹28.0 LPA', department: 'ECE', quote: 'Having department task trackers and live circular notifications kept our whole batch organized throughout recruitment.' },
    { id: 'plc-3', student_name: 'Rahul Verma', company: 'Goldman Sachs', role: 'Quantitative Developer', package: '₹30.0 LPA', department: 'IT', quote: 'Preparation resources and mock questions gave me high confidence during algorithmic rounds.' }
  ];

  // Fetch real data from Supabase backend
  const fetchAllData = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsSyncing(true);
    else if (!notices.length && !tasks.length) setLoading(true);
    try {
      const [noticesRes, tasksRes, resourcesRes, placementsRes] = await Promise.allSettled([
        supabase.from('notices').select('*').order('created_at', { ascending: false }),
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('resources').select('*').order('created_at', { ascending: false }),
        supabase.from('placements').select('*').order('created_at', { ascending: false })
      ]);

      if (noticesRes.status === 'fulfilled' && noticesRes.value.data && noticesRes.value.data.length > 0) {
        setNotices(noticesRes.value.data);
        localStorage.setItem('cosmo_cached_notices', JSON.stringify(noticesRes.value.data));
      } else if (!notices.length) {
        setNotices(defaultNotices);
      }

      if (tasksRes.status === 'fulfilled' && tasksRes.value.data && tasksRes.value.data.length > 0) {
        setTasks(tasksRes.value.data);
        localStorage.setItem('cosmo_cached_tasks', JSON.stringify(tasksRes.value.data));
      } else if (!tasks.length) {
        setTasks(defaultTasks);
      }

      if (resourcesRes.status === 'fulfilled' && resourcesRes.value.data && resourcesRes.value.data.length > 0) {
        setResources(resourcesRes.value.data);
        localStorage.setItem('cosmo_cached_resources', JSON.stringify(resourcesRes.value.data));
      } else if (!resources.length) {
        setResources(defaultResources);
      }

      if (placementsRes.status === 'fulfilled' && placementsRes.value.data && placementsRes.value.data.length > 0) {
        setPlacements(placementsRes.value.data);
        localStorage.setItem('cosmo_cached_placements', JSON.stringify(placementsRes.value.data));
      } else if (!placements.length) {
        setPlacements(defaultPlacements);
      }

      setLastSyncTime(new Date());
    } catch (err) {
      console.error('Error in parallel data retrieval:', err);
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  };

  // Global Cross-Table Search Retrieval Index
  const globalSearchIndex = React.useMemo(() => {
    const items = [];
    featuredDrives.forEach(d => items.push({ id: d.id, title: `${d.company} - ${d.role}`, subtitle: `${d.package} • ${d.location}`, type: 'Hiring Drive', category: 'Drive', targetTab: 'drives', data: d }));
    notices.forEach(n => items.push({ id: n.id, title: n.title, subtitle: n.content, type: 'Notice / Circular', category: n.category || 'Notice', targetTab: 'notices', data: n }));
    resources.forEach(r => items.push({ id: r.id, title: r.title, subtitle: `Material Category: ${r.category || 'General'}`, type: 'Study Resource', category: r.category || 'Resource', targetTab: 'resources', data: r }));
    tasks.forEach(t => items.push({ id: t.id, title: t.title, subtitle: `Dept: ${t.department} • Status: ${t.status}`, type: 'Department Task', category: 'Task', targetTab: 'tasks', data: t }));
    placements.forEach(p => items.push({ id: p.id, title: `${p.student_name} placed at ${p.company}`, subtitle: `${p.role} (${p.package})`, type: 'Placement Record', category: 'Placement', targetTab: 'placements', data: p }));
    return items;
  }, [featuredDrives, notices, resources, tasks, placements]);

  useEffect(() => {
    fetchAllData();
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, () => fetchAllData(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => fetchAllData(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'resources' }, () => fetchAllData(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'placements' }, () => fetchAllData(true))
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
    <div className={`min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans antialiased selection:bg-rose-600 selection:text-white relative bg-pattern-${bgPattern} density-${layoutDensity} transition-colors duration-300 flex`}>
      
      {/* Confetti Celebration Canvas Layer */}
      <ConfettiCanvas active={triggerConfetti} onComplete={() => setTriggerConfetti(false)} />

      {/* Floating Ambient Glowing Background Spheres */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none opacity-60 z-0" />

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-5 py-3 rounded-2xl shadow-2xl border border-rose-500/30 flex items-center gap-3 text-xs font-semibold tracking-wide animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-spin" />
          {toastMessage}
        </div>
      )}

      {/* Dedicated Left Sidebar Navigation */}
      <LeftSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        playAudioFeedback={playAudioFeedback}
        noticesCount={notices.length}
        drivesCount={featuredDrives.length}
        tasksCount={filteredTasks.length}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        showToast={showToast}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main App Container */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        
        {/* Top Header Control Bar */}
        <TopHeader
          activeTab={activeTab}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsCommandOpen={setIsCommandOpen}
          playAudioFeedback={playAudioFeedback}
          isSyncing={isSyncing}
          onRefreshData={fetchAllData}
          currentDept={currentDept}
          setCurrentDept={setCurrentDept}
          showToast={showToast}
          setIsThemeDrawerOpen={setIsThemeDrawerOpen}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          isNotificationDrawerOpen={isNotificationDrawerOpen}
          setIsNotificationDrawerOpen={setIsNotificationDrawerOpen}
          notices={notices}
        />

        {/* Dynamic Admin Action Bar on Feature Pages */}
        {(canPostNotices || canManageAll) && activeTab !== 'overview' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 w-full">
            <div className="p-3 rounded-2xl cosmo-glass-card border border-rose-500/20 bg-rose-500/5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase">
                  {currentRole.toUpperCase()} MANAGEMENT DESK
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                  • Create updates for students
                </span>
              </div>
              <div className="flex items-center gap-2">
                {canPostNotices && (
                  <button
                    onClick={() => { setIsNoticeModalOpen(true); playAudioFeedback('click'); }}
                    className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Notice</span>
                  </button>
                )}
                {canUpdateDepartmentTasks && (
                  <button
                    onClick={() => { setIsTaskModalOpen(true); playAudioFeedback('click'); }}
                    className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                )}
                {canManageAll && (
                  <button
                    onClick={() => { setIsResourceModalOpen(true); playAudioFeedback('click'); }}
                    className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Resource</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main View Area: Render Dedicated Page Content Based on activeTab */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          
          {/* TAB 1: LANDING PAGE (DEDICATED ANIMATED LANDING PAGE) */}
          {activeTab === 'overview' && (
            <LandingPage
              setActiveTab={setActiveTab}
              playAudioFeedback={playAudioFeedback}
              setIsVideoModalOpen={setIsVideoModalOpen}
              setIsCommandOpen={setIsCommandOpen}
              notices={notices}
              loading={loading}
              canPostNotices={canPostNotices}
              bookmarkedNotices={bookmarkedNotices}
              toggleBookmark={toggleBookmark}
              agentRules={agentRules}
              toggleAgentRule={toggleAgentRule}
              flashcards={flashcards}
              activePrepQuestionIndex={activePrepQuestionIndex}
              setActivePrepQuestionIndex={setActivePrepQuestionIndex}
              showFlashcardAnswer={showFlashcardAnswer}
              setShowFlashcardAnswer={setShowFlashcardAnswer}
              openFaqIndex={openFaqIndex}
              setOpenFaqIndex={setOpenFaqIndex}
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
              fireCelebration={fireCelebration}
              showToast={showToast}
              placements={placements}
            />
          )}

          {/* TAB 2: HIRING DRIVES PAGE */}
          {activeTab === 'drives' && (
            <HiringDrivesTab
              featuredDrives={featuredDrives}
              currentDept={currentDept}
              fireCelebration={fireCelebration}
              showToast={showToast}
              playAudioFeedback={playAudioFeedback}
            />
          )}

          {/* TAB 3: RESUME ATS MATCHER PAGE */}
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

          {/* TAB 4: INTERVIEW PREP HUB PAGE */}
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

          {/* TAB 5: NOTICES & CIRCULARS PAGE */}
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

          {/* TAB 6: LEARNING RESOURCES PAGE */}
          {activeTab === 'resources' && (
            <ResourcesTab
              resources={resources}
              loading={loading}
              canManageAll={canManageAll}
              setIsResourceModalOpen={setIsResourceModalOpen}
              playAudioFeedback={playAudioFeedback}
            />
          )}

          {/* TAB 7: TASKS PAGE */}
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

          {/* TAB 8: PLACEMENT STATS & HALL OF FAME PAGE */}
          {activeTab === 'placements' && (
            <PlacementsTab
              placements={placements}
              loading={loading}
              canManageAll={canManageAll}
              setIsPlacementModalOpen={setIsPlacementModalOpen}
              playAudioFeedback={playAudioFeedback}
            />
          )}

          {/* TAB 9: PRICING PAGE */}
          {activeTab === 'pricing' && (
            <PricingSection
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
              playAudioFeedback={playAudioFeedback}
              setActiveTab={setActiveTab}
              fireCelebration={fireCelebration}
              showToast={showToast}
            />
          )}

          {/* TAB 10: FAQ PAGE */}
          {activeTab === 'faq' && (
            <FaqSection
              openFaqIndex={openFaqIndex}
              setOpenFaqIndex={setOpenFaqIndex}
              playAudioFeedback={playAudioFeedback}
            />
          )}

        </main>

        {/* Footer */}
        <Footer showToast={showToast} playAudioFeedback={playAudioFeedback} />
      </div>

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
        globalSearchIndex={globalSearchIndex}
      />

      {/* Theme & Layout Flexibility Engine Drawer */}
      <ThemeDrawer
        isOpen={isThemeDrawerOpen}
        onClose={() => setIsThemeDrawerOpen(false)}
        themePalette={themePalette}
        setThemePalette={setThemePalette}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        layoutDensity={layoutDensity}
        setLayoutDensity={setLayoutDensity}
        bgPattern={bgPattern}
        setBgPattern={setBgPattern}
        widgetVisibility={widgetVisibility}
        setWidgetVisibility={setWidgetVisibility}
        playAudioFeedback={playAudioFeedback}
        showToast={showToast}
        notices={notices}
        placements={placements}
        tasks={tasks}
      />

    </div>
  );
}
