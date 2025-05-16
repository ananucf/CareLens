import { connect } from 'mongoose';

const dbUri = process.env.DB_URI || 'mongodb+srv://CareLens:KagCZ7aTCdI3A5bR@cluster0.xoeue.mongodb.net/carelens';
export const dbConn = connect(dbUri, {
})
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); 
  });

  