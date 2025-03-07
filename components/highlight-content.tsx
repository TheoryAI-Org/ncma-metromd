export function HighlightContent() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-lg mb-6">
            We love to showcase our amazing members on our social media platforms! 
            If you&apos;d like to be featured, please fill out the form below by the <strong>15th of each month</strong>.
          </p>
          <p className="text-lg mb-6">
            Share your professional journey, accomplishments, and how NCMA Metro Maryland 
            has contributed to your career growth. We look forward to highlighting your story!
          </p>
        </div>
        
        <div className="flex justify-center">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSeD5xywj1I6ipFoBkv58rCnCgjUmgCrVxE92YZrw8ajPKJQFg/viewform?embedded=true" 
            width={640} 
            height={978} 
            className="border-0"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </section>
  );
} 