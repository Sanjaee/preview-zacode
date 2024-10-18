import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import posts from "./data/posts.js"; // Ubah 'data' menjadi 'posts'
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

const PostDetail = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      Prism.highlightAll();
    }
  }, [isClient, post]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!isClient) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => window.history.back()} // Ganti router.back() dengan window.history.back()
        className="mb-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{post.description}</p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto mb-8 rounded-lg shadow-md"
        />
      )}

      {post.contentSections.map((section, index) => {
        const sectionNumber = index + 1;

        if (section.type === "text") {
          return (
            <p key={index} className="text-gray-700 mb-4 font-semibold">
              <span className="font-bold">{sectionNumber}. </span>{section.content}
            </p>
          );
        }

        if (section.type === "image") {
          return (
            <div key={index} className="mb-8">
              <p className="font-bold mb-2">{sectionNumber}. </p>
              <img
                src={section.src}
                alt={`Section ${sectionNumber}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          );
        }

        if (section.type === "code") {
          return (
            <div key={index} className="relative mb-8">
              <p className="font-bold mb-2">{sectionNumber}. </p>
              <CopyToClipboard
                text={section.content}
                onCopy={() => setCopied(true)}
              >
                <button className="absolute right-4 top-12 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded px-2 py-1 text-sm text-gray-800 flex items-center">
                  {copied ? "Copied!" : "Copy"}
                  <FiCopy className="ml-2" />
                </button>
              </CopyToClipboard>
              <pre className="bg-gray-900 text-white p-4 rounded-lg shadow-md overflow-x-auto max-w-full text-sm">
                <code className="language-javascript">
                  {section.content}
                </code>
              </pre>
            </div>
          );
        }

        if (section.type === "video") {
          return (
            <div key={index} className="mb-8">
              <p className="font-bold mb-2">{sectionNumber}. </p>
              <video
                controls
                className="w-full h-auto rounded-lg shadow-md"
              >
                <source src={section.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

const PostPage = () => {
  const postId = 1; // Replace with dynamic ID if needed
  const post = posts.find((p) => p.id === postId);

  return post ? <PostDetail post={post} /> : <p>Post not found</p>;
};

export default PostPage;
