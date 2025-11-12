import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { useState, useEffect } from 'react'
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

interface ProjectCarouselProps {
  project: Project
}

export default function ProjectCarousel({ project }: ProjectCarouselProps) {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  // Filter out empty media sources
  const validMedia = project.media.filter(m => m.src && m.src.trim() !== '')

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

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
        <div className="relative px-12">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {validMedia.map((media, index) => (
                <CarouselItem key={index}>
                  <div className="relative overflow-hidden rounded-lg bg-black/20 aspect-video">
                    {media.type === 'image' ? (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          // Only show placeholder if it's not already a placeholder
                          if (!target.src.includes('placeholder')) {
                            target.src = `https://via.placeholder.com/800x450/4A90E2/ffffff?text=${encodeURIComponent(project.title)}`
                          }
                        }}
                      />
                    ) : isYouTubeUrl(media.src) ? (
                      <iframe
                        src={getYouTubeEmbedUrl(media.src)}
                        title={media.alt}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <video
                        src={media.src}
                        controls
                        className="w-full h-full"
                        preload={index === 0 ? 'auto' : 'metadata'}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/20 hover:bg-white/30 border-white/30 text-white" />
            <CarouselNext className="bg-white/20 hover:bg-white/30 border-white/30 text-white" />
          </Carousel>
          
          {/* Media counter */}
          <div className="text-center mt-4 text-white/70 text-sm">
            {current} / {validMedia.length}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

