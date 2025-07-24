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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  // Debug logging
  useEffect(() => {
    console.log("MediaPlayer props:", { mediaUrl, mediaType, title });
  }, [mediaUrl, mediaType, title]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
  }, [volume]);

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

  const handleError = (e: any) => {
    console.error("Media error:", e);
    setError("Failed to load media");
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    console.log("Can play event fired");
    setIsLoading(false);
  };

  if (mediaType === "unknown" || !mediaUrl) {
    return (
      <div className="aspect-square bg-peach rounded-lg flex items-center justify-center">
        <div className="text-6xl">😂</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Media Element */}
      {mediaType === "video" ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          className="w-full aspect-video bg-black"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onLoadStart={() => setIsLoading(true)}
          controls={false}
        >
          <source src={mediaUrl} />
          Your browser does not support video playback.
        </video>
      ) : (
        <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center relative">
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

          {/* Audio Visualization */}
          <div className="text-center">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C13.1 2 14 2.9 14 4V8C14 9.1 13.1 10 12 10S10 9.1 10 8V4C10 2.9 10.9 2 12 2M19 10V12C19 15.9 15.9 19 12 19S5 15.9 5 12V10H7V12C7 14.8 9.2 17 12 17S17 14.8 17 12V10H19M12 21C12.6 21 13 21.4 13 22H11C11 21.4 11.4 21 12 21Z" />
              </svg>
            </div>
            <div className="text-white font-medium">{title}</div>
          </div>

          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-8 bg-white rounded animate-pulse"></div>
                <div
                  className="w-2 h-6 bg-white rounded animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-10 bg-white rounded animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-4 bg-white rounded animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="p-4 space-y-3">
        {/* Play/Pause Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            disabled={isLoading}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-gray-500">
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
            className="text-gray-600"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const vol = parseFloat(e.target.value);
              setVolume(vol);
              if (mediaRef.current) {
                mediaRef.current.volume = vol;
              }
            }}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
