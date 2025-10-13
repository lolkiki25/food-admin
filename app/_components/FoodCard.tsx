import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type MovieCardProps = {
  title: string;
  score: number;
  image: string;
  id: number;
};

export const MovieCard = ({ title, score, image, id }: MovieCardProps) => {
  return (
    <Link href={`/detail/${id}`}>
      <Card className="max-w-[270px] max-h-[241px] bg-secondary p-0 overflow-hidden gap-2">
        <CardContent className="p-0">
          <Image
            src={`{image}`}
            alt=""
            width={230}
            height={340}
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-2">
          <CardDescription className="flex gap-2">
          </CardDescription>
          <CardTitle>{title}</CardTitle>
        </CardFooter>
      </Card>
    </Link>
  );
};