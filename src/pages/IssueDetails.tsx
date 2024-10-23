import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, AlertTriangle, CheckCircle, Clock, ThumbsUp, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useIssuesStore } from '../store/issuesStore';
import { Issue } from '../types';
import { sanitizeInput } from '../utils/sanitize';
import { CustomError } from '../utils/errorHandling';

const IssueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { fetchIssueById, upvoteExistingIssue } = useIssuesStore();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const fetchedIssue = await fetchIssueById(id);
        setIssue(fetchedIssue);
      } catch (err) {
        if (err instanceof CustomError) {
          setError(`Error: ${err.message}`);
        } else {
          setError('An unexpected error occurred while fetching the issue.');
        }
        console.error('Error fetching issue:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIssue();
  }, [id, fetchIssueById]);

  const handleUpvote = async () => {
    if (!id || !isAuthenticated) return;
    try {
      await upvoteExistingIssue(id);
      setIssue(prevIssue => prevIssue ? { ...prevIssue, upvotes: prevIssue.upvotes + 1 } : null);
    } catch (err) {
      console.error('Error upvoting issue:', err);
      if (err instanceof CustomError) {
        setError(`Error upvoting: ${err.message}`);
      } else {
        setError('An unexpected error occurred while upvoting the issue.');
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !isAuthenticated || !newComment.trim()) return;
    // Implement comment submission logic here
    console.log('Submitting comment:', newComment);
    setNewComment('');
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!issue) return <div className="text-center py-8">Issue not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {issue.imageUrl && (
            <img src={issue.imageUrl} alt={issue.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          )}
          <p className="text-gray-700 mb-4">{issue.description}</p>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{issue.category}</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{issue.status}</span>
          </div>
          <p className="text-gray-600 mb-2"><strong>Location:</strong> {issue.location}</p>
          <p className="text-gray-600 mb-4"><strong>Reported on:</strong> {new Date(issue.createdAt).toLocaleDateString()}</p>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleUpvote} 
              className={`bg-green-600 text-white px-4 py-2 rounded-md flex items-center ${!isAuthenticated && 'opacity-50 cursor-not-allowed'}`}
              disabled={!isAuthenticated}
            >
              <ThumbsUp size={20} className="mr-2" />
              Upvote ({issue.upvotes})
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4 mb-4">
            {issue.comments && issue.comments.map(comment => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
          {isAuthenticated && (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(sanitizeInput(e.target.value))}
                className="w-full px-3 py-2 border rounded-md mb-2"
                rows={3}
                placeholder="Add a comment..."
              ></textarea>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                <MessageSquare size={20} className="mr-2" />
                Post Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;