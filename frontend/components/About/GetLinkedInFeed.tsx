import { createClient } from "next-sanity";

const LinkedinIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      color="#0077b5"
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-5 h-5"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
  

// 1. Configure the Sanity Client
const client = createClient({
  projectId: "3o1ax6lm", // Replace with your 8-character Sanity ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false so it always fetches the absolute newest posts
});

// 2. Fetch the data using GROQ
async function getLinkedInPosts() {
  const query = `*[_type == "linkedinPost"] | order(publishedAt desc)[0...3] {
    _id,
    content,
    postUrl,
    publishedAt
  }`;
  
  // Next.js caching: revalidate every hour (3600 seconds) to keep it fresh
  return client.fetch(query, {}, { next: { revalidate: 3600 } });
}

// 3. The UI Component
export default async function LinkedInFeed() {
  const posts = await getLinkedInPosts();

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Updates</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post: any) => (
          <div 
            key={post._id} 
            className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
          >
            <div>
              {/* Date */}
              <p className="text-xs text-gray-500 mb-3">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </p>
              
              {/* Content (Truncated to keep cards uniform) */}
              <div 
                className="text-sm text-gray-700 mb-4 line-clamp-4 [&_img]:w-full [&_img]:rounded-md [&_img]:mt-2"
                dangerouslySetInnerHTML={{ __html: post.content }} 
                />
            </div>
            {/* Link to actual post */}
            <a 
              href={post.postUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-semibold hover:underline inline-flex items-center"
            >
              Read on LinkedIn &rarr;
            </a>
            

            <p>{LinkedinIcon()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}