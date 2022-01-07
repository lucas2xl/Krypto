import React from 'react';

export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-700" />
    </div>
  );
};
