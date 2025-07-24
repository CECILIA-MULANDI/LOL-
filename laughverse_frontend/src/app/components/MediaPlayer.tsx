"use client";
import { useState, useRef, useEffect } from "react";

interface MediaPlayerProps {
  mediaUrl: string;
  mediaType: "audio" | "video" | "unknown";
  title: string;
}

export default function MediaPlayer({
  mediaUrl,
  mediaType,
  title,
}: MediaPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(1);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  // Debug logging
  useEffect(() => {
    console.log("MediaPlayer props:", { mediaUrl, mediaType, title });
  }, [mediaUrl, mediaType, title]);

  const handlePlayPause = async () => {
    if (!mediaRef.current) {
      console.error("Media ref is null");
      return;
    }

    console.log("Play/Pause clicked, isPlaying:", isPlaying);
    console.log("Media element:", mediaRef.current);
    console.log("Media src:", mediaRef.current.src);

    try {
      if (isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log("Attempting to play...");
        await mediaRef.current.play();
        setIsPlaying(true);
        console.log("Play successful");
      }
    } catch (error) {
      console.error("Playback error:", error);
      setError(`Playback failed: ${error}`);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    console.log("Metadata loaded");
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
      setIsLoading(false);
      console.log("Duration:", mediaRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleError = (
    e: React.SyntheticEvent<HTMLAudioElement | HTMLVideoElement, Event>
  ) => {
    console.error("Media error:", e);
    setError("Failed to load media");
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    console.log("Can play event fired");
    setIsLoading(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
  };

  if (mediaType === "unknown" || !mediaUrl) {
    return (
      <div className="aspect-square bg-peach rounded-lg flex items-center justify-center">
        <div className="text-6xl">😂</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Media Display */}
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-lg flex items-center justify-center relative">
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onLoadStart={() => setIsLoading(true)}
            onError={handleError}
            onCanPlay={handleCanPlay}
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source src={mediaUrl} type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>

          {error && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs p-1 rounded">
              {error}
            </div>
          )}

          <div className="text-6xl">🎵</div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-3 bg-white dark:bg-gray-800">
        {/* Play/Pause Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            className="w-12 h-12 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-600 dark:hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gray-500 dark:text-gray-400"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
