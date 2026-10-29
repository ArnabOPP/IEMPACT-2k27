// Ordered by card number. `card` files live in /public.
// NOTE: `tagline` is placeholder copy (shown under the carousel) — edit freely.
// `group` sorts each event into a segment on the Events page (see `segments`).
export const events = [
  { no: '01', group: 'cultural', name: 'Euphoria', category: 'Eastern Dance', card: '/euphoria.jpg', tagline: 'Where tradition moves to the rhythm of the soul' },
  { no: '02', group: 'cultural', name: 'Step Up', category: 'Western Dance', card: '/step-up.jpg', tagline: 'A western dance journey through decades' },
  { no: '03', group: 'cultural', name: 'Raagify', category: 'Eastern Music', card: '/raagify.jpg', tagline: 'Let the ragas of India find their voice' },
  { no: '04', group: 'cultural', name: 'Westwood', category: 'Western Music', card: '/westwood.jpg', tagline: 'Western melodies, one voice, one stage' },
  { no: '05', group: 'cultural', name: 'Instrumental Echoes', category: 'Battle of Instruments', card: '/instrumental-echoes.jpg', tagline: 'Strings, drums and keys in a battle of sound' },
  { no: '06', group: 'cultural', name: 'The Illusion Jam', category: 'Battle of Bands', card: '/illusion-jam.jpg', tagline: 'Bands collide on one electrifying stage' },
  { no: '07', group: 'sports', name: 'Futsal', category: 'Mini-Football Tournament', card: '/futsal.jpg', tagline: 'Fast feet, fierce goals, five-a-side glory' },
  { no: '11', group: 'literary', name: 'Quizzard', category: 'Mela Quiz', card: '/quizzard.jpg', tagline: 'Music, arts and trivia — only the sharpest survive' },
  { no: '12', group: 'cultural', name: 'Halla Bol', category: 'Street Play', card: '/halla-bol.jpg', tagline: 'Raise your voice, take the street' },
  { no: '15', group: 'sports', name: 'Call of Duty: Mobile', category: 'Mobile Esports', card: '/cod-mobile.jpg', tagline: 'Drop in, squad up, own the lobby' },
  { no: '16', group: 'sports', name: 'BGMI', category: 'Mobile Esports', card: '/bgmi.jpg', tagline: 'Drop in, survive, be the last squad standing' },
  { no: '17', group: 'sports', name: 'Mind Over Moves', category: 'Rapid Chess Tournament', card: '/chess.jpg', tagline: 'Outthink your opponent, one move at a time' },
  { no: '22', group: 'sports', name: 'Carrom', category: 'Board Game Tournament', card: '/carrom.jpg', tagline: 'Aim sharp, strike smart, chase the queen' },
  { no: '23', group: 'sports', name: 'Table Tennis', category: 'Table Tennis Tournament', card: '/table-tennis.jpg', tagline: 'Fast rallies, sharp reflexes, ultimate glory' },
  { no: '24', group: 'sports', name: 'Badminton', category: 'Badminton Tournament', card: '/badminton.jpg', tagline: 'Every rally counts, every point matters' },
  { no: '25', group: 'sports', name: 'Tug of War', category: 'Team Strength Contest', card: '/tug-of-war.jpg', tagline: 'Pull hard, stand strong, conquer together' },
  { no: '26', group: 'sports', name: 'Arm Wrestling', category: 'Strength Contest', card: '/arm-wrestling.jpg', tagline: 'Lock in, power up, dominate' },
  { no: '27', group: 'sports', name: 'E-Football', category: 'Football Esports', card: '/e-football.jpg', tagline: 'Controllers locked in, glory is real' },
  { no: '28', group: 'cultural', name: 'Shrutirawngo', category: 'Audio Drama', card: '/shrutirawngo.jpg', tagline: 'The screen goes dark, the story comes alive' },
  // Technical workshops — names and details are still to be announced
  { no: '19', group: 'technical', name: 'Workshop 01', category: 'Name to be announced', card: '/workshop-1.png', tagline: 'Details to be announced' },
  { no: '20', group: 'technical', name: 'Workshop 02', category: 'Name to be announced', card: '/workshop-2.png', tagline: 'Details to be announced' },
  { no: '21', group: 'technical', name: 'Workshop 03', category: 'Name to be announced', card: '/workshop-3.png', tagline: 'Details to be announced' },
]

// Segments on the Events page, in display order. `phase` picks the
// moon-phase icon (0 = new moon … 4 = full moon).
export const segments = [
  { id: 'cultural', name: 'Cultural', phase: 4, blurb: 'Dance, music, bands, street theatre and audio drama.' },
  { id: 'literary', name: 'Literary & Arts', phase: 3, blurb: 'The mela quiz.' },
  { id: 'sports', name: 'Sports & Gaming', phase: 2, blurb: 'Futsal, chess, carrom, racquet sports, tests of strength and esports.' },
  { id: 'technical', name: 'Technical', phase: 1, blurb: 'Three hands-on workshops — names and details to be announced.' },
]
