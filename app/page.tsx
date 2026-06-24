import { ScrollVideoStory } from '@/components/scroll-video-story'
import { SiteNav } from '@/components/site-nav'
import { AmbientAudio } from '@/components/ambient-audio'

export default function Page() {
  return (
    <main className="relative">
      <SiteNav />
      <ScrollVideoStory />
      <AmbientAudio />
    </main>
  )
}
