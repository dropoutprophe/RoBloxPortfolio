import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import Footer from './components/Footer'
import { Sparkles, Code, Gamepad2, Zap } from 'lucide-react'

// Lazy load heavy components for better performance
const ProjectCarousel = lazy(() => import('./components/ProjectCarousel'))

interface MediaItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

interface Project {
  id: number
  title: string
  description: string
  note?: string
  media: MediaItem[]
  tags: string[]
  featured: boolean
}

// Project data - you can easily add/remove projects here
// 
// For media sources, you can use:
// - External URLs: 'https://example.com/image.jpg' or 'https://example.com/video.mp4'
// - YouTube videos: 'https://www.youtube.com/watch?v=VIDEO_ID' or 'https://youtu.be/VIDEO_ID'
// - Local files: '/images/screenshot.jpg' or '/videos/gameplay.mp4' (place files in public folder)
// - Empty string: '' (will be filtered out and show placeholder)
//
const projects: Project[] = [
  {
    id: 1,
    title: "Start A Farm",
    description: "I Recreated Grow A Garden but instead you grow animals and more. An idea i thought was original but was not.",
    note: "This game is still in development and is not yet finished.",
    media: [
      { type: 'image', src: 'https://i.postimg.cc/J7qqKB1t/Screenshot-2025-11-10-at-10-18-21-PM.png', alt: 'Start A Farm Screenshot 1' },
      { type: 'image', src: 'https://i.postimg.cc/J7qqKB1t/Screenshot-2025-11-10-at-10-18-21-PM.png', alt: 'Start A Farm Screenshot 2' },
      { type: 'video', src: 'https://www.youtube.com/watch?v=pF--uQ3XQYc', alt: 'Start A Farm Gameplay' },
    ],
    tags: ['In Development', 'Farming', 'Simulation'],
    featured: true,
  },
  {
    id: 2,
    title: "Movement System",
    description: "I recreated a movement system similar to quake, has bunny hopping and air acceleration like in quake.",
    note: "This was supposed to be a gamer similar to Evade",
    media: [
      { type: 'image', src: 'https://i.postimg.cc/QCQxk3Lp/Screenshot-2025-11-10-at-10-27-28-PM.png', alt: 'Project 2 Screenshot 1' },
      { type: 'video', src: 'https://www.youtube.com/watch?v=ui_wWgzZU0Y', alt: 'Project 2 Gameplay' },
    ],
    tags: ['Combat', 'Multiplayer', 'Movement'],
    featured: true,
  },
  {
    id: 3,
    title: "More coming soon....",
    description: "Blank",
    media: [
      { type: 'video', src: '/placeholder-video-3.mp4', alt: 'Project 3 Gameplay' },
      { type: 'image', src: '/placeholder-image-5.jpg', alt: 'Project 3 Screenshot 1' },
      { type: 'image', src: '/placeholder-image-6.jpg', alt: 'Project 3 Screenshot 2' },
    ],
    tags: [],
    featured: false,
  },
]

const skills = [
  { icon: Code, label: 'Lua Scripting', color: 'text-blue-500' },
  { icon: Gamepad2, label: 'Game Design', color: 'text-purple-500' },
  { icon: Zap, label: 'Optimization', color: 'text-yellow-500' },
  { icon: Sparkles, label: 'Creative Design', color: 'text-pink-500' },
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <Hero />

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
            <p className="text-gray-300 text-lg">What I bring to every project</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <skill.icon className={`w-12 h-12 ${skill.color} mb-3`} />
                <span className="text-white font-medium">{skill.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">My Projects</h2>
            <p className="text-gray-300 text-lg">Explore my Roblox creations</p>
          </motion.div>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {project.featured ? (
                  <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
                    <ProjectCarousel project={project} />
                  </Suspense>
                ) : (
                  <ProjectCard project={project} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

