import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { Link } from "react-router-dom";
import { FaRegSquareCaretRight } from "react-icons/fa6";
import { FaRegCaretSquareLeft } from "react-icons/fa";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.currentsapi.services/v1/latest-news?language=hi&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.news) {
          const filteredArticles = data.news.filter(article => article.image);
          setArticles(filteredArticles);
        } else {
          setError('No news data found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [url]);

  const formatDate = (dateString) => {
    return dateString.split(' +')[0];
  };

  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(articles.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 w-full">
      <h1 className="text-lg mb-10">Latest News</h1>
      <ul className="grid grid-cols-3 gap-5">
        {!loading && currentArticles.map((article, index) => (
          <li key={index} className="flex flex-col items-start justify-between border rounded-lg hover:shadow-xl hover:scale-105 transition-transform">
            <img src={article.image} alt="" className='rounded-t-md w-full h-60' />
            <div className="flex-col text-sm text-gray-600 p-5 h-60">
              <h2 className="text-xl text-black mb-2">{article.title.slice(0, 55)}...</h2>
              <p className="mb-2"><span className='font-semibold'>Description:</span> {article.description.slice(0, 100)}...</p>
              <p className="mb-2"><span className='font-semibold'>Author:</span> {article.author}</p>
              <p className="mb-2"><span className='font-semibold'>Published:</span> {formatDate(article.published)}</p>
            </div>
            <Link to={article.url} target="_blank" rel="noopener noreferrer" className="m-4 text-sm leading-6 border border-black hover:text-black text-white bg-black hover:bg-white p-1 text-center rounded-md hover:scale-105 transition-transform w-32">Read more</Link>
          </li>
        ))}
      </ul>
      {loading && <Spinner />}
      <div className="flex justify-end font-medium mt-20">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center py-2 px-5 bg-gray-300 text-black hover:bg-blue-500 hover:text-white rounded-md hover:scale-105 transition-transform disabled:hidden"
        >
          <FaRegCaretSquareLeft className='mr-3 w-5 h-5' />
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(articles.length / itemsPerPage)}
          className="flex items-center py-2 px-5 bg-gray-300 text-black hover:bg-blue-500 hover:text-white rounded-md hover:scale-105 transition-transform disabled:hidden"
        >
          Next
          <FaRegSquareCaretRight className='ml-3 w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default News;
