import React from "react";
import { Clock } from "lucide-react";
import type { GameEvent } from "../types";

interface EventTimelineProps {
  events: GameEvent[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  const formatTime = (timestamp: number) => {
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="event-timeline">
      <h3>
        <Clock size={20} />
        Historique des coups
      </h3>

      <div className="timeline-list">
        {events.length === 0 ? (
          <p className="empty-timeline">Aucun coup joué pour le moment</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className={`timeline-item ${event.type}`}>
              <span className="timeline-time">
                {formatTime(event.timestamp)}
              </span>
              <span className="timeline-player">{event.player}</span>
              <span className="timeline-description">{event.description}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
