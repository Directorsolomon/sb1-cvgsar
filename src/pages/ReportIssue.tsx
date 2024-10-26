import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, X } from 'lucide-react';
import { nigeriaStatesLGAs } from '../data/nigeriaStatesLGAs';
import axios from 'axios';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

type FormData = {
  title: string;
  description: string;
  state: string;
  lga: string;
  category: string;
  images: FileList;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ReportIssue() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const selectedState = watch('state');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const states = Object.keys(nigeriaStatesLGAs).sort();
  const lgas = selectedState ? nigeriaStatesLGAs[selectedState].sort() : [];

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => file.size <= MAX_FILE_SIZE);
      
      if (validFiles.length !== files.length) {
        alert('Some files were skipped because they exceed the 10MB size limit');
      }

      const previewPromises = validFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      const previews = await Promise.all(previewPromises);
      setImagePreviews(previews);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (!recaptchaLoaded) {
      alert('Please wait for reCAPTCHA to load');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' });
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('state', data.state);
      formData.append('lga', data.lga);
      formData.append('category', data.category);
      formData.append('recaptchaToken', token);
      
      if (data.images) {
        Array.from(data.images).forEach((file, index) => {
          if (file.size <= MAX_FILE_SIZE) {
            formData.append('images', file);
          }
        });
      }

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/issues`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Issue reported successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error submitting issue:', error);
      alert('Failed to submit issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Report an Infrastructure Issue</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Broken Road at Victoria Island"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a category</option>
              <option value="roads">Roads</option>
              <option value="electricity">Electricity</option>
              <option value="water">Water Supply</option>
              <option value="drainage">Drainage</option>
              <option value="waste">Waste Management</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              {...register('state', { required: 'State is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Local Government Area
            </label>
            <select
              {...register('lga', { required: 'LGA is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              disabled={!selectedState}
            >
              <option value="">Select a local government area</option>
              {lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
            {errors.lga && (
              <p className="text-red-500 text-sm mt-1">{errors.lga.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Provide detailed description of the issue"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                    <span>Upload files</span>
                    <input
                      key={imagePreviews.length}
                      type="file"
                      multiple
                      {...register('images')}
                      onChange={handleImageChange}
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !recaptchaLoaded}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}
