export const Lessons = [
  {
    id: 'email-clarity',
    category: 'Business English',
    title: 'Writing a clear email',
    minutes: 5,
    body: `A good email has three parts.

First, a clear subject line. "Meeting Friday at 3 PM" is better than "Quick question". The reader knows what to expect before opening.

Second, one main idea per email. If you have two topics, send two emails. Mixed topics get forgotten.

Third, a clear action at the end. Say what you want the reader to do: "Please confirm by Thursday." Without this, nothing happens.`,
    quiz: [
      { q: 'What makes a good subject line?', options: ['Vague and short', 'Clear and specific', 'Very long and detailed', 'Empty'], answer: 1 },
      { q: 'How many main ideas per email?', options: ['As many as possible', 'Exactly one', 'Two or three', 'It does not matter'], answer: 1 },
      { q: 'A good email ends with…', options: ['A joke', 'A long signature', 'A clear action', 'A question mark'], answer: 2 },
    ],
  },
  {
    id: 'sky-blue',
    category: 'Science',
    title: 'Why the sky is blue',
    minutes: 5,
    body: `Sunlight looks white, but it is made of all colours mixed together.

When sunlight hits the air, tiny gas molecules scatter the blue light much more than the red light. Blue light bounces in every direction — including into your eyes.

That scattered blue is what you see. At sunset, sunlight travels a longer path through the air, so most blue is scattered away. What is left is red and orange — that is the sunset.`,
    quiz: [
      { q: 'Sunlight is made of…', options: ['Only white light', 'All colours mixed', 'Only blue light', 'Only red light'], answer: 1 },
      { q: 'Which colour scatters the most?', options: ['Red', 'Green', 'Blue', 'Yellow'], answer: 2 },
      { q: 'Why are sunsets red?', options: ['The sun cools down', 'Longer path scatters blue away', 'Clouds turn red', 'The moon blocks blue'], answer: 1 },
    ],
  },
  {
    id: 'two-minute-rule',
    category: 'Productivity',
    title: 'The 2-minute rule',
    minutes: 5,
    body: `If a task takes less than two minutes, do it now.

Do not write it on a list. Do not plan it. Just do it.

Small tasks pile up fast. A list with 20 tiny items feels heavy. Doing each one the moment it appears keeps the list empty and your mind clear.

The rule works because starting is the hardest part. Two minutes is short enough that you always say yes.`,
    quiz: [
      { q: 'A task under 2 minutes should be…', options: ['Written on a list', 'Done now', 'Delegated', 'Planned for later'], answer: 1 },
      { q: 'Why does the rule work?', options: ['It saves money', 'Starting is the hardest part', 'It looks busy', 'It slows you down'], answer: 1 },
      { q: 'What happens without it?', options: ['Small tasks pile up', 'Nothing changes', 'You work faster', 'You sleep better'], answer: 0 },
    ],
  },
  {
    id: 'compound-interest',
    category: 'Money',
    title: 'What is compound interest',
    minutes: 5,
    body: `Compound interest is interest that earns interest.

You put 1000 rupees in a bank at 10% per year. After one year you have 1100. After two years you have 1210 — not 1200. The extra 10 is interest on your first year's interest.

Over 20 years, that same 1000 grows to about 6700. Over 30 years, about 17,400.

Time matters more than the amount. Starting early beats saving more later.`,
    quiz: [
      { q: 'Compound interest is…', options: ['Interest on interest', 'A bank fee', 'A tax', 'Simple interest'], answer: 0 },
      { q: '1000 at 10% for 2 years gives…', options: ['1200', '1210', '1100', '1000'], answer: 1 },
      { q: 'What matters most?', options: ['The bank', 'Starting early', 'The currency', 'The city'], answer: 1 },
    ],
  },
  {
    id: 'walking-brain',
    category: 'Health',
    title: 'Why walking helps your brain',
    minutes: 5,
    body: `Walking increases blood flow to the brain. More blood means more oxygen and glucose — the fuel your brain uses.

A 20-minute walk can improve focus for the next two hours. It also lowers stress hormones.

You do not need a gym. A walk to the bus stop counts. The key is doing it often, not hard.

Walk before work, or during lunch. The brain benefits last longer than the walk itself.`,
    quiz: [
      { q: 'Walking increases…', options: ['Blood flow to the brain', 'Only heart rate', 'Only muscle mass', 'Nothing'], answer: 0 },
      { q: 'A 20-min walk improves focus for…', options: ['10 minutes', 'Two hours', 'Two days', 'One minute'], answer: 1 },
      { q: 'You need…', options: ['A gym', 'Fancy shoes', 'Just a short walk', 'A trainer'], answer: 2 },
    ],
  },
  {
    id: 'its-vs-its',
    category: 'Grammar',
    title: 'Its vs It\'s',
    minutes: 5,
    body: `"It's" means "it is" or "it has". The apostrophe replaces missing letters.

"Its" means belonging to it. No apostrophe.

Test: read the sentence and say "it is" out loud. If it still makes sense, use "It's". If not, use "Its".

Example: "It's raining" → "It is raining" ✓
"It's tail is long" → "It is tail is long" ✗ → use "Its tail is long".`,
    quiz: [
      { q: '"___ cold today"', options: ['Its', "It's", 'Its\'', 'Its\''], answer: 1 },
      { q: '"The dog wagged ___ tail"', options: ['Its', "It's", 'Its\'', 'Its\''], answer: 0 },
      { q: 'The apostrophe replaces…', options: ['A vowel', 'Missing letters', 'A space', 'A comma'], answer: 1 },
    ],
  },
  {
    id: 'multiply-11',
    category: 'Mental math',
    title: 'Multiply any 2-digit number by 11',
    minutes: 5,
    body: `To multiply a two-digit number by 11, add the two digits and put the result in the middle.

Example: 23 × 11. 2 + 3 = 5. Answer: 253.

Example: 41 × 11. 4 + 1 = 5. Answer: 451.

If the sum is 10 or more, carry over. Example: 87 × 11. 8 + 7 = 15. Put 5 in the middle, carry the 1. Answer: 957.

Works for any two-digit number. Practice a few and it becomes instant.`,
    quiz: [
      { q: '34 × 11 = ?', options: ['374', '344', '384', '364'], answer: 0 },
      { q: '52 × 11 = ?', options: ['572', '512', '582', '562'], answer: 0 },
      { q: 'For 87 × 11, the middle digit is…', options: ['5', '7', '8', '15'], answer: 0 },
    ],
  },
  {
    id: 'weekend-origin',
    category: 'History',
    title: 'Where the weekend came from',
    minutes: 5,
    body: `For most of history, people worked every day.

The idea of a weekly rest day comes from ancient religions. Jews rested on Saturday. Christians rested on Sunday.

In the 1800s, factory workers in Britain began asking for Saturday afternoon off. By the 1920s, many countries had made Saturday and Sunday the official weekend.

The two-day weekend is less than 100 years old. It was won by workers, not given.`,
    quiz: [
      { q: 'Weekly rest days first came from…', options: ['Factories', 'Religion', 'Governments', 'Schools'], answer: 1 },
      { q: 'The 2-day weekend became common in…', options: ['The 1600s', 'The 1800s', 'The 1920s', 'The 2000s'], answer: 2 },
      { q: 'Who pushed for the weekend?', options: ['Kings', 'Workers', 'Soldiers', 'Teachers'], answer: 1 },
    ],
  },
  {
    id: 'small-talk',
    category: 'Communication',
    title: 'Small talk that works',
    minutes: 5,
    body: `Small talk is not about information. It is about connection.

Good small talk questions are open. "How was your weekend?" beats "Did you have a good weekend?"

Listen for one detail, then ask about it. If they say "I saw my sister", ask "Where does she live?" This shows you listened.

You do not need to be interesting. You need to be interested. People remember how you made them feel.`,
    quiz: [
      { q: 'Small talk is mainly about…', options: ['Information', 'Connection', 'Winning', 'Time'], answer: 1 },
      { q: 'Better question type?', options: ['Closed (yes/no)', 'Open (how/why)', 'Personal', 'Silent'], answer: 1 },
      { q: 'You should be…', options: ['Interesting', 'Funny', 'Interested', 'Quiet'], answer: 2 },
    ],
  },
  {
    id: 'pomodoro',
    category: 'Focus',
    title: 'The Pomodoro method',
    minutes: 5,
    body: `Work in 25-minute blocks. Then take a 5-minute break.

After four blocks, take a longer break — 15 to 30 minutes.

The method works because the brain focuses better with a clear end in sight. 25 minutes feels possible. "Work until done" does not.

During the 25 minutes, do only one task. No phone. No tabs. When the timer ends, stop — even if you feel like continuing.

The break is not a reward. It is part of the work.`,
    quiz: [
      { q: 'How long is one Pomodoro?', options: ['5 min', '15 min', '25 min', '60 min'], answer: 2 },
      { q: 'During a Pomodoro you should…', options: ['Multitask', 'Do one task', 'Check phone', 'Plan next week'], answer: 1 },
      { q: 'The break is…', options: ['Optional', 'Part of the work', 'A reward', 'A waste'], answer: 1 },
    ],
  },
  {
    id: 'present-tense',
    category: 'Business English',
    title: 'Sounding polite at work',
    minutes: 5,
    body: `Direct English can sound rude. Small changes make it softer.

Instead of "Send me the file", try "Could you send me the file when you get a chance?"

Instead of "I disagree", try "I see it a little differently."

Instead of "That is wrong", try "I think there may be a small error."

The meaning stays the same. The feeling changes. Polite English is not weaker — it is clearer about intent.`,
    quiz: [
      { q: 'Polite English is…', options: ['Weaker', 'Clearer about intent', 'Longer only', 'Not needed'], answer: 1 },
      { q: '"I disagree" can become…', options: ['You are wrong', 'I see it differently', 'No', 'Stop'], answer: 1 },
      { q: 'Polite requests often use…', options: ['Commands', 'Could you / when you can', 'ALL CAPS', 'Silence'], answer: 1 },
    ],
  },
  {
    id: 'sleep-basics',
    category: 'Health',
    title: 'What good sleep actually does',
    minutes: 5,
    body: `Sleep is not rest. It is work.

During sleep, the brain sorts memories, clears waste, and repairs the body. Missing one night slows thinking the next day. Missing many nights damages health.

Two things matter most: a fixed wake-up time, and no screens for 30 minutes before bed.

You cannot catch up on weekends. The body tracks sleep over the whole week, not the night.`,
    quiz: [
      { q: 'Sleep is…', options: ['Rest', 'Work', 'Waste', 'Optional'], answer: 1 },
      { q: 'Most important habit?', options: ['Sleeping in', 'Fixed wake-up time', 'Long naps', 'Weekend catch-up'], answer: 1 },
      { q: 'You can catch up on weekends?', options: ['Yes', 'No', 'Only if young', 'Only in winter'], answer: 1 },
    ],
  },
];
