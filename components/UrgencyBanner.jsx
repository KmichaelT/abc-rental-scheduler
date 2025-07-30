import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

const UrgencyBanner = () => {
  return (
    <div className="border  border-yellow-400 bg-yellow-50 p-4  border rounded-md mb-6">
      <div className="flex">
        <div className="shrink-0">
          <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Units are going fast— book your tour early to secure your spot!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;