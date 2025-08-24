import useTheme from '../hooks/useTheme';

export const CapIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={20}
      height={20}
      fill="#fff"
      viewBox="0 0 32 32"
    >
      <g id="SVGRepo_iconCarrier">
        {/* <style>{'.st0{fill:#fff}'}</style> */}
        <path d="M31 26c-.6 0-1-.4-1-1V12c0-.6.4-1 1-1s1 .4 1 1v13c0 .6-.4 1-1 1z" />
        <path d="M16 21c-.2 0-.3 0-.5-.1l-15-8c-.3-.2-.5-.5-.5-.9s.2-.7.5-.9l15-8c.3-.2.6-.2.9 0l15 8c.3.2.5.5.5.9s-.2.7-.5.9l-15 8c-.1.1-.2.1-.4.1z" />
        <path d="M17.4 22.6c-.4.3-.9.4-1.4.4s-1-.1-1.4-.4L6 18.1V22c0 3.1 4.9 6 10 6s10-2.9 10-6v-3.9l-8.6 4.5z" />
      </g>
    </svg>
  );
};

export const HeartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="#fff"
      viewBox="0 0 256 256"
    >
      <path d="m220.346 136.508-81.032 81.031a16.013 16.013 0 0 1-22.625 0L33.58 134.43a59.974 59.974 0 0 1 2.344-87.07c23.281-21.015 61.25-19.054 84.578 4.297l7.5 7.492 9.578-9.578a60.698 60.698 0 0 1 43.984-17.554 59.55 59.55 0 0 1 43.063 19.89c20.984 23.297 19.062 61.25-4.281 84.602Z" />
    </svg>
  );
};

export const PencilIcon = () => {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g
        stroke={theme === 'dark' ? '#fff' : '#000'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="m21.28 6.4-9.54 9.54c-.95.95-3.77 1.39-4.4.76-.63-.63-.2-3.45.75-4.4l9.55-9.55a2.58 2.58 0 1 1 3.64 3.65v0Z" />
        <path d="M11 4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11c2.21 0 3-1.8 3-4v-5" />
      </g>
    </svg>
  );
};
