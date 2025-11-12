import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useState } from 'react'
import { isYouTubeUrl, getYouTubeEmbedUrl } from '@/lib/youtube'

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

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  // Filter out empty media sources
  const validMedia = project.media.filter(m => m.src && m.src.trim() !== '')
  
  // If no valid media, show placeholder
  if (validMedia.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-3xl text-white mb-2">{project.title}</CardTitle>
              <CardDescription className="text-gray-200 text-lg">
                {project.description}
              </CardDescription>
              {project.note && (
                <p className="text-yellow-300 text-sm mt-2 font-medium">
                  <strong>NOTE:</strong> {project.note}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden rounded-lg bg-black/20 aspect-video flex items-center justify-center">
            <p className="text-white/50 text-center p-8">
              Add media by updating the src in App.tsx<br />
              Use image or video URLs (e.g., https://example.com/image.jpg)
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentMedia = validMedia[currentMediaIndex]

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % validMedia.length)
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + validMedia.length) % validMedia.length)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-3xl text-white mb-2">{project.title}</CardTitle>
            <CardDescription className="text-gray-200 text-lg">
              {project.description}
            </CardDescription>
            {project.note && (
              <p className="text-yellow-300 text-sm mt-2 font-medium">
                <strong>NOTE:</strong> {project.note}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg bg-black/20 aspect-video">
            {currentMedia.type === 'image' ? (
              <img
                src={currentMedia.src}
                alt={currentMedia.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  // Only show placeholder if it's not already a placeholder
                  if (!target.src.includes('placeholder')) {
                    target.src = `https://via.placeholder.com/800x450/4A90E2/ffffff?text=${encodeURIComponent(project.title)}`
                  }
                }}
              />
            ) : isYouTubeUrl(currentMedia.src) ? (
              <iframe
                src={getYouTubeEmbedUrl(currentMedia.src)}
                title={currentMedia.alt}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <video
                src={currentMedia.src}
                controls
                className="w-full h-full"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLVideoElement
                  const errorMsg = document.createElement('div')
                  errorMsg.className = 'absolute inset-0 flex items-center justify-center bg-black/50 text-white p-4 text-center'
                  errorMsg.textContent = 'Video failed to load. Please check the URL.'
                  target.parentElement?.appendChild(errorMsg)
                }}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Navigation buttons */}
          {validMedia.length > 1 && (
            <>
              <button
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous media"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next media"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Media indicators */}
          {validMedia.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {validMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentMediaIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentMediaIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to media ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

