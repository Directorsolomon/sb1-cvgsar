import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, ThumbsUp, Facebook, Twitter, MessageCircle } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

interface Complaint {
  title: string;
  description: string;
  location: {
    state: string;
    lga: string;
  };
  imageUrl: string;
  date: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
}

export default function ComplaintDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Mock data - in real app, fetch this based on id
        setComplaint({
          title: "Road Damage on Main Street",
          description: "Large pothole causing traffic and vehicle damage. This has been an ongoing issue for months and needs immediate attention. Multiple accidents have been reported due to drivers trying to avoid the pothole.",
          location: {
            state: "Lagos",
            lga: "Ikeja"
          },
          imageUrl: "https://example.com/image.jpg",
          date: "2024-01-20",
          category: "Infrastructure",
          status: 'in-progress'
        });
      } catch (error) {
        console.error('Failed to fetch complaint:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const statusLabels = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    resolved: 'Resolved',
    rejected: 'Rejected',
  };

  const handleUpvote = () => {
    setUpvotes(prev => prev + 1);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Anonymous User", // In real app, use actual user name
      date: new Date().toISOString()
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleShare = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = window.location.href;
    const text = `Check out this infrastructure issue: ${complaint?.title}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="h-96 bg-gray-200" />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-20" />
                <div className="h-6 bg-gray-200 rounded w-20" />
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>

            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-gray-500">Complaint not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96 overflow-hidden">
          <img
            src={complaint.imageUrl}
            alt={complaint.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{complaint.title}</h1>
            <div className="flex gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded ${statusStyles[complaint.status]}`}>
                {statusLabels[complaint.status]}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                {complaint.category}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={16} className="mr-2" />
            <span>{`${complaint.location.lga}, ${complaint.location.state}`}</span>
          </div>

          <p className="text-gray-700 mb-6 whitespace-pre-wrap">{complaint.description}</p>

          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <div className="text-gray-400 text-sm">
              Reported on {new Date(complaint.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleUpvote}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label={`Upvote this issue. Current upvotes: ${upvotes}`}
              >
                <ThumbsUp size={16} />
                <span className="text-sm">{upvotes}</span>
              </button>
              <button
                onClick={(e) => handleShare('facebook', e)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Share on Facebook"
              >
                <Facebook size={16} className="text-blue-600" />
              </button>
              <button
                onClick={(e) => handleShare('twitter', e)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Share on Twitter"
              >
                <Twitter size={16} className="text-blue-400" />
              </button>
              <button
                onClick={(e) => handleShare('whatsapp', e)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle size={16} className="text-green-500" />
              </button>
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle size={20} className="mr-2" />
              Comments
            </h2>
            
            <form onSubmit={handleComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                aria-label="Comment text"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
