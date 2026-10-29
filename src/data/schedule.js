// The schedule is not out yet. While `announced` is false, the Schedule page
// shows "To Be Announced" under each day (the two dates and the design stay),
// and event pages show TBA for day and time.
//
// When the official timings are ready: replace the slots below, then set
// `announced` to true.
export const announced = false

// ⚠ PLACEHOLDER SLOTS — the times below are illustrative only and are hidden
// while `announced` is false. `no` refers to an event's number in events.js;
// the page pulls name, category and poster from there.
export const days = [
  {
    id: 'day-1',
    label: 'Day 01',
    date: '16 January 2027',
    slots: [
      { time: '10:00', no: '01' },
      { time: '13:00', no: '07' },
      { time: '14:30', no: '11' },
      { time: '15:30', no: '03' },
      { time: '17:00', no: '05' },
      { time: '19:30', no: '06' },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 02',
    date: '17 January 2027',
    slots: [
      { time: '11:00', no: '17' },
      { time: '12:00', no: '15' },
      { time: '13:30', no: '12' },
      { time: '15:00', no: '02' },
      { time: '19:30', no: '04' },
    ],
  },
]
