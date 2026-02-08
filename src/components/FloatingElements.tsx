import { useMemo } from 'react';

interface FloatingElement {
  id: number;
  type: 'heart' | 'chocolate' | 'sparkle';
  size: number;
  left: string;
  delay: number;
  duration: number;
}

const FloatingElements = () => {
  const elements = useMemo<FloatingElement[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      type: ['heart', 'chocolate', 'sparkle'][Math.floor(Math.random() * 3)] as FloatingElement['type'],
      size: Math.random() * 20 + 15,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6,
    }));
  }, []);

  const renderElement = (element: FloatingElement) => {
    switch (element.type) {
      case 'heart':
        return (
          <svg
            width={element.size}
            height={element.size}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#FFB6C1"
              fillOpacity="0.8"
            />
          </svg>
        );
      case 'chocolate':
        return (
          <div
            className="rounded-lg"
            style={{
              width: element.size,
              height: element.size * 0.6,
              background: 'linear-gradient(135deg, #6D4C41 0%, #4E342E 100%)',
              boxShadow: '0 2px 8px rgba(78, 52, 46, 0.3)',
            }}
          />
        );
      case 'sparkle':
        return (
          <svg
            width={element.size * 0.8}
            height={element.size * 0.8}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2L13.5 9L20 10.5L13.5 12L12 19L10.5 12L4 10.5L10.5 9L12 2Z"
              fill="#D7A86E"
              fillOpacity="0.9"
            />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute"
          style={{
            left: element.left,
            top: '-50px',
            animation: `float ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.delay}s`,
          }}
        >
          {renderElement(element)}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
