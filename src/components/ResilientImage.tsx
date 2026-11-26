import { useState } from 'react';
import { Code2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F4F6] via-[#E5E7EB] to-[#DBEAFE] text-[#4B5563] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Code2 className="w-8 h-8 text-[#2563EB] mb-3" strokeWidth={1.75} />
        {fallbackTitle && (
          <p className="text-sm font-medium text-[#111827] max-w-xs">{fallbackTitle}</p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
