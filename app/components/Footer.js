export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
