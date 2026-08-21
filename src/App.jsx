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
  Database,
  Key,
  Lock,
  Calendar,
  Building2,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { getSupabaseClient } from './lib/supabaseClient';

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
    const colors = ['#2B1810', '#8C7A70', '#C5A880', '#D4AF37', '#E8DFD8', '#4A3225'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 300,
        y: canvas.height / 2 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 1) * 14 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
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
        p.vy += 0.25; // gravity
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

  // Supabase Configuration State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [client, setClient] = useState(() => getSupabaseClient());

  // Interactive Features State
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [bookmarkedNotices, setBookmarkedNotices] = useState(['1']);
  const [toastMessage, setToastMessage] = useState(null);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [activePrepQuestionIndex, setActivePrepQuestionIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

  // Modal States
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);

  // Forms
  const [newNotice, setNewNotice] = useState({ title: '', content: '', category: 'General', attachment_url: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', department: 'CSE', deadline: '', status: 'todo' });
  const [newResource, setNewResource] = useState({ title: '', category: 'Technical', month: 'August 2026', file_url: '' });
  const [newPlacement, setNewPlacement] = useState({ student_name: '', company: '', role: '', package: '', department: 'CSE', quote: '' });

  // Initial Data State (Backed by Supabase & Fallback Local Storage)
  const [notices, setNotices] = useState([
    {
      id: '1',
      title: 'TCS Digital Campus Recruitment Drive — Interview Schedule',
      content: 'Shortlisted candidates must report to Lab 3 by 9:00 AM in formal attire with 2 hard copies of their resume.',
      category: 'Urgent',
      attachment_url: '#',
      created_at: '2026-08-21T09:30:00Z',
      posted_by: 'Coordinator'
    },
    {
      id: '2',
      title: 'System Design & High-Performance Computing Prep Session',
      content: 'Live interactive technical session hosted by alumnus currently at Amazon. Meeting link will activate 10 mins before.',
      category: 'HR Session',
      attachment_url: '#',
      created_at: '2026-08-20T14:15:00Z',
      posted_by: 'Placement Cell'
    },
    {
      id: '3',
      title: 'Accenture Assessment Phase I: Evaluation & Results',
      content: 'Aptitude and coding round scores are compiled and archived. Review performance metrics before round 2.',
      category: 'Placement Update',
      attachment_url: null,
      created_at: '2026-08-19T11:00:00Z',
      posted_by: 'Coordinator'
    }
  ]);

  const [resources, setResources] = useState([
    {
      id: '1',
      title: 'Core Java & Concurrency Architecture Cheat Sheet',
      category: 'Technical',
      month: 'August 2026',
      file_url: '#',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Quantitative Reasoning & Aptitude Master Deck',
      category: 'Aptitude',
      month: 'August 2026',
      file_url: '#',
      size: '5.8 MB'
    },
    {
      id: '3',
      title: 'STAR Method Behavioral Interview Masterclass',
      category: 'HR Interview',
      month: 'July 2026',
      file_url: '#',
      size: '1.2 MB'
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Resume validation & digital roster collation',
      description: 'Verify 2026 batch resume links against master spreadsheet.',
      department: 'CSE',
      deadline: '2026-08-25',
      status: 'in_progress'
    },
    {
      id: '2',
      title: 'Round 1 mock technical interview slot allocation',
      description: 'Schedule alumni interview slots across 3 panel tracks.',
      department: 'CSE',
      deadline: '2026-08-27',
      status: 'todo'
    },
    {
      id: '3',
      title: 'ECE Aptitude lab seating plan finalization',
      description: 'Confirm 120 systems for online assessment.',
      department: 'ECE',
      deadline: '2026-08-22',
      status: 'in_progress'
    },
    {
      id: '4',
      title: 'Distribution of pre-assessment tokens',
      description: 'Send test credentials to registered candidates via portal.',
      department: 'CSE',
      deadline: '2026-08-18',
      status: 'done'
    }
  ]);

  const [placements, setPlacements] = useState([
    {
      id: '1',
      student_name: 'Priya Sharma',
      company: 'Zoho Corporation',
      role: 'Software Development Engineer',
      package: '8.5 LPA',
      department: 'CSE',
      quote: 'Consistent LeetCode practice and mock interviews with alumni were key to cracking the technical rounds!'
    },
    {
      id: '2',
      student_name: 'Karthik Raja',
      company: 'Virtusa',
      role: 'Associate Engineer',
      package: '6.0 LPA',
      department: 'CSE',
      quote: 'Focusing on core CS fundamentals and DBMS concurrency models gave me a clear edge during HR and Tech rounds.'
    },
    {
      id: '3',
      student_name: 'Ananya Nair',
      company: 'TCS Digital',
      role: 'Systems Engineer',
      package: '7.2 LPA',
      department: 'ECE',
      quote: 'The portal preparation decks and time-bound mock aptitude tests helped me boost my speed and accuracy.'
    }
  ]);

  // Flashcards for Interactive Study Widget
  const flashcards = [
    {
      q: "What is the difference between Synchronous and Asynchronous execution?",
      a: "Synchronous execution blocks the execution thread until the current task finishes, while Asynchronous execution permits other operations to run concurrently while waiting for operations to complete."
    },
    {
      q: "Explain ACID properties in Relational Databases.",
      a: "Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent execution equality), and Durability (committed changes persist even during crash)."
    },
    {
      q: "What is the STAR method for Behavioral Interviews?",
      a: "Situation (set the context), Task (describe your responsibility), Action (explain exact steps taken), and Result (share measurable outcome)."
    },
    {
      q: "What is the purpose of Indexes in Database Management Systems?",
      a: "Indexes speed up data retrieval by creating data structures (e.g. B-Trees) that allow fast lookup without scanning every row in a table."
    }
  ];

  // Fetch from Supabase on mount if configured
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (client && !client.isFallback) {
          const { data: noticesData } = await client.from('notices').select('*').order('created_at', { ascending: false });
          if (noticesData && noticesData.length > 0) setNotices(noticesData);

          const { data: tasksData } = await client.from('tasks').select('*');
          if (tasksData && tasksData.length > 0) setTasks(tasksData);

          const { data: resourcesData } = await client.from('resources').select('*');
          if (resourcesData && resourcesData.length > 0) setResources(resourcesData);

          const { data: placementsData } = await client.from('placements').select('*');
          if (placementsData && placementsData.length > 0) setPlacements(placementsData);
        }
      } catch (err) {
        console.log('Using local fallback data');
      }
    };
    fetchData();
  }, [client]);

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
      showToast('Task marked as Done! 🎉');
    } else {
      showToast(`Task status updated to ${newStatus.replace('_', ' ')}`);
    }

    try {
      if (client && !client.isFallback) {
        await client.from('tasks').update({ status: newStatus }).eq('id', taskId);
      }
    } catch (e) {
      console.log('Saved locally');
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
      ...newNotice, 
      id: Date.now().toString(), 
      created_at: new Date().toISOString(), 
      posted_by: currentRole === 'coordinator' ? 'Placement Cell Coordinator' : 'Club Student' 
    };
    setNotices([item, ...notices]);
    setIsNoticeModalOpen(false);
    setNewNotice({ title: '', content: '', category: 'General', attachment_url: '' });
    showToast('Broadcast Notice Published successfully!');
    try { 
      if (client && !client.isFallback) await client.from('notices').insert([item]); 
    } catch (err) {}
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    playAudioFeedback('success');
    const item = { ...newTask, id: Date.now().toString() };
    setTasks([item, ...tasks]);
    setIsTaskModalOpen(false);
    setNewTask({ title: '', description: '', department: 'CSE', deadline: '', status: 'todo' });
    showToast('New Department Task created!');
    try { 
      if (client && !client.isFallback) await client.from('tasks').insert([item]); 
    } catch (err) {}
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    playAudioFeedback('success');
    const item = { ...newResource, id: Date.now().toString(), size: '2.1 MB' };
    setResources([item, ...resources]);
    setIsResourceModalOpen(false);
    setNewResource({ title: '', category: 'Technical', month: 'August 2026', file_url: '' });
    showToast('Study Material uploaded to repository!');
    try { 
      if (client && !client.isFallback) await client.from('resources').insert([item]); 
    } catch (err) {}
  };

  const handleCreatePlacement = async (e) => {
    e.preventDefault();
    fireCelebration();
    const item = { ...newPlacement, id: Date.now().toString() };
    setPlacements([item, ...placements]);
    setIsPlacementModalOpen(false);
    setNewPlacement({ student_name: '', company: '', role: '', package: '', department: 'CSE', quote: '' });
    showToast('Placement Record added! 🎉');
    try {
      if (client && !client.isFallback) await client.from('placements').insert([item]);
    } catch (err) {}
  };

  const handleConnectSupabase = (e) => {
    e.preventDefault();
    if (supabaseUrl && supabaseKey) {
      const newClient = getSupabaseClient(supabaseUrl, supabaseKey);
      setClient(newClient);
      setIsSupabaseModalOpen(false);
      fireCelebration();
      showToast('Connected to live Supabase Backend!');
    }
  };

  // Role Permissions
  // HOD: Read-only oversight across all departments
  // Coordinator: Full access (Admin)
  // Club Student: Department-level access (Update tasks, post notices, upload resources)
  // Student: View-only (Read-only tasks, view notices, view/download resources)
  const canManageAll = currentRole === 'coordinator';
  const canPostNotices = currentRole === 'coordinator' || currentRole === 'club_student';
  const canUpdateDepartmentTasks = currentRole === 'coordinator' || currentRole === 'club_student';

  // Task filtering rules by role:
  // HOD and Coordinator see tasks across all departments.
  // Club Student & Student see tasks for their selected/assigned department.
  const filteredTasks = tasks.filter(t => {
    if (currentRole === 'hod' || currentRole === 'coordinator') return true;
    return t.department === currentDept;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B1810] font-sans antialiased selection:bg-[#2B1810] selection:text-[#FAF8F5] relative overflow-x-hidden">
      
      {/* Confetti Animation Canvas Layer */}
      <ConfettiCanvas active={triggerConfetti} onComplete={() => setTriggerConfetti(false)} />

      {/* Dynamic Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-[#2B1810] text-[#FAF8F5] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#4A3225] text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          {toastMessage}
        </div>
      )}

      {/* Top Banner Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DFD8]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Portal Title */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setActiveTab('overview'); playAudioFeedback('click'); }}>
            <div className="w-10 h-10 rounded-2xl bg-[#2B1810] text-[#FAF8F5] flex items-center justify-center font-bold text-sm tracking-widest shadow-md transform hover:rotate-6 transition-transform">
              T&P
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#8C7A70] block">
                Training & Placement Club
              </span>
              <h1 className="text-lg font-bold tracking-tight text-[#2B1810] flex items-center gap-2">
                Placement Portal <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              </h1>
            </div>
          </div>

          {/* Quick Search Trigger, Dept Selector & Controls */}
          <div className="flex items-center gap-3">
            
            {/* Quick Command Palette Button */}
            <button
              onClick={() => { setIsCommandOpen(true); playAudioFeedback('click'); }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8DFD8] bg-white text-xs font-semibold text-[#8C7A70] hover:border-[#2B1810] hover:text-[#2B1810] transition-all shadow-sm group"
            >
              <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Search hub...</span>
              <kbd className="ml-2 px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFD8] text-[10px] font-mono text-[#2B1810]">
                ⌘K
              </kbd>
            </button>

            {/* Department Indicator / Selector Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8DFD8] bg-white text-xs font-semibold text-[#5A463C]">
              <span className="w-2 h-2 rounded-full bg-[#2B1810]" />
              <select
                value={currentDept}
                onChange={(e) => {
                  setCurrentDept(e.target.value);
                  playAudioFeedback('click');
                  showToast(`Department view switched to ${e.target.value}`);
                }}
                className="bg-transparent text-xs font-bold text-[#2B1810] focus:outline-none cursor-pointer"
              >
                <option value="CSE">Dept: CSE</option>
                <option value="ECE">Dept: ECE</option>
                <option value="MECH">Dept: Mechanical</option>
                <option value="CIVIL">Dept: Civil</option>
                <option value="IT">Dept: IT</option>
                <option value="EEE">Dept: EEE</option>
              </select>
            </div>

            {/* Notifications Drawer Toggle */}
            <div className="relative">
              <button
                onClick={() => { setIsNotificationDrawerOpen(prev => !prev); playAudioFeedback('click'); }}
                className="p-2.5 rounded-full border border-[#E8DFD8] bg-white text-[#2B1810] hover:bg-[#EDE5DE] transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-600 rounded-full ring-2 ring-[#FAF8F5]" />
              </button>

              {/* Notification Drawer Popover */}
              {isNotificationDrawerOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-[#E8DFD8] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2B1810]">Live Circulars & Alerts</span>
                    <span className="text-[10px] font-bold bg-[#EDE5DE] text-[#2B1810] px-2 py-0.5 rounded-full">
                      {notices.length} Total
                    </span>
                  </div>
                  <div className="mt-3 space-y-3 max-h-64 overflow-y-auto">
                    {notices.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => { setActiveTab('notices'); setIsNotificationDrawerOpen(false); }}
                        className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD8] hover:border-[#2B1810] transition-colors cursor-pointer text-left"
                      >
                        <div className="text-[10px] font-bold text-[#8C7A70] uppercase">{n.category}</div>
                        <div className="text-xs font-bold text-[#2B1810] truncate mt-0.5">{n.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Supabase Connection Status / Setup Button */}
            <button
              onClick={() => { setIsSupabaseModalOpen(true); playAudioFeedback('click'); }}
              className={`p-2.5 rounded-full border transition-all ${
                client && !client.isFallback
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-[#E8DFD8] bg-white text-[#8C7A70] hover:border-[#2B1810]'
              }`}
              title={client && !client.isFallback ? 'Supabase Backend Connected' : 'Configure Supabase Credentials'}
            >
              <Database className="w-4 h-4" />
            </button>

            {/* Role Switcher Matrix (4 User Roles from Requirements) */}
            <div className="flex items-center gap-2 bg-white border border-[#E8DFD8] rounded-full p-1 pl-3 shadow-sm hover:border-[#2B1810] transition-colors">
              <Shield className="w-3.5 h-3.5 text-[#8C7A70]" />
              <select 
                value={currentRole} 
                onChange={(e) => {
                  setCurrentRole(e.target.value);
                  playAudioFeedback('click');
                  showToast(`Role switched to: ${
                    e.target.value === 'hod' ? 'HOD (Executive Read-Only Oversight)' :
                    e.target.value === 'coordinator' ? 'Placement Cell Coordinator (Admin)' :
                    e.target.value === 'club_student' ? 'Club Student (Dept Manager)' :
                    'Student (View-Only Portal)'
                  }`);
                }}
                className="bg-transparent text-xs font-bold text-[#2B1810] focus:outline-none pr-2 cursor-pointer capitalize"
              >
                <option value="student">Role: Student (View-Only)</option>
                <option value="club_student">Role: Club Student</option>
                <option value="coordinator">Role: Placement Coordinator (Admin)</option>
                <option value="hod">Role: HOD (Full Read Oversight)</option>
              </select>
            </div>

          </div>
        </div>
      </header>

      {/* Main Hero Header & Quick Stats Section */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E8DFD8]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EDE5DE] text-[#2B1810]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Interactive Placement Hub
            </div>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#2B1810]">
              Institutional <span className="font-serif italic font-normal">Placement & Task</span> Hub
            </h2>
            <p className="text-sm sm:text-base text-[#6E5A50] leading-relaxed max-w-2xl">
              Role-restricted digital platform replacing Excel sheets and WhatsApp messages with a permanent, searchable hub for department tasks, verified circulars, notes, and PPTs.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
            <div 
              onClick={() => { setActiveTab('notices'); playAudioFeedback('click'); }}
              className="bg-white border border-[#E8DFD8] hover:border-[#2B1810] p-4 sm:p-5 rounded-2xl min-w-[110px] shadow-sm cursor-pointer transform hover:-translate-y-1 transition-all"
            >
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#8C7A70]">Notices</div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1810] mt-1">{notices.length}</div>
            </div>
            <div 
              onClick={() => { setActiveTab('resources'); playAudioFeedback('click'); }}
              className="bg-white border border-[#E8DFD8] hover:border-[#2B1810] p-4 sm:p-5 rounded-2xl min-w-[110px] shadow-sm cursor-pointer transform hover:-translate-y-1 transition-all"
            >
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#8C7A70]">Materials</div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1810] mt-1">{resources.length}</div>
            </div>
            <div 
              onClick={() => { fireCelebration(); setActiveTab('placements'); }}
              className="bg-[#2B1810] text-[#FAF8F5] p-4 sm:p-5 rounded-2xl min-w-[110px] shadow-sm cursor-pointer transform hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#C7B7AC]">Placed</div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 flex items-center justify-between">
                {placements.length}
                <PartyPopper className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Role Action Bar (Shown for Admin/Coordinators and Club Students) */}
        {(canPostNotices || canManageAll) && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8DFD8] shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1810]">
              <Shield className="w-4 h-4 text-[#8C7A70]" /> Management Controls Active ({currentRole.replace('_', ' ')})
            </div>
            <div className="flex items-center gap-2">
              {canPostNotices && (
                <button 
                  onClick={() => { setIsNoticeModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full bg-[#2B1810] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3D2314] transition-all transform hover:scale-105 inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Post Notice
                </button>
              )}
              {canUpdateDepartmentTasks && (
                <button 
                  onClick={() => { setIsTaskModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full border border-[#E8DFD8] bg-[#FAF8F5] text-[#2B1810] text-xs font-bold uppercase tracking-wider hover:bg-[#EDE5DE] transition-all transform hover:scale-105 inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Create Task
                </button>
              )}
              {canManageAll && (
                <button 
                  onClick={() => { setIsResourceModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full border border-[#E8DFD8] bg-[#FAF8F5] text-[#2B1810] text-xs font-bold uppercase tracking-wider hover:bg-[#EDE5DE] transition-all transform hover:scale-105 inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Material
                </button>
              )}
              {canManageAll && (
                <button 
                  onClick={() => { setIsPlacementModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-full border border-[#D4AF37] bg-[#2B1810] text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-[#3D2314] transition-all transform hover:scale-105 inline-flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" /> Mark Placed
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'overview', label: 'Overview Hub' },
            { id: 'notices', label: 'Notices & Circulars' },
            { id: 'resources', label: 'Study Repository (PPTs/Notes)' },
            { id: 'tasks', label: 'Department Tasks' },
            { id: 'placements', label: 'Placements Wall' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); playAudioFeedback('click'); }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#2B1810] text-white shadow-md transform scale-105'
                  : 'bg-white text-[#6E5A50] border border-[#E8DFD8] hover:bg-[#EDE5DE]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pb-20 pt-2">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Announcements Feed & Tasks Summary */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Announcements Feed */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2B1810] flex items-center gap-2">
                    Recent Announcements
                  </h3>
                  <button 
                    onClick={() => { setActiveTab('notices'); playAudioFeedback('click'); }} 
                    className="text-xs font-bold uppercase tracking-wider text-[#2B1810] hover:underline inline-flex items-center gap-1"
                  >
                    View All <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {notices.slice(0, 3).map((notice) => (
                    <div 
                      key={notice.id}
                      className="bg-white border border-[#E8DFD8] p-6 rounded-2xl hover:border-[#2B1810] transition-all hover:shadow-md group relative"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EDE5DE] text-[#2B1810]">
                              {notice.category}
                            </span>
                            <span className="text-xs text-[#8C7A70]">
                              {new Date(notice.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-[#2B1810] leading-snug group-hover:text-[#3D2314]">
                            {notice.title}
                          </h4>
                          <p className="text-xs text-[#5A463C] leading-relaxed">
                            {notice.content}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleBookmark(notice.id)}
                            className="p-2.5 rounded-full border border-[#E8DFD8] bg-[#FAF8F5] hover:border-[#2B1810] text-[#2B1810] transition-colors"
                            title="Save Notice"
                          >
                            {bookmarkedNotices.includes(notice.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-[#2B1810]" />
                            ) : (
                              <Bookmark className="w-4 h-4 text-[#8C7A70]" />
                            )}
                          </button>

                          {notice.attachment_url && (
                            <a 
                              href={notice.attachment_url} 
                              onClick={() => showToast('Downloading Notice Circular...')}
                              className="p-2.5 rounded-full border border-[#E8DFD8] bg-[#FAF8F5] hover:bg-[#2B1810] hover:text-white transition-colors"
                              title="Download Attachment"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Task Board Summary */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2B1810]">
                    Department Tasks ({currentRole === 'hod' || currentRole === 'coordinator' ? 'All Departments Oversight' : `Department: ${currentDept}`})
                  </h3>
                  <button 
                    onClick={() => { setActiveTab('tasks'); playAudioFeedback('click'); }} 
                    className="text-xs font-bold uppercase tracking-wider text-[#2B1810] hover:underline inline-flex items-center gap-1"
                  >
                    Manage Tasks <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white border border-[#E8DFD8] rounded-2xl divide-y divide-[#E8DFD8] overflow-hidden shadow-sm">
                  {filteredTasks.slice(0, 4).map((task) => (
                    <div key={task.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2B1810]">{task.title}</span>
                          <span className="text-[10px] uppercase font-bold text-[#8C7A70] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8DFD8]">
                            {task.department}
                          </span>
                        </div>
                        <div className="text-xs text-[#8C7A70] mt-1">Deadline: {task.deadline}</div>
                      </div>

                      <div>
                        {canUpdateDepartmentTasks ? (
                          <select
                            value={task.status}
                            onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer focus:outline-none transition-colors ${
                              task.status === 'done' 
                                ? 'bg-[#2B1810] text-white' 
                                : task.status === 'in_progress' 
                                ? 'bg-[#EDE5DE] text-[#2B1810]' 
                                : 'bg-[#FAF8F5] text-[#8C7A70] border border-[#E8DFD8]'
                            }`}
                          >
                            <option value="todo">To-Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            task.status === 'done' 
                              ? 'bg-[#2B1810] text-white' 
                              : task.status === 'in_progress' 
                              ? 'bg-[#EDE5DE] text-[#2B1810]' 
                              : 'bg-[#FAF8F5] text-[#8C7A70] border border-[#E8DFD8]'
                          }`}>
                            {task.status.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Placement Wall Spotlight & Flashcards */}
            <div className="space-y-8">
              
              {/* Placement Spotlight */}
              <div className="bg-[#2B1810] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="flex items-center justify-between pb-4 border-b border-[#4A3225]">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C7B7AC]">Spotlight Feed</h3>
                    <div className="text-xl font-serif mt-1">Placement Wall</div>
                  </div>
                  <Trophy className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <div className="mt-4 space-y-3">
                  {placements.map((p) => (
                    <div 
                      key={p.id} 
                      onClick={() => { setSelectedPlacement(p); playAudioFeedback('pop'); }}
                      className="bg-[#3D2314] p-4 rounded-xl border border-[#4A3225] hover:border-[#D4AF37] transition-all cursor-pointer flex items-center justify-between group/card"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover/card:text-[#D4AF37] transition-colors">{p.student_name}</div>
                        <div className="text-[11px] text-[#C7B7AC]">{p.company} • {p.role}</div>
                      </div>
                      <div className="text-xs font-serif font-bold text-[#FAF8F5] bg-[#2B1810] px-2.5 py-1 rounded-lg border border-[#4A3225]">
                        {p.package}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Flashcard Mini-Widget */}
              <div className="bg-white border border-[#E8DFD8] p-6 rounded-3xl shadow-sm relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2B1810]">
                    <Brain className="w-4 h-4 text-[#2B1810]" /> Daily Tech Interview Card
                  </div>
                  <span className="text-[10px] font-bold text-[#8C7A70]">
                    {activePrepQuestionIndex + 1} / {flashcards.length}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD8] mt-2 min-h-[110px] flex flex-col justify-between">
                  <p className="text-xs font-bold text-[#2B1810] leading-relaxed">
                    {flashcards[activePrepQuestionIndex].q}
                  </p>

                  {showFlashcardAnswer && (
                    <p className="text-[11px] text-[#5A463C] mt-3 pt-3 border-t border-[#E8DFD8] leading-relaxed animate-in fade-in">
                      {flashcards[activePrepQuestionIndex].a}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between pt-2">
                    <button
                      onClick={() => { setShowFlashcardAnswer(prev => !prev); playAudioFeedback('click'); }}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#2B1810] hover:underline"
                    >
                      {showFlashcardAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    <button
                      onClick={() => {
                        setShowFlashcardAnswer(false);
                        setActivePrepQuestionIndex((prev) => (prev + 1) % flashcards.length);
                        playAudioFeedback('click');
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#2B1810] text-white hover:bg-[#3D2314]"
                    >
                      Next Card &rarr;
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* NOTICES TAB */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[#E8DFD8]">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A70]" />
                <input
                  type="text"
                  placeholder="Search notices & circulars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] placeholder-[#8C7A70] focus:outline-none focus:border-[#2B1810]"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
                {['All', 'Urgent', 'HR Session', 'Placement Update', 'Event', 'General'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); playAudioFeedback('click'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                      selectedCategory === cat ? 'bg-[#2B1810] text-white' : 'bg-[#FAF8F5] text-[#5A463C] border border-[#E8DFD8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notices
                .filter(n => selectedCategory === 'All' || n.category === selectedCategory)
                .filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((notice) => (
                  <div key={notice.id} className="bg-white border border-[#E8DFD8] p-6 rounded-2xl flex flex-col justify-between hover:border-[#2B1810] transition-all hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EDE5DE] text-[#2B1810]">
                          {notice.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#8C7A70]">{new Date(notice.created_at).toLocaleDateString()}</span>
                          <button onClick={() => toggleBookmark(notice.id)} className="text-[#2B1810]">
                            {bookmarkedNotices.includes(notice.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4 text-[#8C7A70]" />}
                          </button>
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-[#2B1810] mb-2">{notice.title}</h4>
                      <p className="text-xs text-[#5A463C] leading-relaxed">{notice.content}</p>
                    </div>
                    {notice.attachment_url && (
                      <div className="mt-6 pt-4 border-t border-[#E8DFD8] flex justify-end">
                        <a 
                          href={notice.attachment_url} 
                          onClick={() => showToast('Downloading notice attachment...')}
                          className="text-xs font-bold uppercase tracking-wider text-[#2B1810] hover:underline inline-flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Attachment
                        </a>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[#E8DFD8]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2B1810]">
                Placement Resource Archive (Notes & PPTs retained full academic year)
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {['All', 'Technical', 'Aptitude', 'HR Interview', 'Resume', 'Company-Specific'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedResourceCategory(cat); playAudioFeedback('click'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                      selectedResourceCategory === cat ? 'bg-[#2B1810] text-white' : 'bg-[#FAF8F5] text-[#5A463C] border border-[#E8DFD8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter(res => selectedResourceCategory === 'All' || res.category === selectedResourceCategory)
                .map((res) => (
                  <div key={res.id} className="bg-white border border-[#E8DFD8] p-6 rounded-2xl hover:border-[#2B1810] transition-all hover:shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EDE5DE] px-2.5 py-1 rounded-md text-[#2B1810]">
                          {res.category}
                        </span>
                        <span className="text-xs text-[#8C7A70]">{res.month}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#2B1810]">{res.title}</h4>
                    </div>
                    <div className="mt-8 pt-4 border-t border-[#E8DFD8] flex items-center justify-between">
                      <span className="text-xs text-[#8C7A70]">{res.size}</span>
                      <a
                        href={res.file_url || '#'}
                        onClick={() => showToast('Downloading study material deck...')}
                        className="px-4 py-2 rounded-lg bg-[#2B1810] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3D2314] transition-colors inline-flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="bg-white border border-[#E8DFD8] rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#E8DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#2B1810]">Department Task Board</h3>
                <p className="text-xs text-[#8C7A70] mt-0.5">
                  Simple status tracking: To-Do &rarr; In Progress &rarr; Done (No percentage bars)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#2B1810] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E8DFD8]">
                  Viewing: {currentRole === 'hod' || currentRole === 'coordinator' ? 'All Departments' : currentDept}
                </span>
                {canUpdateDepartmentTasks && (
                  <button 
                    onClick={() => { setIsTaskModalOpen(true); playAudioFeedback('click'); }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2B1810] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    + Add Task
                  </button>
                )}
              </div>
            </div>
            
            <div className="divide-y divide-[#E8DFD8]">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#2B1810]">{task.title}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EDE5DE] px-2 py-0.5 rounded text-[#2B1810]">
                        {task.department}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A463C]">{task.description}</p>
                    <div className="text-[11px] text-[#8C7A70]">Deadline: {task.deadline}</div>
                  </div>

                  <div>
                    {canUpdateDepartmentTasks ? (
                      <select
                        value={task.status}
                        onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer focus:outline-none transition-colors ${
                          task.status === 'done' 
                            ? 'bg-[#2B1810] text-white' 
                            : task.status === 'in_progress' 
                            ? 'bg-[#EDE5DE] text-[#2B1810]' 
                            : 'bg-[#FAF8F5] text-[#8C7A70] border border-[#E8DFD8]'
                        }`}
                      >
                        <option value="todo">Status: To-Do</option>
                        <option value="in_progress">Status: In Progress</option>
                        <option value="done">Status: Done</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        task.status === 'done' 
                          ? 'bg-[#2B1810] text-white' 
                          : task.status === 'in_progress' 
                          ? 'bg-[#EDE5DE] text-[#2B1810]' 
                          : 'bg-[#FAF8F5] text-[#8C7A70] border border-[#E8DFD8]'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLACEMENTS TAB */}
        {activeTab === 'placements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DFD8]">
              <div>
                <h3 className="text-sm font-bold text-[#2B1810]">Placements Wall & Hall of Fame</h3>
                <p className="text-xs text-[#8C7A70]">Verified recruitment records and student testimonials</p>
              </div>
              {canManageAll && (
                <button
                  onClick={() => { setIsPlacementModalOpen(true); playAudioFeedback('click'); }}
                  className="px-4 py-2 rounded-xl bg-[#2B1810] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3D2314]"
                >
                  + Add Placement Record
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {placements.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => { setSelectedPlacement(p); playAudioFeedback('pop'); }}
                  className="bg-white border border-[#E8DFD8] p-6 rounded-2xl hover:border-[#2B1810] transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8DFD8] flex items-center justify-center font-bold font-serif text-lg text-[#2B1810] group-hover:bg-[#2B1810] group-hover:text-white transition-colors">
                        {p.student_name.charAt(0)}
                      </div>
                      <span className="text-xs font-serif font-bold text-[#2B1810] bg-[#EDE5DE] px-3 py-1 rounded-full">
                        {p.package}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#2B1810]">{p.student_name}</h4>
                    <div className="text-xs font-semibold text-[#5A463C] mt-1">{p.company}</div>
                    <div className="text-xs text-[#8C7A70] mt-0.5">{p.role} • {p.department}</div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E8DFD8] text-[11px] text-[#8C7A70] flex items-center justify-between font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><UserCheck className="w-4 h-4 text-[#2B1810]" /> Verified Record</span>
                    <ChevronRight className="w-4 h-4 text-[#8C7A70] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* QUICK COMMAND PALETTE MODAL (⌘K) */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B1810]/50 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="bg-white border border-[#E8DFD8] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-[#E8DFD8] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#8C7A70]" />
              <input
                type="text"
                autoFocus
                placeholder="Search notices, study notes, placements, or tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm text-[#2B1810] focus:outline-none placeholder-[#8C7A70]"
              />
              <button onClick={() => setIsCommandOpen(false)} className="text-xs font-bold text-[#8C7A70] uppercase">
                ESC
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-4 space-y-2 divide-y divide-[#E8DFD8]">
              {notices.map(n => (
                <div 
                  key={n.id} 
                  onClick={() => { setActiveTab('notices'); setIsCommandOpen(false); playAudioFeedback('click'); }}
                  className="pt-2 hover:bg-[#FAF8F5] p-2 rounded-xl cursor-pointer"
                >
                  <div className="text-[10px] font-bold text-[#8C7A70] uppercase">Notice • {n.category}</div>
                  <div className="text-xs font-bold text-[#2B1810]">{n.title}</div>
                </div>
              ))}
              {resources.map(r => (
                <div 
                  key={r.id} 
                  onClick={() => { setActiveTab('resources'); setIsCommandOpen(false); playAudioFeedback('click'); }}
                  className="pt-2 hover:bg-[#FAF8F5] p-2 rounded-xl cursor-pointer"
                >
                  <div className="text-[10px] font-bold text-[#8C7A70] uppercase">Resource • {r.category}</div>
                  <div className="text-xs font-bold text-[#2B1810]">{r.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PLACEMENT DETAIL SPOTLIGHT MODAL */}
      {selectedPlacement && (
        <div className="fixed inset-0 z-50 bg-[#2B1810]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD8] rounded-3xl p-6 w-full max-w-md shadow-2xl relative text-center">
            <button 
              onClick={() => setSelectedPlacement(null)} 
              className="absolute top-4 right-4 text-[#8C7A70] hover:text-[#2B1810]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#2B1810] text-[#FAF8F5] text-2xl font-serif font-bold flex items-center justify-center mx-auto mb-3 shadow-md">
              {selectedPlacement.student_name.charAt(0)}
            </div>

            <span className="text-xs font-bold uppercase tracking-wider bg-[#EDE5DE] text-[#2B1810] px-3 py-1 rounded-full">
              {selectedPlacement.company}
            </span>

            <h3 className="text-xl font-bold text-[#2B1810] mt-3">{selectedPlacement.student_name}</h3>
            <p className="text-xs text-[#8C7A70] mt-0.5">{selectedPlacement.role} • {selectedPlacement.department}</p>
            
            <div className="text-2xl font-serif font-bold text-[#2B1810] mt-3">
              {selectedPlacement.package}
            </div>

            {selectedPlacement.quote && (
              <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD8] text-xs text-[#5A463C] italic leading-relaxed">
                "{selectedPlacement.quote}"
              </div>
            )}

            <button
              onClick={() => { fireCelebration(); showToast('Celebration fired! 🎉'); }}
              className="w-full mt-5 py-3 bg-[#2B1810] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#3D2314] flex items-center justify-center gap-2"
            >
              <PartyPopper className="w-4 h-4 text-[#D4AF37]" /> Celebrate Milestone
            </button>
          </div>
        </div>
      )}

      {/* SUPABASE SETTINGS MODAL */}
      {isSupabaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B1810]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD8] rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsSupabaseModalOpen(false)} className="absolute top-5 right-5 text-[#8C7A70] hover:text-[#2B1810]">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2B1810] uppercase mb-1">
              <Database className="w-4 h-4 text-[#D4AF37]" /> Backend Setup
            </div>
            <h3 className="text-lg font-bold text-[#2B1810] mb-2">Connect Supabase PostgreSQL</h3>
            <p className="text-xs text-[#6E5A50] mb-4 leading-relaxed">
              Enter your Supabase project URL and anon public key to connect authentication, storage, and database persistence.
            </p>
            <form onSubmit={handleConnectSupabase} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Supabase Project URL</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://your-project.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] focus:outline-none focus:border-[#2B1810]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Supabase Anon Key</label>
                <input 
                  type="text" 
                  required
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] focus:outline-none focus:border-[#2B1810]"
                />
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-[11px] text-[#5A463C]">
                💡 You can also execute the database tables script inside <code className="bg-[#EDE5DE] px-1 rounded">supabase_schema.sql</code> in your Supabase SQL Editor.
              </div>
              <button type="submit" className="w-full py-3 bg-[#2B1810] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#3D2314]">
                Save & Connect Backend
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: POST NOTICE */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B1810]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD8] rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsNoticeModalOpen(false)} className="absolute top-5 right-5 text-[#8C7A70] hover:text-[#2B1810]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-[#2B1810] mb-4">Post Broadcast Notice</h3>
            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Notice Title</label>
                <input 
                  type="text" 
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] focus:outline-none focus:border-[#2B1810]"
                  placeholder="e.g. TCS Interview Schedule & Lab Allocation"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Category Tag</label>
                <select 
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] focus:outline-none"
                >
                  <option value="General">General</option>
                  <option value="HR Session">HR Session</option>
                  <option value="Placement Update">Placement Update</option>
                  <option value="Event">Event</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Notice Details</label>
                <textarea 
                  required
                  rows={3}
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] focus:outline-none focus:border-[#2B1810]"
                  placeholder="Write clear instructions for candidates..."
                />
              </div>
              <button type="submit" className="w-full py-3 bg-[#2B1810] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#3D2314]">
                Publish Announcement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE TASK */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B1810]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD8] rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsTaskModalOpen(false)} className="absolute top-5 right-5 text-[#8C7A70] hover:text-[#2B1810]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-[#2B1810] mb-4">Create Department Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Task Title</label>
                <input 
                  type="text" 
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] focus:outline-none focus:border-[#2B1810]"
                  placeholder="e.g. Verify 2026 Batch Student Resumes"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Description</label>
                <textarea
                  rows={2}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810] focus:outline-none"
                  placeholder="Detailed task description..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Assigned Department</label>
                  <select 
                    value={newTask.department}
                    onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">Mechanical</option>
                    <option value="CIVIL">Civil</option>
                    <option value="IT">IT</option>
                    <option value="EEE">EEE</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Deadline Date</label>
                  <input 
                    type="date" 
                    required
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#2B1810] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#3D2314]">
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD RESOURCE */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B1810]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD8] rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsResourceModalOpen(false)} className="absolute top-5 right-5 text-[#8C7A70] hover:text-[#2B1810]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-[#2B1810] mb-4">Upload Study Material / PPT</h3>
            <form onSubmit={handleCreateResource} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Document Title</label>
                <input 
                  type="text" 
                  required
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                  placeholder="e.g. Operating Systems & Memory Management Deck"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Category</label>
                  <select 
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="HR Interview">HR Interview</option>
                    <option value="Resume">Resume</option>
                    <option value="Company-Specific">Company-Specific</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Month Tag</label>
                  <input 
                    type="text" 
                    required
                    value={newResource.month}
                    onChange={(e) => setNewResource({ ...newResource, month: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                    placeholder="e.g. August 2026"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#2B1810] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#3D2314]">
                Publish Material
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PLACEMENT */}
      {isPlacementModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B1810]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD8] rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsPlacementModalOpen(false)} className="absolute top-5 right-5 text-[#8C7A70] hover:text-[#2B1810]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-[#2B1810] mb-4">Record Student Placement</h3>
            <form onSubmit={handleCreatePlacement} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Student Name</label>
                <input 
                  type="text" 
                  required
                  value={newPlacement.student_name}
                  onChange={(e) => setNewPlacement({ ...newPlacement, student_name: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                  placeholder="e.g. Rahul Verma"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Company</label>
                  <input 
                    type="text" 
                    required
                    value={newPlacement.company}
                    onChange={(e) => setNewPlacement({ ...newPlacement, company: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                    placeholder="e.g. Amazon"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Package (LPA)</label>
                  <input 
                    type="text" 
                    required
                    value={newPlacement.package}
                    onChange={(e) => setNewPlacement({ ...newPlacement, package: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                    placeholder="e.g. 14.5 LPA"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Role Offered</label>
                  <input 
                    type="text" 
                    required
                    value={newPlacement.role}
                    onChange={(e) => setNewPlacement({ ...newPlacement, role: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                    placeholder="e.g. SDE-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2B1810] uppercase">Department</label>
                  <select 
                    value={newPlacement.department}
                    onChange={(e) => setNewPlacement({ ...newPlacement, department: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">Mechanical</option>
                    <option value="CIVIL">Civil</option>
                    <option value="IT">IT</option>
                    <option value="EEE">EEE</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#2B1810] uppercase">Testimonial / Quote</label>
                <textarea 
                  rows={2}
                  value={newPlacement.quote}
                  onChange={(e) => setNewPlacement({ ...newPlacement, quote: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-[#2B1810]"
                  placeholder="Share a short tip or experience quote..."
                />
              </div>
              <button type="submit" className="w-full py-3 bg-[#2B1810] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#3D2314]">
                Record Placement & Celebrate 🎉
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
