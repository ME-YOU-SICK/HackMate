"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Trophy, 
  Star, 
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Heart,
  Share2,
  Bookmark,
  Filter,
  Search,
  Plus,
  Award,
  Zap,
  Globe,
  Code,
  Lightbulb,
  Send,
  X,
  MoreHorizontal,
  Flag,
  Edit,
  Trash2
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CommunityContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("discussions");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General",
    tags: ""
  });
  const [newComment, setNewComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle URL parameter for tab selection
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['discussions', 'events', 'projects', 'leaders'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const communityStats = [
    { label: "Active Members", value: "25,000+", icon: <Users className="h-5 w-5" /> },
    { label: "Discussions", value: "1,200+", icon: <MessageCircle className="h-5 w-5" /> },
    { label: "Events", value: "150+", icon: <Calendar className="h-5 w-5" /> },
    { label: "Projects", value: "3,500+", icon: <Code className="h-5 w-5" /> }
  ];

  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Best practices for team formation in hackathons",
      content: "I've been participating in hackathons for over a year now and wanted to share some insights on how to form effective teams. The key is finding people with complementary skills and good communication.",
      author: "Sarah Chen",
      avatar: "SC",
      replies: 24,
      views: 156,
      lastActivity: "2 hours ago",
      category: "Team Building",
      isPinned: true,
      tags: ["teamwork", "hackathons", "collaboration"],
      likes: 45,
      isLiked: false,
      isBookmarked: false,
      comments: [
        {
          id: 1,
          author: "Alex Rodriguez",
          avatar: "AR",
          content: "Great insights! I totally agree about complementary skills. In my last hackathon, our team had a designer, two developers, and a business person - perfect balance!",
          timestamp: "1 hour ago",
          likes: 8
        },
        {
          id: 2,
          author: "Emma Wilson",
          avatar: "EW",
          content: "Communication is definitely key. We use Slack channels for each team member to share updates and blockers.",
          timestamp: "45 minutes ago",
          likes: 5
        }
      ]
    },
    {
      id: 2,
      title: "React vs Vue.js: Which should I learn for hackathons?",
      content: "I'm planning to participate in more frontend-focused hackathons this year. Both React and Vue.js seem popular, but I'm not sure which one to focus on. What are your experiences?",
      author: "Alex Rodriguez",
      avatar: "AR",
      replies: 18,
      views: 89,
      lastActivity: "4 hours ago",
      category: "Technology",
      isPinned: false,
      tags: ["react", "vue", "frontend", "learning"],
      likes: 23,
      isLiked: true,
      isBookmarked: false,
      comments: [
        {
          id: 3,
          author: "David Kim",
          avatar: "DK",
          content: "React has a larger ecosystem and more job opportunities, but Vue is easier to learn quickly for hackathons. I'd recommend React if you have time to learn it properly.",
          timestamp: "3 hours ago",
          likes: 12
        }
      ]
    },
    {
      id: 3,
      title: "How to prepare for your first hackathon",
      content: "I'm attending my first hackathon next month and feeling a bit nervous. What should I bring, how should I prepare, and what can I expect? Any tips from experienced participants?",
      author: "Emma Wilson",
      avatar: "EW",
      replies: 31,
      views: 203,
      lastActivity: "6 hours ago",
      category: "Getting Started",
      isPinned: true,
      tags: ["beginner", "preparation", "tips"],
      likes: 67,
      isLiked: false,
      isBookmarked: true,
      comments: [
        {
          id: 4,
          author: "Sarah Chen",
          avatar: "SC",
          content: "Don't worry! Bring a laptop, charger, snacks, and a positive attitude. The community is super welcoming to beginners.",
          timestamp: "5 hours ago",
          likes: 15
        }
      ]
    },
    {
      id: 4,
      title: "AI/ML project ideas for hackathons",
      content: "Looking for some creative AI/ML project ideas that can be built within a hackathon timeframe. What are some interesting problems that can be solved with machine learning?",
      author: "David Kim",
      avatar: "DK",
      replies: 15,
      views: 67,
      lastActivity: "8 hours ago",
      category: "Project Ideas",
      isPinned: false,
      tags: ["ai", "ml", "projects", "innovation"],
      likes: 34,
      isLiked: false,
      isBookmarked: false,
      comments: []
    }
  ]);

  const upcomingEvents = [
    {
      title: "Weekly Tech Talk: Building Scalable APIs",
      date: "Jan 20, 2024",
      time: "2:00 PM EST",
      attendees: 45,
      type: "Webinar"
    },
    {
      title: "Community Hack Night",
      date: "Jan 22, 2024",
      time: "6:00 PM EST",
      attendees: 120,
      type: "Hackathon"
    },
    {
      title: "Mentor Office Hours",
      date: "Jan 24, 2024",
      time: "3:00 PM EST",
      attendees: 25,
      type: "Mentoring"
    }
  ];

  const topContributors = [
    { name: "Sarah Chen", contributions: 156, badge: "Community Leader", avatar: "SC" },
    { name: "Alex Rodriguez", contributions: 142, badge: "Tech Expert", avatar: "AR" },
    { name: "Emma Wilson", contributions: 128, badge: "Mentor", avatar: "EW" },
    { name: "David Kim", contributions: 115, badge: "Innovator", avatar: "DK" },
    { name: "Lisa Park", contributions: 98, badge: "Helper", avatar: "LP" }
  ];

  const categories = [
    { name: "All", count: 1200 },
    { name: "Getting Started", count: 180 },
    { name: "Team Building", count: 220 },
    { name: "Technology", count: 350 },
    { name: "Project Ideas", count: 190 },
    { name: "Events", count: 150 },
    { name: "Feedback", count: 110 }
  ];

  // Handler functions
  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: discussions.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: "You",
        avatar: "Y",
        replies: 0,
        views: 1,
        lastActivity: "Just now",
        category: newPost.category,
        isPinned: false,
        tags: newPost.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        likes: 0,
        isLiked: false,
        isBookmarked: false,
        comments: []
      };
      setDiscussions([post, ...discussions]);
      setNewPost({ title: "", content: "", category: "General", tags: "" });
      setShowCreatePost(false);
    }
  };

  const handleLikePost = (postId: number) => {
    setDiscussions(discussions.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleBookmarkPost = (postId: number) => {
    setDiscussions(discussions.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleAddComment = (postId: number) => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        avatar: "Y",
        content: newComment,
        timestamp: "Just now",
        likes: 0
      };
      setDiscussions(discussions.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, comment],
              replies: post.replies + 1
            }
          : post
      ));
      setNewComment("");
      setSelectedPost(null);
    }
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black w-full">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              HackMate Community
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Connect with fellow developers, share knowledge, get help, and grow together. 
              Join our vibrant community of innovators and creators.
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2 text-white">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
              {[
                { id: "discussions", label: "Discussions", icon: <MessageCircle className="h-4 w-4" /> },
                { id: "events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
                { id: "projects", label: "Projects", icon: <Code className="h-4 w-4" /> },
                { id: "leaders", label: "Leaders", icon: <Trophy className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "discussions" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search discussions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.name} value={category.name} className="bg-neutral-800">
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => setShowCreatePost(true)}
                      className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      New Post
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategory === category.name
                            ? "bg-blue-600 text-white"
                            : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>

                  {/* Create Post Modal */}
                  {showCreatePost && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-neutral-900 border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white">Create New Post</h3>
                          <button
                            onClick={() => setShowCreatePost(false)}
                            className="p-2 text-white/60 hover:text-white transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-white font-medium mb-2">Title *</label>
                            <input
                              type="text"
                              value={newPost.title}
                              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                              placeholder="Enter post title..."
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white font-medium mb-2">Category</label>
                            <select
                              value={newPost.category}
                              onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="General" className="bg-neutral-800">General</option>
                              <option value="Getting Started" className="bg-neutral-800">Getting Started</option>
                              <option value="Team Building" className="bg-neutral-800">Team Building</option>
                              <option value="Technology" className="bg-neutral-800">Technology</option>
                              <option value="Project Ideas" className="bg-neutral-800">Project Ideas</option>
                              <option value="Events" className="bg-neutral-800">Events</option>
                              <option value="Feedback" className="bg-neutral-800">Feedback</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-white font-medium mb-2">Content *</label>
                            <textarea
                              value={newPost.content}
                              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                              placeholder="Share your thoughts..."
                              rows={6}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white font-medium mb-2">Tags (comma-separated)</label>
                            <input
                              type="text"
                              value={newPost.tags}
                              onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                              placeholder="e.g., hackathon, react, team"
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={handleCreatePost}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                          >
                            Create Post
                          </button>
                          <button
                            onClick={() => setShowCreatePost(false)}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Discussions */}
                  <div className="space-y-4">
                    {filteredDiscussions.map((discussion, index) => (
                      <motion.div
                        key={discussion.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {discussion.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {discussion.isPinned && (
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              )}
                              <h3 className="text-white font-semibold text-lg hover:text-blue-400 transition-colors cursor-pointer">
                                {discussion.title}
                              </h3>
                            </div>
                            
                            {/* Post Content Preview */}
                            <p className="text-white/70 text-sm mb-3 line-clamp-2">
                              {discussion.content}
                            </p>
                            
                            <div className="flex items-center gap-4 text-white/60 text-sm mb-3">
                              <span>by {discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.replies} replies</span>
                              <span>•</span>
                              <span>{discussion.views} views</span>
                              <span>•</span>
                              <span>{discussion.lastActivity}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-2 py-1 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-xs">
                                {discussion.category}
                              </span>
                              {discussion.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-white/60 text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Comments Section */}
                            {selectedPost === discussion.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-4 border-t border-white/10 pt-4"
                              >
                                <div className="space-y-3 mb-4">
                                  {discussion.comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3">
                                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                        {comment.avatar}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-white font-medium text-sm">{comment.author}</span>
                                          <span className="text-white/50 text-xs">{comment.timestamp}</span>
                                        </div>
                                        <p className="text-white/70 text-sm">{comment.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="flex gap-3">
                                  <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(discussion.id)}
                                  />
                                  <button
                                    onClick={() => handleAddComment(discussion.id)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                                  >
                                    <Send className="h-4 w-4" />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <button 
                              onClick={() => handleLikePost(discussion.id)}
                              className={`p-2 transition-colors ${
                                discussion.isLiked ? "text-red-400" : "text-white/60 hover:text-white"
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${discussion.isLiked ? "fill-current" : ""}`} />
                            </button>
                            <span className="text-white/60 text-xs">{discussion.likes}</span>
                            
                            <button 
                              onClick={() => handleBookmarkPost(discussion.id)}
                              className={`p-2 transition-colors ${
                                discussion.isBookmarked ? "text-blue-400" : "text-white/60 hover:text-white"
                              }`}
                            >
                              <Bookmark className={`h-4 w-4 ${discussion.isBookmarked ? "fill-current" : ""}`} />
                            </button>
                            
                            <button 
                              onClick={() => setSelectedPost(selectedPost === discussion.id ? null : discussion.id)}
                              className="p-2 text-white/60 hover:text-white transition-colors"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            
                            <button className="p-2 text-white/60 hover:text-white transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "events" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Upcoming Community Events</h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                            <div className="flex items-center gap-4 text-white/60 text-sm">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {event.date}
                              </span>
                              <span>{event.time}</span>
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-sm">
                              {event.type}
                            </span>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                              Join Event
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Community Projects</h2>
                  <div className="text-center py-12">
                    <Code className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Projects Coming Soon</h3>
                    <p className="text-white/60 mb-6">We're working on a dedicated projects showcase. For now, you can share your projects in the discussions section!</p>
                    <button 
                      onClick={() => setActiveTab("discussions")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      Go to Discussions
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "leaders" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Top Contributors</h2>
                  <div className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <motion.div
                        key={contributor.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {contributor.avatar}
                            </div>
                            <div>
                              <h3 className="text-white font-semibold text-lg">{contributor.name}</h3>
                              <span className="px-2 py-1 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-xs">
                                {contributor.badge}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{contributor.contributions}</div>
                            <div className="text-white/60 text-sm">contributions</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowCreatePost(true)}
                    className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Start Discussion
                  </button>
                </div>
              </motion.div>

              {/* Community Guidelines */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Community Guidelines</h3>
                <div className="space-y-3 text-white/70 text-sm">
                  <div className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Be respectful and inclusive</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Share knowledge and help others</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Stay on topic and relevant</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Build a positive community</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommunityContent />
    </Suspense>
  );
}
