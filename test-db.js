const mongoose = require('mongoose');
async function test() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27018/presentation-db');
    console.log('Connected');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
test();
