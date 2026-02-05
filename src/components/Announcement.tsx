import { model } from '@/types/model';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface AnnouncementProps {
  announcements: model.IAnnouncement[];
  loading?: boolean;
}

const Announcement: React.FC<AnnouncementProps> = ({ announcements, loading = true }) => {
  return (
    <div className="w-full px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className={`transition duration-1000 ease-in-out bg-gray-200 h-64 animate-pulse rounded-lg`}></div>
                </div>
              </CarouselItem>
            ))
          ) : (
            announcements.map((announcement, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Link href={announcement.ctaUrl}>
                    {announcement.asset ? (
                      <img
                        src={announcement.asset.url}
                        alt={announcement.title}
                        className="transition duration-1000 ease-in-out bg-gray-400 h-64 object-cover object-center w-full rounded-lg"
                      />
                    ) : (
                      <div className="transition duration-1000 ease-in-out bg-gray-400 h-64 w-full rounded-lg"></div>
                    )}
                  </Link>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Announcement;
