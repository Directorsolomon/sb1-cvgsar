import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateIssuePayload } from '@/types';
import { nigeriaStates, lgasByState } from '@/utils/nigeriaData';
import { sanitizeInput } from '@/utils/sanitize';

// ... (keep existing imports and component definition)

export const CreateIssueForm: React.FC<CreateIssueFormProps> = ({ onSubmit, isLoading }) => {
  // ... (keep existing code)

  const handleFormSubmit = async (data: CreateIssuePayload) => {
    const sanitizedData = {
      ...data,
      title: sanitizeInput(data.title),
      description: sanitizeInput(data.description),
      location: sanitizeInput(data.location),
    };

    if (imageFile) {
      const imageUrl = await uploadImage(imageFile);
      sanitizedData.imageUrl = imageUrl;
    }
    await onSubmit(sanitizedData);
  };

  // ... (keep the rest of the component code)
};