// Ordered by card number. `card` files live in /public.
// NOTE: `tagline` is placeholder copy (shown under the carousel) — edit freely.
// Optional `rules`: [{ title, items[] }] — shown on the event page under "Rules & eligibility".
// `group` sorts each event into a segment on the Events page (see `segments`).
export const events = [
  {
    no: '01', group: 'cultural', name: 'Euphoria', category: 'Eastern Dance', card: '/euphoria.jpg', tagline: 'Where tradition moves to the rhythm of the soul',
    rules: [
      {
        title: 'Time limit (empty stage to empty stage)',
        items: [
          'Solo: 3 + 1 minutes',
          'Duet: 4 + 1 minutes',
          'Group: 6 + 2 minutes',
          'The time limit includes the entire performance, from an empty stage to an empty stage.',
        ],
      },
      {
        title: 'Rules',
        items: [
          'Preliminary rounds for the solo and duet categories will be conducted. All relevant information will be notified in due course.',
          'Pre-edited tracks in MP3 format must be emailed to eastern.euphoria@gmail.com at least 7 days before the event. Participants must carry a backup of their tracks on a pen drive on the day of the event.',
          'Theme for Group Category - Navarasa.',
          'Number of participants for Group Category: minimum 6, maximum 10.',
          'All participants must report to the Event Coordinator at least 1 hour before the event starts.',
          'The use of props is optional. Appropriate and creative use of props that enhances the performance may earn additional marks.',
          'Props must complement the performance and should not obstruct the choreography or cause inconvenience to other participants.',
          'No hazardous materials or dangerous elements should be used during the performance.',
          'A minimum of 5 participants must remain on stage throughout the performance.',
        ],
      },
      {
        title: 'Judging criteria',
        items: [
          'The choreography and presentation should reflect the chosen interpretation of Navarasa.',
          'Exceeding the prescribed time limit may result in negative marking.',
          'Any form of vulgarity or obscenity will result in disqualification.',
          'The use of item songs is strictly prohibited and will result in negative marking.',
          'Originality, coordination and rhythm is highly considerable.',
        ],
      },
      {
        title: 'Note',
        items: ['All decisions made by the judges will be considered final and binding.'],
      },
    ],
  },
  {
    no: '02', group: 'cultural', name: 'Step Up', category: 'Western Dance', card: '/step-up.jpg', tagline: 'A western dance journey through decades',
    rules: [
      {
        title: 'Main performance',
        items: [
          'Solo: 3 + 1 minutes.',
          'Duo: 3 + 1 minutes.',
          'Group: 6 + 1 minutes.',
          'Participants must strictly adhere to the prescribed time limits.',
          'Failure to adhere to the prescribed time limit will lead to disqualification.',
          'Following the event theme is not mandatory.',
        ],
      },
      {
        title: 'Props and costumes',
        items: [
          'Participants are responsible for arranging their own props and costumes.',
          'A list of all props required for the performance must be submitted before the event.',
          'The stage must be cleared of all props and equipment before the next performance begins.',
          'All props must be safe and suitable for a college-level event.',
        ],
      },
      {
        title: 'Group category',
        items: [
          'Each group must consist of 5 to 12 participants.',
          'A minimum of 4 participants must remain on stage at all times during the group performance.',
        ],
      },
      {
        title: 'Reporting time',
        items: [
          'Participants must report to their respective Event Coordinator at least 1 hour before the scheduled start of the event.',
        ],
      },
      {
        title: 'Judging',
        items: [
          'The decisions made by the judges and the organizing committee are final and binding.',
        ],
      },
      {
        title: 'Certificates',
        items: [
          'All participating individuals will receive participation certificates.',
        ],
      },
      {
        title: 'Prohibited acts and content',
        items: [
          'The following are strictly prohibited:',
          'Vulgar or obscene acts on stage.',
          'Inappropriate songs or music containing offensive or explicit content.',
          'Revealing costumes or outfits inappropriate for a college-level event.',
          'The use of dangerous props or materials that may cause harm to participants or the audience.',
          'All performances must maintain proper decorum and comply with the event guidelines.',
        ],
      },
      {
        title: 'Music track and prop list submission',
        items: [
          'All music tracks must be submitted in MP3 format to iempact.stepup@gmail.com at least 2–3 days before the event.',
          'Participants must carry a pen drive containing their final performance track as a backup on the day of the event.',
          'A list of all props required for the performance must be sent to the same email ID before the event.',
          'All submitted music tracks and prop lists must be clearly labelled with the participant\'s name/team name, category, and college name.',
        ],
      },
      {
        title: 'Additional rules',
        items: [
          'Additional rules for the finals will be communicated on-site.',
          'The organizing committee reserves the right to update the rules as required.',
          'Any violation of the event rules may lead to disqualification.',
          'Participants must follow all instructions given by the organizing committee to ensure the smooth conduct of the event.',
        ],
      },
      {
        title: 'Stepistan — Eligibility & reporting',
        items: [
          'Open to registered participants only.',
          'Valid ID required during registration & entry.',
          'All dancers must report 30 minutes before the event start time.',
          'No-show after two calls = automatic disqualification.',
        ],
      },
      {
        title: 'Stepistan — Time rules',
        items: [
          'Prelims: 40 seconds.',
          'Battles: 60 seconds per dancer.',
          'Tie-breaks: 30–40 seconds (judge’s call).',
          'Overtime may lead to score deduction or disqualification.',
        ],
      },
      {
        title: 'Stepistan — Music rules',
        items: [
          'Only official event DJ music is allowed.',
          'No personal music requests.',
          'Dancer must begin as soon as music starts.',
          'Music restarts only for legitimate technical issues.',
        ],
      },
      {
        title: 'Stepistan — Judging criteria',
        items: [
          'Judges evaluate dancers on:',
          'Musicality – Rhythm, timing, beat hits.',
          'Technique – Clean controls, foundations, footwork.',
          'Originality – Unique moves, concepts, risks.',
          'Execution – Energy, confidence, clarity.',
          'Battle Presence – Engagement, response, attitude.',
        ],
      },
      {
        title: 'Stepistan — Performance rules',
        items: [
          'No vulgar gestures, obscene moves, or disrespectful behavior.',
          'No intentional physical contact with opponent.',
          'Wearable props allowed; dangerous props prohibited.',
          'Unsafe moves may lead to warnings or disqualification.',
        ],
      },
      {
        title: 'Stepistan — Disqualification conditions',
        items: [
          'Reporting late.',
          'Unsafe / offensive moves.',
          'Touching or threatening an opponent.',
          'Trying to influence judges.',
          'Violating battle rules.',
        ],
      },
      {
        title: 'Stepistan — Judges’ decisions',
        items: [
          'Judges’ decisions are final, binding, and non-negotiable.',
          'Judges control tie-breakers and final eliminations.',
        ],
      },
    ],
  },
  {
    no: '03', group: 'cultural', name: 'Raagify', category: 'Eastern Music', card: '/raagify.jpg', tagline: 'Let the ragas of India find their voice',
    rules: [
      {
        title: 'Rules',
        items: [
          'All participants must carry their valid college ID cards.',
          'Multiple registrations from the same college are allowed.',
          'Each participant may have a maximum of one accompanist, either a guitarist or a percussionist/beatboxer, but not both.',
          'If the singer has an accompanist, the singer cannot play an instrument, and vice versa.',
          'Each performance must not exceed 4 minutes, including 3 minutes of performance and 1 minute for setup/transition.',
          'Backing tracks, e-Tanpura and e-Tabla are permitted.',
          'Any karaoke or backing track must be brought on a pen drive on the event day and emailed to shinjinibhattacharyya23@gmail.com at least five days before the event.',
          'The competition will consist of two rounds: prelims and finals. The prelims will be held before the main event, with dates announced later. Shortlisted participants will qualify for the finals.',
          'Participants are not allowed to refer to lyrics while singing.',
          'Permitted genres are Indian Classical, Semi-Classical, Rabindra Sangeet and Bengali Adhunik.',
          'Bollywood and Western songs are not permitted.',
          'Participants must bring all the instruments required for their performance.',
          'Performances will be judged on singing prowess, uniqueness and stage presence.',
          'Only 10 participants will be selected for the finals.',
        ],
      },
    ],
  },
  {
    no: '04', group: 'cultural', name: 'Westwood', category: 'Western Music', card: '/westwood.jpg', tagline: 'Western melodies, one voice, one stage',
    rules: [
      {
        title: 'Rules',
        items: [
          'All participants should carry their respective college IDs.',
          'Multiple registrations from a single college are allowed.',
          'Solo performers can only have one accompanist (Instrument either Guitar or any Percussion/Beatbox, not both), i.e. 1 + 1 (solo). If the singer has an accompanist, then the singer can’t play any instrument, or if the singer is playing any instrument, then the singer can’t have an accompanist.',
          'Time Duration: 4 mins (3 mins + 1 min).',
          'All participants must carry their karaoke tracks (if any) on a pen drive on the day of the event and email the same to iemmusicclub.8thnote@gmail.com at least five days before the event.',
          'There will be 2 rounds of the competition. Round 1 will be Prelims (to be conducted before the event, dates to be announced later) and shortlisted participants will compete in the finals.',
          'Participants cannot see the lyrics and sing.',
          'Criteria for scores include Singing prowess, Uniqueness, Stage presence and Soundcheck proficiency.',
          'All instruments must be brought by the participants.',
        ],
      },
    ],
  },
  {
    no: '05', group: 'cultural', name: 'Instrumental Echoes', category: 'Battle of Instruments', card: '/instrumental-echoes.jpg', tagline: 'Strings, drums and keys in a battle of sound',
    rules: [
      {
        title: 'Rules',
        items: [
          'All participants should carry their respective college IDs.',
          'Multiple registrations from a single college are allowed.',
          'Time Duration: 5 mins (4 mins + 1 min).',
          'Eastern and Western instruments are allowed. Multi-instrumentalist is allowed.',
          'Backing Track/Metronome/e-Tanpura/e-Tabla is allowed.',
          'All participants must carry their backing tracks (if any) on a pen drive on the day of the event and email the same to iemmusicclub.8thnote@gmail.com at least five days before the event. No instrumental stem of the instrumentalist or vocal stems should be present in the track.',
          'There will be 2 rounds in the competition. Round 1 will be Prelims (to be conducted before the event, dates to be announced later) and shortlisted participants will compete in the finals.',
          'Ragas and original compositions are appreciated. Judging criteria: The judging may be based on qualities such as tal/beat, selection of raga, composition, and overall impression. Participants have to bring their instruments.',
          'Only a 5-piece drum kit will be provided. Prior information should be provided if the drummer is left-handed. (Add-ons such as double pedal, cymbals, etc. need to be brought by the participant.)',
        ],
      },
    ],
  },
  {
    no: '06', group: 'cultural', name: 'The Illusion Jam', category: 'Battle of Bands', card: '/illusion-jam.jpg', tagline: 'Bands collide on one electrifying stage',
    rules: [
      {
        title: 'Rules',
        items: [
          'Cross college teams are allowed.',
          'All team members should carry their respective college IDs.',
          'A Group must have a minimum of 4 members & can have a maximum of 7 members.',
          'Time Duration: 12 mins (8 mins + 4 mins).',
          'Negative markings will be awarded if the performance exceeds the time limit.',
          'All technical requirements must be informed to the coordinators before the event.',
          'MIDI devices and laptops are not allowed in the competition.',
          'There will be 2 rounds of the competition. Round 1 will be Prelims (to be conducted before the event, dates to be announced later), and shortlisted Bands will compete in the finals.',
          'Participants cannot see the lyrics and sing.',
          'No track is allowed for this competition.',
          'No restriction is there in terms of the language of the song.',
          'In case of original compositions, the lyrics should be provided to the judges beforehand.',
          'Criteria for scores include Singing prowess, Uniqueness, Stage presence, and Soundcheck proficiency.',
          'All instruments must be brought by the participants.',
          'A 5-piece Drum Kit will be provided. Prior information should be provided if the drummer is left-handed.',
          'Participants requiring a double pedal should bring their own.',
          'Bands will be disqualified on the spot for misconduct, obscenity, or foul language.',
        ],
      },
    ],
  },
  { no: '07', group: 'sports', name: 'Futsal', category: 'Mini-Football Tournament', card: '/futsal.jpg', tagline: 'Fast feet, fierce goals, five-a-side glory' },
  {
    no: '11', group: 'literary', name: 'Quizzard', category: 'Mela Quiz', card: '/quizzard.jpg', tagline: 'Music, arts and trivia — only the sharpest survive',
    rules: [
      {
        title: 'Prelims',
        items: [
          'Teams can consist of 1 to 2 members.',
          'There will be 20 questions in the preliminary round.',
          'Each team will be provided with an answer sheet to write their responses.',
          'Answer sheets must be submitted at the end of the round.',
          'More rules for the final round will be shared with the qualifying teams on the day of the finals.',
          'The top 6 teams based on scores will qualify for the Finals.',
        ],
      },
      {
        title: 'Star-marked questions',
        items: [
          'Questions 4, 8, 12, 16, and 20 are Star-Marked.',
          'In case of a tie in scores, the team with more correct star-marked answers will be ranked higher.',
        ],
      },
      {
        title: 'General instructions',
        items: [
          'Participants are expected to maintain decorum and integrity throughout the event.',
          'Use of unfair means, including mobile phones or external help during the quiz, will lead to disqualification.',
          'The decision of the Quizmaster is final and binding on all matters related to the quiz.',
        ],
      },
    ],
  },
  {
    no: '12', group: 'cultural', name: 'Halla Bol', category: 'Street Play', card: '/halla-bol.jpg', tagline: 'Raise your voice, take the street',
    rules: [
      {
        title: 'Team and time',
        items: [
          'Team limit: maximum 20 members, including musicians and instrumentalists.',
          'Time limit: 12 + 3 minutes, from start to end.',
          'Maximum team slots: 10.',
        ],
      },
      {
        title: 'Registration',
        items: [
          'Registration is open for all college teams.',
          'Only one team can register from a single college. Cross-college teams are not allowed.',
          'Registration is on a first come, first served basis.',
        ],
      },
      {
        title: 'Performance',
        items: [
          'Theme: open.',
          'Language: Bengali or Hindi.',
          'Teams are expected to perform at an open-air venue with the audience on all sides.',
          'Only live music is allowed.',
          'Participating teams must carry their own instruments.',
        ],
      },
      {
        title: 'Props and safety',
        items: [
          'The use of fire, liquid and smoke is strictly prohibited.',
          'Gulaal / abir or any other props, if used, must be cleared by the team after their performance, within the time limit.',
        ],
      },
      {
        title: 'Disqualification',
        items: [
          'Any instance of vulgarity or disturbing content of any order will lead to a forced halt of the performance, and the team may be disqualified (with the judges’ permission).',
        ],
      },
      {
        title: 'Note',
        items: ['The decision of the judges will be final.'],
      },
    ],
  },
  {
    no: '13', group: 'cultural', name: 'IEM Unfiltered', category: 'Open-Mic Acts', card: '/iem-unfiltered.svg', tagline: 'Picked from the crowd, live between the acts',
    rules: [
      {
        title: 'Format',
        items: [
          'IEM Unfiltered will take place continuously, in between the scheduled performances of IEMPACT 2026.',
          'Participants for this sub-event will be picked at random from the audience.',
        ],
      },
      {
        title: 'Conduct',
        items: [
          'Participants must maintain decency and decorum, since the event is conducted on the college premises.',
          'Slang or any derogatory words referring to the college administration are strictly prohibited.',
          'There should not be any political reference of any kind during the acts.',
        ],
      },
    ],
  },
  { no: '15', group: 'sports', name: 'Call of Duty: Mobile', category: 'Mobile Esports', card: '/cod-mobile.jpg', tagline: 'Drop in, squad up, own the lobby' },
  { no: '16', group: 'sports', name: 'BGMI', category: 'Mobile Esports', card: '/bgmi.jpg', tagline: 'Drop in, survive, be the last squad standing' },
  { no: '17', group: 'sports', name: 'Mind Over Moves', category: 'Rapid Chess Tournament', card: '/chess.jpg', tagline: 'Outthink your opponent, one move at a time' },
  { no: '22', group: 'sports', name: 'Carrom', category: 'Board Game Tournament', card: '/carrom.jpg', tagline: 'Aim sharp, strike smart, chase the queen' },
  { no: '23', group: 'sports', name: 'Table Tennis', category: 'Table Tennis Tournament', card: '/table-tennis.jpg', tagline: 'Fast rallies, sharp reflexes, ultimate glory' },
  { no: '24', group: 'sports', name: 'Badminton', category: 'Badminton Tournament', card: '/badminton.jpg', tagline: 'Every rally counts, every point matters' },
  { no: '25', group: 'sports', name: 'Tug of War', category: 'Team Strength Contest', card: '/tug-of-war.jpg', tagline: 'Pull hard, stand strong, conquer together' },
  { no: '26', group: 'sports', name: 'Arm Wrestling', category: 'Strength Contest', card: '/arm-wrestling.jpg', tagline: 'Lock in, power up, dominate' },
  { no: '27', group: 'sports', name: 'E-Football', category: 'Football Esports', card: '/e-football.jpg', tagline: 'Controllers locked in, glory is real' },
  {
    no: '28', group: 'cultural', name: 'Shrutirawngo', category: 'Audio Drama', card: '/shrutirawngo.jpg', tagline: 'The screen goes dark, the story comes alive',
    rules: [
      {
        title: 'Team and time',
        items: [
          'Team limit: maximum 8 members, in a 6 + 2 division: 6 performers and 2 technical participants.',
          'Time limit: 8 + 2 minutes, from stage in to stage out.',
          'Number of slots: 8.',
          'Exceeding the time limit will cause deduction of marks.',
        ],
      },
      {
        title: 'Registration',
        items: [
          'Registration is open for all, and cross-college teams are allowed.',
          'Registration is on a first come, first served basis. We strongly recommend registering online at the earliest.',
          'Spot registration will only take place in case of vacancies.',
          'Timings will be notified through college POCs.',
        ],
      },
      {
        title: 'Performance',
        items: [
          'Language: Bengali or Hindi.',
          'The script can be original or adapted. An adapted script must carry proper acknowledgement.',
          'Physical movement resembling any form of drama is not allowed. Judgement is based only on voice acting.',
          'Each team gets 5 minutes for a sound check before the event starts.',
        ],
      },
      {
        title: 'Audio submission',
        items: [
          'Mail backing audio (if any) to chorusproduction26@gmail.com with the subject "Background Audio for SHRUTIRAWNGO <TEAM NAME>".',
          'Pre-recorded tracks must be mailed in advance, and also brought on the day on a pen drive in MP3 format.',
        ],
      },
      {
        title: 'Judging criteria',
        items: [
          'Script.',
          'Voice acting (pronunciation and expression).',
          'Music and soundtracks.',
          'Time accuracy.',
        ],
      },
      {
        title: 'Disqualification',
        items: [
          'Any form of vulgarity, abusive language or direct political comments will lead to immediate disqualification of the team.',
        ],
      },
      {
        title: 'Note',
        items: ['The decision of the judges will be considered final.'],
      },
    ],
  },
  // Technical workshops — names and details are still to be announced
  {
    no: '19', group: 'technical', name: 'MAYA: Beyond Prompts', category: 'Agentic AI Workshop', card: '/workshop-1.png', tagline: 'Go beyond prompts and build with agentic AI',
    rules: [
      {
        title: 'What to bring',
        items: [
          'Every participant must bring a personal laptop for the hands-on workshop.',
          'Ensure your laptop is fully charged and carry your charger.',
          'Make sure your device can connect to the internet.',
        ],
      },
      {
        title: 'Accounts and setup',
        items: [
          'Participants should have access to a GitHub account and any tools or platforms announced by the organizers.',
          'Install Python and Visual Studio Code (VS Code) beforehand, if possible. Any additional setup instructions will be shared by the organizers.',
        ],
      },
      {
        title: 'Eligibility',
        items: [
          'Familiarity with Python and basic AI concepts is helpful, but beginners are welcome.',
        ],
      },
      {
        title: 'Conduct',
        items: [
          'Be hands-on: follow the demonstrations, experiment with the code, and actively participate in the activities.',
          'Use AI tools ethically and do not share passwords, API keys, or other confidential information.',
          'Arrive on time to complete the setup and participate in the full session.',
          'Cooperate with the organizers and follow all workshop instructions.',
        ],
      },
    ],
  },
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
