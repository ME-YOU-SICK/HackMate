"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { useResources } from "@/hooks/use-resources";
import { 
  ExternalLink, 
  Search,
  Globe,
  Loader2,
  AlertCircle,
  RefreshCw
} from "lucide-react";

export default function ResourcesPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;
  
  const { resources, loading, error } = useResources();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter resources based on search term and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === "All") return matchesSearch;
    
    // Simple category detection based on domain/keywords
    const categoryKeywords = {
      "Frontend": ["react", "vue", "angular", "javascript", "css", "html", "frontend"],
      "Backend": ["node", "python", "java", "php", "backend", "api", "server"],
      "Design": ["figma", "adobe", "canva", "design", "ui", "ux"],
      "Cloud": ["aws", "google", "azure", "heroku", "netlify", "vercel", "docker", "kubernetes"],
      "Learning": ["coursera", "udemy", "edx", "khan", "freecodecamp", "codecademy"],
      "Tools": ["github", "gitlab", "slack", "discord", "notion", "zoom", "meet"]
    };
    
    const keywords = categoryKeywords[selectedCategory as keyof typeof categoryKeywords] || [];
    const matchesCategory = keywords.some(keyword => 
      resource.domain.toLowerCase().includes(keyword) ||
      resource.title.toLowerCase().includes(keyword)
    );
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Frontend", "Backend", "Design", "Cloud", "Learning", "Tools"];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div
        className={cn(
          "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden"
        )}
      >
        <DashboardSidebar 
          userRole={userRole} 
          userName={userName}
          userAvatar={userAvatar}
        />
        
        {/* Main Content */}
        <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-between items-center"
            >
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  Extra Resources
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Discover learning materials and tools to enhance your skills
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                {loading && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading resources...
                  </>
                )}
                {error && (
                  <>
                    <AlertCircle className="h-4 w-4 text-[#FFA100]" />
                    {error}
                  </>
                )}
                {!loading && !error && (
                  <>
                    <Globe className="h-4 w-4" />
                    {resources.length} resources loaded
                  </>
                )}
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
              />
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === selectedCategory
                      ? "bg-[#FF9000] text-white" 
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <Loader2 className="h-8 w-8 animate-spin text-[#FF9000] mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400">
                  Fetching resource metadata...
                </p>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <AlertCircle className="h-8 w-8 text-[#FFA100] mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {error}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
              </motion.div>
            )}

            {/* Resources Grid */}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredResources.map((resource, index) => (
                  <div key={`${resource.url}-${index}`} className="">
                    <GlowingCard
                      icon={<Globe className="h-4 w-4" />}
                      title={resource.title}
                      description={resource.description}
                      className="h-full"
                    >
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Globe className="h-4 w-4" />
                          {resource.domain}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                            {selectedCategory}
                          </span>
                          <button 
                            onClick={() => window.open(resource.url, '_blank')}
                            className="flex items-center gap-2 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Visit
                          </button>
                        </div>
                      </div>
                    </GlowingCard>
                  </div>
                ))}
              </motion.div>
            )}

            {/* No Results */}
            {!loading && !error && filteredResources.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <Search className="h-8 w-8 text-neutral-400 mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400">
                  No resources found matching your search criteria.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
