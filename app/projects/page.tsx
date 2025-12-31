import FeaturedProjects from '@/components/FeaturedProjects'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
        A collection of projects I've worked on, ranging from web applications to backend services.
      </p>
      <FeaturedProjects />
    </div>
  )
}

