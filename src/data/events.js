// Ordered by card number. `card` files live in /public.
// NOTE: `tagline` is placeholder copy (shown under the carousel) — edit freely.
// Card 16 is not in the supplied artwork; duplicates HOME (37), (38), (39) are not used.
// `group` sorts each event into a segment on the Events page (see `segments`).
export const events = [
  { no: '01', group: 'cultural', name: 'Euphoria', category: 'Eastern Dance', card: '/HOME%20(24).png', tagline: 'Where tradition moves to the rhythm of the soul' },
  { no: '02', group: 'cultural', name: 'Step Up', category: 'Western Dance', card: '/HOME%20(25).png', tagline: 'A western dance journey through decades' },
  { no: '03', group: 'cultural', name: 'Raagify', category: 'Eastern Music', card: '/HOME%20(23).png', tagline: 'Let the ragas of India find their voice' },
  { no: '04', group: 'cultural', name: 'Westwood', category: 'Western Music', card: '/HOME%20(22).png', tagline: 'Western melodies, one voice, one stage' },
  { no: '05', group: 'cultural', name: 'Instrumental Echoes', category: 'Battle of Instruments', card: '/HOME%20(26).png', tagline: 'Strings, drums and keys in a battle of sound' },
  { no: '06', group: 'cultural', name: 'The Illusion Jam', category: 'Battle of Bands', card: '/HOME%20(27).png', tagline: 'Bands collide on one electrifying stage' },
  { no: '07', group: 'sports', name: 'Futsal', category: 'Mini-Football Tournament', card: '/HOME%20(33).png', tagline: 'Fast feet, fierce goals, five-a-side glory' },
  { no: '08', group: 'literary', name: 'Vision Alchemy', category: 'Photography Contest', card: '/HOME%20(32).png', tagline: 'Turn a single moment into a masterpiece' },
  { no: '09', group: 'literary', name: 'Mystic Masks', category: 'Face Painting', card: '/HOME%20(31).png', tagline: 'Paint a face, tell a story' },
  { no: '10', group: 'literary', name: 'Shayrana', category: 'Poetry', card: '/HOME%20(30).png', tagline: 'Words that weave poetry in three languages' },
  { no: '11', group: 'literary', name: 'Quizzard', category: 'Mela Quiz', card: '/HOME%20(29).png', tagline: 'Music, arts and trivia — only the sharpest survive' },
  { no: '12', group: 'cultural', name: 'Halla Bol', category: 'Street Play', card: '/HOME%20(28).png', tagline: 'Raise your voice, take the street' },
  { no: '13', group: 'cultural', name: 'Voxbox', category: 'Beatboxing', card: '/HOME%20(34).png', tagline: 'No instruments, just beats and breath' },
  { no: '14', group: 'cultural', name: 'The-Rap-Y', category: 'Rap Battle', card: '/HOME%20(35).png', tagline: 'Bars, flow and knockout rhymes' },
  { no: '15', group: 'sports', name: 'Call of Duty: Mobile', category: 'Mobile Esports', card: '/HOME%20(36).png', tagline: 'Drop in, squad up, own the lobby' },
  { no: '17', group: 'sports', name: 'Mind Over Moves', category: 'Rapid Chess Tournament', card: '/HOME%20(40).png', tagline: 'Outthink your opponent, one move at a time' },
  { no: '18', group: 'cultural', name: 'Feastopia', category: 'Food Festival', card: '/HOME%20(41).png', tagline: 'A festival of flavours from every corner' },
]

// Segments on the Events page, in display order. `phase` picks the
// moon-phase icon (0 = new moon … 4 = full moon).
export const segments = [
  { id: 'cultural', name: 'Cultural', phase: 4, blurb: 'Dance, music, bands, street theatre, rap and a festival of food.' },
  { id: 'literary', name: 'Literary & Arts', phase: 3, blurb: 'Poetry, photography, face painting and the mela quiz.' },
  { id: 'sports', name: 'Sports & Gaming', phase: 2, blurb: 'Futsal on the turf, chess on the clock, esports on the phone.' },
  { id: 'technical', name: 'Technical', phase: 1, blurb: 'Technical events are being lined up — watch this space.' },
]
