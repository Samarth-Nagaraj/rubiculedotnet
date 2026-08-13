export function Logo({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left Main Body - Bright Red */}
      <path d="M 16 70 L 16 30 L 33 20 L 33 40 L 50 30 L 50 50 Z" fill="#fc2629" />
      {/* Left Cavity Triangle (Inside wall) - Medium Red */}
      <path d="M 33 20 L 50 30 L 33 40 Z" fill="#ca000f" />
      
      {/* Right Main Body - Medium Red */}
      <path d="M 84 70 L 50 50 L 50 30 L 67 40 L 67 20 L 84 30 Z" fill="#ca000f" />
      {/* Right Cavity Triangle (Inside wall) - Bright Red */}
      <path d="M 67 20 L 67 40 L 50 30 Z" fill="#fc2629" />
      
      {/* Bottom Face - Dark Red */}
      <path d="M 16 70 L 50 50 L 84 70 L 50 90 Z" fill="#a31d1f" />
    </svg>
  );
}
