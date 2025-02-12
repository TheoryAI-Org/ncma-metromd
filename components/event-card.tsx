import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  imageUrl: string;
}

export function EventCard({
  title,
  date,
  startTime,
  endTime,
  description,
  imageUrl,
}: EventCardProps) {
  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <Link href="#" className="block group">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-[#1B365D] text-white">
            NCMA MetroMD
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-[#1B365D] group-hover:text-[#2A4A7F]">
          {title}
        </h3>
        <div className="text-sm text-gray-600">
          {formattedDate} • {formatTime(startTime)} - {formatTime(endTime)}
        </div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </Link>
  );
}
