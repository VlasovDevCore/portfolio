import React, { useState, useEffect, useCallback } from "react";
import Section from "../../Section/Section";
import parseHighlighting from "../parseHighlighting";
import { ReactComponent as CloseIcon } from "../../../assets/image/icon/close.svg";

const BlogSection = () => {
  const [isClosing, setIsClosing] = useState(false);
  const isDarkTheme = document.documentElement.classList.contains("dark");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const limit = 2;

  const disableBodyScroll = useCallback(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const enableBodyScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      enableBodyScroll();
    }, 200);
  }, [enableBodyScroll]);

  const fetchPosts = async (offset, limit, reset = false) => {
    try {
      const response = await fetch(
        `http://localhost/portfolio/api/blog.php?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setHasMore(data.hasMore);
      setPosts((prevPosts) =>
        reset ? data.posts : [...prevPosts, ...data.posts]
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(0, limit, true);
  }, []);

  const loadMore = () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    const newOffset = offset + limit;
    setOffset(newOffset);

    setTimeout(() => {
      fetchPosts(newOffset, limit);
    }, 500);
  };

  const openModal = useCallback(
    (post) => {
      setSelectedPost(post);
      setIsModalOpen(true);
      setIsClosing(false);
      disableBodyScroll();
    },
    [disableBodyScroll]
  );

  useEffect(() => {
    return () => {
      enableBodyScroll();
    };
  }, [enableBodyScroll]);

  const SkeletonLoader = () => (
    <div className="w-full h-auto space-y-6">
      {[...Array(limit)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row w-full h-auto opacity-80 dark:opacity-60"
        >
          <div className="order-2 md:order-none mt-2 md:mt-[3px] md:w-[200px]">
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="order-1 md:order-none w-full h-auto space-y-2">
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <Section id="blog" title="Блог">
        <div className="text-center py-8 text-red-500 dark:text-red-400">
          Ошибка загрузки: {error}
        </div>
      </Section>
    );
  }

  return (
    <Section id="blog" title="Блог">
      <div className="w-full h-auto">
        {loading ? (
          <SkeletonLoader />
        ) : (
          posts.map((post, index) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row w-full h-auto mt-[3%] opacity-80 dark:opacity-60 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300 ease-in-out"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
                cursor: "pointer",
              }}
              onClick={() => openModal(post)}
            >
              <p className="order-2 md:order-none mt-2 md:mt-[3px] md:w-[200px] text-[#c778dd] whitespace-nowrap">
                - {post.date}
              </p>

              <div className="order-1 md:order-none w-full h-auto text-black dark:text-white">
                <h3 className="font-medium text-lg">{post.title}</h3>
                <p>{post.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <button
          className={`
          group relative
          mx-auto my-8
          px-6 py-3
          flex items-center justify-center
          text-[#c778dd] dark:text-[#a05cc5]
          border border-[#c778dd33] dark:border-[#a05cc533]
          rounded-full
          bg-transparent
          hover:bg-[#c778dd11] dark:hover:bg-[#a05cc511]
          transition-all duration-300
          overflow-hidden
          ${isLoadingMore ? "opacity-70 cursor-not-allowed" : ""}
        `}
          onClick={loadMore}
          disabled={isLoadingMore}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isLoadingMore ? (
              <>
                <span>Загрузка</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 rounded-full bg-current animate-bounce delay-0"></div>
                  <div className="w-1 h-1 rounded-full bg-current animate-bounce delay-100"></div>
                  <div className="w-1 h-1 rounded-full bg-current animate-bounce delay-200"></div>
                </div>
              </>
            ) : (
              <>
                <span>Показать еще</span>
              </>
            )}
          </span>

          {/* Эффект при наведении */}
          <span
            className="
          absolute inset-0 
          bg-[#c778dd10] dark:bg-[#a05cc510]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
          ></span>
        </button>
      )}

      {isModalOpen && selectedPost && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
          onClick={handleClose}
        >
          <div
            className={`bg-slate-200 dark:bg-dark-cast rounded-lg p-3 sm:p-4 md:p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto ${
              isClosing ? "animate-popOut" : "animate-popIn"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-2xl text-dark dark:text-white font-medium mb-2 relative pr-8">
                {selectedPost.title}
                <button
                  className="absolute top-0 right-0 z-10 p-2 rounded-bl-lg hover:scale-110 transition-transform duration-200"
                  onClick={handleClose}
                >
                  <CloseIcon
                    className="text-dark dark:text-white"
                    width={20}
                    height={20}
                  />
                </button>
              </h3>
              <p className="text-[#c778dd] mb-4">- {selectedPost.date}</p>

              <div className="blog-containt text-dark dark:text-white max-w-none">
                {parseHighlighting(selectedPost.fullcontent, isDarkTheme)}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default BlogSection;
