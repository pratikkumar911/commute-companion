# Commute Companion

A daily micro-lesson sized to your commute. Five minutes, one short reading, three quiz questions. Come back every day, build a streak, and rack up "minutes well spent."

Built as a small full-stack demo: React + Vite on the front, Express on the back, everything in memory with dummy data. No database, no accounts, no setup.

---

## The idea

Commutes are dead time. Most people spend them scrolling. Commute Companion gives you something small and useful instead — a five-minute lesson that fits exactly into the ride you were already taking.

The hook is simple: **minutes well spent**. Every lesson adds 5 minutes to a permanent total. That number only goes up. It becomes the thing you check, the thing you protect, the thing you brag about.

---

## What it does

**The task.** Each day you get 1–3 short lessons based on your commute length. Each lesson is a 30-second read followed by a 3-question quiz.

**Topics.** Business English, Science, Money, Health, Grammar, Mental math, History, Productivity, Communication, Focus. Twelve lessons total, rotated by date so everyone sees the same queue on the same day.

**The rewards.**

| Reward | How it works |
|---|---|
| **Points** | 20 for showing up, +10 per correct answer, +20 bonus for a perfect score. Max 70 per lesson. |
| **Minutes well spent** | Every lesson adds 5 minutes to a permanent total. The headline number. |
| **Streak** | Ticks on the first lesson completed each day. Resets to 1 if you miss a day. |
| **Level** | Every 30 minutes earned = one level. Progress bar on your profile. |
| **Badges** | 8 of them — first lesson, 7-day streak, 30-day streak, 100/500/1000 minutes, Level 5, Level 10. |
| **Leaderboards** | Today / This week / All time. Filter to Global or My City. |

---

## Why these choices

**One task, done well.** One lesson a day. No endless scroll, no feed, no chat. Open, finish, leave.

**"Minutes well spent" over points.** Points feel abstract. Minutes feel real — you can look at 340 minutes and think *"that's 5.5 hours I didn't waste on my phone."* Points still exist, but minutes are the headline.

**Commute-sized, adjustable.** Choose 5, 10, or 15 minutes in the Me tab. The app sizes your daily queue to fit. Short bus ride = one lesson. Long train = three.

**Streaks with a soft landing.** Miss a day and the streak resets — but the comeback is one lesson. No harsh punishment that makes people quit.

**Built for the audience:**
- Plain English, short sentences, no idioms — friendly to ESL readers
- No images, no custom fonts, ~28 KB of JS — works on modest Android phones and 3G
- Quiz review shows your answer and the correct answer side by side, so learning happens in the moment
- Every screen has fewer than ~40 words

---

## What I left out

- **Real accounts and persistence.** Everything lives in memory. Restart the server and the world resets. Fine for a demo, not for real users.
- **Real lesson content.** Twelve hand-written lessons. A real product needs hundreds, sourced or licensed.
- **Audio / podcast clips.** Text + quiz only. Audio needs hosting, playback, and offline handling — too much for the scope.
- **Push notifications.** The thing that actually drives daily return in the real world. Needs a service worker, permission flow, and a sending server.
- **Streak freeze / grace days.** The single highest-value retention feature and the first thing I'd add next.
- **Social features.** No follows, cheers, or crews. Leaderboards give light competition, nothing deeper.
- **Real-money redemption.** The brief says earnings are worth real money. There's no path from points to a voucher yet — that's a business problem more than a code one, but it's a gap.
