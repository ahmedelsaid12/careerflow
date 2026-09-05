import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from "react";
import {
  ArrowRight, Github, Linkedin, Globe, Sparkles, TrendingUp, Target, Award,
  Briefcase, GraduationCap, Code2, CheckCircle2, Circle, ChevronRight, ChevronDown,
  Search, Bell, Settings, LogOut, Home, User, FileText, FolderKanban, BarChart3,
  MessageSquare, Compass, Building2, Users, Plus, X, Sun, Moon, Menu, MapPin,
  Star, Zap, Shield, Clock, Filter, ArrowUpRight, Play, Pause, RefreshCw,
  Download, Share2, Edit3, Trash2, ExternalLink, ChevronLeft, Send, Bot,
  BookOpen, Trophy, Layers, PieChart, Activity, Lock, Eye, EyeOff, Check,
  AlertCircle, Rocket, Flame, Gauge, ListChecks, UserCheck, Bookmark,
  LayoutDashboard, ClipboardList, School, LineChart, Calendar, Link2, Mail,
  Phone, MessageCircle, Inbox, HelpCircle, WifiOff, AlertTriangle
} from "lucide-react";
import {
  LineChart as RLineChart, Line, AreaChart, Area, BarChart as RBarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart,
  Pie, Cell, RadialBarChart, RadialBar
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================================
   THEME CONTEXT
   ========================================================================= */
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      <div className={dark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}

/* =========================================================================
   APP ROUTER CONTEXT
   ========================================================================= */
const RouterContext = createContext();
const useRouter = () => useContext(RouterContext);

function RouterProvider({ children }) {
  const [route, setRoute] = useState({ path: "landing", params: {} });
  const [history, setHistory] = useState(["landing"]);
  const navigate = (path, params = {}) => {
    setRoute({ path, params });
    setHistory((h) => [...h, path]);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const back = () => {
    setHistory((h) => {
      if (h.length < 2) return h;
      const nh = h.slice(0, -1);
      setRoute({ path: nh[nh.length - 1], params: {} });
      return nh;
    });
  };
  return (
    <RouterContext.Provider value={{ route, navigate, back }}>
      {children}
    </RouterContext.Provider>
  );
}

/* =========================================================================
   MOCK DATA
   ========================================================================= */

const STUDENT = {
  name: "Alex Johnson",
  initials: "AJ",
  degree: "BSc Software Engineering",
  university: "Coventry University",
  year: "Year 3",
  location: "Coventry, UK",
  email: "alex.johnson@coventry.ac.uk",
  careerGoal: "Backend Engineer",
  github: "github.com/alexjohnson",
  linkedin: "linkedin.com/in/alexjohnson",
  portfolio: "alexjohnson.dev",
  bio: "Third-year software engineering student focused on backend systems and applied AI. I build things end-to-end — from data pipelines to APIs to the interfaces on top of them.",
  profileCompletion: 82,
  careerReadiness: 68,
  readinessBreakdown: [
    { label: "Skills", value: 72 },
    { label: "Experience", value: 55 },
    { label: "Projects", value: 82 },
    { label: "Profile", value: 90 },
    { label: "Career prep", value: 41 },
  ],
  stats: { projects: 8, skills: 12, certifications: 3, internships: 1, achievements: 14 },
  missingProfileItems: ["Portfolio URL verification", "1 project description", "Cloud certification"],
};

const SKILLS = [
  { name: "Python", level: "Advanced", pct: 90, evidence: { projects: 4, courses: 2, competitions: 1, github: true, ai: true } },
  { name: "REST APIs", level: "Advanced", pct: 85, evidence: { projects: 3, courses: 1, competitions: 0, github: true, ai: true } },
  { name: "SQL", level: "Intermediate", pct: 62, evidence: { projects: 2, courses: 1, competitions: 0, github: true, ai: false } },
  { name: "React", level: "Intermediate", pct: 58, evidence: { projects: 3, courses: 0, competitions: 0, github: true, ai: false } },
  { name: "TypeScript", level: "Intermediate", pct: 55, evidence: { projects: 2, courses: 0, competitions: 0, github: true, ai: false } },
  { name: "Node.js", level: "Intermediate", pct: 50, evidence: { projects: 2, courses: 1, competitions: 0, github: true, ai: false } },
  { name: "FastAPI", level: "Intermediate", pct: 48, evidence: { projects: 1, courses: 1, competitions: 0, github: true, ai: false } },
  { name: "Git", level: "Advanced", pct: 88, evidence: { projects: 8, courses: 0, competitions: 0, github: true, ai: false } },
  { name: "Docker", level: "Beginner", pct: 28, evidence: { projects: 1, courses: 0, competitions: 0, github: false, ai: false } },
  { name: "AWS", level: "Beginner", pct: 18, evidence: { projects: 0, courses: 1, competitions: 0, github: false, ai: false } },
  { name: "System Design", level: "Beginner", pct: 25, evidence: { projects: 0, courses: 0, competitions: 1, github: false, ai: true } },
  { name: "Computer Vision", level: "Intermediate", pct: 45, evidence: { projects: 1, courses: 1, competitions: 1, github: true, ai: false } },
];

const PROJECTS = [
  {
    id: "p1",
    name: "Smart City Road Monitoring System",
    description: "A computer-vision pipeline that detects road surface damage from dashcam footage and plots severity on a live city map for maintenance crews.",
    tech: ["Python", "Flask", "OpenCV", "PyTorch"],
    role: "Lead Developer",
    date: "Mar 2026",
    team: 4,
    github: "github.com/alexjohnson/road-monitor",
    demo: "roadmonitor.demo.app",
    skills: ["Python", "Computer Vision", "Backend Development", "System Design"],
    verified: true,
    category: "University project",
  },
  {
    id: "p2",
    name: "CareerFlow University Platform",
    description: "A capstone team project building an evidence-based career profile system for university students, including a FastAPI backend and REST API layer.",
    tech: ["FastAPI", "PostgreSQL", "React", "TypeScript"],
    role: "Backend Engineer",
    date: "Jan 2026 – Present",
    team: 5,
    github: "github.com/alexjohnson/careerflow",
    demo: "",
    skills: ["FastAPI", "SQL", "REST APIs", "TypeScript"],
    verified: true,
    category: "University project",
  },
  {
    id: "p3",
    name: "AI Study Assistant",
    description: "A retrieval-augmented chatbot that answers questions from a student's own lecture notes, with citation back to the source slide.",
    tech: ["Python", "LangChain", "FastAPI", "React"],
    role: "Solo Project",
    date: "Sep 2025",
    team: 1,
    github: "github.com/alexjohnson/study-ai",
    demo: "studyai.demo.app",
    skills: ["Python", "FastAPI", "AI Integration"],
    verified: false,
    category: "Personal project",
  },
  {
    id: "p4",
    name: "E-commerce Order API",
    description: "A production-style REST API for order management with authentication, inventory locking, and webhook-based payment confirmation.",
    tech: ["Node.js", "Express", "PostgreSQL", "Docker"],
    role: "Solo Project",
    date: "Jun 2025",
    team: 1,
    github: "github.com/alexjohnson/order-api",
    demo: "",
    skills: ["Node.js", "SQL", "Docker", "REST APIs"],
    verified: true,
    category: "Personal project",
  },
];

const EXPERIENCE = [
  {
    id: "e1",
    role: "Software Engineering Intern",
    company: "Northbridge Analytics",
    location: "Remote",
    period: "Jun 2025 – Sep 2025",
    description: "Built internal data-quality tooling in Python, reducing manual QA time on client data ingestion by 35%.",
    skills: ["Python", "SQL", "Data Pipelines"],
    verified: true,
  },
];

const ACHIEVEMENTS = [
  { id: "a1", title: "Hackathon Finalist — HackMidlands 2026", type: "Competition", date: "Feb 2026", verified: true },
  { id: "a2", title: "Computer Science Society — Lead Organiser", type: "Leadership", date: "2025 – Present", verified: true },
  { id: "a3", title: "National Coding League — Top 15%", type: "Competition", date: "Nov 2025", verified: true },
  { id: "a4", title: "AWS Cloud Practitioner (in progress)", type: "Certification", date: "Expected Oct 2026", verified: false },
  { id: "a5", title: "Peer Mentoring Programme — Volunteer Tutor", type: "Volunteering", date: "2024 – Present", verified: true },
];

const CERTIFICATIONS = [
  { id: "c1", name: "Python for Data Science", issuer: "Coventry University", date: "2024", credentialId: "CU-PY-4471", verified: true },
  { id: "c2", name: "REST API Design", issuer: "University Career Services", date: "2025", credentialId: "UCS-2205", verified: true },
  { id: "c3", name: "Git & Version Control", issuer: "Self-paced", date: "2024", credentialId: "—", verified: false },
];

const SKILL_GAP = {
  target: "Backend Engineer",
  overallReadiness: 68,
  skills: [
    { name: "Python", pct: 90 },
    { name: "REST APIs", pct: 85 },
    { name: "SQL", pct: 62 },
    { name: "Docker", pct: 28 },
    { name: "AWS", pct: 18 },
    { name: "System Design", pct: 25 },
  ],
};

const ROADMAP_PHASES = [
  { id: "r1", phase: "Phase 1", title: "Python fundamentals", status: "done", skills: ["Python", "Git"], projects: 2, courses: 1 },
  { id: "r2", phase: "Phase 2", title: "FastAPI & backend services", status: "done", skills: ["FastAPI", "REST APIs"], projects: 2, courses: 1 },
  { id: "r3", phase: "Phase 3", title: "PostgreSQL & data modelling", status: "in-progress", skills: ["SQL", "Database Design"], projects: 1, courses: 1 },
  { id: "r4", phase: "Phase 4", title: "Docker & containerisation", status: "upcoming", skills: ["Docker", "CI/CD"], projects: 0, courses: 0 },
  { id: "r5", phase: "Phase 5", title: "Cloud fundamentals (AWS)", status: "upcoming", skills: ["AWS", "Cloud Architecture"], projects: 0, courses: 0 },
  { id: "r6", phase: "Phase 6", title: "System design", status: "upcoming", skills: ["System Design", "Scalability"], projects: 0, courses: 0 },
];

const OPPORTUNITIES = [
  {
    id: "o1", title: "Backend Engineering Intern", company: "Fenwick Data", type: "Internship",
    location: "Remote", duration: "3 months", skills: ["Python", "FastAPI", "PostgreSQL"],
    match: 94, matched: ["Python", "REST APIs", "Git"], gaps: ["PostgreSQL"], deadline: "20 Sep 2026",
    description: "Join our backend team building data infrastructure for logistics clients. You'll work directly with senior engineers on production services.",
  },
  {
    id: "o2", title: "Junior Backend Developer", company: "Solene Systems", type: "Job",
    location: "Manchester, UK", duration: "Full-time", skills: ["Node.js", "SQL", "Docker"],
    match: 78, matched: ["Node.js", "SQL"], gaps: ["Docker", "Kubernetes"], deadline: "30 Sep 2026",
    description: "Entry-level backend role on our platform team, building and maintaining internal APIs used across the company.",
  },
  {
    id: "o3", title: "Cloud Foundations Bootcamp", company: "AWS EduCloud", type: "Programme",
    location: "Online", duration: "4 weeks", skills: ["AWS", "Cloud Architecture"],
    match: 61, matched: ["Python"], gaps: ["AWS", "Cloud Architecture"], deadline: "Rolling",
    description: "A structured 4-week programme covering core AWS services, ending with a certification exam voucher.",
  },
  {
    id: "o4", title: "National Backend Challenge", company: "DevLeague", type: "Competition",
    location: "Online", duration: "48 hours", skills: ["Python", "System Design"],
    match: 71, matched: ["Python", "REST APIs"], gaps: ["System Design"], deadline: "5 Oct 2026",
    description: "A national 48-hour backend systems competition. Top teams are introduced to partner engineering teams.",
  },
  {
    id: "o5", title: "Software Engineering Scholarship", company: "Coventry University", type: "Scholarship",
    location: "Coventry, UK", duration: "1 year", skills: ["Academic merit"],
    match: 88, matched: ["GPA", "Leadership"], gaps: [], deadline: "15 Nov 2026",
    description: "Merit-based scholarship for software engineering students with strong academic and leadership records.",
  },
];

const APPLICATIONS = [
  { id: "ap1", title: "Backend Engineering Intern", company: "Fenwick Data", status: "Under review", date: "18 Aug 2026" },
  { id: "ap2", title: "Data Engineer Intern", company: "Ravenswood Labs", status: "Interview scheduled", date: "10 Aug 2026" },
  { id: "ap3", title: "Software Engineer Intern", company: "Northbridge Analytics", status: "Offer", date: "20 May 2025" },
  { id: "ap4", title: "Cloud Foundations Bootcamp", company: "AWS EduCloud", status: "Applied", date: "25 Aug 2026" },
];

const ACTIVITY_FEED = [
  { id: "ac1", text: "You completed the SQL fundamentals course", time: "2h ago", icon: "check" },
  { id: "ac2", text: "New internship match: Backend Engineering Intern (94%)", time: "5h ago", icon: "target" },
  { id: "ac3", text: "Your Career Readiness score increased to 68%", time: "1d ago", icon: "trend" },
  { id: "ac4", text: "Employer viewed your profile", time: "2d ago", icon: "eye" },
  { id: "ac5", text: "You added a new project: E-commerce Order API", time: "4d ago", icon: "folder" },
];

const RECOMMENDED_ACTIONS = [
  { id: "rc1", text: "Add your latest project", detail: "Projects are your strongest evidence category.", cta: "Add project", target: "projects" },
  { id: "rc2", text: "Complete your SQL assessment", detail: "Verified skills carry more weight with employers.", cta: "Start assessment", target: "skills" },
  { id: "rc3", text: "Apply to Backend Engineering Intern", detail: "94% match — one of your strongest this month.", cta: "View opportunity", target: "opportunities" },
  { id: "rc4", text: "Link your GitHub account", detail: "Adds automatic evidence to every technical skill.", cta: "Connect GitHub", target: "settings" },
];

const READINESS_TREND = [
  { month: "Mar", score: 41 }, { month: "Apr", score: 47 }, { month: "May", score: 52 },
  { month: "Jun", score: 55 }, { month: "Jul", score: 61 }, { month: "Aug", score: 68 },
];

const SKILL_GROWTH = [
  { month: "Mar", skills: 6 }, { month: "Apr", skills: 7 }, { month: "May", skills: 8 },
  { month: "Jun", skills: 9 }, { month: "Jul", skills: 11 }, { month: "Aug", skills: 12 },
];

const CANDIDATES = [
  {
    id: "cand1", name: "Alex Johnson", initials: "AJ", university: "Coventry University", degree: "BSc Software Engineering",
    goal: "Backend Engineer", skills: ["Python", "FastAPI", "SQL", "Docker"], projects: 8, readiness: 68, location: "Coventry, UK",
    year: "Year 3", email: "alex.johnson@coventry.ac.uk",
    bio: "Third-year software engineering student focused on backend systems and applied AI.",
  },
  {
    id: "cand2", name: "Priya Nair", initials: "PN", university: "University of Manchester", degree: "BSc Computer Science",
    goal: "Frontend Engineer", skills: ["React", "TypeScript", "CSS", "Figma"], projects: 11, readiness: 81, location: "Manchester, UK",
    year: "Year 4", email: "priya.nair@manchester.ac.uk",
    bio: "Final-year computer science student specialising in accessible, design-driven frontend engineering.",
  },
  {
    id: "cand3", name: "Tom Whitfield", initials: "TW", university: "University of Leeds", degree: "MEng Software Engineering",
    goal: "Data Engineer", skills: ["Python", "Spark", "SQL", "Airflow"], projects: 6, readiness: 74, location: "Leeds, UK",
    year: "Year 4", email: "tom.whitfield@leeds.ac.uk",
    bio: "Master's student building large-scale data pipelines, with a research focus on stream processing.",
  },
  {
    id: "cand4", name: "Maria Alonso", initials: "MA", university: "Coventry University", degree: "BSc Computer Science",
    goal: "ML Engineer", skills: ["Python", "PyTorch", "SQL", "Docker"], projects: 9, readiness: 71, location: "Coventry, UK",
    year: "Year 3", email: "maria.alonso@coventry.ac.uk",
    bio: "Applied machine learning student with a portfolio of computer vision and NLP projects.",
  },
  {
    id: "cand5", name: "Daniel Osei", initials: "DO", university: "Imperial College London", degree: "MEng Computing",
    goal: "Backend Engineer", skills: ["Java", "Spring", "PostgreSQL", "Kafka"], projects: 7, readiness: 85, location: "London, UK",
    year: "Year 4", email: "daniel.osei@imperial.ac.uk",
    bio: "Master's student focused on distributed systems and event-driven backend architecture.",
  },
];

const ADMIN_STATS = {
  totalStudents: 4820, activeStudents: 3145, profilesCompleted: 2680,
  internshipsPlaced: 412, applications: 5230, employabilityScore: 71,
};

const ADMIN_SKILL_TRENDS = [
  { skill: "Python", students: 2140 }, { skill: "SQL", students: 1820 }, { skill: "React", students: 1510 },
  { skill: "Java", students: 1290 }, { skill: "Docker", students: 940 }, { skill: "AWS", students: 760 },
];

const ADMIN_ENGAGEMENT = [
  { month: "Mar", engagement: 58 }, { month: "Apr", engagement: 62 }, { month: "May", engagement: 65 },
  { month: "Jun", engagement: 61 }, { month: "Jul", engagement: 69 }, { month: "Aug", engagement: 74 },
];

const ADMIN_CAREER_INTEREST = [
  { name: "Backend", value: 28 }, { name: "Frontend", value: 22 }, { name: "Data/ML", value: 24 },
  { name: "Cloud/DevOps", value: 14 }, { name: "Other", value: 12 },
];

const PIE_COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#0EA5E9", "#94A3B8"];

const PRICING = [
  {
    tier: "Free", price: "£0", period: "forever",
    features: ["Basic career profile", "Up to 6 projects", "Core skills tracking", "Basic CV export"],
    cta: "Get started",
  },
  {
    tier: "Pro", price: "£6", period: "/month", featured: true,
    features: ["Everything in Free", "AI Career Coach", "Career roadmap & skill-gap analysis", "Advanced CV themes", "Priority opportunity matching"],
    cta: "Start free trial",
  },
  {
    tier: "University", price: "Custom", period: "per institution",
    features: ["Full student analytics", "Career services dashboard", "Opportunity management", "Employer partnerships", "Dedicated support"],
    cta: "Talk to sales",
  },
];

const EMPLOYER_MESSAGES = [
  { id: "m1", candidate: "Alex Johnson", initials: "AJ", lastMessage: "Thanks for reaching out — I'd love to hear more about the role.", time: "2h ago", unread: true },
  { id: "m2", candidate: "Maria Alonso", initials: "MA", lastMessage: "I've attached my updated portfolio link.", time: "1d ago", unread: false },
  { id: "m3", candidate: "Daniel Osei", initials: "DO", lastMessage: "Is the interview still scheduled for Thursday?", time: "3d ago", unread: false },
];

/* =========================================================================
   MOCK AI SERVICE  (careerAssistantService — swap for a real model API later)
   ========================================================================= */
const AI_RESPONSES = [
  {
    match: ["skill", "missing", "gap", "lack"],
    reply: {
      text: "Based on your profile as an aspiring Backend Engineer, here's where you stand:",
      type: "gap",
      data: {
        strengths: ["Python", "REST APIs", "Git"],
        gaps: [
          { name: "PostgreSQL", why: "Backend roles commonly require production SQL proficiency.", time: "2–3 weeks" },
          { name: "Docker", why: "Containerisation is expected for most backend/deployment workflows.", time: "1–2 weeks" },
          { name: "System Design", why: "Interviews for backend roles frequently test this directly.", time: "4–6 weeks" },
        ],
      },
    },
  },
  {
    match: ["backend engineer", "become", "how can i"],
    reply: {
      text: "You already have a solid foundation. Here's a recommended path to Backend Engineer:",
      type: "roadmap",
      data: { steps: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "System Design"] },
    },
  },
  {
    match: ["analyze my", "analyse my", "review my profile", "cv"],
    reply: {
      text: "Here's my analysis of your current career profile:",
      type: "analysis",
      data: {
        strengths: ["Strong project portfolio (8 projects)", "Good programming foundation across Python and JS", "Multiple verified technical skills"],
        weaknesses: ["Limited internship experience (1 internship)", "Weak cloud knowledge (AWS at 18%)"],
        actions: ["Build a Docker-based project", "Learn PostgreSQL fundamentals", "Apply to 5 backend internships this month", "Complete an AWS cloud fundamentals course"],
      },
    },
  },
  {
    match: ["internship", "find", "job", "opportunit"],
    reply: {
      text: "Here are opportunities that match your current profile well:",
      type: "opportunities",
      data: OPPORTUNITIES.slice(0, 3),
    },
  },
  {
    match: ["interview", "prepare"],
    reply: {
      text: "For backend engineering interviews at your level, focus on these areas — I've broken it into a short prep plan:",
      type: "text",
      data: null,
      extra: "1. REST API design fundamentals (you're strong here)\n2. SQL query practice — joins, indexing basics\n3. One system-design walkthrough (e.g. \"design a URL shortener\")\n4. Behavioural: prepare 2 stories from your Smart City project\n\nWant me to add a mock interview session to your roadmap?",
    },
  },
  {
    match: ["improve my project", "project description"],
    reply: {
      text: "Here's a tighter version of your Smart City project description, focused on outcomes:",
      type: "text",
      data: null,
      extra: "\"Built a computer-vision pipeline (Python, OpenCV, PyTorch) that detects road-surface damage from dashcam footage and maps severity in real time — used by a 4-person team to simulate a city maintenance workflow.\" This leads with the technology and impact rather than just the topic.",
    },
  },
  {
    match: ["why am i not getting interviews", "not getting"],
    reply: {
      text: "A few likely factors based on your profile and typical hiring patterns for your target role:",
      type: "text",
      data: null,
      extra: "1. Only 1 internship on record — many backend roles filter for 2+\n2. AWS and Docker are still early-stage — these appear in most job descriptions\n3. Your project descriptions could lead with impact rather than technology\n\nNone of these are far off. Closing the PostgreSQL and Docker gaps alone would likely lift your match rate on active roles by 10–15%.",
    },
  },
];

const DEFAULT_AI_REPLY = {
  text: "I can help with that. Try asking me to analyze your profile, find matching internships, build you a roadmap to your target role, or prep you for an interview.",
  type: "text",
  data: null,
};

// careerAssistantService — mock implementation. Swap sendMessage() for a real
// model call (OpenAI / Claude / Gemini) without changing any calling UI.
const careerAssistantService = {
  async sendMessage(userText) {
    const lower = userText.toLowerCase();
    const found = AI_RESPONSES.find((r) => r.match.some((kw) => lower.includes(kw)));
    await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));
    return found ? found.reply : DEFAULT_AI_REPLY;
  },
};

const AI_SUGGESTIONS = [
  "What skills am I missing?",
  "How can I become a backend engineer?",
  "Analyze my profile",
  "Find internships for me",
  "Prepare me for an interview",
  "Why am I not getting interviews?",
];

/* =========================================================================
   REUSABLE UI COMPONENTS
   ========================================================================= */

function Button({ children, variant = "primary", size = "md", className = "", icon: Icon, iconRight, disabled, ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-xl disabled:opacity-50 disabled:pointer-events-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950";
  const sizes = { sm: "h-9 px-3.5 text-sm", md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-base" };
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-600/20 active:scale-[0.98]",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 active:scale-[0.98]",
    outline: "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50",
    ghost: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400",
    subtle: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20",
  };
  return (
    <button disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon className="w-4 h-4" strokeWidth={2} />}
      {children}
      {iconRight && React.createElement(iconRight, { className: "w-4 h-4", strokeWidth: 2 })}
    </button>
  );
}

function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl ${hover ? "transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function Badge({ children, tone = "default", className = "" }) {
  const tones = {
    default: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
    green: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    red: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    slate: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${tones[tone]} ${className}`}>{children}</span>;
}

function Avatar({ initials, size = "md", className = "" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-16 h-16 text-lg", xl: "w-24 h-24 text-2xl" };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-semibold shrink-0 ${className}`}>
      {initials}
    </div>
  );
}

function ProgressBar({ value, tone = "indigo", className = "", height = "h-2" }) {
  const tones = { indigo: "bg-indigo-600", green: "bg-green-500", amber: "bg-amber-500", slate: "bg-slate-400", red: "bg-red-500" };
  return (
    <div className={`w-full ${height} rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`${height} rounded-full ${tones[tone]}`}
      />
    </div>
  );
}

function CircularProgress({ value, size = 140, stroke = 12, label, sublabel }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 100);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={stroke} fill="none" className="text-slate-100 dark:text-slate-800" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={stroke} fill="none"
          strokeDasharray={circumference} strokeDashoffset={circumference - (animated / 100) * circumference}
          strokeLinecap="round" className="text-indigo-600 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
        {label && <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{label}</span>}
        {sublabel && <span className="text-[10px] text-slate-400 dark:text-slate-600">{sublabel}</span>}
      </div>
    </div>
  );
}

function Tabs({ tabs, active, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl w-fit overflow-x-auto ${className}`} role="tablist">
      {tabs.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={active === t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
            active === t ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function Modal({ open, onClose, title, children, width = "max-w-lg" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full ${width} max-h-[85vh] overflow-y-auto shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
              <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
              <button onClick={onClose} aria-label="Close dialog" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({ label, className = "", helperText, error, required, id, ...props }) {
  const inputId = id || `input-${label ? label.replace(/\s+/g, "-").toLowerCase() : Math.random().toString(36).slice(2)}`;
  return (
    <label className="block" htmlFor={inputId}>
      {label && (
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
      )}
      <input
        id={inputId}
        required={required}
        aria-invalid={!!error}
        className={`w-full h-11 px-3.5 rounded-xl border ${error ? "border-red-300 dark:border-red-500/50" : "border-slate-200 dark:border-slate-700"} bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${className}`}
        {...props}
      />
      {helperText && !error && <span className="block text-xs text-slate-400 mt-1.5">{helperText}</span>}
      {error && <span className="block text-xs text-red-500 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</span>}
    </label>
  );
}

function Select({ label, options, className = "", id, ...props }) {
  const selectId = id || `select-${label ? label.replace(/\s+/g, "-").toLowerCase() : Math.random().toString(36).slice(2)}`;
  return (
    <label className="block" htmlFor={selectId}>
      {label && <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</span>}
      <select
        id={selectId}
        className={`w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${className}`}
        {...props}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 40 }}
            className="flex items-center gap-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400 dark:text-green-600 shrink-0" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (message) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };
  return { toasts, push };
}

function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg ${className}`} />;
}

function EmptyState({ icon: Icon, title, message, cta, onClick }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-5">{message}</p>
      {cta && <Button size="sm" onClick={onClick}>{cta}</Button>}
    </div>
  );
}

function ErrorState({ title = "Something went wrong", message = "We couldn't load this data. Please try again.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-5">{message}</p>
      {onRetry && <Button size="sm" variant="outline" icon={RefreshCw} onClick={onRetry}>Try again</Button>}
    </div>
  );
}

/* =========================================================================
   PUBLIC SITE — SHARED NAV / FOOTER
   ========================================================================= */

function Logo({ dark: forceLight, className = "" }) {
  return (
    <div className={`flex items-center gap-2 font-semibold text-lg ${className}`}>
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 24L12 8L18 18L28 4" stroke="#4F46E5" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="4" r="3" fill="#4F46E5" />
      </svg>
      <span className={forceLight ? "text-white" : "text-slate-900 dark:text-white"}>CareerFlow</span>
    </div>
  );
}

function PublicNav() {
  const { navigate } = useRouter();
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Product", to: "landing" },
    { label: "For students", to: "for-students" },
    { label: "For employers", to: "for-employers" },
    { label: "For universities", to: "for-universities" },
    { label: "Pricing", to: "pricing" },
  ];
  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200/70 dark:border-slate-800/70" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate("landing")} aria-label="CareerFlow home"><Logo /></button>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {links.map((l) => (
            <button key={l.label} onClick={() => navigate(l.to)} className="px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50">
              {l.label}
            </button>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate("login")}>Log in</Button>
          <Button size="sm" onClick={() => navigate("signup")}>Get started</Button>
        </div>
        <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button key={l.label} onClick={() => { navigate(l.to); setMobileOpen(false); }} className="text-left px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  {l.label}
                </button>
              ))}
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("login")}>Log in</Button>
                <Button size="sm" className="flex-1" onClick={() => navigate("signup")}>Get started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PublicFooter() {
  const { navigate } = useRouter();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Logo />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-xs">Turn everything you accomplish at university into a living career profile that grows with you.</p>
        </div>
        {[
          { title: "Product", items: [["Features", "landing"], ["Pricing", "pricing"], ["For students", "for-students"]] },
          { title: "Solutions", items: [["Employers", "for-employers"], ["Universities", "for-universities"]] },
          { title: "Company", items: [["About", "about"], ["Log in", "login"], ["Sign up", "signup"]] },
        ].map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{col.title}</p>
            <div className="flex flex-col gap-2">
              {col.items.map(([label, to]) => (
                <button key={label} onClick={() => navigate(to)} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-left">{label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        © 2026 CareerFlow. Demo product for illustrative purposes.
      </div>
    </footer>
  );
}

function FadeIn({ children, delay = 0, className = "", y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative"
    >
      <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-200/40 via-transparent to-transparent dark:from-indigo-500/10 blur-2xl rounded-[2rem]" aria-hidden="true" />
      <Card className="relative p-6 shadow-2xl shadow-slate-300/40 dark:shadow-none w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <Avatar initials="AJ" />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">Alex Johnson</p>
            <p className="text-xs text-slate-400">Backend Engineer · Coventry University</p>
          </div>
          <Badge tone="green" className="ml-auto"><CheckCircle2 className="w-3 h-3" />Live</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[["Projects", "8"], ["Skills", "12"], ["Achievements", "14"]].map(([l, v]) => (
            <div key={l} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-slate-900 dark:text-white">{v}</p>
              <p className="text-[11px] text-slate-400">{l}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 mb-5">
          {[["Python", 90], ["REST APIs", 85], ["SQL", 62]].map(([s, v]) => (
            <div key={s}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-300 font-medium">{s}</span>
                <span className="text-slate-400">{v}%</span>
              </div>
              <ProgressBar value={v} height="h-1.5" />
            </div>
          ))}
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-3.5 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">You're 68% ready for Backend Engineer roles. Adding PostgreSQL would close your biggest gap.</p>
        </div>
      </Card>
    </motion.div>
  );
}

function LandingPage() {
  const { navigate } = useRouter();
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <Badge tone="indigo" className="mb-6"><Sparkles className="w-3 h-3" />Now with AI Career Coach</Badge>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Build your career before graduation.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              CareerFlow gives students a professional profile that grows with their university journey — while helping universities and employers connect talent with opportunity.
            </p>
          </FadeIn>
          <FadeIn delay={0.25} className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" iconRight={ArrowRight} onClick={() => navigate("signup")}>Create your profile</Button>
            <Button size="lg" variant="outline" onClick={() => navigate("for-students")}>See how it works</Button>
          </FadeIn>
          <FadeIn delay={0.35} className="mt-10 flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> University-verified evidence</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Free to start</span>
          </FadeIn>
        </div>
        <HeroPreviewCard />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">The problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Student experience is everywhere. CareerFlow brings it together.</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
            Students spend years building projects, skills, experience, and achievements — but most of it gets scattered across CV files, LinkedIn, Google Drive, university systems, GitHub, certificates, and old emails. CareerFlow brings it all into one evolving profile.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
          {[
            ["CV files", FileText], ["LinkedIn", Linkedin], ["Google Drive", FolderKanban], ["GitHub", Github], ["Certificates", Award],
          ].map(([label, Icon], i) => (
            <FadeIn key={label} delay={i * 0.05}>
              <Card className="p-5 flex flex-col items-center text-center gap-2.5 opacity-70">
                <Icon className="w-5 h-5 text-slate-400" />
                <span className="text-xs text-slate-400">{label}</span>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800">
        <FadeIn className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">More than a CV</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">A professional profile that develops alongside the student.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <FadeIn>
            <Card className="p-7 h-full">
              <Badge tone="default" className="mb-4">Traditional CV</Badge>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                {["Static — written once, rarely updated", "Self-reported claims with no proof", "Limited to one page of summary", "Outdated by the time you send it"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5"><Circle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-300" />{t}</li>
                ))}
              </ul>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card className="p-7 h-full border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/40 dark:bg-indigo-500/[0.03]">
              <Badge tone="indigo" className="mb-4">Live career profile</Badge>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {["Dynamic — updates as you build and learn", "Evidence-based, backed by real work", "As deep as your actual experience", "Continuously current, always shareable"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5"><CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-600" />{t}</li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800 grid lg:grid-cols-2 gap-14 items-center">
        <FadeIn>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Evidence-based skills</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-5">"Python — Advanced" means nothing on its own.</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            Instead of a bare proficiency label, every skill on CareerFlow shows exactly where it came from — projects, courses, competitions, GitHub activity, and AI assessment.
          </p>
          <div className="flex flex-wrap gap-2">
            {["4 Projects", "2 Courses", "1 Competition", "GitHub Activity", "AI Assessment"].map((t) => (
              <Badge key={t} tone="indigo">{t}</Badge>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-1">
              <Avatar initials="AJ" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Alex Johnson</p>
                <p className="text-xs text-slate-400">Software Engineering Student · Coventry University</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-5 gap-2 text-center">
              {[["12", "Projects"], ["8", "Skills"], ["3", "Certs"], ["2", "Internships"], ["14", "Achv."]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{v}</p>
                  <p className="text-[10px] text-slate-400">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Python — Advanced</p>
              <div className="flex flex-wrap gap-1.5">
                {["4 Projects", "2 Courses", "1 Competition", "GitHub"].map((t) => <Badge key={t}>{t}</Badge>)}
              </div>
            </div>
          </Card>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800 grid lg:grid-cols-2 gap-14 items-center">
        <FadeIn className="order-2 lg:order-1">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Career Assistant</span>
            </div>
            <div className="flex justify-end mb-3">
              <div className="bg-indigo-600 text-white text-sm rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%]">What should I work on next?</div>
            </div>
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-2xl rounded-tl-md px-4 py-3 max-w-[92%] space-y-2">
                <p>Based on your current profile, your strongest areas are Python and API development. Your largest gaps for Backend Engineer:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["PostgreSQL", "Docker", "Testing"].map((t) => <Badge key={t} tone="amber">{t}</Badge>)}
                </div>
                <p className="text-xs text-slate-400 pt-1">Recommended: build a small FastAPI + PostgreSQL project. Estimated effort: 2–3 weeks.</p>
              </div>
            </div>
          </Card>
        </FadeIn>
        <FadeIn delay={0.1} className="order-1 lg:order-2">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Career Assistant</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-5">A tool that understands your actual profile.</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">The Career Assistant reads your real profile — not a generic questionnaire — to tell you what to learn next, review your CV, prep you for interviews, and find opportunities that fit. It's one tool inside the platform, not the whole product.</p>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800">
        <FadeIn className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Skill-gap analysis</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Know what you're missing before employers do.</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="max-w-2xl mx-auto p-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Target career</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white mb-6">Backend Engineer</p>
            <div className="space-y-4">
              {SKILL_GAP.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{s.name}</span>
                    <span className="text-slate-400">{s.pct}%</span>
                  </div>
                  <ProgressBar value={s.pct} tone={s.pct > 60 ? "indigo" : s.pct > 30 ? "amber" : "slate"} />
                </div>
              ))}
            </div>
            <div className="mt-7 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <CircularProgress value={68} size={72} stroke={7} />
              <p className="text-sm text-slate-500 dark:text-slate-400">You're <span className="font-semibold text-slate-900 dark:text-white">68% ready</span> for your target role. This is a demo metric, calculated from skills, experience, projects, and profile completeness.</p>
            </div>
          </Card>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800">
        <FadeIn className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Career roadmap</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">A personalised plan, phase by phase.</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {[["Foundation", "Python, Git, fundamentals", Layers], ["Backend development", "FastAPI, REST APIs", FolderKanban], ["Engineering", "Docker, testing, system design", Briefcase], ["Job ready", "Interview prep, applications", Rocket]].map(([t, sub, Icon], i) => (
            <FadeIn key={t} delay={i * 0.08}>
              <Card className="p-6 text-center" hover>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="font-semibold text-slate-900 dark:text-white">{t}</p>
                <p className="text-xs text-slate-400 mt-1">{sub}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800">
        <FadeIn className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Opportunities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Matched to your actual profile.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-5">
          {OPPORTUNITIES.slice(0, 3).map((o, i) => (
            <FadeIn key={o.id} delay={i * 0.08}>
              <OpportunityCard opp={o} compact />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800 grid lg:grid-cols-2 gap-14 items-center">
        <FadeIn>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">For employers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-5">Discover potential, not just experience.</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">Search students by skill, university, degree, and project history — see verified evidence instead of self-reported claims.</p>
          <div className="flex flex-wrap gap-2">
            {["University", "Degree", "Skills", "Projects", "Location"].map((t) => <Badge key={t}>{t}</Badge>)}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-3">
            {CANDIDATES.slice(0, 2).map((c) => <CandidateCard key={c.id} candidate={c} compact />)}
          </div>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-800">
        <FadeIn className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">For universities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Give career services real visibility.</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {[["Track development", TrendingUp], ["Promote opportunities", Rocket], ["Measure engagement", BarChart3], ["Connect employers", Building2], ["Identify skill gaps", Target]].map(([t, Icon]) => (
            <Card key={t} className="p-5 text-center">
              <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{t}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-28">
        <FadeIn>
          <Card className="p-14 text-center bg-slate-900 dark:bg-indigo-600 border-0 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} aria-hidden="true" />
            <h2 className="relative text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Your career starts long before your first job.</h2>
            <p className="relative text-indigo-100 mb-8 max-w-md mx-auto">Free to start. No credit card required.</p>
            <Button size="lg" variant="secondary" className="relative bg-white text-slate-900 hover:bg-slate-100" onClick={() => navigate("signup")} iconRight={ArrowRight}>Create your profile</Button>
          </Card>
        </FadeIn>
      </section>
    </div>
  );
}

function OpportunityCard({ opp, compact, onView }) {
  const { navigate } = useRouter();
  const typeTone = { Internship: "indigo", Job: "green", Programme: "amber", Competition: "red", Scholarship: "slate" };
  return (
    <Card className="p-5" hover>
      <div className="flex items-start justify-between mb-3">
        <div>
          <Badge tone={typeTone[opp.type] || "default"} className="mb-2">{opp.type}</Badge>
          <p className="font-semibold text-slate-900 dark:text-white leading-snug">{opp.title}</p>
          <p className="text-sm text-slate-400">{opp.company}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{opp.match}%</p>
          <p className="text-[10px] text-slate-400">match</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 flex-wrap">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.duration}</span>
      </div>
      {!compact && (
        <div className="mb-3 space-y-1">
          <p className="text-[11px] text-slate-400 mb-1.5">Based on your profile</p>
          {opp.matched.map((s) => <p key={s} className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />{s}</p>)}
          {opp.gaps.map((s) => <p key={s} className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5"><AlertCircle className="w-3 h-3" />{s}</p>)}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {opp.skills.slice(0, 3).map((s) => <Badge key={s}>{s}</Badge>)}
      </div>
      <Button size="sm" variant="outline" className="w-full" onClick={() => (onView ? onView(opp) : navigate("landing"))}>View opportunity</Button>
    </Card>
  );
}

function CandidateCard({ candidate: c, compact, onSave, onView }) {
  return (
    <Card className="p-5" hover>
      <div className="flex items-center gap-3 mb-3">
        <Avatar initials={c.initials} />
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 dark:text-white truncate">{c.name}</p>
          <p className="text-xs text-slate-400 truncate">{c.degree} · {c.university}</p>
        </div>
        <div className="ml-auto text-right shrink-0">
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{c.readiness}%</p>
          <p className="text-[10px] text-slate-400">readiness</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 flex-wrap">
        <span className="flex items-center gap-1"><Target className="w-3 h-3" />{c.goal}</span>
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {c.skills.slice(0, 4).map((s) => <Badge key={s}>{s}</Badge>)}
      </div>
      {!compact && (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={onView}>View profile</Button>
          <Button size="sm" variant="ghost" onClick={onSave} aria-label={`Save ${c.name}`}><Bookmark className="w-4 h-4" /></Button>
        </div>
      )}
    </Card>
  );
}

function SimpleMarketingPage({ eyebrow, title, description, points, ctaLabel }) {
  const { navigate } = useRouter();
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <FadeIn className="max-w-2xl">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{eyebrow}</p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-5">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
        <Button className="mt-8" iconRight={ArrowRight} onClick={() => navigate("signup")}>{ctaLabel}</Button>
      </FadeIn>
      <div className="grid sm:grid-cols-2 gap-5 mt-16">
        {points.map(([title, desc, Icon], i) => (
          <FadeIn key={title} delay={i * 0.06}>
            <Card className="p-6" hover>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="font-semibold text-slate-900 dark:text-white mb-1.5">{title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ForStudentsPage() {
  return <SimpleMarketingPage
    eyebrow="For students" title="Build proof, not just claims."
    description="Every project, course, competition, and activity you complete becomes part of an evolving, evidence-based career profile — so you always know where you stand and what to do next."
    ctaLabel="Build my profile"
    points={[
      ["Live career profile", "Your profile updates automatically as you add work — no more rewriting your CV from scratch.", Sparkles],
      ["Career Assistant", "Ask what to learn next, get your profile analysed, or prep for interviews — grounded in your real activity.", Bot],
      ["Skill-gap analysis", "See exactly what's missing for your target role, with time estimates and resources.", Target],
      ["Opportunity matching", "Internships, jobs, and competitions ranked by how well they fit your actual profile.", Briefcase],
    ]}
  />;
}
function ForEmployersPage() {
  return <SimpleMarketingPage
    eyebrow="For employers" title="Your next hire, backed by real evidence."
    description="Search verified student profiles by skill, project history, degree, and university — see what candidates have actually built, not just what they claim."
    ctaLabel="Start hiring"
    points={[
      ["Powerful search", "Filter by skills, degree, university, project history, and readiness score.", Search],
      ["Verified evidence", "University-verified projects, certifications, and activity — not self-reported claims.", Shield],
      ["Match scoring", "See exactly how a candidate matches your role, and where the gaps are.", Gauge],
      ["Direct outreach", "Save candidates, message them directly, and manage your pipeline in one place.", Users],
    ]}
  />;
}
function ForUniversitiesPage() {
  return <SimpleMarketingPage
    eyebrow="For universities" title="Give career services a real-time view."
    description="Track student development, promote opportunities, and measure the actual employability impact of your career programmes."
    ctaLabel="Talk to sales"
    points={[
      ["Student analytics", "See engagement, skill trends, and career readiness across your entire cohort.", BarChart3],
      ["Opportunity management", "Post and manage internships, jobs, and programmes directly to your students.", Rocket],
      ["Employer partnerships", "Connect verified student talent directly with hiring partners.", Building2],
      ["Programme impact", "Measure how your career services actually move the needle on outcomes.", TrendingUp],
    ]}
  />;
}

function PricingPage() {
  const { navigate } = useRouter();
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <FadeIn className="max-w-xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Simple pricing, real value.</h1>
        <p className="text-slate-500 dark:text-slate-400">Start free. Upgrade when your career profile needs more.</p>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {PRICING.map((p, i) => (
          <FadeIn key={p.tier} delay={i * 0.08}>
            <Card className={`p-8 h-full flex flex-col ${p.featured ? "border-indigo-400 dark:border-indigo-500 border-2 relative" : ""}`}>
              {p.featured && <Badge tone="indigo" className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>}
              <p className="font-semibold text-slate-900 dark:text-white mb-1">{p.tier}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{p.price}</span>
                <span className="text-sm text-slate-400">{p.period}</span>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <Button variant={p.featured ? "primary" : "outline"} className="w-full" onClick={() => navigate("signup")}>{p.cta}</Button>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">About CareerFlow</p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Built on a simple idea.</h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">A CV is a claim. A career profile is proof. We built CareerFlow because students spend years building real, demonstrable work — and almost none of that evidence survives into the hiring process.</p>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">CareerFlow connects the dots between what you actually did at university and what employers need to see, with a Career Assistant that helps you close the gap along the way.</p>
      </FadeIn>
    </div>
  );
}

/* =========================================================================
   AUTHENTICATION
   ========================================================================= */

function AuthShell({ title, subtitle, children, footer }) {
  const { navigate } = useRouter();
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "26px 26px" }} aria-hidden="true" />
        <button onClick={() => navigate("landing")} className="relative" aria-label="CareerFlow home"><Logo dark /></button>
        <div className="relative">
          <p className="text-2xl font-semibold leading-snug mb-4">"CareerFlow turned three years of scattered projects into one profile employers actually trust."</p>
          <div className="flex items-center gap-3">
            <Avatar initials="AJ" />
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-slate-400">Software Engineering, Coventry University</p>
            </div>
          </div>
        </div>
        <div className="relative text-xs text-slate-500">© 2026 CareerFlow</div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1.5">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{subtitle}</p>
          {children}
          {footer}
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const { navigate } = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  return (
    <AuthShell
      title="Welcome back" subtitle="Log in to continue building your career profile."
      footer={<p className="text-sm text-slate-500 dark:text-slate-400 mt-6 text-center">New here? <button onClick={() => navigate("signup")} className="text-indigo-600 dark:text-indigo-400 font-medium">Create an account</button></p>}
    >
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setError(""); navigate("dashboard"); }}>
        <Input label="Email" type="email" placeholder="you@university.ac.uk" required />
        <div className="relative">
          <Input label="Password" type={showPw ? "text" : "password"} placeholder="••••••••" required error={error} />
          <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3.5 top-[38px] text-slate-400" aria-label={showPw ? "Hide password" : "Show password"}>
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex justify-end -mt-1">
          <button type="button" onClick={() => navigate("forgot-password")} className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Forgot password?</button>
        </div>
        <Button type="submit" className="w-full">Log in</Button>
      </form>
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-400 mb-2">Quick demo access</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("dashboard")}>Student</Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("employer-dashboard")}>Employer</Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("admin-dashboard")}>University</Button>
        </div>
      </div>
    </AuthShell>
  );
}

function ForgotPasswordPage() {
  const { navigate } = useRouter();
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      title={sent ? "Check your email" : "Reset your password"}
      subtitle={sent ? "We've sent a reset link to your email address." : "Enter the email associated with your account."}
      footer={<p className="text-sm text-slate-500 dark:text-slate-400 mt-6 text-center"><button onClick={() => navigate("login")} className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center gap-1"><ChevronLeft className="w-3.5 h-3.5" />Back to login</button></p>}
    >
      {sent ? (
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">If an account exists for that email, a reset link is on its way.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <Input label="Email" type="email" placeholder="you@university.ac.uk" required />
          <Button type="submit" className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}

function SignupPage() {
  const { navigate } = useRouter();
  const [role, setRole] = useState("student");
  const roles = [
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "employer", label: "Employer", icon: Briefcase },
    { id: "university", label: "University", icon: School },
  ];
  return (
    <AuthShell
      title="Create your account" subtitle="Choose how you'll use CareerFlow."
      footer={<p className="text-sm text-slate-500 dark:text-slate-400 mt-6 text-center">Already have an account? <button onClick={() => navigate("login")} className="text-indigo-600 dark:text-indigo-400 font-medium">Log in</button></p>}
    >
      <div className="grid grid-cols-3 gap-2 mb-6" role="radiogroup" aria-label="Account type">
        {roles.map((r) => (
          <button key={r.id} type="button" role="radio" aria-checked={role === r.id} onClick={() => setRole(r.id)} className={`flex flex-col items-center gap-1.5 py-3.5 rounded-xl border text-xs font-medium transition-all ${role === r.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"}`}>
            <r.icon className="w-4 h-4" />{r.label}
          </button>
        ))}
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate(role === "student" ? "onboarding" : role === "employer" ? "employer-dashboard" : "admin-dashboard"); }}>
        <Input label="Full name" placeholder="Alex Johnson" required />
        <Input label="Email" type="email" placeholder="you@university.ac.uk" required />
        {role === "student" && (
          <>
            <Input label="University" placeholder="Coventry University" required />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Degree" options={["BSc Software Engineering", "BSc Computer Science", "MEng Computing", "BSc Data Science"]} />
              <Select label="Year" options={["Year 1", "Year 2", "Year 3", "Year 4"]} />
            </div>
            <Input label="Career goal" placeholder="Backend Engineer" />
          </>
        )}
        {role === "employer" && <Input label="Company" placeholder="Company name" required />}
        {role === "university" && <Input label="Institution" placeholder="University name" required />}
        <Input label="Password" type="password" placeholder="••••••••" required helperText="At least 8 characters." />
        <Button type="submit" className="w-full">Create account</Button>
      </form>
    </AuthShell>
  );
}

/* =========================================================================
   ONBOARDING
   ========================================================================= */

function OnboardingPage() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const steps = ["Basic info", "Education", "Skills", "Projects", "Experience", "Career interests", "Target career", "Review"];
  const [chosenSkills, setChosenSkills] = useState(["Python", "React", "Git"]);
  const skillPool = ["Python", "JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Docker", "Java", "C++"];
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const next = () => {
    if (step === steps.length - 2) {
      setAnalyzing(true);
      setTimeout(() => { setAnalyzing(false); setDone(true); setStep((s) => s + 1); }, 1800);
    } else if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      navigate("dashboard");
    }
  };
  const back = () => step > 0 && setStep((s) => s - 1);
  const toggleSkill = (s) => setChosenSkills((cur) => cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <span className="text-xs text-slate-400">Step {Math.min(step + 1, steps.length)} of {steps.length}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-10 overflow-hidden">
          <motion.div className="h-full bg-indigo-600 rounded-full" animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <Card className="p-8">
              {step === 0 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Let's start with the basics</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">This appears on your public profile.</p>
                  <div className="space-y-4">
                    <Input label="Full name" defaultValue="Alex Johnson" />
                    <Input label="Location" defaultValue="Coventry, UK" />
                    <Input label="Short bio" defaultValue="Third-year software engineering student focused on backend systems." />
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Your education</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">We'll verify this with your university where possible.</p>
                  <div className="space-y-4">
                    <Input label="University" defaultValue="Coventry University" />
                    <Select label="Degree" defaultValue="BSc Software Engineering" options={["BSc Software Engineering", "BSc Computer Science", "MEng Computing"]} />
                    <Select label="Year" defaultValue="Year 3" options={["Year 1", "Year 2", "Year 3", "Year 4"]} />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">What skills do you have?</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Pick as many as apply — you can add evidence later.</p>
                  <div className="flex flex-wrap gap-2">
                    {skillPool.map((s) => (
                      <button key={s} type="button" onClick={() => toggleSkill(s)} aria-pressed={chosenSkills.includes(s)} className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${chosenSkills.includes(s) ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Add a project</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your first project can become the strongest part of your profile.</p>
                  <div className="space-y-4">
                    <Input label="Project name" defaultValue="Smart City Road Monitoring System" />
                    <Input label="Technologies" defaultValue="Python, Flask, OpenCV" />
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Any work experience?</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Internships and part-time roles strengthen your profile. Optional at this stage.</p>
                  <div className="space-y-4">
                    <Input label="Role" placeholder="Software Engineering Intern" />
                    <Input label="Company" placeholder="Company name" />
                  </div>
                </>
              )}
              {step === 5 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">What are you interested in?</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">This shapes your Career Assistant recommendations.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Backend", "Frontend", "Data / ML", "Cloud / DevOps", "Product", "Security"].map((c) => (
                      <button key={c} type="button" className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-left">{c}</button>
                    ))}
                  </div>
                </>
              )}
              {step === 6 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Choose a target career</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">We'll build your roadmap and skill-gap analysis around this.</p>
                  <Select label="Target career" defaultValue="Backend Engineer" options={["Backend Engineer", "Frontend Engineer", "Data Engineer", "ML Engineer", "Cloud Engineer"]} />
                </>
              )}
              {step === 7 && (
                <div className="text-center py-4">
                  {analyzing ? (
                    <>
                      <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <RefreshCw className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </motion.div>
                      </div>
                      <p className="font-semibold text-slate-900 dark:text-white">Building your profile…</p>
                      <p className="text-sm text-slate-400 mt-1">This takes a few seconds.</p>
                    </>
                  ) : done ? (
                    <>
                      <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="font-bold text-lg text-slate-900 dark:text-white mb-1">Your career profile is ready.</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Here's your starting Career Readiness score.</p>
                      <CircularProgress value={42} size={120} label="/ 100" />
                      <p className="text-xs text-slate-400 mt-4">Add more projects and verify your skills to improve this quickly.</p>
                    </>
                  ) : null}
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button variant="ghost" onClick={back} disabled={step === 0 || analyzing}>Back</Button>
          <Button onClick={next} disabled={analyzing} iconRight={ArrowRight}>{step === steps.length - 1 ? "Go to dashboard" : "Continue"}</Button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   STUDENT APP SHELL
   ========================================================================= */

const STUDENT_NAV = [
  { section: null, items: [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "My profile", icon: User },
    { id: "live-cv", label: "Live CV", icon: FileText },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "achievements", label: "Achievements", icon: Trophy },
  ]},
  { section: null, items: [
    { id: "ai-coach", label: "Career Assistant", icon: Bot },
    { id: "roadmap", label: "Career development", icon: Compass },
    { id: "opportunities", label: "Opportunities", icon: Briefcase },
    { id: "applications", label: "Applications", icon: ClipboardList },
  ]},
];

function StudentShell({ children, active }) {
  const { navigate } = useRouter();
  const { dark, toggle } = useTheme();
  const [mobileNav, setMobileNav] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const bottomNav = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "ai-coach", icon: Bot, label: "Assistant" },
    { id: "opportunities", icon: Briefcase, label: "Jobs" },
    { id: "settings", icon: Settings, label: "More" },
  ];
  const notifications = [
    { id: "n1", text: "New internship match: Backend Engineering Intern (94%)", time: "5h ago" },
    { id: "n2", text: "Your Career Readiness score increased to 68%", time: "1d ago" },
    { id: "n3", text: "Employer viewed your profile", time: "2d ago" },
  ];
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-screen sticky top-0">
        <button onClick={() => navigate("landing")} className="px-6 h-16 flex items-center border-b border-slate-100 dark:border-slate-800" aria-label="CareerFlow home">
          <Logo />
        </button>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6" aria-label="Student navigation">
          {STUDENT_NAV.map((group, gi) => (
            <div key={gi} className="space-y-0.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active === item.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <item.icon className="w-4 h-4" />{item.label}
                </button>
              ))}
              {gi < STUDENT_NAV.length - 1 && <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />}
            </div>
          ))}
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
          <button onClick={() => navigate("admin-dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60">
            <School className="w-4 h-4" />University view
          </button>
          <button onClick={() => navigate("employer-dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60">
            <Building2 className="w-4 h-4" />Employer view
          </button>
        </nav>
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
          <button onClick={() => navigate("settings")} aria-current={active === "settings" ? "page" : undefined} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === "settings" ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}>
            <Settings className="w-4 h-4" />Settings
          </button>
          <button onClick={() => navigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60">
            <LogOut className="w-4 h-4" />Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-4 px-4 lg:px-8 sticky top-0 z-30">
          <button className="lg:hidden p-2 -ml-2 text-slate-500" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu className="w-5 h-5" /></button>
          <div className="relative flex-1 max-w-sm hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input placeholder="Search your career profile…" aria-label="Search your career profile" className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
          </div>
          <div className="ml-auto flex items-center gap-1.5 relative">
            <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setNotifOpen((o) => !o)} aria-label="Notifications" className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600" />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800"><p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p></div>
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 border-b border-slate-50 dark:border-slate-800/60 last:border-0">
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{n.text}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => navigate("profile")} className="flex items-center gap-2 pl-2">
              <Avatar initials="AJ" size="sm" />
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">Alex Johnson</p>
                <p className="text-[10px] text-slate-400 leading-tight">Student</p>
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">{children}</main>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 py-2">
        {bottomNav.map((n) => (
          <button key={n.id} onClick={() => navigate(n.id)} aria-current={active === n.id ? "page" : undefined} className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium ${active === n.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`}>
            <n.icon className="w-5 h-5" />{n.label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {mobileNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/50" onClick={() => setMobileNav(false)}>
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "tween", duration: 0.2 }} className="w-64 h-full bg-white dark:bg-slate-950 p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6"><Logo /><button onClick={() => setMobileNav(false)} aria-label="Close menu"><X className="w-5 h-5 text-slate-400" /></button></div>
              <nav className="space-y-1">
                {STUDENT_NAV.flatMap((g) => g.items).map((item) => (
                  <button key={item.id} onClick={() => { navigate(item.id); setMobileNav(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === item.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400"}`}>
                    <item.icon className="w-4 h-4" />{item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   STUDENT — DASHBOARD
   ========================================================================= */

function DashboardPage() {
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);

  if (loading) {
    return (
      <StudentShell active="dashboard">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>
          <Skeleton className="h-64" />
        </div>
      </StudentShell>
    );
  }

  if (errored) {
    return (
      <StudentShell active="dashboard">
        <Card><ErrorState onRetry={() => setErrored(false)} /></Card>
      </StudentShell>
    );
  }

  return (
    <StudentShell active="dashboard">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Good morning, Alex</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Here's your career development overview.</p>
        </div>
        <Button icon={Sparkles} onClick={() => navigate("ai-coach")}>Analyze my profile</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          ["Profile completion", `${STUDENT.profileCompletion}%`, User],
          ["Career readiness", `${STUDENT.careerReadiness}%`, Gauge],
          ["Skills", STUDENT.stats.skills, Code2],
          ["Projects", STUDENT.stats.projects, FolderKanban],
          ["Applications", APPLICATIONS.length, ClipboardList],
        ].map(([label, value, Icon]) => (
          <Card key={label} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">{label}</span>
              <Icon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-white">Career readiness trend</h3>
            <Badge tone="green"><TrendingUp className="w-3 h-3" />+27 this year</Badge>
          </div>
          <p className="text-xs text-slate-400 mb-4">Simulated score for demo purposes — not a real labour-market prediction.</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={READINESS_TREND}>
              <defs>
                <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={30} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Area type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={2.5} fill="url(#readinessGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <CircularProgress value={STUDENT.careerReadiness} size={130} label="/ 100" sublabel="Career readiness" />
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">You're stronger than <span className="font-semibold text-slate-600 dark:text-slate-300">72%</span> of students targeting Backend Engineer roles.</p>
          <Button size="sm" variant="subtle" className="mt-4 w-full" onClick={() => navigate("roadmap")}>View breakdown</Button>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recommended actions</h3>
          <div className="space-y-1">
            {RECOMMENDED_ACTIONS.map((a) => (
              <button key={a.id} onClick={() => navigate(a.target)} className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ListChecks className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.detail}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-1.5" />
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Skill development</h3>
          <ResponsiveContainer width="100%" height={160}>
            <RBarChart data={SKILL_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Bar dataKey="skills" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 mt-2">12 tracked skills, up from 6 in March.</p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent activity</h3>
          <div className="space-y-4">
            {ACTIVITY_FEED.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{a.text}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — PROFILE / LIVE CV
   ========================================================================= */

const ToastCtx = createContext(() => {});
const useToastsCtx = () => useContext(ToastCtx);

function ProfileHeader({ onEdit }) {
  const { push } = useToastsCtx();
  return (
    <Card className="p-6 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <Avatar initials={STUDENT.initials} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{STUDENT.name}</h1>
            <Badge tone="green"><Shield className="w-3 h-3" />Verified</Badge>
          </div>
          <p className="text-slate-500 dark:text-slate-400">{STUDENT.degree} · {STUDENT.university}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{STUDENT.location}</span>
            <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5" />{STUDENT.careerGoal}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"><Github className="w-4 h-4" />{STUDENT.github}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"><Linkedin className="w-4 h-4" />{STUDENT.linkedin}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"><Globe className="w-4 h-4" />{STUDENT.portfolio}</a>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <Button size="sm" icon={Edit3} onClick={onEdit}>Edit profile</Button>
          <Button size="sm" variant="outline" icon={Download} onClick={() => push("Preparing your CV download…")}>Download CV</Button>
          <Button size="sm" variant="ghost" icon={Share2} onClick={() => push("Profile link copied")}>Share profile</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-7 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-500 dark:text-slate-400 font-medium">Profile completion</span><span className="text-slate-400">{STUDENT.profileCompletion}%</span></div>
          <ProgressBar value={STUDENT.profileCompletion} />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-500 dark:text-slate-400 font-medium">Career readiness</span><span className="text-slate-400">{STUDENT.careerReadiness}%</span></div>
          <ProgressBar value={STUDENT.careerReadiness} tone="green" />
        </div>
      </div>
    </Card>
  );
}

function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const { push } = useToastsCtx();
  return (
    <StudentShell active="profile">
      <ProfileHeader onEdit={() => setEditOpen(true)} />
      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">About</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{STUDENT.bio}</p>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Top skills</h3>
              <Badge tone="default">{SKILLS.length} total</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILLS.slice(0, 8).map((s) => <Badge key={s.name} tone="indigo">{s.name}</Badge>)}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Featured projects</h3>
            <div className="space-y-4">
              {PROJECTS.slice(0, 2).map((p) => (
                <div key={p.id} className="pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{p.name}</p>
                    {p.verified && <Badge tone="green" className="shrink-0"><Shield className="w-3 h-3" /></Badge>}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Achievements</h3>
            <div className="space-y-3">
              {ACHIEVEMENTS.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-indigo-500 shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-300">{a.title}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Education</h3>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0"><GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /></div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{STUDENT.degree}</p>
                <p className="text-xs text-slate-400">{STUDENT.university} · {STUDENT.year}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Complete your profile</h3>
            <p className="text-xs text-slate-400 mb-3">Missing:</p>
            <div className="space-y-2 mb-4">
              {STUDENT.missingProfileItems.map((m) => (
                <div key={m} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Circle className="w-3 h-3 text-amber-400" />{m}</div>
              ))}
            </div>
            <Button size="sm" variant="subtle" className="w-full" onClick={() => setEditOpen(true)}>Complete profile</Button>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Certifications</h3>
            <div className="space-y-3">
              {CERTIFICATIONS.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.issuer}</p>
                  </div>
                  {c.verified ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-amber-400 shrink-0" />}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit profile">
        <div className="space-y-4">
          <Input label="Full name" defaultValue={STUDENT.name} />
          <Input label="Career goal" defaultValue={STUDENT.careerGoal} />
          <Input label="Bio" defaultValue={STUDENT.bio} />
          <Input label="GitHub" defaultValue={STUDENT.github} />
          <Input label="Portfolio URL" placeholder="yourname.dev" />
          <Button className="w-full" onClick={() => { setEditOpen(false); push("Profile updated"); }}>Save changes</Button>
        </div>
      </Modal>
    </StudentShell>
  );
}

function LiveCVPage() {
  const [theme, setThemeStyle] = useState("Modern");
  const { push } = useToastsCtx();
  return (
    <StudentShell active="live-cv">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live CV</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Always current. Generated directly from your career profile.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs tabs={["Modern", "Compact", "Academic"]} active={theme} onChange={setThemeStyle} />
          <Button size="sm" icon={Download} onClick={() => push("CV downloaded as PDF")}>Export PDF</Button>
          <Button size="sm" variant="outline" icon={Share2} onClick={() => push("Shareable link copied")}>Share</Button>
        </div>
      </div>

      <Card className="max-w-3xl mx-auto p-10">
        <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-slate-900 dark:border-white">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{STUDENT.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{STUDENT.degree} · {STUDENT.university}</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <p>{STUDENT.location}</p>
            <p>{STUDENT.github}</p>
            <p>{STUDENT.portfolio}</p>
          </div>
        </div>

        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">Profile</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{STUDENT.bio}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Education</h3>
          <div className="flex justify-between text-sm">
            <p className="font-semibold text-slate-800 dark:text-slate-200">{STUDENT.degree} — {STUDENT.university}</p>
            <p className="text-slate-400 text-xs">{STUDENT.year}</p>
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Experience</h3>
          {EXPERIENCE.map((e) => (
            <div key={e.id} className="mb-3">
              <div className="flex justify-between text-sm">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{e.role} — {e.company}</p>
                <p className="text-slate-400 text-xs">{e.period}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{e.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Projects</h3>
          {PROJECTS.map((p) => (
            <div key={p.id} className="mb-3">
              <div className="flex justify-between text-sm">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</p>
                <p className="text-slate-400 text-xs">{p.date}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.description}</p>
              <p className="text-xs text-slate-400 mt-1 italic">{p.tech.join(" · ")}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {SKILLS.map((s) => <span key={s.name} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">{s.name}</span>)}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Certifications & achievements</h3>
          <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            {[...CERTIFICATIONS.map((c) => c.name), ...ACHIEVEMENTS.map((a) => a.title)].map((t) => <li key={t}>· {t}</li>)}
          </ul>
        </section>
      </Card>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — PROJECTS
   ========================================================================= */

function ProjectCard({ project: p, onOpen }) {
  return (
    <Card className="p-5" hover>
      <div className="flex items-start justify-between mb-2">
        <p className="font-semibold text-slate-900 dark:text-white leading-snug pr-3">{p.name}</p>
        {p.verified && <Badge tone="green" className="shrink-0"><Shield className="w-3 h-3" /></Badge>}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {p.tech.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 flex-wrap">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{p.team === 1 ? "Solo" : `${p.team} people`}</span>
        <span>{p.category}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1" onClick={() => onOpen(p)}>View details</Button>
        {p.github && <Button size="sm" variant="ghost" aria-label="View on GitHub"><Github className="w-4 h-4" /></Button>}
      </div>
    </Card>
  );
}

function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const { push } = useToastsCtx();

  const submitProject = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Project name is required.";
    if (!form.description.trim()) nextErrors.description = "A short description helps employers understand your work.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setAddOpen(false);
    setForm({ name: "", description: "" });
    push("Project added to your profile");
  };

  return (
    <StudentShell active="projects">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{PROJECTS.length} projects · your strongest evidence category.</p>
        </div>
        <Button icon={Plus} onClick={() => setAddOpen(true)}>Add project</Button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} onOpen={setSelected} />)}
        <button onClick={() => setAddOpen(true)} className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 py-10 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors">
          <Plus className="w-6 h-6" /><span className="text-sm font-medium">Add a new project</span>
        </button>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name} width="max-w-xl">
        {selected && (
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{selected.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div><p className="text-xs text-slate-400 mb-1">Role</p><p className="font-medium text-slate-800 dark:text-slate-200">{selected.role}</p></div>
              <div><p className="text-xs text-slate-400 mb-1">Team size</p><p className="font-medium text-slate-800 dark:text-slate-200">{selected.team}</p></div>
              <div><p className="text-xs text-slate-400 mb-1">Date</p><p className="font-medium text-slate-800 dark:text-slate-200">{selected.date}</p></div>
              <div><p className="text-xs text-slate-400 mb-1">Category</p><p className="font-medium text-slate-800 dark:text-slate-200">{selected.category}</p></div>
              <div><p className="text-xs text-slate-400 mb-1">Status</p><Badge tone={selected.verified ? "green" : "amber"}>{selected.verified ? "Verified" : "Pending"}</Badge></div>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Skills demonstrated</p>
            <div className="flex flex-wrap gap-1.5 mb-4">{selected.skills.map((s) => <Badge key={s} tone="indigo">{s}</Badge>)}</div>
            <div className="flex gap-2">
              {selected.github && <Button size="sm" variant="outline" icon={Github}>Repository</Button>}
              {selected.demo && <Button size="sm" variant="outline" icon={ExternalLink}>Live demo</Button>}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={addOpen} onClose={() => { setAddOpen(false); setErrors({}); }} title="Add project">
        <form className="space-y-4" onSubmit={submitProject}>
          <Input label="Project name" required placeholder="My new project" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} error={errors.name} />
          <Input label="Description" required placeholder="What did you build, and why?" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} error={errors.description} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Technologies" placeholder="Python, React" />
            <Input label="Team size" type="number" min="1" placeholder="1" />
          </div>
          <Input label="GitHub link" placeholder="github.com/you/project" />
          <Button type="submit" className="w-full">Add project</Button>
        </form>
      </Modal>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — SKILLS
   ========================================================================= */

function SkillCard({ skill }) {
  const [open, setOpen] = useState(false);
  const ev = skill.evidence;
  return (
    <Card className="p-5">
      <button className="w-full flex items-center justify-between" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <div className="text-left">
          <p className="font-semibold text-slate-900 dark:text-white">{skill.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{skill.level}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24 hidden sm:block"><ProgressBar value={skill.pct} height="h-1.5" /></div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
              {ev.projects > 0 && <Badge tone="indigo"><FolderKanban className="w-3 h-3" />{ev.projects} project{ev.projects > 1 ? "s" : ""}</Badge>}
              {ev.courses > 0 && <Badge tone="indigo"><BookOpen className="w-3 h-3" />{ev.courses} course{ev.courses > 1 ? "s" : ""}</Badge>}
              {ev.competitions > 0 && <Badge tone="indigo"><Trophy className="w-3 h-3" />{ev.competitions} competition{ev.competitions > 1 ? "s" : ""}</Badge>}
              {ev.github && <Badge tone="indigo"><Github className="w-3 h-3" />GitHub activity</Badge>}
              {ev.ai && <Badge tone="indigo"><Sparkles className="w-3 h-3" />AI assessment</Badge>}
              {!ev.projects && !ev.courses && !ev.competitions && !ev.github && !ev.ai && <span className="text-xs text-slate-400">No evidence linked yet.</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function SkillsPage() {
  const [addOpen, setAddOpen] = useState(false);
  const { push } = useToastsCtx();
  return (
    <StudentShell active="skills">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skills</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Evidence-based — every skill is backed by real work, not a self-rating.</p>
        </div>
        <Button icon={Plus} onClick={() => setAddOpen(true)}>Add skill</Button>
      </div>
      <div className="space-y-3">
        {SKILLS.map((s) => <SkillCard key={s.name} skill={s} />)}
      </div>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add a skill">
        <div className="space-y-4">
          <Input label="Skill name" placeholder="Kubernetes" />
          <Select label="Proficiency" options={["Beginner", "Intermediate", "Advanced"]} />
          <Button className="w-full" onClick={() => { setAddOpen(false); push("Skill added — link evidence to strengthen it"); }}>Add skill</Button>
        </div>
      </Modal>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — EXPERIENCE
   ========================================================================= */

function ExperiencePage() {
  const [addOpen, setAddOpen] = useState(false);
  const { push } = useToastsCtx();
  return (
    <StudentShell active="experience">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Internships and professional experience.</p>
        </div>
        <Button icon={Plus} onClick={() => setAddOpen(true)}>Add experience</Button>
      </div>
      {EXPERIENCE.length ? (
        <div className="space-y-4">
          {EXPERIENCE.map((e) => (
            <Card key={e.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0"><Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{e.role}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{e.company} · {e.location}</p>
                    </div>
                    {e.verified && <Badge tone="green" className="shrink-0"><Shield className="w-3 h-3" />Verified</Badge>}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{e.period}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{e.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {e.skills.map((s) => <Badge key={s} tone="indigo">{s}</Badge>)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card><EmptyState icon={Briefcase} title="No experience yet" message="Internships and part-time roles strengthen your profile significantly." cta="Add experience" onClick={() => setAddOpen(true)} /></Card>
      )}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add experience">
        <div className="space-y-4">
          <Input label="Role" placeholder="Software Engineering Intern" required />
          <Input label="Company" placeholder="Company name" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Location" placeholder="Remote" />
            <Input label="Period" placeholder="Jun 2026 – Sep 2026" />
          </div>
          <Input label="Description" placeholder="What did you work on?" />
          <Button className="w-full" onClick={() => { setAddOpen(false); push("Experience added"); }}>Add experience</Button>
        </div>
      </Modal>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — ACHIEVEMENTS
   ========================================================================= */

function AchievementsPage() {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Competition", "Leadership", "Certification", "Volunteering"];
  const filtered = tab === "All" ? ACHIEVEMENTS : ACHIEVEMENTS.filter((a) => a.type === tab);
  const iconFor = { Competition: Trophy, Leadership: Users, Certification: Award, Volunteering: Star };
  return (
    <StudentShell active="achievements">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Achievements</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Competitions, leadership, volunteering, and certifications.</p>
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} className="mb-6" />
      {filtered.length ? (
        <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-6">
          {filtered.map((a) => {
            const Icon = iconFor[a.type] || Star;
            return (
              <div key={a.id} className="relative">
                <div className="absolute -left-[31px] top-0 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border-4 border-white dark:border-slate-950 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <Card className="p-4 ml-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{a.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{a.type} · {a.date}</p>
                    </div>
                    {a.verified ? <Badge tone="green" className="shrink-0"><Shield className="w-3 h-3" /></Badge> : <Badge tone="amber" className="shrink-0">Pending</Badge>}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <Card><EmptyState icon={Trophy} title="Nothing here yet" message="Achievements in this category will appear here once added." /></Card>
      )}
      <Card className="p-6 mt-8">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Certifications</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((c) => (
            <div key={c.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-4 h-4 text-indigo-500" />
                {c.verified && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{c.issuer} · {c.date}</p>
              <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-1">ID: {c.credentialId}</p>
            </div>
          ))}
        </div>
      </Card>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — CAREER ASSISTANT
   ========================================================================= */

function AIMessage({ message, onAddToRoadmap }) {
  if (message.from === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-indigo-600 text-white text-sm rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[80%]">{message.text}</div>
      </div>
    );
  }
  const r = message.reply;
  return (
    <div className="flex justify-start mb-4 gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-4 h-4 text-white" /></div>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-md px-4 py-3.5 max-w-[85%] space-y-3">
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{r.text}</p>

        {r.type === "gap" && (
          <div className="space-y-3 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {r.data.strengths.map((s) => <Badge key={s} tone="green"><CheckCircle2 className="w-3 h-3" />{s}</Badge>)}
            </div>
            {r.data.gaps.map((g) => (
              <div key={g.name} className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{g.name}</p>
                  <Badge tone="amber">{g.time}</Badge>
                </div>
                <p className="text-xs text-slate-400">{g.why}</p>
                <Button size="sm" variant="subtle" className="mt-2.5" onClick={() => onAddToRoadmap && onAddToRoadmap(g.name)}>Add to my roadmap</Button>
              </div>
            ))}
          </div>
        )}

        {r.type === "roadmap" && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {r.data.steps.map((s, i) => (
              <React.Fragment key={s}>
                <Badge tone="indigo">{s}</Badge>
                {i < r.data.steps.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300" />}
              </React.Fragment>
            ))}
          </div>
        )}

        {r.type === "analysis" && (
          <div className="space-y-3 pt-1">
            <div>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1.5 uppercase tracking-wide">Strengths</p>
              <ul className="space-y-1">{r.data.strengths.map((s) => <li key={s} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />{s}</li>)}</ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1.5 uppercase tracking-wide">Weaknesses</p>
              <ul className="space-y-1">{r.data.weaknesses.map((s) => <li key={s} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5"><AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />{s}</li>)}</ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1.5 uppercase tracking-wide">Recommended actions</p>
              <ol className="space-y-1">{r.data.actions.map((s, i) => <li key={s} className="text-xs text-slate-600 dark:text-slate-300">{i + 1}. {s}</li>)}</ol>
            </div>
          </div>
        )}

        {r.type === "opportunities" && (
          <div className="space-y-2 pt-1">
            {r.data.map((o) => (
              <div key={o.id} className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{o.title}</p>
                  <p className="text-xs text-slate-400">{o.company}</p>
                </div>
                <Badge tone="indigo" className="shrink-0">{o.match}%</Badge>
              </div>
            ))}
          </div>
        )}

        {r.type === "text" && r.extra && <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line pt-1">{r.extra}</p>}
      </div>
    </div>
  );
}

function AICoachPage() {
  const { push } = useToastsCtx();
  const [messages, setMessages] = useState([
    { from: "ai", reply: { text: "Hi Alex — I'm your Career Assistant. Ask me anything about your profile, skills, or how to prep for your next opportunity.", type: "text", data: null } },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [history] = useState(["Skill gap for Backend Engineer", "Analyze my profile", "Interview prep questions"]);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, typing]);

  const send = async (text) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTyping(true);
    const reply = await careerAssistantService.sendMessage(t);
    setTyping(false);
    setMessages((m) => [...m, { from: "ai", reply }]);
  };

  return (
    <StudentShell active="ai-coach">
      <div className="grid lg:grid-cols-[220px_1fr_260px] gap-6 h-[calc(100vh-140px)]">
        <Card className="p-4 hidden lg:flex flex-col">
          <Button size="sm" icon={Plus} variant="outline" className="w-full mb-4" onClick={() => setMessages([{ from: "ai", reply: { text: "New conversation started. What would you like to know?", type: "text", data: null } }])}>New chat</Button>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">History</p>
          <div className="space-y-1 overflow-y-auto">
            {history.map((h) => (
              <button key={h} onClick={() => send(h)} className="w-full text-left text-xs text-slate-500 dark:text-slate-400 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 truncate">{h}</button>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
            <div><p className="text-sm font-semibold text-slate-900 dark:text-white">Career Assistant</p><p className="text-[11px] text-slate-400">Grounded in your live profile</p></div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5">
            {messages.map((m, i) => <AIMessage key={i} message={m} onAddToRoadmap={(skill) => push(`Added "${skill}" to your roadmap`)} />)}
            {typing && (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />)}
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {AI_SUGGESTIONS.slice(0, 3).map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">{s}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask your Career Assistant…" aria-label="Message the Career Assistant" className="flex-1 h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              <Button size="md" className="px-3.5" aria-label="Send message"><Send className="w-4 h-4" /></Button>
            </form>
          </div>
        </Card>

        <Card className="p-5 hidden lg:block overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Career context</p>
          <div className="space-y-4 text-sm">
            <div><p className="text-xs text-slate-400 mb-1">Degree</p><p className="font-medium text-slate-800 dark:text-slate-200">{STUDENT.degree}</p></div>
            <div><p className="text-xs text-slate-400 mb-1">Target career</p><p className="font-medium text-slate-800 dark:text-slate-200">{STUDENT.careerGoal}</p></div>
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Top skills</p>
              <div className="flex flex-wrap gap-1">{SKILLS.slice(0, 5).map((s) => <Badge key={s.name}>{s.name}</Badge>)}</div>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Missing skills</p>
              <div className="flex flex-wrap gap-1">{["Docker", "AWS", "System Design"].map((s) => <Badge key={s} tone="amber">{s}</Badge>)}</div>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 mb-2">Profile score</p>
              <CircularProgress value={68} size={80} stroke={7} />
            </div>
          </div>
        </Card>
      </div>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — CAREER DEVELOPMENT / ROADMAP
   ========================================================================= */

function RoadmapPage() {
  const { push } = useToastsCtx();
  const [phases, setPhases] = useState(ROADMAP_PHASES);
  const statusStyle = {
    done: { badge: "green", icon: CheckCircle2 },
    "in-progress": { badge: "indigo", icon: Circle },
    upcoming: { badge: "default", icon: Circle },
  };
  const completedCount = phases.filter((p) => p.status === "done").length;

  const advancePhase = (id) => {
    setPhases((cur) => cur.map((p) => {
      if (p.id !== id) return p;
      if (p.status === "upcoming") return { ...p, status: "in-progress" };
      if (p.status === "in-progress") return { ...p, status: "done" };
      return p;
    }));
  };

  return (
    <StudentShell active="roadmap">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Career development</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Personalised path to becoming a <span className="font-medium text-slate-700 dark:text-slate-300">{STUDENT.careerGoal}</span>.</p>
        </div>
        <Select options={["Backend Engineer", "Frontend Engineer", "Data Engineer", "ML Engineer"]} className="w-56" />
      </div>

      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Career readiness</h3>
        <p className="text-xs text-slate-400 mb-5">This is a demo metric calculated from the categories below — not a guaranteed employability score.</p>
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <CircularProgress value={STUDENT.careerReadiness} size={140} label="/ 100" />
          </div>
          <div className="space-y-3">
            {STUDENT.readinessBreakdown.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{b.label}</span>
                  <span className="text-slate-400">{b.value}%</span>
                </div>
                <ProgressBar value={b.value} tone={b.value > 60 ? "indigo" : b.value > 30 ? "amber" : "slate"} height="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <CircularProgress value={Math.round((completedCount / phases.length) * 100)} size={100} stroke={9} label="complete" />
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-1">{completedCount} of {phases.length} phases complete</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">The roadmap below updates as you add new skills, courses, and projects.</p>
        </div>
      </Card>

      <div className="space-y-4">
        {phases.map((p) => {
          const st = statusStyle[p.status];
          return (
            <Card key={p.id} className={`p-6 ${p.status === "in-progress" ? "border-indigo-300 dark:border-indigo-500/40" : ""}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.status === "done" ? "bg-green-50 dark:bg-green-500/10" : p.status === "in-progress" ? "bg-indigo-50 dark:bg-indigo-500/10" : "bg-slate-100 dark:bg-slate-800"}`}>
                  <st.icon className={`w-5 h-5 ${p.status === "done" ? "text-green-600 dark:text-green-400" : p.status === "in-progress" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{p.phase}</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{p.title}</p>
                    </div>
                    <Badge tone={st.badge}>{p.status === "in-progress" ? "In progress" : p.status === "done" ? "Complete" : "Upcoming"}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.skills.map((s) => <Badge key={s}>{s}</Badge>)}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span>{p.projects} project{p.projects !== 1 ? "s" : ""}</span>
                    <span>{p.courses} course{p.courses !== 1 ? "s" : ""}</span>
                  </div>
                </div>
                {p.status !== "done" && (
                  <Button size="sm" variant="outline" onClick={() => { advancePhase(p.id); push(p.status === "upcoming" ? `Started "${p.title}"` : `Marked "${p.title}" complete`); }} className="shrink-0 hidden sm:inline-flex">
                    {p.status === "in-progress" ? "Mark complete" : "Start"}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — OPPORTUNITIES
   ========================================================================= */

function OpportunitiesPage() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const { push } = useToastsCtx();
  const tabs = ["All", "Internships", "Jobs", "Competitions", "Scholarships", "Programmes"];
  const typeMap = { Internships: "Internship", Jobs: "Job", Competitions: "Competition", Scholarships: "Scholarship", Programmes: "Programme" };
  const filtered = OPPORTUNITIES.filter((o) => (tab === "All" || o.type === typeMap[tab]) && o.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <StudentShell active="opportunities">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Opportunities</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Matched to your live profile — updated as your skills grow.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search opportunities…" aria-label="Search opportunities" className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
        </div>
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
      </div>
      {filtered.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((o) => <OpportunityCard key={o.id} opp={o} onView={setSelected} />)}
        </div>
      ) : (
        <Card><EmptyState icon={Briefcase} title="No matches found" message="Try a different search term or filter." /></Card>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} width="max-w-xl">
        {selected && (
          <div>
            <p className="text-sm text-slate-400 mb-1">{selected.company} · {selected.location}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{selected.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div><p className="text-xs text-slate-400 mb-1">Duration</p><p className="font-medium text-slate-800 dark:text-slate-200">{selected.duration}</p></div>
              <div><p className="text-xs text-slate-400 mb-1">Deadline</p><p className="font-medium text-slate-800 dark:text-slate-200">{selected.deadline}</p></div>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Based on your profile</p>
            <div className="space-y-1 mb-4">
              {selected.matched.map((s) => <p key={s} className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />{s}</p>)}
              {selected.gaps.map((s) => <p key={s} className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5"><AlertCircle className="w-3 h-3" />{s}</p>)}
            </div>
            <Button className="w-full" onClick={() => { setSelected(null); push(`Applied to ${selected.title}`); }}>Apply now</Button>
          </div>
        )}
      </Modal>
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — APPLICATIONS
   ========================================================================= */

function ApplicationsPage() {
  const { navigate } = useRouter();
  const statusTone = { "Under review": "amber", "Interview scheduled": "indigo", Offer: "green", Applied: "default" };
  return (
    <StudentShell active="applications">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Applications</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track every opportunity you've applied to.</p>
      </div>
      {APPLICATIONS.length ? (
        <Card className="overflow-hidden">
          <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800">
            <span>Role</span><span>Company</span><span>Status</span><span>Date applied</span>
          </div>
          {APPLICATIONS.map((a) => (
            <div key={a.id} className="grid sm:grid-cols-4 gap-2 sm:gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 items-center">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{a.company}</p>
              <div><Badge tone={statusTone[a.status]}>{a.status}</Badge></div>
              <p className="text-xs text-slate-400">{a.date}</p>
            </div>
          ))}
        </Card>
      ) : (
        <Card><EmptyState icon={ClipboardList} title="No applications yet" message="Apply to your first opportunity to start tracking it here." cta="Browse opportunities" onClick={() => navigate("opportunities")} /></Card>
      )}
    </StudentShell>
  );
}

/* =========================================================================
   STUDENT — SETTINGS
   ========================================================================= */

function SettingsPage() {
  const { dark, toggle } = useTheme();
  const [tab, setTab] = useState("Account");
  const tabs = ["Account", "Profile", "Privacy", "Notifications", "Appearance", "Security", "Connected accounts"];
  const { push } = useToastsCtx();
  return (
    <StudentShell active="settings">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Settings</h1>
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap ${tab === t ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}>{t}</button>
          ))}
        </div>
        <Card className="p-6">
          {tab === "Account" && (
            <div className="space-y-4 max-w-md">
              <Input label="Full name" defaultValue={STUDENT.name} />
              <Input label="Email" defaultValue={STUDENT.email} />
              <Button onClick={() => push("Account details saved")}>Save changes</Button>
            </div>
          )}
          {tab === "Profile" && (
            <div className="space-y-4 max-w-md">
              <Input label="Career goal" defaultValue={STUDENT.careerGoal} />
              <Input label="Location" defaultValue={STUDENT.location} />
              <Button onClick={() => push("Profile details saved")}>Save changes</Button>
            </div>
          )}
          {tab === "Privacy" && (
            <div className="space-y-4 max-w-md">
              {["Public profile visible to employers", "Show my activity feed", "Allow universities to view my analytics"].map((l) => (
                <label key={l} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{l}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                </label>
              ))}
            </div>
          )}
          {tab === "Notifications" && (
            <div className="space-y-4 max-w-md">
              {["Profile milestone alerts", "New opportunity matches", "Career Assistant analysis complete", "Employer profile views"].map((l) => (
                <label key={l} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{l}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                </label>
              ))}
            </div>
          )}
          {tab === "Appearance" && (
            <div className="max-w-md">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Theme</p>
              <div className="flex gap-3">
                <button onClick={() => dark && toggle()} className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 ${!dark ? "border-indigo-500" : "border-slate-200 dark:border-slate-700"}`}>
                  <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" /><span className="text-xs font-medium text-slate-600 dark:text-slate-300">Light</span>
                </button>
                <button onClick={() => !dark && toggle()} className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 ${dark ? "border-indigo-500" : "border-slate-200 dark:border-slate-700"}`}>
                  <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" /><span className="text-xs font-medium text-slate-600 dark:text-slate-300">Dark</span>
                </button>
              </div>
            </div>
          )}
          {tab === "Security" && (
            <div className="space-y-4 max-w-md">
              <Input label="Current password" type="password" />
              <Input label="New password" type="password" />
              <Button onClick={() => push("Password updated")}>Update password</Button>
            </div>
          )}
          {tab === "Connected accounts" && (
            <div className="space-y-3 max-w-md">
              {[["GitHub", Github, true], ["LinkedIn", Linkedin, true], ["Google Drive", FolderKanban, false]].map(([name, Icon, connected]) => (
                <div key={name} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
                  </div>
                  {connected ? <Badge tone="green">Connected</Badge> : <Button size="sm" variant="outline" onClick={() => push(`Connecting ${name}…`)}>Connect</Button>}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </StudentShell>
  );
}

/* =========================================================================
   EMPLOYER APP
   ========================================================================= */

function EmployerShell({ children, active }) {
  const { navigate } = useRouter();
  const { dark, toggle } = useTheme();
  const [mobileNav, setMobileNav] = useState(false);
  const nav = [
    { id: "employer-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "candidate-search", label: "Candidates", icon: Search },
    { id: "job-postings", label: "Jobs", icon: Briefcase },
    { id: "employer-applications", label: "Applications", icon: ClipboardList },
    { id: "saved-candidates", label: "Saved candidates", icon: Bookmark },
    { id: "employer-messages", label: "Messages", icon: MessageSquare },
  ];
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-screen sticky top-0">
        <button onClick={() => navigate("landing")} className="px-6 h-16 flex items-center border-b border-slate-100 dark:border-slate-800" aria-label="CareerFlow home"><Logo /></button>
        <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Employer navigation">
          {nav.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} aria-current={active === item.id ? "page" : undefined} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === item.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
          <button onClick={() => navigate("dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60">
            <User className="w-4 h-4" />Student view
          </button>
        </nav>
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
          <button onClick={() => navigate("employer-settings")} aria-current={active === "employer-settings" ? "page" : undefined} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === "employer-settings" ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}><Settings className="w-4 h-4" />Settings</button>
          <button onClick={() => navigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"><LogOut className="w-4 h-4" />Log out</button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-4 px-4 lg:px-8 sticky top-0 z-30">
          <button className="lg:hidden p-2 -ml-2 text-slate-500" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu className="w-5 h-5" /></button>
          <p className="font-semibold text-slate-900 dark:text-white lg:hidden">CareerFlow</p>
          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400">{dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            <button className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400" aria-label="Notifications"><Bell className="w-4 h-4" /></button>
            <Avatar initials="FD" size="sm" />
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
      <AnimatePresence>
        {mobileNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/50" onClick={() => setMobileNav(false)}>
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "tween", duration: 0.2 }} className="w-64 h-full bg-white dark:bg-slate-950 p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6"><Logo /><button onClick={() => setMobileNav(false)} aria-label="Close menu"><X className="w-5 h-5 text-slate-400" /></button></div>
              <nav className="space-y-1">
                {nav.map((item) => (
                  <button key={item.id} onClick={() => { navigate(item.id); setMobileNav(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === item.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400"}`}>
                    <item.icon className="w-4 h-4" />{item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmployerDashboardPage() {
  const { navigate } = useRouter();
  return (
    <EmployerShell active="employer-dashboard">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Fenwick Data</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Your recruiting overview.</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[["Open positions", 3, Briefcase], ["Applications", 47, ClipboardList], ["Shortlisted", 12, UserCheck], ["Profile views", 284, Eye]].map(([l, v, Icon]) => (
          <Card key={l} className="p-4">
            <div className="flex items-center justify-between mb-3"><span className="text-xs font-medium text-slate-400">{l}</span><Icon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" /></div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{v}</p>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Top matching candidates</h3>
            <button onClick={() => navigate("candidate-search")} className="text-xs font-medium text-indigo-600 dark:text-indigo-400">View all</button>
          </div>
          <div className="space-y-3">{CANDIDATES.slice(0, 3).map((c) => <CandidateCard key={c.id} candidate={c} compact />)}</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Active postings</h3>
            <button onClick={() => navigate("job-postings")} className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Manage</button>
          </div>
          <div className="space-y-3">
            {[["Backend Engineering Intern", "47 applicants"], ["Junior Backend Developer", "22 applicants"], ["Data Analyst Intern", "18 applicants"]].map(([t, a]) => (
              <div key={t} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{t}</p>
                <span className="text-xs text-slate-400">{a}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </EmployerShell>
  );
}

function CandidateSearchPage() {
  const { navigate } = useRouter();
  const { push } = useToastsCtx();
  const [query, setQuery] = useState("");
  const [uniFilter, setUniFilter] = useState("All universities");
  const [sort, setSort] = useState("Best match");
  const [savedIds, setSavedIds] = useState([]);
  const universities = ["All universities", ...new Set(CANDIDATES.map((c) => c.university))];

  const filtered = useMemo(() => {
    let list = CANDIDATES.filter((c) =>
      (uniFilter === "All universities" || c.university === uniFilter) &&
      (c.name.toLowerCase().includes(query.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())) || c.goal.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "Best match") list = [...list].sort((a, b) => b.readiness - a.readiness);
    if (sort === "Most experienced") list = [...list].sort((a, b) => b.projects - a.projects);
    return list;
  }, [query, uniFilter, sort]);

  const toggleSave = (c) => {
    setSavedIds((ids) => {
      const already = ids.includes(c.id);
      push(already ? `Removed ${c.name} from saved` : `Saved ${c.name} to your candidates`);
      return already ? ids.filter((i) => i !== c.id) : [...ids, c.id];
    });
  };

  return (
    <EmployerShell active="candidate-search">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Candidate search</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{filtered.length} candidates match your criteria.</p>
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by skill, degree, project…" aria-label="Search candidates" className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
        </div>
        <Select options={universities} value={uniFilter} onChange={(e) => setUniFilter(e.target.value)} className="lg:w-56" />
        <Select options={["Best match", "Newest", "Most experienced"]} value={sort} onChange={(e) => setSort(e.target.value)} className="lg:w-48" />
      </div>
      {filtered.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <CandidateCard key={c.id} candidate={c} onSave={() => toggleSave(c)} onView={() => navigate("candidate-profile", { id: c.id })} />
          ))}
        </div>
      ) : (
        <Card><EmptyState icon={Users} title="No candidates found" message="Try adjusting your filters or search terms." /></Card>
      )}
    </EmployerShell>
  );
}

function CandidateProfilePage() {
  const { route, navigate, back } = useRouter();
  const { push } = useToastsCtx();
  const candidate = CANDIDATES.find((c) => c.id === route.params.id) || CANDIDATES[0];
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <EmployerShell active="candidate-search">
      <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={back} className="mb-4">Back to search</Button>
      <Card className="p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Avatar initials={candidate.initials} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-2"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">{candidate.name}</h1><Badge tone="green"><Shield className="w-3 h-3" />Verified</Badge></div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{candidate.degree} · {candidate.university} · {candidate.year}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-xl">{candidate.bio}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5" />{candidate.goal}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{candidate.location}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <Button size="sm" icon={MessageCircle} onClick={() => setContactOpen(true)}>Contact candidate</Button>
            <Button size="sm" variant="outline" icon={Download} onClick={() => push("CV downloaded")}>Download CV</Button>
            <Button size="sm" variant="ghost" icon={Bookmark} onClick={() => push(`Saved ${candidate.name}`)}>Save</Button>
          </div>
        </div>
      </Card>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Projects</h3>
            <div className="space-y-4">
              {PROJECTS.slice(0, 3).map((p) => (
                <div key={p.id} className="pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{p.name}</p>{p.verified && <Shield className="w-3.5 h-3.5 text-green-500" />}</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">{p.tech.map((t) => <Badge key={t}>{t}</Badge>)}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Experience</h3>
            {EXPERIENCE.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between"><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{e.role} — {e.company}</p><span className="text-xs text-slate-400">{e.period}</span></div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{e.description}</p>
              </div>
            ))}
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Achievements & certifications</h3>
            <div className="space-y-2">
              {ACHIEVEMENTS.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"><Trophy className="w-3.5 h-3.5 text-indigo-500 shrink-0" />{a.title}</div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6"><h3 className="font-semibold text-slate-900 dark:text-white mb-3">Skills</h3><div className="flex flex-wrap gap-1.5">{candidate.skills.map((s) => <Badge key={s} tone="indigo">{s}</Badge>)}</div></Card>
          <Card className="p-6 text-center"><h3 className="font-semibold text-slate-900 dark:text-white mb-3">Career readiness</h3><CircularProgress value={candidate.readiness} size={100} /></Card>
        </div>
      </div>
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title={`Message ${candidate.name}`}>
        <div className="space-y-4">
          <Input label="Subject" defaultValue={`Opportunity at Fenwick Data`} />
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Message</span>
            <textarea rows={5} defaultValue={`Hi ${candidate.name.split(" ")[0]}, we came across your CareerFlow profile and think you'd be a great fit for our Backend Engineering Intern role.`} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
          </label>
          <Button className="w-full" onClick={() => { setContactOpen(false); push("Message sent"); }}>Send message</Button>
        </div>
      </Modal>
    </EmployerShell>
  );
}

function SavedCandidatesPage() {
  return (
    <EmployerShell active="saved-candidates">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Saved candidates</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Candidates you've bookmarked for later review.</p>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {CANDIDATES.slice(0, 2).map((c) => <CandidateCard key={c.id} candidate={c} />)}
      </div>
    </EmployerShell>
  );
}

function JobPostingsPage() {
  const [addOpen, setAddOpen] = useState(false);
  const { push } = useToastsCtx();
  const postings = [
    { title: "Backend Engineering Intern", applicants: 47, status: "Active" },
    { title: "Junior Backend Developer", applicants: 22, status: "Active" },
    { title: "Data Analyst Intern", applicants: 18, status: "Active" },
    { title: "Frontend Engineering Intern", applicants: 0, status: "Draft" },
  ];
  return (
    <EmployerShell active="job-postings">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Jobs</h1><p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your internship and job listings.</p></div>
        <Button icon={Plus} onClick={() => setAddOpen(true)}>New posting</Button>
      </div>
      <Card className="overflow-hidden">
        {postings.map((p) => (
          <div key={p.title} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{p.title}</p>
              <p className="text-xs text-slate-400">{p.applicants} applicants</p>
            </div>
            <Badge tone={p.status === "Active" ? "green" : "default"}>{p.status}</Badge>
          </div>
        ))}
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="New posting">
        <div className="space-y-4">
          <Input label="Title" placeholder="Backend Engineering Intern" required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Type" options={["Internship", "Job", "Programme"]} />
            <Input label="Location" placeholder="Remote" />
          </div>
          <Input label="Required skills" placeholder="Python, FastAPI, SQL" />
          <Button className="w-full" onClick={() => { setAddOpen(false); push("Posting created"); }}>Create posting</Button>
        </div>
      </Modal>
    </EmployerShell>
  );
}

function EmployerApplicationsPage() {
  const applicants = [
    { name: "Alex Johnson", role: "Backend Engineering Intern", status: "Under review", date: "18 Aug 2026" },
    { name: "Maria Alonso", role: "Backend Engineering Intern", status: "Shortlisted", date: "15 Aug 2026" },
    { name: "Daniel Osei", role: "Junior Backend Developer", status: "Interview scheduled", date: "10 Aug 2026" },
    { name: "Priya Nair", role: "Data Analyst Intern", status: "Rejected", date: "2 Aug 2026" },
  ];
  const tone = { "Under review": "amber", Shortlisted: "indigo", "Interview scheduled": "green", Rejected: "red" };
  return (
    <EmployerShell active="employer-applications">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Applications</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Everyone who has applied to your postings.</p>
      <Card className="overflow-hidden">
        <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800">
          <span>Candidate</span><span>Role</span><span>Status</span><span>Date</span>
        </div>
        {applicants.map((a) => (
          <div key={a.name + a.role} className="grid sm:grid-cols-4 gap-2 sm:gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 items-center">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{a.role}</p>
            <div><Badge tone={tone[a.status]}>{a.status}</Badge></div>
            <p className="text-xs text-slate-400">{a.date}</p>
          </div>
        ))}
      </Card>
    </EmployerShell>
  );
}

function EmployerMessagesPage() {
  const [activeId, setActiveId] = useState(EMPLOYER_MESSAGES[0].id);
  const [input, setInput] = useState("");
  const active = EMPLOYER_MESSAGES.find((m) => m.id === activeId);
  return (
    <EmployerShell active="employer-messages">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Messages</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Conversations with candidates.</p>
      <Card className="grid md:grid-cols-[280px_1fr] h-[560px] overflow-hidden">
        <div className="border-r border-slate-100 dark:border-slate-800 overflow-y-auto">
          {EMPLOYER_MESSAGES.map((m) => (
            <button key={m.id} onClick={() => setActiveId(m.id)} className={`w-full text-left px-4 py-3.5 border-b border-slate-50 dark:border-slate-800/60 flex items-start gap-3 ${activeId === m.id ? "bg-indigo-50 dark:bg-indigo-500/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/40"}`}>
              <Avatar initials={m.initials} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{m.candidate}</p>
                  {m.unread && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />}
                </div>
                <p className="text-xs text-slate-400 truncate">{m.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <Avatar initials={active.initials} size="sm" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{active.candidate}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex justify-start mb-3">
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[80%]">{active.lastMessage}</div>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setInput(""); }} className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write a message…" aria-label="Write a message" className="flex-1 h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
            <Button size="md" className="px-3.5" aria-label="Send message"><Send className="w-4 h-4" /></Button>
          </form>
        </div>
      </Card>
    </EmployerShell>
  );
}

function EmployerSettingsPage() {
  const { push } = useToastsCtx();
  const [tab, setTab] = useState("Company");
  const tabs = ["Company", "Team", "Notifications", "Billing"];
  return (
    <EmployerShell active="employer-settings">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Settings</h1>
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap ${tab === t ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}>{t}</button>
          ))}
        </div>
        <Card className="p-6">
          {tab === "Company" && (
            <div className="space-y-4 max-w-md">
              <Input label="Company name" defaultValue="Fenwick Data" />
              <Input label="Website" defaultValue="fenwickdata.com" />
              <Button onClick={() => push("Company details saved")}>Save changes</Button>
            </div>
          )}
          {tab === "Team" && (
            <div className="space-y-3 max-w-md">
              {["Nora Bennett — Admin", "Jamie Cole — Recruiter"].map((m) => (
                <div key={m} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">{m}</div>
              ))}
              <Button size="sm" variant="outline" icon={Plus}>Invite teammate</Button>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="space-y-4 max-w-md">
              {["New applications", "New candidate matches", "Messages from candidates"].map((l) => (
                <label key={l} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{l}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                </label>
              ))}
            </div>
          )}
          {tab === "Billing" && (
            <div className="max-w-md">
              <p className="text-sm text-slate-500 dark:text-slate-400">You're on the <span className="font-semibold text-slate-800 dark:text-slate-200">Employer</span> plan.</p>
              <Button size="sm" variant="outline" className="mt-4">Manage billing</Button>
            </div>
          )}
        </Card>
      </div>
    </EmployerShell>
  );
}

/* =========================================================================
   UNIVERSITY ADMIN APP
   ========================================================================= */

function AdminShell({ children, active }) {
  const { navigate } = useRouter();
  const { dark, toggle } = useTheme();
  const [mobileNav, setMobileNav] = useState(false);
  const nav = [
    { id: "admin-dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "admin-students", label: "Students", icon: Users },
    { id: "admin-programs", label: "Career programmes", icon: BookOpen },
    { id: "admin-opportunities", label: "Opportunities", icon: Briefcase },
    { id: "admin-employers", label: "Employers", icon: Building2 },
    { id: "admin-analytics", label: "Analytics", icon: BarChart3 },
    { id: "admin-reports", label: "Reports", icon: FileText },
  ];
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-screen sticky top-0">
        <button onClick={() => navigate("landing")} className="px-6 h-16 flex items-center border-b border-slate-100 dark:border-slate-800" aria-label="CareerFlow home"><Logo /></button>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="University navigation">
          {nav.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} aria-current={active === item.id ? "page" : undefined} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === item.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
          <button onClick={() => navigate("dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"><User className="w-4 h-4" />Student view</button>
        </nav>
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
          <button onClick={() => navigate("admin-settings")} aria-current={active === "admin-settings" ? "page" : undefined} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === "admin-settings" ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}><Settings className="w-4 h-4" />Settings</button>
          <button onClick={() => navigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"><LogOut className="w-4 h-4" />Log out</button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-4 px-4 lg:px-8 sticky top-0 z-30">
          <button className="lg:hidden p-2 -ml-2 text-slate-500" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu className="w-5 h-5" /></button>
          <p className="font-semibold text-slate-900 dark:text-white lg:hidden">CareerFlow</p>
          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400">{dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            <Avatar initials="CU" size="sm" />
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
      <AnimatePresence>
        {mobileNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/50" onClick={() => setMobileNav(false)}>
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "tween", duration: 0.2 }} className="w-64 h-full bg-white dark:bg-slate-950 p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6"><Logo /><button onClick={() => setMobileNav(false)} aria-label="Close menu"><X className="w-5 h-5 text-slate-400" /></button></div>
              <nav className="space-y-1">
                {nav.map((item) => (
                  <button key={item.id} onClick={() => { navigate(item.id); setMobileNav(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active === item.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400"}`}>
                    <item.icon className="w-4 h-4" />{item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminDashboardPage() {
  return (
    <AdminShell active="admin-dashboard">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Coventry University — Career Services</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Institution-wide career development overview.</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          ["Total students", ADMIN_STATS.totalStudents.toLocaleString()],
          ["Active students", ADMIN_STATS.activeStudents.toLocaleString()],
          ["Profiles completed", ADMIN_STATS.profilesCompleted.toLocaleString()],
          ["Internships placed", ADMIN_STATS.internshipsPlaced],
          ["Applications", ADMIN_STATS.applications.toLocaleString()],
          ["Employability score", `${ADMIN_STATS.employabilityScore}%`],
        ].map(([l, v]) => (
          <Card key={l} className="p-4"><p className="text-xs text-slate-400 mb-2">{l}</p><p className="text-xl font-bold text-slate-900 dark:text-white">{v}</p></Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Student engagement</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RLineChart data={ADMIN_ENGAGEMENT}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={30} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Line type="monotone" dataKey="engagement" stroke="#4F46E5" strokeWidth={2.5} dot={{ r: 3 }} />
            </RLineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Career interest distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RPieChart>
              <Pie data={ADMIN_CAREER_INTEREST} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {ADMIN_CAREER_INTEREST.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
            </RPieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {ADMIN_CAREER_INTEREST.map((c, i) => (
              <span key={c.name} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />{c.name}
              </span>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Top skills across student body</h3>
        <ResponsiveContainer width="100%" height={240}>
          <RBarChart data={ADMIN_SKILL_TRENDS} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
            <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis type="category" dataKey="skill" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={70} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
            <Bar dataKey="students" fill="#4F46E5" radius={[0, 6, 6, 0]} />
          </RBarChart>
        </ResponsiveContainer>
      </Card>
    </AdminShell>
  );
}

function AdminStudentsPage() {
  const [query, setQuery] = useState("");
  const filtered = CANDIDATES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <AdminShell active="admin-students">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Student management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ADMIN_STATS.totalStudents.toLocaleString()} enrolled students.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students…" aria-label="Search students" className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="hidden sm:grid grid-cols-6 gap-4 px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800">
          <span>Name</span><span>Degree</span><span>Career goal</span><span>Completion</span><span>Readiness</span><span>Status</span>
        </div>
        {filtered.length ? filtered.map((c) => (
          <div key={c.id} className="grid sm:grid-cols-6 gap-2 sm:gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 items-center">
            <div className="flex items-center gap-2.5"><Avatar initials={c.initials} size="sm" /><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.name}</p></div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{c.degree}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{c.goal}</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{Math.min(99, c.readiness + 12)}%</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.readiness}%</p>
            <Badge tone="green">Active</Badge>
          </div>
        )) : <div className="p-10"><EmptyState icon={Users} title="No students found" message="Try a different search term." /></div>}
      </Card>
    </AdminShell>
  );
}

function AdminOpportunitiesPage() {
  return (
    <AdminShell active="admin-opportunities">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Opportunities</h1><p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage opportunities promoted to your students.</p></div>
        <Button icon={Plus}>Add opportunity</Button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {OPPORTUNITIES.map((o) => <OpportunityCard key={o.id} opp={o} compact />)}
      </div>
    </AdminShell>
  );
}

function AdminEmployersPage() {
  const employers = [
    { name: "Fenwick Data", industry: "Data infrastructure", openRoles: 3, hires: 4 },
    { name: "Solene Systems", industry: "Enterprise software", openRoles: 1, hires: 2 },
    { name: "Northbridge Analytics", industry: "Analytics consultancy", openRoles: 2, hires: 6 },
    { name: "Ravenswood Labs", industry: "Applied research", openRoles: 1, hires: 1 },
  ];
  return (
    <AdminShell active="admin-employers">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Employer partnerships</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Companies actively hiring your students.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {employers.map((e) => (
          <Card key={e.name} className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
              <div><p className="font-semibold text-slate-900 dark:text-white">{e.name}</p><p className="text-xs text-slate-400">{e.industry}</p></div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div><p className="font-bold text-slate-900 dark:text-white">{e.openRoles}</p><p className="text-xs text-slate-400">Open roles</p></div>
              <div><p className="font-bold text-slate-900 dark:text-white">{e.hires}</p><p className="text-xs text-slate-400">Students hired</p></div>
            </div>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}

function AdminAnalyticsPage() {
  return (
    <AdminShell active="admin-analytics">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Analytics</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Deeper engagement and outcome metrics.</p>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Internship placement trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={[{ m: "Mar", v: 240 }, { m: "Apr", v: 265 }, { m: "May", v: 300 }, { m: "Jun", v: 340 }, { m: "Jul", v: 380 }, { m: "Aug", v: 412 }]}>
              <defs><linearGradient id="placementGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} /><stop offset="100%" stopColor="#22C55E" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={30} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Area type="monotone" dataKey="v" stroke="#22C55E" strokeWidth={2.5} fill="url(#placementGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Applications by month</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RBarChart data={[{ m: "Mar", v: 620 }, { m: "Apr", v: 710 }, { m: "May", v: 830 }, { m: "Jun", v: 760 }, { m: "Jul", v: 890 }, { m: "Aug", v: 1020 }]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={30} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Bar dataKey="v" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </AdminShell>
  );
}

function AdminProgramsPage() {
  const programs = [
    { name: "Backend Bootcamp Track", students: 320, completion: 74 },
    { name: "Cloud Foundations Programme", students: 210, completion: 58 },
    { name: "Career Readiness Workshop Series", students: 890, completion: 82 },
  ];
  return (
    <AdminShell active="admin-programs">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Career programmes</h1><p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Programmes run by your career services team.</p></div>
        <Button icon={Plus}>New programme</Button>
      </div>
      <div className="space-y-4">
        {programs.map((p) => (
          <Card key={p.name} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
              <span className="text-xs text-slate-400">{p.students} enrolled</span>
            </div>
            <div className="flex items-center gap-3">
              <ProgressBar value={p.completion} className="flex-1" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{p.completion}%</span>
            </div>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}

function AdminReportsPage() {
  const { push } = useToastsCtx();
  const reports = [
    { name: "Q3 Employability Report", date: "1 Sep 2026", type: "Quarterly" },
    { name: "Career Services Annual Summary 2025–26", date: "15 Jul 2026", type: "Annual" },
    { name: "Internship Placement Outcomes", date: "1 Jun 2026", type: "Programme" },
  ];
  return (
    <AdminShell active="admin-reports">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Reports</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Generated reports on career services outcomes.</p>
      <Card className="overflow-hidden">
        {reports.map((r) => (
          <div key={r.name} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center"><FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /></div>
              <div><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{r.name}</p><p className="text-xs text-slate-400">{r.type} · {r.date}</p></div>
            </div>
            <Button size="sm" variant="outline" icon={Download} onClick={() => push(`Downloading ${r.name}`)}>Download</Button>
          </div>
        ))}
      </Card>
    </AdminShell>
  );
}

function AdminSettingsPage() {
  const { push } = useToastsCtx();
  return (
    <AdminShell active="admin-settings">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Settings</h1>
      <Card className="p-6 max-w-md space-y-4">
        <Input label="Institution name" defaultValue="Coventry University" />
        <Input label="Career services contact email" defaultValue="careers@coventry.ac.uk" />
        <Button onClick={() => push("Settings saved")}>Save changes</Button>
      </Card>
    </AdminShell>
  );
}

/* =========================================================================
   PUBLIC PROFILE
   ========================================================================= */

function PublicProfilePage() {
  const { navigate } = useRouter();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PublicNav />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar initials={STUDENT.initials} size="xl" />
            <div className="flex-1">
              <div className="flex items-center gap-2"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">{STUDENT.name}</h1><Badge tone="green"><Shield className="w-3 h-3" />Verified</Badge></div>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{STUDENT.degree} · {STUDENT.university}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-xl">{STUDENT.bio}</p>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button size="sm">Contact Alex</Button>
              <Button size="sm" variant="outline" icon={Download}>Download CV</Button>
              <Button size="sm" variant="ghost" icon={Share2}>Share</Button>
            </div>
          </div>
        </Card>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6"><h3 className="font-semibold text-slate-900 dark:text-white mb-4">About</h3><p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{STUDENT.bio}</p></Card>
            <Card className="p-6"><h3 className="font-semibold text-slate-900 dark:text-white mb-4">Projects</h3><div className="space-y-4">{PROJECTS.slice(0, 3).map((p) => <div key={p.id}><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{p.name}</p><p className="text-xs text-slate-400 mt-1">{p.description}</p></div>)}</div></Card>
            <Card className="p-6"><h3 className="font-semibold text-slate-900 dark:text-white mb-4">Experience</h3>{EXPERIENCE.map((e) => <div key={e.id}><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{e.role} — {e.company}</p><p className="text-xs text-slate-400 mt-1">{e.period}</p></div>)}</Card>
            <Card className="p-6"><h3 className="font-semibold text-slate-900 dark:text-white mb-4">Achievements & certifications</h3><div className="space-y-2">{ACHIEVEMENTS.slice(0, 4).map((a) => <p key={a.id} className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"><Trophy className="w-3.5 h-3.5 text-indigo-500 shrink-0" />{a.title}</p>)}</div></Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="font-semibold text-slate-900 dark:text-white mb-3">Education</h3><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{STUDENT.degree}</p><p className="text-xs text-slate-400">{STUDENT.university} · {STUDENT.year}</p></Card>
            <Card className="p-6"><h3 className="font-semibold text-slate-900 dark:text-white mb-3">Skills</h3><div className="flex flex-wrap gap-1.5">{SKILLS.slice(0, 8).map((s) => <Badge key={s.name} tone="indigo">{s.name}</Badge>)}</div></Card>
            <Card className="p-6 text-center"><h3 className="font-semibold text-slate-900 dark:text-white mb-3">Career readiness</h3><CircularProgress value={68} size={90} /></Card>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="mt-8" onClick={() => navigate("landing")} icon={ChevronLeft}>Back to CareerFlow</Button>
      </div>
    </div>
  );
}

/* =========================================================================
   ROOT APP
   ========================================================================= */

const STUDENT_ROUTES = { dashboard: DashboardPage, profile: ProfilePage, "live-cv": LiveCVPage, projects: ProjectsPage, experience: ExperiencePage, skills: SkillsPage, achievements: AchievementsPage, "ai-coach": AICoachPage, roadmap: RoadmapPage, opportunities: OpportunitiesPage, applications: ApplicationsPage, settings: SettingsPage };
const EMPLOYER_ROUTES = { "employer-dashboard": EmployerDashboardPage, "candidate-search": CandidateSearchPage, "candidate-profile": CandidateProfilePage, "saved-candidates": SavedCandidatesPage, "job-postings": JobPostingsPage, "employer-applications": EmployerApplicationsPage, "employer-messages": EmployerMessagesPage, "employer-settings": EmployerSettingsPage };
const ADMIN_ROUTES = { "admin-dashboard": AdminDashboardPage, "admin-students": AdminStudentsPage, "admin-opportunities": AdminOpportunitiesPage, "admin-employers": AdminEmployersPage, "admin-analytics": AdminAnalyticsPage, "admin-programs": AdminProgramsPage, "admin-reports": AdminReportsPage, "admin-settings": AdminSettingsPage };
const PUBLIC_ROUTES = { landing: LandingPage, "for-students": ForStudentsPage, "for-employers": ForEmployersPage, "for-universities": ForUniversitiesPage, pricing: PricingPage, about: AboutPage };

function AppInner() {
  const { route } = useRouter();
  const { toasts, push } = useToasts();

  let content;
  if (route.path === "login") content = <LoginPage />;
  else if (route.path === "forgot-password") content = <ForgotPasswordPage />;
  else if (route.path === "signup") content = <SignupPage />;
  else if (route.path === "onboarding") content = <OnboardingPage />;
  else if (route.path === "public-profile") content = <PublicProfilePage />;
  else if (STUDENT_ROUTES[route.path]) { const C = STUDENT_ROUTES[route.path]; content = <C />; }
  else if (EMPLOYER_ROUTES[route.path]) { const C = EMPLOYER_ROUTES[route.path]; content = <C />; }
  else if (ADMIN_ROUTES[route.path]) { const C = ADMIN_ROUTES[route.path]; content = <C />; }
  else {
    const C = PUBLIC_ROUTES[route.path] || LandingPage;
    content = (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <PublicNav />
        <C />
        <PublicFooter />
      </div>
    );
  }

  return (
    <ToastCtx.Provider value={{ push }}>
      <div className="font-sans antialiased bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
        {content}
        <Toast toasts={toasts} />
      </div>
    </ToastCtx.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppInner />
      </RouterProvider>
    </ThemeProvider>
  );
}
