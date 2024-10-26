import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle, BarChart2 } from 'lucide-react';
import DonateButton from '../components/DonateButton';
import ComplaintCard from '../components/ComplaintCard';

type Status = 'pending' | 'in-progress' | 'resolved' | 'rejected';

interface Complaint {
  id: number;
  title: string;
  description: string;
  location: {
    state: string;
    lga: string;
  };
  imageUrl: string;
  date: string;
  category: string;
  status: Status;
}

// Mock data for recent complaints
const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 1,
    title: 'Damaged Road Surface',
    description: 'Large potholes making road dangerous for vehicles and pedestrians',
    location: {
      state: 'Lagos',
      lga: 'Ikeja',
    },
    imageUrl: '/placeholder-road.jpg',
    date: '2024-01-15',
    category: 'Roads',
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Faulty Street Lights',
    description: 'Street lights not working for the past week causing safety concerns',
    location: {
      state: 'Lagos',
      lga: 'Victoria Island',
    },
    imageUrl: '/placeholder-light.jpg',
    date: '2024-01-14',
    category: 'Electricity',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Blocked Drainage System',
    description: 'Drainage system blocked causing flooding during rainfall',
    location: {
      state: 'Lagos',
      lga: 'Lekki',
    },
    imageUrl: '/placeholder-drainage.jpg',
    date: '2024-01-13',
    category: 'Drainage',
    status: 'resolved',
  },
  {
    id: 4,
    title: 'Water Supply Interruption',
    description: 'No water supply in the area for past 3 days',
    location: {
      state: 'Lagos',
      lga: 'Surulere',
    },
    imageUrl: '/placeholder-water.jpg',
    date: '2024-01-12',
    category: 'Water',
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'Collapsed Bridge',
    description: 'Small pedestrian bridge has partially collapsed',
    location: {
      state: 'Lagos',
      lga: 'Apapa',
    },
    imageUrl: '/placeholder-bridge.jpg',
    date: '2024-01-11',
    category: 'Infrastructure',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Waste Management Issue',
    description: 'Garbage not collected for two weeks',
    location: {
      state: 'Lagos',
      lga: 'Ikorodu',
    },
    imageUrl: '/placeholder-waste.jpg',
    date: '2024-01-10',
    category: 'Sanitation',
    status: 'rejected',
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const fetchRecentComplaints = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setRecentComplaints(MOCK_COMPLAINTS);
      } catch (error) {
        console.error('Failed to fetch recent complaints:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentComplaints();
  }, []);

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Report Infrastructure Issues in Nigeria
          </h1>
          <p className="text-xl mb-8">
            Help improve your community by reporting infrastructure problems
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/report"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition-colors"
            >
              Report an Issue
            </Link>
            <DonateButton />
          </div>
        </div>
      </section>

      {/* Recent Complaints Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 6 }).map((_, index) => (
                <ComplaintCard key={index} isLoading={true} />
              ))
            ) : (
              recentComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} {...complaint} isLoading={false} />
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/issues"
              className="inline-block bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              View All Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Compact Version */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3">
              <div className="flex justify-center mb-2">
                <MapPin size={24} className="text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Locate</h3>
              <p className="text-gray-600 text-sm">
                Identify issues in your area
              </p>
            </div>
            <div className="text-center p-3">
              <div className="flex justify-center mb-2">
                <AlertTriangle size={24} className="text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Report</h3>
              <p className="text-gray-600 text-sm">
                Submit reports with photos
              </p>
            </div>
            <div className="text-center p-3">
              <div className="flex justify-center mb-2">
                <BarChart2 size={24} className="text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Track</h3>
              <p className="text-gray-600 text-sm">
                Monitor issue progress
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
