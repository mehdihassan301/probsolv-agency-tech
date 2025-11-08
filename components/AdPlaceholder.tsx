import React from 'react';

const AdPlaceholder: React.FC = () => {
  return (
    <div className="my-8 flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-border_light bg-bg_light text-subtext_light dark:border-border_dark dark:bg-surface_dark">
      <div className="text-center">
        <p className="font-semibold">Advertisement</p>
        <p className="text-sm">Ad placeholder for monetization</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;