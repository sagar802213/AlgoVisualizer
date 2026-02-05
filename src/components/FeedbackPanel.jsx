import { useState } from "react";
import {
  MessageSquare,
  X,
  Send,
  Star,
  Bug,
  Lightbulb,
  HelpCircle,
  Check,
  ThumbsUp,
  Heart,
} from "lucide-react";

// Feedback types
const feedbackTypes = [
  { id: "bug", name: "Bug Report", icon: Bug, color: "text-red-400" },
  {
    id: "feature",
    name: "Feature Request",
    icon: Lightbulb,
    color: "text-amber-400",
  },
  {
    id: "feedback",
    name: "General Feedback",
    icon: MessageSquare,
    color: "text-blue-400",
  },
  {
    id: "help",
    name: "Need Help",
    icon: HelpCircle,
    color: "text-emerald-400",
  },
];

// Rating emojis
const ratings = [
  { value: 1, emoji: "😞", label: "Very Bad" },
  { value: 2, emoji: "😕", label: "Bad" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "🤩", label: "Excellent" },
];

function FeedbackPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackType || !message.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFeedbackType("");
      setRating(0);
      setMessage("");
      setEmail("");
    }, 2000);
  };

  const resetForm = () => {
    setFeedbackType("");
    setRating(0);
    setMessage("");
    setEmail("");
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="relative">
          {/* Ping animations */}
          <div
            className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping scale-110"
            style={{ animationDuration: "2s" }}
          />
          <div
            className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping scale-125"
            style={{ animationDuration: "3s" }}
          />

          <button
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-500 border-2 border-emerald-300/60 hover:border-emerald-200/80 overflow-hidden group-hover:scale-110 group-hover:-rotate-3 active:scale-95 flex items-center justify-center"
            aria-label="Open Feedback"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300/40 via-transparent to-emerald-300/30 animate-pulse" />

            {/* Sparkle effects */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping"
                style={{ animationDelay: "1.5s" }}
              />
            </div>

            <MessageSquare className="h-8 w-8 relative z-10 text-slate-900 drop-shadow-lg transition-all duration-500" />
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 shadow-2xl shadow-emerald-500/10 rounded-2xl animate-in zoom-in-95 fade-in duration-300">
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-emerald-500/50"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-emerald-400 transition-colors" />
              </button>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold font-mono text-white mb-2">
                  <span className="text-emerald-400">Thank</span>
                  <span className="text-purple-400">You!</span>
                </h3>
                <p className="text-slate-400 font-mono">
                  Your feedback has been submitted successfully.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-col gap-1.5 px-6 pt-6 text-center pr-12">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <MessageSquare
                      className="h-7 w-7 text-emerald-400 animate-pulse"
                      style={{ animationDuration: "2.5s" }}
                    />
                    <h2 className="text-2xl font-bold font-mono text-white">
                      <span className="text-emerald-400">Send</span>
                      <span className="text-purple-400">Feedback</span>
                    </h2>
                  </div>
                  <p className="text-sm text-slate-400 font-mono">
                    <span className="text-amber-400">//</span> We'd love to hear
                    from you
                    <br />
                    <span className="text-amber-400">//</span> Help us improve
                    your experience
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Feedback Type */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-mono text-emerald-400">
                      <span className="text-amber-400">$</span>
                      <span>Feedback Type</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {feedbackTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => setFeedbackType(type.id)}
                            className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden bg-slate-800/70 ${
                              feedbackType === type.id
                                ? "border-emerald-400/60 shadow-emerald-500/10"
                                : "border-slate-700 hover:border-emerald-400/40"
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${type.color}`} />
                            <span
                              className={`text-sm font-mono font-medium ${
                                feedbackType === type.id
                                  ? "text-emerald-400"
                                  : "text-white"
                              }`}
                            >
                              {type.name}
                            </span>
                            {feedbackType === type.id && (
                              <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-emerald-400/20 flex items-center justify-center">
                                <Check className="h-3 w-3 text-emerald-400" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-mono text-purple-400">
                      <span className="text-amber-400">$</span>
                      <span>Rate Your Experience</span>
                    </div>
                    <div className="flex justify-center gap-3">
                      {ratings.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => setRating(r.value)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-300 ${
                            rating === r.value
                              ? "border-purple-400/60 bg-purple-500/20 scale-110"
                              : "border-slate-700 hover:border-purple-400/40 bg-slate-800/50"
                          }`}
                          title={r.label}
                        >
                          <span className="text-2xl">{r.emoji}</span>
                          {rating === r.value && (
                            <span className="text-[10px] text-purple-400 font-mono">
                              {r.label}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-mono text-emerald-400">
                      <span className="text-amber-400">$</span>
                      <span>Your Message</span>
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      rows={4}
                      className="w-full bg-slate-800/70 border border-slate-700 focus:border-emerald-400/60 rounded-xl p-4 text-white placeholder-slate-500 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-mono text-purple-400">
                      <span className="text-amber-400">$</span>
                      <span>
                        Email <span className="text-slate-500">(optional)</span>
                      </span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-slate-800/70 border border-slate-700 focus:border-purple-400/60 rounded-xl p-4 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <p className="text-xs text-slate-500 font-mono">
                      <span className="text-amber-400">//</span> We'll only use
                      this to respond to your feedback
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!feedbackType || !message.trim() || isSubmitting}
                    className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-mono font-semibold transition-all duration-300 ${
                      !feedbackType || !message.trim() || isSubmitting
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-purple-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FeedbackPanel;
