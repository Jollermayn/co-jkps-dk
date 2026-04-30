import {
  Search,
  Users,
  Layers,
  Workflow,
  Map,
  BarChart3,
  MessageCircle,
  Gem,
  HandHeart,
  Lightbulb,
  Puzzle,
  Box,
  Tag as TagIcon,
  Mic,
  Video,
  PenTool,
  Megaphone,
  ListChecks,
  Music,
  Radio,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "ux research": Search,
  "co-design": Users,
  "co design": Users,
  "mixed methods": Layers,
  "service design": Workflow,
  brugerrejser: Map,
  dataanalyse: BarChart3,
  kommunikation: MessageCircle,
  "strategisk kommunikation": MessageCircle,
  brandudvikling: Gem,
  "participatorisk design": HandHeart,
  "concept design": Lightbulb,
  konceptdesign: Lightbulb,
  "co-creation": Puzzle,
  "product design": Box,
  // Reasonable defaults for the broader tag set
  "redaktionel tilrettelæggelse": ListChecks,
  postproduktion: Video,
  "tværgående koordinering": Workflow,
  "journalistisk formidling": Mic,
  podcastproduktion: Radio,
  videoproduktion: Video,
  "so-me indhold": Megaphone,
  lydidentitet: Music,
  studieopsætning: Mic,
  indholdsstrategi: PenTool,
  musikproduktion: Music,
  kampagneudvikling: Megaphone,
  projektledelse: ListChecks,
  platformsudvikling: Box,
};

export function ApproachGrid({ tags }: { tags: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {tags.map((tag) => {
        const Icon = ICON_MAP[tag.toLowerCase()] ?? TagIcon;
        return (
          <div
            key={tag}
            className="flex flex-col items-start gap-3 border border-cream/15 bg-navy-deep/40 px-4 py-4 md:px-5 md:py-5 transition-colors hover:border-ember/60"
          >
            <Icon
              className="w-5 h-5 text-ember shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-sm md:text-base font-display text-cream leading-tight">
              {tag}
            </span>
          </div>
        );
      })}
    </div>
  );
}
