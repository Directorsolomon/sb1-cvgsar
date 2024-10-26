export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NigeriaInfraWatch</h3>
            <p className="text-gray-300">
              Empowering citizens to report and track infrastructure issues across Nigeria.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/about" className="hover:text-green-400">About Us</a>
                <p className="text-sm text-gray-400 mt-1">Learn about our mission to improve Nigeria's infrastructure through citizen engagement.</p>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-400">Contact</a>
                <p className="text-sm text-gray-400 mt-1">Get in touch with our team for support or partnerships.</p>
              </li>
              <li>
                <a href="/privacy" className="hover:text-green-400">Privacy Policy</a>
                <p className="text-sm text-gray-400 mt-1">Understanding how we protect and handle your data.</p>
              </li>
              <li>
                <a href="/terms" className="hover:text-green-400">Terms of Service</a>
                <p className="text-sm text-gray-400 mt-1">Guidelines for using our platform responsibly.</p>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-2 text-gray-300">
              <p>Email: contact@nigeriainfrawatch.org</p>
              <div className="mt-4">
                <p className="text-sm">Join our mission to improve Nigeria's infrastructure. Together, we can make a difference in our communities.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NigeriaInfraWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
