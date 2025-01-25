import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

interface CountdownTimerProps {
  timeLeft: number;
  onTimeUp: () => void;
}

export const CountdownTimer = ({ timeLeft, onTimeUp }: CountdownTimerProps) => {
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-center gap-2 text-orange-600">
        <AlertCircle className="w-4 h-4" />
        <p className="text-sm font-medium">
          Time Remaining: {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
};