// All biographical text is deliberately illustrative. Replace this file's sample
// copy with your story; layout, routes, and animations live separately in app.js.
export const profile = {
  name: 'Your Name',
  email: 'hello@example.com',
  autoAdvance: true,
  // Add your own public profile URLs here when ready.
  socials: { x: null, linkedin: null, github: null },
  about: [
    `I'm a builder working at the intersection of <a href="/?page=design" data-route>technology</a> and thoughtful design. This is a space for the ideas, projects, and people that shape the way I see the world.`,
    `My path has taken me through different teams, places, and disciplines. I've learned from generous collaborators, followed unexpected questions, and found that interesting work often starts with a little curiosity.`,
    `My <button class="text-link" data-action="goal">life's goal</button> is to keep making useful things, stay open to new perspectives, and leave something meaningful behind. I also enjoy <a href="/?page=reading" data-route>reading</a>, and <a href="/?page=design" data-route>design</a>.`
  ],
  goal: 'A space for your ambition: what you hope to build, the people you hope to help, and the kind of life you want to lead.',
  timelineIntro: "Here's a rough timeline of the chapters in my story:",
  timeline: [
    { label: 'Today', title: 'Building the next chapter.', details: ['A place for the work, ideas, and projects currently taking most of my attention.', 'Add a few words about the direction I’m heading.'] },
    { label: 'Recently', title: 'Found a new direction.', details: ['An experience that changed how I think about work.', 'The people and questions that helped me choose a path.', 'A few things I learned along the way.'] },
    { label: 'Before', title: 'Learned by making things.', details: ['A project that started small and became something more.', 'Experiments, collaborations, and lessons worth remembering.', 'A moment that made the next step feel possible.'] },
    { label: 'Earlier', title: 'Followed a first big idea.', details: ['The first time curiosity turned into a project I could share.', 'A few early successes, and a few useful mistakes.', 'Something I still carry with me today.'] },
    { label: 'Childhood', title: 'Discovered what interested me.', details: ['The hobbies and questions I kept coming back to.', 'A teacher, friend, or place that opened a door.', 'The beginnings of a lifelong interest.'] },
    { label: 'The start', title: 'Had good people around me.', details: ['A space to recognize the people who made everything else possible, and what they taught me.'] },
    { label: 'Born', title: 'Somewhere the story began.', details: ['A hometown, a family, and the first of many beginnings.'] }
  ],
  readingIntro: 'A few works that shape the way I see the world:',
  // Sample reading list, not a claim about your personal preferences.
  books: ['Meditations — Marcus Aurelius', 'The Creative Act — Rick Rubin', 'The Design of Everyday Things — Don Norman', 'A Philosophy of Walking — Frédéric Gros', 'The Art of Noticing — Rob Walker', 'Thinking in Systems — Donella Meadows', 'The Beginning of Infinity — David Deutsch'],
  design: 'I think good design begins with paying attention. The small details matter because they shape how something feels, how it works, and how it fits into a person’s day.'
};

const reflection = [
  'There is a particular kind of clarity that comes from making something with your own hands. An idea that felt complete in your head becomes a collection of decisions. Each one asks you to be a little more specific about what you mean.',
  'At first, it is tempting to keep everything open. Another possibility, another direction, another version that might be better. But the work begins to move when you choose something small enough to finish and give it your full attention.',
  'The most useful feedback often arrives in ordinary moments. Someone pauses where you expected them to continue. A question reveals an assumption you did not know you were making. A detail you spent hours polishing turns out to matter less than a sentence you wrote in five minutes.',
  'I am learning to treat those moments as part of the process. They are reminders that the work exists in the world, alongside other people’s needs and habits, rather than only inside my own plans.',
  'Progress is easier to see in retrospect. A few weeks of small changes can feel like standing still until you look back at the first version. What seemed uncertain has become familiar, and the questions have become more interesting.',
  'There is no grand conclusion here. Just a reason to keep showing up, keep paying attention, and keep making the next version a little more considered than the last.'
];

export const posts = [
  { slug:'finding-a-place-to-do-good-work', title:'Finding a place to do good work', date:'2026-10-03', cover:'cities-cover.jpg', description:'On the places, people, and everyday rhythms that help an idea become something real.', intro:'Some places make it easier to begin. Others help you understand what you have been trying to say.', sections:[['A change of surroundings',reflection.slice(0,2)],['The people around the work',reflection.slice(2,4)],['Learning to pay attention',reflection.slice(1,3)],['Making room for a different pace',reflection.slice(3,5)],['What I want to carry forward',reflection.slice(4)]] },
  { slug:'a-chapter-worth-remembering', title:'A chapter worth remembering', date:'2026-01-11', cover:'park.jpg', description:'A sample essay about a turning point, an unexpected lesson, and choosing what comes next.', intro:'It is not always obvious when one chapter is ending and another is beginning.', sections:[['Before the decision',reflection.slice(0,2)],['What changed',reflection.slice(2,4)],['The next small step',reflection.slice(4)]] },
  { slug:'the-value-of-staying-with-it', title:'The value of staying with it', date:'2025-09-17', cover:'bike.jpg', description:'Notes on practice, curiosity, and the things that become visible when you stay with a question.', intro:'The first hour tells you very little about what a practice might become.', sections:[['Learning the shape of a problem',reflection.slice(0,2)],['A different kind of progress',reflection.slice(2,4)],['Coming back tomorrow',reflection.slice(4)]] },
  { slug:'small-patterns-bigger-questions', title:'Small patterns, bigger questions', date:'2025-09-12', cover:'skyline.jpg', description:'A sample reflection on noticing patterns and following an interest further than expected.', intro:'Sometimes a small question opens a door into something much larger.', sections:[['Following a thread',reflection.slice(0,2)],['Connecting the pieces',reflection.slice(2,4)],['Keeping the question open',reflection.slice(4)]] }
];
