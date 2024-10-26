import { MapPin, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ComplaintCardProps {
  id?: string | number;
  title?: string;
  description?: string;
  location?: {
    state: string;
    lga: string;
  };
  imageUrl?: string;
  date?: string;
  category?: string;
  status?: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  isLoading?: boolean;
}

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

export default function ComplaintCard({
  id,
  title,
  description,
  location,
  imageUrl,
  date,
  category,
  status = 'pending',
  isLoading = false,
}: ComplaintCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoading || !id) return;
    navigate(`/issues/${id}`);
  };

  const handleShare = (platform: string, e: React.MouseEvent) => {
    if (isLoading || !id) return;
    e.stopPropagation();
    const url = `${window.location.origin}/issues/${id}`;
    const text = `Check out this infrastructure issue: ${title}`;
    
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
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded w-16" />
              <div className="h-6 bg-gray-200 rounded w-16" />
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
          <div className="flex items-center mb-2">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded" />
              <div className="h-6 w-6 bg-gray-200 rounded" />
              <div className="h-6 w-6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View details for ${title}`}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${statusStyles[status]}`}>
              {statusLabels[status]}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
              {category}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{`${location?.lga}, ${location?.state}`}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-xs">
            {date && `Reported on ${new Date(date).toLocaleDateString()}`}
          </div>
          <div className="flex gap-2">
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
      </div>
    </div>
  );
}
