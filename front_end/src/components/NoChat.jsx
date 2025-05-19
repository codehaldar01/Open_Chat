import { MessageSquare } from "lucide-react";
import {BookOpenText, Heart, TentTree, BedDouble, Castle} from "lucide-react";
const NoChat = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce "
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Open Chat!</h2>
        <p className="text-base-content/60 hover:text-shadow-md ">
          To chat with your fried select the conversation from the left panel.
        </p>

        {/* Lucide Design */}
        <div className="flex justify-center gap-8  mt-8">
          <BookOpenText className="transition-transform duration-300 hover:scale-130 hover:text-primary" />
          <Heart className="transition-transform duration-300 hover:scale-130 hover:text-primary" />
          <TentTree className="transition-transform duration-300 hover:scale-130 hover:text-primary" />
          <BedDouble className="transition-transform duration-300 hover:scale-130 hover:text-primary" />
          <Castle className="transition-transform duration-300 hover:scale-130 hover:text-primary" />
        </div>
      </div>
    </div>
  );
};

export default NoChat