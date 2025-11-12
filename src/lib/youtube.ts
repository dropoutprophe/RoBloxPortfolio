/**
 * Checks if a URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false
  return /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/.test(url) ||
         url.includes('youtube.com') ||
         url.includes('youtu.be')
}

/**
 * Converts a YouTube URL to an embed URL
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return ''
  
  // If it's already an embed URL, return as is
  if (url.includes('youtube.com/embed/')) {
    return url
  }
  
  // Extract video ID from various YouTube URL formats
  let videoId = ''
  
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^"&?\/\s]{11})/)
  if (watchMatch && watchMatch[1]) {
    videoId = watchMatch[1]
  }
  
  // If we found a video ID, create embed URL
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  // If we can't parse it, return original URL (might be a different format)
  return url
}

