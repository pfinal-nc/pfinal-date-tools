// Test date calculations for the festival marketing calendar
import dayjs from 'dayjs';

// Current date for testing (June 12, 2026)
const currentDate = dayjs('2026-06-12');

// Example festivals
const festivals = [
  { name: '元旦', date: '2026-01-01', preparationDays: 15 },
  { name: '教师节', date: '2026-09-10', preparationDays: 15 },
  { name: '中秋节', date: '2026-10-04', preparationDays: 25 },
  { name: '国庆节', date: '2026-10-01', preparationDays: 30 }
];

console.log('Current Date:', currentDate.format('YYYY-MM-DD'));
console.log('====================');

festivals.forEach(festival => {
  const festivalDate = dayjs(festival.date);
  const daysToFestival = festivalDate.diff(currentDate, 'day');
  const preparationDate = festivalDate.subtract(festival.preparationDays, 'day');
  const daysToPreparation = preparationDate.diff(currentDate, 'day');
  const isExpired = festivalDate.isBefore(currentDate, 'day');
  
  console.log(`Festival: ${festival.name}`);
  console.log(`  Date: ${festival.date}`);
  console.log(`  Days to festival: ${daysToFestival}`);
  console.log(`  Preparation days: ${festival.preparationDays}`);
  console.log(`  Days to preparation: ${daysToPreparation}`);
  console.log(`  Is expired: ${isExpired}`);
  console.log('-------------------');
});