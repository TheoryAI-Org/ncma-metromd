export function ContactForm() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Please contact board members{" "}
            <a
              href="#"
              className="text-[#1B365D] hover:text-[#2A4A7F] underline"
            >
              here
            </a>
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Question or Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#1B365D] text-white rounded-md hover:bg-[#2A4A7F] transition-colors"
            >
              SUBMIT
            </button>
            <button
              type="reset"
              className="px-6 py-2 bg-[#FF5733] text-white rounded-md hover:bg-[#E64A2E] transition-colors"
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
