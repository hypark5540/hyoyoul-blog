import Link from 'next/link'

interface Project {
  title: string
  description: string
  tags: string[]
  website?: string
  source?: string
  sourceUI?: string
}

const projects: Project[] = [
  {
    title: 'Project One',
    description: 'A full-stack web application with modern UI and robust backend architecture',
    tags: ['NextJS', 'TypeScript', 'PostgreSQL', 'TailwindCSS', 'Docker'],
    website: 'https://example.com',
    source: 'https://github.com',
    sourceUI: 'https://github.com'
  },
  {
    title: 'Project Two',
    description: 'Real-time data processing system with automated workflows and monitoring',
    tags: ['Python', 'FastAPI', 'Docker', 'Redis', 'WebSocket'],
    website: 'https://example.com',
    source: 'https://github.com'
  }
]

export default function FeaturedProjects() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                Website
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                Source
              </a>
            )}
            {project.sourceUI && (
              <a
                href={project.sourceUI}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                Source (UI)
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}



