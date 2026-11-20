Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

PS C:\Users\Nidhi Rathor> mongosh
Current Mongosh Log ID: 6afff51442323dc176082d01
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.14.1
Using MongoDB:          9.0.4
Using Mongosh:          2.14.1
mongosh 2.14.3 is available for download: https://www.mongodb.com/try/download/shell

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

------
   The server generated these startup warnings when booting
   2026-11-03T11:36:33.768+05:30: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> use studentDB
switched to db studentDB
studentDB> db.createCollection("students")
{ ok: 1 }
studentDB> db.students.insertMany([
|   {
|     "RollNo": 101,
|     "Name": "Rahul Sharma",
|     "Course": "B.Tech CSE",
|     "Year": 2,
|     "Age": 20,
|     "Marks": 85,
|     "City": "Ghaziabad"
|   },
|   {
|     "RollNo": 102,
|     "Name": "Priya Verma",
|     "Course": "B.Tech IT",
|     "Year": 1,
|     "Age": 19,
|     "Marks": 92,
|     "City": "Delhi"
|   },
|   {
|     "RollNo": 103,
|     "Name": "Aman Gupta",
|     "Course": "B.Tech CSE",
|     "Year": 3,
|     "Age": 21,
|     "Marks": 78,
|     "City": "Noida"
|   },
|   {
|     "RollNo": 104,
|     "Name": "Sneha Singh",
|     "Course": "BCA",
|     "Year": 2,
|     "Age": 20,
|     "Marks": 88,
|     "City": "Lucknow"
|   },
|   {
|     "RollNo": 105,
|     "Name": "Karan Yadav",
|     "Course": "B.Tech CSE",
|     "Year": 4,
|     "Age": 22,
|     "Marks": 95,
|     "City": "Meerut"
|   }
| ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6afff56342323dc176082d02'),
    '1': ObjectId('6afff56342323dc176082d03'),
    '2': ObjectId('6afff56342323dc176082d04'),
    '3': ObjectId('6afff56342323dc176082d05'),
    '4': ObjectId('6afff56342323dc176082d06')
  }
}
studentDB> db.Students.updateOne({ RollNo: 101 }, { $set: { Age: 20 } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
studentDB> db.Students.deleteOne({ RollNo: 103 })
{ acknowledged: true, deletedCount: 0 }
studentDB> db.students.find
[Function: find] AsyncFunction {
  returnsPromise: true,
  apiVersions: [ 1, Infinity ],
  returnType: 'Cursor',
  serverVersions: [ '0.0.0', '999.999.999' ],
  topologies: [ 'ReplSet', 'Standalone', 'Sharded', 'LoadBalanced' ],
  deprecated: false,
  platforms: [ 'Compass', 'Browser', 'CLI' ],
  isDirectShellCommand: false,
  acceptsRawInput: false,
  shellCommandCompleter: undefined,
  newShellCommandCompleter: undefined,
  help: [Function (anonymous)] Help
}
studentDB> db.student.updateOne({RollNo: 101 }, {$set: {Age: 21}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
studentDB>  db.students.updateOne({RollNo: 101 }, {$set: {Age: 21}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
studentDB> db.students.deleteOne({ RollNo: 103 })
{ acknowledged: true, deletedCount: 1 }
studentDB> db.students.find()
[
  {
    _id: ObjectId('6afff56342323dc176082d02'),
    RollNo: 101,
    Name: 'Rahul Sharma',
    Course: 'B.Tech CSE',
    Year: 2,
    Age: 21,
    Marks: 85,
    City: 'Ghaziabad'
  },
  {
    _id: ObjectId('6afff56342323dc176082d03'),
    RollNo: 102,
    Name: 'Priya Verma',
    Course: 'B.Tech IT',
    Year: 1,
    Age: 19,
    Marks: 92,
    City: 'Delhi'
  },
  {
    _id: ObjectId('6afff56342323dc176082d05'),
    RollNo: 104,
    Name: 'Sneha Singh',
    Course: 'BCA',
    Year: 2,
    Age: 20,
    Marks: 88,
    City: 'Lucknow'
  },
  {
    _id: ObjectId('6afff56342323dc176082d06'),
    RollNo: 105,
    Name: 'Karan Yadav',
    Course: 'B.Tech CSE',
    Year: 4,
    Age: 22,
    Marks: 95,
    City: 'Meerut'
  }
]
studentDB>