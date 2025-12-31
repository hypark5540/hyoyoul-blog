export default function ContactPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Contact</h1>
      <div className="max-w-2xl">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Feel free to reach out if you'd like to collaborate, have questions, or just want to connect!
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Email</h2>
            <a
              href="mailto:contact@example.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              contact@example.com
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Social</h2>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

